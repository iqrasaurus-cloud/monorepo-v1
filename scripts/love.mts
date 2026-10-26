// Reads the Wall of Love tab of the owner's Google Sheet and writes this site's notes before
// it is built. Run from an app folder (each app's `build` script does this):
//   node --experimental-strip-types ../../scripts/love.mts
//
// Writes  app/love.generated.json   the approved notes (the hub gets all; a programme its first 3)
//         public/love/<id>.webp     each note's picture (hub only), shrunk to at most 1100px wide
// Both are build output and not committed. Until the tab's gid is set in
// packages/config/src/love.ts, the starting rows in packages/config/love-seed.csv are used.
// If the sheet can't be read, the build carries on with the last notes it wrote (or none).
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import {
  getSite,
  isPlaceholder,
  loveCsvUrl,
  programmes,
  type LoveNote,
} from '../packages/config/src/index.ts'
import { fetchText, parseCsv, savePicture } from './sheet.mts'

const app = process.cwd()
const site = getSite(basename(app))
const outFile = join(app, 'app', 'love.generated.json')
const imageDir = join(app, 'public', 'love')
const seedFile = join(app, '..', '..', 'packages', 'config', 'love-seed.csv')
const MAX_WIDTH = 1100
/** A programme page shows a few of its notes, as words only, and links to the whole wall. */
const PER_PROGRAMME = 3
const PROGRAMMES = new Set(['hub', ...programmes().map((p) => p.slug)])

const warn = (msg: string) => console.warn(`love: ${msg}`)

async function main() {
  let csv: string
  try {
    // LOVE_CSV=path/to/file.csv reads a local copy instead, for trying things out.
    const url = loveCsvUrl()
    csv = process.env.LOVE_CSV
      ? readFileSync(process.env.LOVE_CSV, 'utf8')
      : url
        ? await fetchText(url)
        : readFileSync(seedFile, 'utf8')
  } catch (e) {
    warn(`could not read the Wall of Love tab: ${(e as Error).message}`)
    if (existsSync(outFile)) {
      warn('keeping the notes from the last successful read')
    } else {
      writeFileSync(outFile, '[]\n')
      warn('no notes this build')
    }
    return
  }

  const [header, ...rows] = parseCsv(csv)
  if (!header) {
    writeFileSync(outFile, '[]\n')
    return
  }
  const col = (name: string) => header.findIndex((h) => h.trim().toLowerCase() === name)
  const get = (row: string[], name: string) => (row[col(name)] ?? '').trim()
  // Owner notes such as "[[check this]]" never show (CLAUDE.md rule 2).
  const real = (text: string) => (isPlaceholder(text) ? undefined : text)

  rmSync(imageDir, { recursive: true, force: true })
  mkdirSync(imageDir, { recursive: true })

  const notes: LoveNote[] = []
  for (const [i, row] of rows.entries()) {
    if (get(row, 'approved').toLowerCase() !== 'yes') continue
    const consent = get(row, 'consent').toLowerCase()
    if (consent.startsWith('no')) continue
    const text = real(get(row, 'text').replace(/\r\n?/g, '\n'))
    if (!text) continue
    if (text.includes('[[')) {
      warn(`row ${i + 2}: has a [[note]] in its text, so it is not shown`)
      continue
    }
    const programme = get(row, 'programme').toLowerCase() || 'hub'
    if (!PROGRAMMES.has(programme)) {
      warn(`row ${i + 2}: unknown programme "${programme}" (use hub or a programme slug)`)
      continue
    }
    if (site.kind === 'spoke' && programme !== site.slug) continue
    if (site.kind === 'spoke' && notes.length === PER_PROGRAMME) break

    const id = `note-${i + 2}`
    const named = consent === 'yes'
    const imageUrl = get(row, 'image_url')
    let image: LoveNote['image']
    const wanted =
      site.kind === 'hub' && (imageUrl.startsWith('https://') || imageUrl.startsWith('library/'))
    if (wanted) {
      try {
        const file = `${id}.webp`
        const size = await savePicture(imageUrl, app, join(imageDir, file), MAX_WIDTH)
        image = { src: `/love/${file}`, alt: get(row, 'image_alt'), ...size }
      } catch (e) {
        warn(`row ${i + 2}: picture not used (${(e as Error).message})`)
      }
    }
    const creditMs = named ? real(get(row, 'credit_ms')) : undefined
    const contextMs = real(get(row, 'context_ms'))
    notes.push({
      id,
      programme,
      text,
      credit: named ? real(get(row, 'name_or_credit')) : undefined,
      context: real(get(row, 'context')),
      image,
      ms: creditMs || contextMs ? { credit: creditMs, context: contextMs } : undefined,
    })
  }

  writeFileSync(outFile, JSON.stringify(notes, null, 2) + '\n')
  console.log(`love: ${notes.length} note(s) for ${site.slug}`)
}

await main()
