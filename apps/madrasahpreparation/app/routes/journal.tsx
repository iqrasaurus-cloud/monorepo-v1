import { getSite } from '@iqra/config'
import { JournalList, pageMeta } from '@iqra/ui'
import { posts } from '../journal.ts'

const site = getSite('madrasahpreparation')

export function meta() {
  return pageMeta(site, { title: `Journal — ${site.name}`, path: '/journal' })
}

export default function Journal() {
  return <JournalList site={site} posts={posts} />
}
