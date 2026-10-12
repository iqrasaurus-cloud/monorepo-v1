import {
  getSite,
  programmes,
  siteUrl,
  type JournalPost,
  type SiteConfig,
  type Video,
} from '@iqra/config'
import { AnimatePresence } from 'framer-motion'
import { Fragment, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { Mascot } from '../../mascot/Mascot.tsx'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { Button } from '../../primitives/Button.tsx'
import { asPose, colourClass } from '../../primitives/colours.ts'
import { Container } from '../../primitives/Container.tsx'
import { Pattern } from '../../primitives/Pattern.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { Section } from '../../primitives/Section.tsx'
import { cn } from '../../utils/cn.ts'
import { PageHeader } from '../hub/PageHeader.tsx'
import { Player } from '../shared/Videos.tsx'

const PROGRAMME_SLUGS = new Set(programmes().map((p) => p.slug))

/** "2019-03-14" -> "14 March 2019". Read as UTC so the day never shifts. */
export const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat('en-SG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`))

/** The programme a post belongs to, or undefined for hub and "all" posts. */
const programmeOf = (post: JournalPost): SiteConfig | undefined =>
  PROGRAMME_SLUGS.has(post.site) ? getSite(post.site) : undefined

/**
 * Where a post's page is. On the hub, a programme's post opens on that programme's own
 * site; everything else has a page on the site being viewed.
 */
export const postHref = (site: SiteConfig, post: JournalPost): string => {
  const home = programmeOf(post)
  if (site.kind === 'hub' && home) return siteUrl(home, `/journal/${post.slug}`)
  return `/journal/${post.slug}`
}

/** Which posts get a page of their own on this site (the rest link out to their programme). */
export const journalPagesFor = (site: SiteConfig, posts: JournalPost[]): JournalPost[] =>
  site.kind === 'hub' ? posts.filter((p) => !PROGRAMME_SLUGS.has(p.site)) : posts

/** Turns bare links in the owner's text into links; the text itself is shown as written. */
function Linked({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g)
  return (
    <>
      {parts.map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <a key={i} href={part} rel="noopener" className="link-sweep font-semibold text-primary">
            {part}
          </a>
        ) : (
          <Fragment key={i}>
            {part.split('\n').map((line, j) => (
              <Fragment key={j}>
                {j > 0 ? <br /> : null}
                {line}
              </Fragment>
            ))}
          </Fragment>
        ),
      )}
    </>
  )
}

const BULLET = /^\s*(?:[-*•●○▪◦]|\d+[.)])\s+/

