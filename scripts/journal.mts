// Reads the owner's journal Google Sheet and writes this site's posts before it is built.
// Run from an app folder (each app's `build` script does this):
//   node --experimental-strip-types ../../scripts/journal.mts
//
// Writes  app/journal.generated.json   the posts for this site (newest first)
//         public/journal/<slug>.webp   each post's picture, shrunk to at most 1280px wide
// Both are build output and not committed. If the sheet can't be read, the build carries on
// with the last posts it wrote (or none), so a Google hiccup never breaks a deploy.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import {
  getSite,
  isPlaceholder,
  journalCsvUrl,
  programmes,
  type JournalPost,
} from '../packages/config/src/index.ts'
import { fetchText, parseCsv, savePicture } from './sheet.mts'

const app = process.cwd()
const site = getSite(basename(app))
const outFile = join(app, 'app', 'journal.generated.json')
const imageDir = join(app, 'public', 'journal')
const MAX_WIDTH = 1280
const SITES = new Set(['hub', 'all', ...programmes().map((p) => p.slug)])

const warn = (msg: string) => console.warn(`journal: ${msg}`)

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const pad = (n: number) => String(n).padStart(2, '0')

/** YYYY-MM-DD, D/M/YYYY (day first, as in Singapore) or "14 March 2019", as YYYY-MM-DD. */
function parseDate(raw: string): string | undefined {
  const s = raw.trim()
  let m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(s)
  if (m) return `${m[1]}-${pad(+m[2]!)}-${pad(+m[3]!)}`
  m = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/.exec(s)
  if (m) {
    // Day first, as in Singapore, unless that can't be a date (e.g. 3/14/2019 from a US sheet).
    const [a, b] = [+m[1]!, +m[2]!]
    const [day, month] = b > 12 ? [b, a] : [a, b]
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31)
      return `${m[3]}-${pad(month)}-${pad(day)}`
  }
  m = /^(\d{1,2})\s+([a-z]{3})[a-z]*\s+(\d{4})$/i.exec(s)
  if (m) {
    const month = MONTHS.indexOf(m[2]!.toLowerCase())
    if (month >= 0) return `${m[3]}-${pad(month + 1)}-${pad(+m[1]!)}`
  }
  return undefined
}

/** Today in Singapore, so a post dated today appears on the day the owner chose. */
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Singapore' }).format(new Date())

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70)
    .replace(/-+$/, '') || 'post'

const youtubeId = (url: string): string | undefined =>
  /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/.exec(url)?.[1]

const docId = (text: string): string | undefined =>
  /^https:\/\/docs\.google\.com\/document\/d\/([\w-]+)/.exec(text.trim())?.[1]

const paragraphs = (text: string): string[] =>
  text
    .replace(/\r\n?/g, '\n')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p !== '')

const BULLET = /^\s*(?:[-*•●○▪◦]|\d+[.)])\s+/

/**
 * A Google Doc exported as text: every line is a paragraph, and runs of bullet lines stay
 * together so the page can show them as one list. "## " lines are kept for subheadings.
 */
const docParagraphs = (text: string): string[] => {
  const out: string[] = []
  for (const raw of text.replace(/\r\n?/g, '\n').split('\n')) {
    const line = raw.trim()
    if (line === '') continue
    const last = out[out.length - 1]
    if (BULLET.test(line) && last !== undefined && last.split('\n').every((l) => BULLET.test(l))) {
      out[out.length - 1] = `${last}\n${line}`
    } else out.push(line)
  }
  return out
}

/**
 * Owner notes such as "[[fill in: …]]" stay in the sheet but never show (CLAUDE.md rule 2):
 * a paragraph or list line that is only a note is dropped, and so is a "## " subheading
 * left with nothing under it. A note in the middle of a sentence can't be dropped cleanly,
 * so it is only reported in the build log.
 */
function withoutNotes(paras: string[], title: string): string[] {
  const kept = paras
    .map((p) =>
      p
        .split('\n')
        .filter((l) => !isPlaceholder(l.replace(BULLET, '')))
        .join('\n'),
    )
    .filter((p) => !isPlaceholder(p))
  const body = kept.filter(
    (p, i) => !p.startsWith('## ') || (kept[i + 1] !== undefined && !kept[i + 1]!.startsWith('## ')),
  )
  if (body.some((p) => p.includes('[['))) warn(`"${title}": has a [[note]] inside a sentence`)
  return body
}

