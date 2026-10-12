/**
 * packages/config/src/journal.ts
 *
 * The journal on every site comes from ONE Google Sheet the owner keeps adding to
 * ("IqraSaurus Journal (master list)"). Each site's build reads it (scripts/journal.mts),
 * keeps that site's published posts, downloads and shrinks their pictures, and turns them
 * into real pages at /journal and /journal/<slug>. Nothing is fetched in the visitor's browser.
 *
 * Sheet columns (row 1, in any order):
 *   site          a programme slug (e.g. storybuzz), "hub", or "all" (every site)
 *   category      free text, e.g. Session, Workshop, Behind the scenes
 *   publish_date  YYYY-MM-DD (or DD/MM/YYYY). Past dates are fine; future dates wait until that day
 *   title, excerpt
 *   body          the post; a blank line between paragraphs. Or a Google Doc link to use its text
 *   image_url     optional; a Google Drive "anyone with the link" picture or any https picture
 *   image_alt     what the picture shows
 *   video_url     optional YouTube link
 *   status        "published" shows it; anything else (draft, example) hides it
 *   slug          optional; the web address of the post. Made from the title when empty
 *
 * The owner writes every post (CLAUDE.md rules 1 and 2): text is shown exactly as written.
 */

export const journalSheet = {
  /** OWNER: the sheet's id, from its link docs.google.com/spreadsheets/d/<id>/edit */
  id: '1wy04iJmT_YYlxV9_tslkZ9MDQSCsQHjI_tdWyOhgHPQ', // owned by iqrasaurus@gmail.com (2026-10-12)
  /** The tab the posts are on (0 = the first tab). */
  gid: '0',
} as const

export const journalCsvUrl = (): string =>
  `https://docs.google.com/spreadsheets/d/${journalSheet.id}/export?format=csv&gid=${journalSheet.gid}`

export interface JournalPost {
  slug: string
  /** Which site the post belongs to: a programme slug, 'hub' or 'all'. */
  site: string
  category: string
  /** ISO date, YYYY-MM-DD. */
  date: string
  title: string
  excerpt: string
  /** Paragraphs of the post, in order. */
  body: string[]
  image?: { src: string; alt: string; width: number; height: number }
  /** YouTube video id. */
  videoId?: string
}
