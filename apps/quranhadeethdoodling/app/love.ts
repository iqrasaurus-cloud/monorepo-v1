import type { LoveNote } from '@iqra/config'

/** This site's Wall of Love notes, written from the Google Sheet by scripts/love.mts before each build. */
const found = import.meta.glob<LoveNote[]>('./love.generated.json', {
  eager: true,
  import: 'default',
})
export const notes: LoveNote[] = Object.values(found)[0] ?? []
