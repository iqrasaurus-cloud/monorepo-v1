import { getSite, langOf } from '@iqra/config'
import { TimelinePage, pageMeta, strings } from '@iqra/ui'
import { posts } from '../journal.ts'

const site = getSite('hub')

export function meta({ location }: { location: { pathname: string } }) {
  const lang = langOf(location.pathname)
  return pageMeta(
    site,
    {
      title: `${strings[lang].timeline} — ${site.name}`,
      description: strings[lang].timelineLede,
      path: '/timeline',
    },
    lang,
  )
}

export default function Timeline() {
  return <TimelinePage site={site} posts={posts} />
}