async function bodyOf(raw: string, title: string): Promise<string[]> {
  const id = docId(raw)
  if (!id) return withoutNotes(paragraphs(raw), title)
  try {
    return withoutNotes(
      docParagraphs(await fetchText(`https://docs.google.com/document/d/${id}/export?format=txt`)),
      title,
    )
  } catch (e) {
    warn(`"${title}": could not read its Google Doc (${(e as Error).message})`)
    return []
  }
}

async function imageOf(url: string, slug: string, alt: string): Promise<JournalPost['image']> {
  try {
    const file = `${slug}.webp`
    const { width, height } = await savePicture(url, app, join(imageDir, file), MAX_WIDTH)
    return { src: `/journal/${file}`, alt, width, height }
  } catch (e) {
    warn(`"${slug}": picture not used (${(e as Error).message})`)
    return undefined
  }
}

/** The optional Malay columns (title_ms, excerpt_ms, body_ms), or nothing when all are empty. */
async function malayOf(
  title: string,
  excerpt: string,
  rawBody: string,
): Promise<JournalPost['ms']> {
  if (!title && !excerpt && !rawBody) return undefined
  const body = rawBody ? await bodyOf(rawBody, title || '(Malay)') : undefined
  return { title: title || undefined, excerpt: excerpt || undefined, body }
}

async function main() {
  let csv: string
  try {
    // JOURNAL_CSV=path/to/file.csv reads a local copy instead, for trying things out.
    csv = process.env.JOURNAL_CSV
      ? readFileSync(process.env.JOURNAL_CSV, 'utf8')
      : await fetchText(journalCsvUrl())
  } catch (e) {
    warn(`could not read the journal sheet: ${(e as Error).message}`)
    if (existsSync(outFile)) {
      warn('keeping the posts from the last successful read')
    } else {
      writeFileSync(outFile, '[]\n')
      warn('no posts this build')
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

  rmSync(imageDir, { recursive: true, force: true })
  mkdirSync(imageDir, { recursive: true })

  const used = new Set<string>()
  const posts: JournalPost[] = []
  for (const row of rows) {
    if (get(row, 'status').toLowerCase() !== 'published') continue
    const title = get(row, 'title')
    const postSite = get(row, 'site').toLowerCase()
    const date = parseDate(get(row, 'publish_date'))
    if (!title) continue
    if (!SITES.has(postSite)) {
      warn(`"${title}": unknown site "${postSite}" (use hub, all or a programme slug)`)
      continue
    }
    if (!date) {
      warn(`"${title}": publish_date "${get(row, 'publish_date')}" not understood (use YYYY-MM-DD)`)
      continue
    }
    if (date > today) continue // scheduled for later
    if (site.kind === 'spoke' && postSite !== site.slug && postSite !== 'all') continue

    let slug = slugify(get(row, 'slug') || title)
    for (let n = 2; used.has(slug); n++) slug = `${slugify(get(row, 'slug') || title)}-${n}`
    used.add(slug)

    const imageUrl = get(row, 'image_url')
    const videoUrl = get(row, 'video_url')
    posts.push({
      slug,
      site: postSite,
      category: get(row, 'category'),
      date,
      title,
      excerpt: get(row, 'excerpt'),
      body: await bodyOf(get(row, 'body'), title),
      image: imageUrl.startsWith('https://') || imageUrl.startsWith('library/')
        ? await imageOf(imageUrl, slug, get(row, 'image_alt'))
        : undefined,
      videoId: videoUrl ? youtubeId(videoUrl) : undefined,
      ms: await malayOf(get(row, 'title_ms'), get(row, 'excerpt_ms'), get(row, 'body_ms')),
    })
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  writeFileSync(outFile, JSON.stringify(posts, null, 2) + '\n')
  console.log(`journal: ${posts.length} post(s) for ${site.slug}`)
}

await main()