/** One block of a post: a "## " subheading, a list (every line a bullet) or a paragraph. */
function Block({ text }: { text: string }) {
  if (text.startsWith('## ')) {
    return (
      <h2 className="pt-4 font-heading text-2xl font-bold text-primary">{text.slice(3).trim()}</h2>
    )
  }
  const lines = text.split('\n')
  if (lines.every((l) => BULLET.test(l))) {
    return (
      <ul className="space-y-2">
        {lines.map((l, i) => (
          <li key={i} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-3 size-2 shrink-0 rounded-full bg-sun ring-2 ring-plum/20"
            />
            <span>
              <Linked text={l.replace(BULLET, '')} />
            </span>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <p>
      <Linked text={text} />
    </p>
  )
}

function SiteBadge({ post }: { post: JournalPost }) {
  const home = programmeOf(post)
  if (!home) return null
  return (
    <span
      className={cn(
        'label inline-block rounded-pill px-2.5 py-1 text-[10px]',
        colourClass[home.colour].bg,
        colourClass[home.colour].on,
      )}
    >
      {home.name}
    </span>
  )
}

function CardLink({
  href,
  className,
  children,
}: {
  href: string
  className: string
  children: ReactNode
}) {
  return href.startsWith('/') ? (
    <Link to={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

/** A post on the journal page: its picture (or its programme's dino), date, title, excerpt. */
function PostCard({
  site,
  post,
  showSite,
}: {
  site: SiteConfig
  post: JournalPost
  showSite: boolean
}) {
  const home = programmeOf(post) ?? site
  return (
    <CardLink
      href={postHref(site, post)}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-surface p-2 shadow-soft transition duration-300 ease-reveal motion-safe:hover:-translate-y-1"
    >
      <span className="relative block aspect-[16/10] overflow-hidden rounded-[18px] [&_picture]:contents">
        {post.image ? (
          <Picture
            {...post.image}
            className="h-full w-full object-cover transition duration-500 ease-reveal group-hover:scale-105"
          />
        ) : (
          <span
            className={cn(
              'relative flex h-full items-end justify-center',
              colourClass[home.colour].bg,
            )}
          >
            <Pattern className="bg-plum/[0.07]" />
            <span className="relative w-[38%] translate-y-2">
              <Mascot pose={asPose(home.pose)} size={150} fluid className="iq-mascot-hover" />
            </span>
          </span>
        )}
      </span>
      <span className="flex flex-1 flex-col px-3 pb-3 pt-4">
        <span className="flex flex-wrap items-center gap-2">
          {showSite ? <SiteBadge post={post} /> : null}
          {post.category ? (
            <span className="label text-[10px] text-ink/70">{post.category}</span>
          ) : null}
        </span>
        <span className="mt-2 font-heading text-xl font-bold leading-snug text-ink">
          {post.title}
        </span>
        {post.excerpt ? (
          <span className="mt-2 line-clamp-3 text-ink/80">{post.excerpt}</span>
        ) : null}
        <span className="mt-auto pt-4 text-sm text-ink/70">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </span>
      </span>
    </CardLink>
  )
}

interface JournalListProps {
  site: SiteConfig
  posts: JournalPost[]
}

/** /journal: every post for this site, newest first, with a filter per category. */
export function JournalList({ site, posts }: JournalListProps) {
  const [category, setCategory] = useState<string | null>(null)
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))].sort()
  const shown = category ? posts.filter((p) => p.category === category) : posts
  const isHub = site.kind === 'hub'

  return (
    <>
      <PageHeader
        title="Journal"
        lede={isHub ? 'What we have tried with children, across every programme.' : site.name}
        pose="writing"
      />
      <Section bg="surface" prev="paper" tight>
        <Container>
          {posts.length === 0 ? (
            <Reveal className="flex flex-col items-center gap-5 py-10 text-center">
              <Mascot pose="writing" size={140} enter />
              <p className="max-w-md text-lg text-ink/80">
                We are writing up our first posts. In the meantime, our videos show some of the
                work.
              </p>
              <Button to="/" variant="outline" className="font-heading">
                Back to {site.name}
              </Button>
            </Reveal>
          ) : (
            <>
              {categories.length > 1 ? (
                <div
                  role="group"
                  aria-label="Filter by category"
                  className="mb-8 flex flex-wrap gap-2"
                >
                  {[null, ...categories].map((c) => {
                    const active = category === c
                    return (
                      <button
                        key={c ?? 'all'}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setCategory(c)}
                        className={cn(
                          'rounded-pill px-4 py-2 font-heading text-sm font-semibold transition-colors',
                          active
                            ? 'bg-primary text-on-primary'
                            : 'bg-primary-soft text-primary hover:bg-primary hover:text-on-primary',
                        )}
                      >
                        {c ?? 'All'}
                      </button>
                    )
                  })}
                </div>
              ) : null}
              <RevealList
                key={category ?? 'all'}
                as="ul"
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {shown.map((post) => (
                  <RevealItem key={`${post.site}-${post.slug}`} as="li">
                    <PostCard site={site} post={post} showSite={isHub} />
                  </RevealItem>
                ))}
              </RevealList>
            </>
          )}
        </Container>
      </Section>
    </>
  )
}

interface JournalPostPageProps {
  site: SiteConfig
  post: JournalPost
  /** Every post for this site, to suggest a few more at the end. */
  posts: JournalPost[]
}

/** /journal/<slug>: one post, as the owner wrote it. */
export function JournalPostPage({ site, post, posts }: JournalPostPageProps) {
  const [playing, setPlaying] = useState(false)
  const playRef = useRef<HTMLButtonElement>(null)
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3)
  const home = programmeOf(post) ?? site
  const video: Video | undefined = post.videoId
    ? { id: post.videoId, title: post.title, kind: 'video', sites: [], pose: home.pose }
    : undefined

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-paper pb-10 pt-10 md:pb-14 md:pt-14">
          <Pattern className="bg-plum/[0.05]" />
          <Container className="relative max-w-3xl">
            <Reveal>
              <Link to="/journal" className="link-sweep text-sm font-semibold text-primary">
                ← Journal
              </Link>
              <p className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink/75">
                {site.kind === 'hub' ? <SiteBadge post={post} /> : null}
                {post.category ? <span className="label text-[10px]">{post.category}</span> : null}
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </p>
              <h1 className="mt-3 text-balance font-heading text-4xl font-bold leading-tight text-ink md:text-5xl">
                {post.title}
              </h1>
              {post.excerpt ? <p className="mt-5 text-xl text-ink/80">{post.excerpt}</p> : null}
            </Reveal>
          </Container>
        </header>

        <Section bg="surface" prev="paper" tight>
          <Container className="max-w-3xl">
            {post.image ? (
              <Reveal className="mb-10 overflow-hidden rounded-card shadow-soft [&_picture]:contents">
                <Picture {...post.image} priority className="h-auto w-full" />
              </Reveal>
            ) : null}
            <div className="space-y-5 text-lg leading-relaxed text-ink/85">
              {post.body.map((p, i) => (
                <Block key={i} text={p} />
              ))}
            </div>
            {video ? (
              <Reveal className="mt-10">
                <button
                  ref={playRef}
                  type="button"
                  onClick={() => setPlaying(true)}
                  className={cn(
                    'group relative flex w-full items-center gap-4 overflow-hidden rounded-card p-5 text-left shadow-soft',
                    colourClass[home.colour].bg,
                  )}
                >
                  <Pattern className="bg-plum/[0.07]" />
                  <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-sun text-on-sun shadow-soft transition-transform duration-300 motion-safe:group-hover:scale-110">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 translate-x-0.5">
                      <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
                    </svg>
                  </span>
                  <span
                    className={cn(
                      'relative font-heading text-lg font-bold',
                      colourClass[home.colour].on,
                    )}
                  >
                    Watch the video
                  </span>
                </button>
              </Reveal>
            ) : null}
          </Container>
        </Section>
      </article>

      {more.length > 0 ? (
        <Section bg="paper-2" prev="surface" tight>
          <Container>
            <h2 className="mb-8 font-heading text-3xl font-bold text-primary">
              More from the journal
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <li key={`${p.site}-${p.slug}`}>
                  <PostCard site={site} post={p} showSite={site.kind === 'hub'} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <AnimatePresence>
        {playing && video ? (
          <Player
            site={site}
            video={video}
            onClose={() => {
              setPlaying(false)
              playRef.current?.focus()
            }}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}
