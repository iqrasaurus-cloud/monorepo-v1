/**
 * packages/config/src/love.ts
 *
 * The Wall of Love (iqrasaurus.com/love, owner decision 2026-10-25): kind words from parents,
 * teachers and children, in their own words. They live on a "Wall of Love" tab in the journal
 * Google Sheet. Each site's build reads it (scripts/love.mts): the hub shows every approved
 * row, and each programme page shows a few of its own with a link to the whole wall.
 *
 * Sheet columns (row 1, in any order):
 *   name_or_credit  the writer's name, or a credit such as "a teacher's note to former students"
 *   credit_ms       optional; the credit in Malay (a person's name needs no Malay)
 *   context         optional; where it came from, e.g. "Quran RJ & Doodling workshop, 2017–2018"
 *   context_ms      optional; the same in Malay
 *   programme       a programme slug (e.g. quranhadeethdoodling) or "hub" for IqraSaurus as a whole
 *   text            their words, exactly as written. A line break stays a line break
 *   image_url       optional; any https picture, a Google Drive "anyone with the link" picture,
 *                   or library/<file>.webp for an approved picture in packages/ui/assets/journal-library/
 *   image_alt       what the picture shows
 *   consent         "yes" (name may be shown), "anonymous" (show the words, not the name) or "no"
 *   approved        "yes" shows it. Anything else hides it: this is the moderation step
 *
 * Words are never edited, completed or translated (CLAUDE.md rules 1 and 2). They show in the
 * same words on the English and Malay pages.
 */

import { isPlaceholder } from './spokes.ts'
import { journalSheet } from './journal.ts'

export const loveSheet = {
  /** The same spreadsheet as the journal. */
  id: journalSheet.id,
  /**
   * OWNER: the Wall of Love tab's number, from the address bar when that tab is open:
   * ...#gid=<number>. Until it is filled in, the sites use the starting rows in
   * packages/config/love-seed.csv (the same rows to import into the tab).
   */
  gid: '1411310386', // the "Wall of Love" tab (owner, 2026-10-27)
  /** OWNER: the Google Form's "Send" link (https://forms.gle/...). The button hides until then. */
  formUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSfctiIdGJ8qyPyws5tuLqDl9f87BtQU5bzPK2oQm3sRiBVl2w/viewform', // owner, 2026-10-27
} as const

/** The tab as CSV, or undefined while its gid is still a placeholder. */
export const loveCsvUrl = (): string | undefined =>
  isPlaceholder(loveSheet.gid)
    ? undefined
    : `https://docs.google.com/spreadsheets/d/${loveSheet.id}/export?format=csv&gid=${loveSheet.gid}`

/** The "Share your story" link, or undefined until the owner has made the form. */
export const loveFormUrl = (): string | undefined =>
  isPlaceholder(loveSheet.formUrl) || !loveSheet.formUrl.startsWith('https://')
    ? undefined
    : loveSheet.formUrl

export interface LoveNote {
  id: string
  /** A programme slug, or 'hub'. */
  programme: string
  /** Their words; lines as written. */
  text: string
  /** Name or credit; absent when the writer asked not to be named. */
  credit?: string
  context?: string
  image?: { src: string; alt: string; width: number; height: number }
  ms?: { credit?: string; context?: string }
}
