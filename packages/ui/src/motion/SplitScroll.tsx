import type { Photo } from '@iqra/config'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { Picture } from '../primitives/Picture.tsx'
import { cn } from '../utils/cn.ts'
import { splitScroll } from './presets.ts'
import { RevealItem, RevealList } from './Reveal.tsx'
import { useReducedMotionSafe } from './useReducedMotionSafe.ts'

type Frame = Photo & { fallback?: string }

function Column({ photos, y }: { photos: Frame[]; y: MotionValue<string> }) {
  return (
    <motion.div style={{ y }} className="flex w-full flex-col gap-[3vh]">
      {photos.map((photo, i) => (
        <div
          key={`${photo.src}-${i}`}
          className="h-[38vh] w-full overflow-hidden rounded-card [&_picture]:contents"
        >
          <Picture {...photo} className="h-full w-full object-cover" />
        </div>
      ))}
    </motion.div>
  )
}

function Grid({ photos, title }: { photos: Frame[]; title: ReactNode }) {
  return (
    <div>
      <div className="mb-10 text-center">{title}</div>
      <RevealList as="ul" className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {photos.map((photo, i) => (
          <RevealItem
            key={`${photo.src}-${i}`}
            as="li"
            className="aspect-[3/4] overflow-hidden rounded-card [&_picture]:contents"
          >
            <Picture {...photo} className="h-full w-full object-cover" />
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
        <motion.div
          style={{ scale }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center text-center"
        >
          {title}
        </motion.div>
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
 * Falls back to a plain grid with fewer than six photos, on screens under 1024px,
 * and when the visitor prefers reduced motion.
 */
export function SplitScroll({ photos, title, className }: SplitScrollProps) {
  const reduced = useReducedMotionSafe()
  const canSplit = photos.length >= splitScroll.minPhotos && !reduced

  if (!canSplit) {
    return (
      <div className={className}>
        <Grid photos={photos} title={title} />
      </div>
    )
  }
  return (
    <div className={cn(className)}>
      <div className="hidden lg:block">
        <Split photos={photos} title={title} />
      </div>
      <div className="lg:hidden">
        <Grid photos={photos} title={title} />
      </div>
    </div>
  )
}
