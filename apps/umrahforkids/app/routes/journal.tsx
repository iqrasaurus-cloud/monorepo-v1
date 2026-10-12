import { getSite, langOf } from '@iqra/config'
import { JournalList, pageMeta, strings } from '@iqra/ui'
import { posts } from '../journal.ts'

const site = getSite('umrahforkids')

export function meta({ location }: { location: { pathname: string } }) {
  const lang = langOf(location.pathname)
  return pageMeta(
    site,
    { title: `${strings[lang].journal} — ${site.name}`, path: '/journal' },
    lang,
  )
}

export default function Journal() {
  return <JournalList site={site} posts={posts} />
}
