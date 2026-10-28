import { getSite, langOf, localized } from '@iqra/config'
import { pageMeta, SpokeHome } from '@iqra/ui'
import { content } from '../../content'
import { contentMs } from '../../content.ms'
import { posts } from '../journal.ts'
import { notes } from '../love.ts'

const site = getSite('storybuzz')

export function meta({ location }: { location: { pathname: string } }) {
  const lang = langOf(location.pathname)
  const seo = lang === 'ms' ? localized(content.seo, contentMs.seo) : content.seo
  return pageMeta(site, { ...seo, path: '/' }, lang)
}

export default function Home() {
  return <SpokeHome site={site} content={content} contentMs={contentMs} love={notes} posts={posts} />
}
