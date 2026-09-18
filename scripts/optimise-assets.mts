// Optimises every apps/<slug>/assets-src image into apps/<slug>/public and prints its size.
//   assets-src/brand/mascot-*.png  -> public/brand/<name>-{160,320,640}.{webp,png}
//   assets-src/brand/logo-*.png    -> public/brand/<name>-{320,640}.{webp,png}
//   assets-src/brand/icon-*.png    -> public/brand/<name>-160.{webp,png} + favicon set
//   assets-src/photos/*            -> public/photos/<name>-{640,1280,1920}.{webp,jpg} + <name>.{webp,jpg}
// Also writes public/brand/og.png (1200x630) for each site. Run with: pnpm assets
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs'
import { basename, dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { brand, sites } from '../packages/config/src/index.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const WEBP = { quality: 82 }
const JPG = { quality: 82, mozjpeg: true }
const PNG = { compressionLevel: 9, palette: true }

const token = (name: string): string => {
  const css = readFileSync(join(root, 'packages/config/src/tokens.css'), 'utf8')
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, 'i'))
  if (!match?.[1]) throw new Error(`token --${name} not found in tokens.css`)
  return match[1]
}

const kindOf = (file: string): 'mascot' | 'logo' | 'icon' | 'photo' => {
  if (file.startsWith('mascot-')) return 'mascot'
  if (file.startsWith('logo-')) return 'logo'
  if (file.startsWith('icon-')) return 'icon'
  return 'photo'
}

const widthsFor = {
  mascot: [160, 320, 640],
  logo: [320, 640],
  icon: [160],
  photo: [640, 1280, 1920],
}
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp'])

const listImages = (dir: string): string[] =>
  existsSync(dir) ? readdirSync(dir).filter((f) => IMAGE_EXT.has(extname(f).toLowerCase())) : []

const escapeXml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

async function writeVariants(source: string, outDir: string, fallbackExt: 'png' | 'jpg') {
  const name = basename(source, extname(source))
  const kind = kindOf(name)
  const meta = await sharp(source).metadata()
  const sourceWidth = meta.width ?? 0
  let largest = ''
  for (const width of widthsFor[kind]) {
    const target = Math.min(width, sourceWidth)
    const base = join(outDir, `${name}-${width}`)
    const resized = () => sharp(source).resize({ width: target, withoutEnlargement: true })
    await resized().webp(WEBP).toFile(`${base}.webp`)
    if (fallbackExt === 'png') await resized().png(PNG).toFile(`${base}.png`)
    else
      await resized()
        .flatten({ background: token('paper') })
        .jpeg(JPG)
        .toFile(`${base}.jpg`)
    const out = await sharp(`${base}.webp`).metadata()
    console.log(`  ${name}-${width}  ${out.width}x${out.height}`)
    largest = base
    if (target < width) break
  }
  if (kind === 'photo' && largest) {
    await sharp(`${largest}.webp`).toFile(join(outDir, `${name}.webp`))
    await sharp(`${largest}.jpg`).toFile(join(outDir, `${name}.jpg`))
  }
  return name
}

async function writeFavicons(source: string, outDir: string) {
  const set = [
    ['favicon-32.png', 32],
    ['favicon-192.png', 192],
    ['apple-touch-icon.png', 180],
    ['icon-512.png', 512],
  ] as const
  for (const [file, size] of set) {
    await sharp(source).resize(size, size).png(PNG).toFile(join(outDir, file))
    console.log(`  ${file}  ${size}x${size}`)
  }
}

async function writeOg(mascot: string, logo: string | undefined, siteName: string, outDir: string) {
  const width = 1200
  const height = 630
  const mascotBuffer = await sharp(mascot).resize({ height: 500 }).png().toBuffer()
  const mascotMeta = await sharp(mascotBuffer).metadata()
  const words = siteName.split(' ')
  const lines = words.length > 2 ? [words.slice(0, 2).join(' '), words.slice(2).join(' ')] : words
  const textX = 560
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text x="${textX}" y="250" font-family="Fredoka, 'Segoe UI', Arial, sans-serif" font-size="14" font-weight="600" letter-spacing="4" fill="${token('ink')}">${escapeXml(brand.name.toUpperCase())} TOOLKIT</text>
      ${lines
        .map(
          (line, i) =>
            `<text x="${textX}" y="${330 + i * 84}" font-family="Fredoka, 'Segoe UI', Arial, sans-serif" font-size="72" font-weight="700" fill="${token('primary')}">${escapeXml(line)}</text>`,
        )
        .join('')}
    </svg>`
  const layers: sharp.OverlayOptions[] = [
    { input: mascotBuffer, left: 80, top: Math.round((height - (mascotMeta.height ?? 500)) / 2) },
    { input: Buffer.from(svg), left: 0, top: 0 },
  ]
  if (logo) {
    layers.push({
      input: await sharp(logo).resize({ height: 56 }).png().toBuffer(),
      left: textX,
      top: 100,
    })
  }
  await sharp({ create: { width, height, channels: 4, background: token('paper') } })
    .composite(layers)
    .png(PNG)
    .toFile(join(outDir, 'og.png'))
  console.log(`  og.png  ${width}x${height}`)
}

for (const site of sites) {
  const app = join(root, 'apps', site.slug)
  const src = join(app, 'assets-src')
  if (!existsSync(src)) continue
  console.log(`\n${site.slug}`)

  const brandSrc = join(src, 'brand')
  const brandOut = join(app, 'public', 'brand')
  mkdirSync(brandOut, { recursive: true })
  let icon: string | undefined
  for (const file of listImages(brandSrc)) {
    const path = join(brandSrc, file)
    const name = await writeVariants(path, brandOut, 'png')
    if (kindOf(name) === 'icon' && !icon) icon = path
  }
  if (icon) await writeFavicons(icon, brandOut)
  const mascot = join(brandSrc, site.mascot)
  const logo = join(brandSrc, 'logo-horizontal.png')
  if (existsSync(mascot)) {
    await writeOg(mascot, existsSync(logo) ? logo : undefined, site.name, brandOut)
  }

  const photosSrc = join(src, 'photos')
  const photos = listImages(photosSrc)
  if (photos.length > 0) {
    const photosOut = join(app, 'public', 'photos')
    mkdirSync(photosOut, { recursive: true })
    for (const file of photos) await writeVariants(join(photosSrc, file), photosOut, 'jpg')
  } else {
    console.log('  (no photos in assets-src/photos)')
  }
}
