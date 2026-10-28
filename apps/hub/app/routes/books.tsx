import { getSite, langOf } from '@iqra/config'
import { BookshelfPage, pageMeta, strings } from '@iqra/ui'
import { posts } from '../journal.ts'

const site = getSite('hub')

export function meta({ location }: { location: { pathname: string } }) {
  const lang = langOf(location.pathname)
  return pageMeta(
    site,
    {
      title: `${strings[lang].bookshelf} — ${site.name}`,
      description: strings[lang].bookshelfLede,
      path: '/books',
    },
    lang,
  )
}

export default function Books() {
  return <BookshelfPage site={site} posts={posts} />
}
