import type { JournalPost, SiteConfig } from '@iqra/config'
import { localPost, useLang, useT } from '../../i18n/lang.ts'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { Button } from '../../primitives/Button.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { Section } from '../../primitives/Section.tsx'
import { cn } from '../../utils/cn.ts'
import { PageHeader } from '../hub/PageHeader.tsx'
import { CardLink, postHref } from './Journal.tsx'

/** Archive posts (dated by their year only), oldest first: the timeline. */
export const archivePosts = (posts: JournalPost[]): JournalPost[] =>
  posts
    .filter((p) => p.yearOnly)
    .sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title) : a.date < b.date ? -1 : 1))

/** The children's own books, oldest first: the Bookshelf. */
export const bookPosts = (posts: JournalPost[]): JournalPost[] =>
  archivePosts(posts.filter((p) => p.book))

/** One story on the timeline or the shelf: its whole picture, year and title. */
function StoryCard({ site, post, wide = false }: { site: SiteConfig; post: JournalPost; wide?: boolean }) {
  const lang = useLang()
  return (
    <CardLink
      href={postHref(site, post, lang)}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-[24px] bg-surface p-2 shadow-soft transition duration-300 ease-reveal motion-safe:hover:-translate-y-1',
        wide && 'w-64 sm:w-72',
      )}
    >
      <span className="relative block aspect-[4/3] overflow-hidden rounded-[18px] bg-paper-2 [&_picture]:contents">
        {post.image ? <Picture {...post.image} className="h-full w-full object-contain" /> : null}
      </span>
      <span className="flex flex-1 flex-col px-3 pb-3 pt-3">
        <span className="font-heading text-2xl font-bold text-primary">{post.date.slice(0, 4)}</span>
        <span className="mt-1 font-heading text-lg font-semibold leading-snug text-ink">{post.title}</span>
      </span>
    </CardLink>
  )
}

/** About page: a swipeable row of the story so far, linking to the full timeline. */
export function TimelineStrip({ site, posts: all }: { site: SiteConfig; posts: JournalPost[] }) {
  const t = useT()
  const lang = useLang()
  const posts = archivePosts(all).map((p) => localPost(p, lang))
  if (posts.length === 0) return null
  return (
    <>
      <ul
        data-lenis-prevent
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin]"
      >
        {posts.map((post) => (
          <li key={`${post.site}-${post.slug}`} className="shrink-0 snap-start">
            <StoryCard site={site} post={post} wide />
          </li>
        ))}
      </ul>
      <Reveal className="mt-6">
        <Button to="/timeline" variant="outline" className="bg-surface font-heading">
          {t.seeTheWholeTimeline}
        </Button>
      </Reveal>
    </>
  )
}

/** iqrasaurus.com/timeline: every archive story, grouped by year. */
export function TimelinePage({ site, posts: all }: { site: SiteConfig; posts: JournalPost[] }) {
  const t = useT()
  const lang = useLang()
  const posts = archivePosts(all).map((p) => localPost(p, lang))
  const years = [...new Set(posts.map((p) => p.date.slice(0, 4)))]
  return (
    <>
      <PageHeader title={t.timeline} lede={t.timelineLede} pose="signpost" />
      <Section bg="surface" prev="paper" tight>
        <Container>
          <ol className="relative space-y-12 border-l-4 border-primary-soft pl-6 md:pl-10">
            {years.map((year) => (
              <li key={year} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[38px] top-1 size-6 rounded-full bg-sun ring-4 ring-surface md:-left-[54px]"
                />
                <h2 className="mb-5 font-heading text-4xl font-bold text-primary">{year}</h2>
                <RevealList as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {posts
                    .filter((p) => p.date.startsWith(year))
                    .map((post) => (
                      <RevealItem key={`${post.site}-${post.slug}`} as="li">
                        <StoryCard site={site} post={post} />
                      </RevealItem>
                    ))}
                </RevealList>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  )
}

/** iqrasaurus.com/books: the children's books, each opening its story with the book inside. */
export function BookshelfPage({ site, posts: all }: { site: SiteConfig; posts: JournalPost[] }) {
  const t = useT()
  const lang = useLang()
  const posts = bookPosts(all).map((p) => localPost(p, lang))
  return (
    <>
      <PageHeader title={t.bookshelf} lede={t.bookshelfLede} pose="books-stack" />
      <Section bg="surface" prev="paper" tight>
        <Container>
          <RevealList as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <RevealItem key={`${post.site}-${post.slug}`} as="li">
                <StoryCard site={site} post={post} />
              </RevealItem>
            ))}
          </RevealList>
        </Container>
      </Section>
    </>
  )
}
