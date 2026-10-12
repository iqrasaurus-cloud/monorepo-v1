import { embedUrl, videosFor, watchUrl, youtube, type SiteConfig, type Video } from '@iqra/config'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SafeEmbed } from '../../embed/SafeEmbed.tsx'
import { Mascot } from '../../mascot/Mascot.tsx'
import { duration, springSheet } from '../../motion/presets.ts'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { useSmoothScroll } from '../../motion/SmoothScroll.tsx'
import { useReducedMotionSafe } from '../../motion/useReducedMotionSafe.ts'
import { asPose, colourClass, COLOURS } from '../../primitives/colours.ts'
import { Container } from '../../primitives/Container.tsx'
import { Pattern } from '../../primitives/Pattern.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'
import { cn } from '../../utils/cn.ts'

const colourAt = (i: number) => colourClass[COLOURS[i % COLOURS.length] ?? 'investigate']

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
    </svg>
  )
}

function PlayBadge({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-sun text-on-sun shadow-soft transition-transform duration-300 ease-reveal motion-safe:group-hover:scale-110',
        size === 'lg' ? 'size-20' : size === 'md' ? 'size-14' : 'size-10',
      )}
    >
      <PlayIcon className={size === 'lg' ? 'size-9 translate-x-0.5' : 'size-6 translate-x-0.5'} />
    </span>
  )
}

interface CardProps {
  video: Video
  index: number
  onPlay: (v: Video, trigger: HTMLButtonElement) => void
}

/** The big video: its colour, its dino, the title and a sun play button. */
function FeaturedCard({ video, index, onPlay }: CardProps) {
  const c = colourAt(index)
  return (
    <button
      type="button"
      onClick={(e) => onPlay(video, e.currentTarget)}
      className={cn(
        'group relative flex aspect-video w-full flex-col justify-end overflow-hidden rounded-[28px] p-6 text-left shadow-soft md:p-8',
        c.bg,
      )}
    >
      <Pattern className="bg-plum/[0.07]" />
      <span className="absolute right-[5%] top-1/2 w-[34%] max-w-[240px] -translate-y-1/2 transition-transform duration-500 ease-reveal motion-safe:group-hover:-rotate-3 motion-safe:group-hover:scale-105">
        <Mascot pose={asPose(video.pose)} size={220} fluid />
      </span>
      <span className="relative flex items-end gap-4">
        <PlayBadge size="lg" />
        <span className="min-w-0 max-w-[55%]">
          <span className={cn('label mb-1 block opacity-80', c.on)}>Video</span>
          <span
            className={cn(
              'line-clamp-3 font-heading text-xl font-bold leading-tight md:text-3xl',
              c.on,
            )}
          >
            {video.title}
          </span>
        </span>
      </span>
    </button>
  )
}

/** A video in the list beside the featured one. */
function RowCard({ video, index, onPlay }: CardProps) {
  const c = colourAt(index)
  return (
    <button
      type="button"
      onClick={(e) => onPlay(video, e.currentTarget)}
      className="group flex w-full items-center gap-4 rounded-card bg-surface p-3 text-left shadow-soft transition duration-300 ease-reveal motion-safe:hover:-translate-y-0.5"
    >
      <span
        className={cn(
          'relative flex aspect-video w-32 shrink-0 items-end justify-center overflow-hidden rounded-xl',
          c.bg,
        )}
      >
        <Mascot pose={asPose(video.pose)} size={60} className="iq-mascot-hover translate-y-1" />
        <span className="absolute left-2 top-2">
          <PlayBadge size="sm" />
        </span>
      </span>
      <span className="line-clamp-3 font-heading text-base font-semibold leading-snug text-ink">
        {video.title}
      </span>
    </button>
  )
}

/** A tall 9:16 card for a YouTube Short. */
function ShortCard({ video, index, onPlay }: CardProps) {
  const c = colourAt(index + 1)
  return (
    <button
      type="button"
      onClick={(e) => onPlay(video, e.currentTarget)}
      className={cn(
        'group relative flex aspect-[9/16] w-full flex-col overflow-hidden rounded-[22px] p-4 text-left shadow-soft transition duration-300 ease-reveal motion-safe:hover:-translate-y-1',
        c.bg,
      )}
    >
      <Pattern className="bg-plum/[0.07]" />
      <span
        className={cn(
          'label relative self-start rounded-pill bg-surface/80 px-2 py-0.5 text-[10px] text-ink',
        )}
      >
        Short
      </span>
      <span className="relative flex flex-1 items-center justify-center">
        <Mascot pose={asPose(video.pose)} size={96} className="iq-mascot-hover" />
      </span>
      <span className="relative flex items-end gap-2">
        <span className={cn('line-clamp-3 flex-1 text-sm font-semibold leading-snug', c.on)}>
          {video.title}
        </span>
        <PlayBadge size="sm" />
      </span>
    </button>
  )
}

