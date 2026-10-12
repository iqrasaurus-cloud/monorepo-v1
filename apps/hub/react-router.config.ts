import type { Config } from '@react-router/dev/config'
import { existsSync, readFileSync } from 'node:fs'

/** A page for each journal post. scripts/journal.mts writes the list before the build. */
const journalPages = (): string[] => {
  const file = new URL('./app/journal.generated.json', import.meta.url)
  if (!existsSync(file)) return []
  const posts = JSON.parse(readFileSync(file, 'utf8')) as { slug: string; site: string }[]
  return posts.filter((p) => p.site === 'hub' || p.site === 'all').map((p) => `/journal/${p.slug}`)
}

export default {
  ssr: false,
  prerender: () => ['/', '/about', '/work-with-us', '/journal', '/404', ...journalPages()],
} satisfies Config
