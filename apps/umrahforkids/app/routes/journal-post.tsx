import { getSite } from '@iqra/config'
import { journalPagesFor, JournalPostPage, NotFound, pageMeta } from '@iqra/ui'
import { useParams } from 'react-router'
import { posts } from '../journal.ts'

const site = getSite('umrahforkids')
const find = (slug?: string) => journalPagesFor(site, posts).find((p) => p.slug === slug)

export function meta({ params }: { params: { slug?: string } }) {
  const post = find(params.slug)
  if (!post)
    return pageMeta(site, { title: `Not found — ${site.name}`, path: '/404', noindex: true })
  return pageMeta(site, {
    title: `${post.title} — ${site.name}`,
    description: post.excerpt || undefined,
    path: `/journal/${post.slug}`,
  })
}

export default function JournalPost() {
  const post = find(useParams().slug)
  return post ? <JournalPostPage site={site} post={post} posts={posts} /> : <NotFound site={site} />
}
