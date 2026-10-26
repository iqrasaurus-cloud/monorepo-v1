// Small helpers shared by the scripts that read the owner's Google Sheet at build time
// (journal.mts and love.mts). Nothing here runs in a visitor's browser.
import { readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import sharp from 'sharp'

/** A small CSV reader: quoted cells, doubled quotes and line breaks inside cells. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"'
        i++
      } else if (ch === '"') quoted = false
      else cell += ch
    } else if (ch === '"') quoted = true
    else if (ch === ',') {
      row.push(cell)
      cell = ''
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else cell += ch
  }
  if (cell !== '' || row.length > 0) {
    row.push(cell)
    rows.push(row)
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ''))
}

export async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { redirect: 'follow' })
  const type = res.headers.get('content-type') ?? ''
  // A private sheet or doc answers with Google's sign-in page instead of the data.
  if (!res.ok || type.includes('text/html')) {
    throw new Error(`${res.status} ${type || 'no type'} (is it shared as "anyone with the link"?)`)
  }
  return (await res.text()).replace(/^\uFEFF/, '')
}

export const driveId = (url: string): string | undefined =>
  /drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)([\w-]+)/.exec(url)?.[1]

/** Approved pictures from the owner's library, shared by every site (image_url "library/<file>"). */
export const libraryDir = (app: string): string =>
  join(app, '..', '..', 'packages', 'ui', 'assets', 'journal-library')

/**
 * Reads a picture (library/<file>, a Google Drive link or any https address), shrinks it to
 * at most maxWidth and saves it as WebP. Returns its size.
 */
export async function savePicture(
  url: string,
  app: string,
  outFile: string,
  maxWidth: number,
): Promise<{ width: number; height: number }> {
  let input: Buffer
  if (url.startsWith('library/')) {
    input = readFileSync(join(libraryDir(app), basename(url)))
  } else {
    const id = driveId(url)
    const source = id ? `https://drive.google.com/uc?export=download&id=${id}` : url
    const res = await fetch(source, { redirect: 'follow' })
    const type = res.headers.get('content-type') ?? ''
    if (!res.ok || !type.startsWith('image/')) throw new Error(`${res.status} ${type}`)
    input = Buffer.from(await res.arrayBuffer())
  }
  const { data, info } = await sharp(input)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toBuffer({ resolveWithObject: true })
  writeFileSync(outFile, data)
  return { width: info.width, height: info.height }
}