interface PlayerProps {
  site: SiteConfig
  video: Video
  onClose: () => void
}

/** The player: a sheet over the page with the YouTube frame, only created when asked for. */
export function Player({ site, video, onClose }: PlayerProps) {
  const reduced = useReducedMotionSafe()
  const closeRef = useRef<HTMLButtonElement>(null)
  const { lock } = useSmoothScroll()
  const short = video.kind === 'short'

  useEffect(() => {
    lock(true)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      lock(false)
    }
  }, [onClose, lock])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      data-lenis-prevent=""
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? duration.fade : 0.25 }}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-plum/80 backdrop-blur-sm"
      />
      <motion.div
        className={cn(
          'relative flex flex-col',
          short ? 'h-[min(86svh,760px)]' : 'w-[min(94vw,980px)]',
        )}
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 24 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
        transition={reduced ? { duration: duration.fade } : springSheet}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="line-clamp-1 font-heading text-lg font-semibold text-on-plum">
            {video.title}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-on-plum/15 text-on-plum transition hover:rotate-90 hover:bg-on-plum/25"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <SafeEmbed
          site={site}
          embed={{ src: embedUrl(video), title: video.title, allow: youtube.allow }}
          className={cn(
            'overflow-hidden rounded-[22px] bg-plum',
            short ? 'aspect-[9/16] h-full' : 'aspect-video w-full',
          )}
        />
        <a
          href={watchUrl(video)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-sweep mt-3 self-start text-sm font-semibold text-on-plum/85"
        >
          Watch on YouTube
        </a>
      </motion.div>
    </motion.div>
  )
}

interface VideosProps {
  site: SiteConfig
  /** Heading for the section. */
  title?: string
}

/**
 * The owner's YouTube videos for this site (packages/config/src/media.ts): a featured video,
 * a few more beside it and a row of Shorts. Nothing loads from YouTube until a visitor
 * presses play.
 */
export function Videos({ site, title = 'Watch with your child' }: VideosProps) {
  const all = videosFor(site.slug)
  const long = all.filter((v) => v.kind === 'video')
  const shorts = all.filter((v) => v.kind === 'short')
  const [playing, setPlaying] = useState<Video | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  if (all.length === 0) return null
  const [featured, ...rest] = long
  const side = rest.slice(0, 4)

  const play = (v: Video, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setPlaying(v)
  }
  const stop = () => {
    setPlaying(null)
    triggerRef.current?.focus()
  }
  const scrollRow = (dir: 1 | -1) => {
    const row = rowRef.current
    if (row) row.scrollBy({ left: dir * row.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <Container>
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading title={title} pose="amazed-stars" />
        <a
          href={youtube.channel}
          rel="noopener"
          className="link-sweep shrink-0 font-semibold text-primary"
        >
          More on our YouTube channel
        </a>
      </Reveal>

      {featured ? (
        <div className={cn('grid gap-5', side.length > 0 && 'lg:grid-cols-[1.7fr_1fr]')}>
          <Reveal slow>
            <FeaturedCard video={featured} index={0} onPlay={play} />
          </Reveal>
          {side.length > 0 ? (
            <RevealList as="ul" className="grid content-start gap-3">
              {side.map((v, i) => (
                <RevealItem key={v.id} as="li">
                  <RowCard video={v} index={i + 1} onPlay={play} />
                </RevealItem>
              ))}
            </RevealList>
          ) : null}
        </div>
      ) : null}

      {shorts.length > 0 ? (
        <div className={cn(featured && 'mt-14')}>
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 className="font-heading text-2xl font-bold text-primary">Shorts</h3>
            {shorts.length > 3 ? (
              <div className="hidden gap-2 sm:flex">
                {([-1, 1] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => scrollRow(dir)}
                    aria-label={dir === 1 ? 'More shorts' : 'Previous shorts'}
                    className="flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary transition hover:bg-primary hover:text-on-primary"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className={cn('size-5', dir === -1 && 'rotate-180')}
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div
            ref={rowRef}
            className="no-scrollbar -mx-5 snap-x snap-mandatory overflow-x-auto scroll-px-5 px-5 pb-4 md:-mx-8 md:scroll-px-8 md:px-8"
          >
            <RevealList as="ul" className="flex w-max gap-4">
              {shorts.map((v, i) => (
                <RevealItem key={v.id} as="li" className="w-40 shrink-0 snap-start sm:w-44 lg:w-48">
                  <ShortCard video={v} index={i} onPlay={play} />
                </RevealItem>
              ))}
            </RevealList>
          </div>
        </div>
      ) : null}

      <AnimatePresence>
        {playing ? <Player key={playing.id} site={site} video={playing} onClose={stop} /> : null}
      </AnimatePresence>
    </Container>
  )
}
