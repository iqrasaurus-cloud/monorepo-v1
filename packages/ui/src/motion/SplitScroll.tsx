import type { Photo } from '@iqra/config'
import { m, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { Picture } from '../primitives/Picture.tsx'
import { cn } from '../utils/cn.ts'
import { splitScroll } from './presets.ts'
import { RevealItem, RevealList } from './Reveal.tsx'
import { useReducedMotionSafe } from './useReducedMotionSafe.ts'

type Frame = Photo & { fallback?: string }

function Column({ photos, y }: { photos: Frame[]; y: MotionValue<string> }) {
  return (
    <m.div style={{ y }} className="flex w-full flex-col gap-[3vh]">
      {photos.map((photo, i) => (
        <div
          key={`${photo.src}-${i}`}
          className="h-[38vh] w-full overflow-hidden rounded-card [&_picture]:contents"
        >
          <Picture {...photo} className="h-full w-full object-cover" />
        </div>
      ))}
    </m.div>
  )
}

/** Under 1024px: the pages as a swipeable, slightly fanned row, each page shown once. */
function Strip({ photos, title }: { photos: Frame[]; title: ReactNode }) {
  const unique = photos.filter((p, i, all) => all.findIndex((q) => q.src === p.src) === i)
  return (
    <div>
      <div className="mb-10 text-center">{title}</div>
      <RevealList
        as="ul"
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 pt-2 md:px-8 md:[justify-content:safe_center]"
      >
        {unique.map((photo, i) => (
          <RevealItem
            key={photo.src}
            as="li"
            className="w-[64%] max-w-[300px] shrink-0 snap-center sm:w-[40%] md:w-[30%]"
          >
            <div
              className={cn(
                'aspect-[3/4] overflow-hidden rounded-card bg-surface p-1.5 shadow-soft transition-transform duration-500 ease-reveal hover:rotate-0 [&_picture]:contents',
                i % 2 === 0 ? '-rotate-2' : 'rotate-2',
              )}
            >
              <Picture {...photo} className="h-full w-full rounded-xl object-cover" />
            </div>
          </RevealItem>
        ))}
      </RevealList>
    </div>
  )
}

function Split({ photos, title }: { photos: Frame[]; title: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const yLeft = useTransform(scrollYProgress, [0, 1], splitScroll.left)
  const yRight = useTransform(scrollYProgress, [0, 1], splitScroll.right)
  const scale = useTransform(scrollYProgress, splitScroll.titleInput, splitScroll.titleScale)
  const half = Math.ceil(photos.length / 2)

  return (
    <div ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="grid h-full w-full grid-cols-[1fr_1.2fr_1fr] items-center gap-[3vh] px-[6vw]">
          <Column photos={photos.slice(0, half)} y={yLeft} />
          <div />
          <Column photos={photos.slice(half)} y={yRight} />
        </div>
        <m.div
          style={{ scale }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center text-center"
        >
          {title}
        </m.div>
      </div>
    </div>
  )
}

interface SplitScrollProps {
  photos: Frame[]
  /** Centred title block (eyebrow + heading). */
  title: ReactNode
  className?: string
}

/**
 * Two photo columns scroll in opposite directions around a pinned title.
 * Falls back to a swipeable row with fewer than six photos, on screens under 1024px,
 * and when the visitor prefers reduced motion.
 */
export function SplitScroll({ photos, title, className }: SplitScrollProps) {
  const reduced = useReducedMotionSafe()
  const canSplit = photos.length >= splitScroll.minPhotos && !reduced

  if (!canSplit) {
    return (
      <div className={className}>
        <Strip photos={photos} title={title} />
      </div>
    )
  }
  return (
    <div className={cn(className)}>
      <div className="hidden lg:block">
        <Split photos={photos} title={title} />
      </div>
      <div className="lg:hidden">
        <Strip photos={photos} title={title} />
      </div>
    </div>
  )
}
