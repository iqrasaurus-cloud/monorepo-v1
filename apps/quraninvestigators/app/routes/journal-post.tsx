import { getSite, langOf } from '@iqra/config'
import { journalPagesFor, JournalPostPage, localPost, NotFound, pageMeta, strings } from '@iqra/ui'
import { useParams } from 'react-router'
import { posts } from '../journal.ts'

const site = getSite('quraninvestigators')
const find = (slug?: string) => journalPagesFor(site, posts).find((p) => p.slug === slug)

export function meta({
  params,
  location,
}: {
  params: { slug?: string }
  location: { pathname: string }
}) {
  const lang = langOf(location.pathname)
  const found = find(params.slug)
  if (!found) {
    const title = `${strings[lang].pageNotFound} — ${site.name}`
    return pageMeta(site, { title, path: '/404', noindex: true }, lang)
  }
  const post = localPost(found, lang)
  return pageMeta(
    site,
    {
      title: `${post.title} — ${site.name}`,
      description: post.excerpt || undefined,
      path: `/journal/${post.slug}`,
    },
    lang,
  )
}

export default function JournalPost() {
  const post = find(useParams().slug)
  return post ? <JournalPostPage site={site} post={post} posts={posts} /> : <NotFound site={site} />
}
