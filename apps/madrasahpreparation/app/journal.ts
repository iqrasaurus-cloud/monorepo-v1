import type { JournalPost } from '@iqra/config'

/** This site's posts, written from the journal Google Sheet by scripts/journal.mts before each build. */
const found = import.meta.glob<JournalPost[]>('./journal.generated.json', {
  eager: true,
  import: 'default',
})
export const posts: JournalPost[] = Object.values(found)[0] ?? []
