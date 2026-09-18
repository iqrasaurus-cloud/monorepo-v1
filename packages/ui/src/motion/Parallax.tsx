import type { Photo } from '@iqra/config'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { Picture } from '../primitives/Picture.tsx'
import { cn } from '../utils/cn.ts'
import { parallax } from './presets.ts'
import { useReducedMotionSafe } from './useReducedMotionSafe.ts'

interface ParallaxProps {
  image: Photo & { fallback?: string }
  /** Sets the height, e.g. h-[60vh] md:h-[80vh]. */
  className?: string
  /** Overlaid content, centred. */
  children?: ReactNode
}

/** Full-width image break; the picture drifts and breathes as the section scrolls past. */
export function Parallax({ image, className, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], parallax.y)
  const scale = useTransform(scrollYProgress, parallax.scaleInput, parallax.scale)

  return (
    <div ref={ref} className={cn('relative h-[60vh] overflow-hidden md:h-[80vh]', className)}>
      <motion.div
        style={reduced ? undefined : { y, scale }}
        className="absolute inset-x-0 top-0 h-[136%] w-full -translate-y-[18%] [&_picture]:contents"
      >
        <Picture {...image} className="h-full w-full object-cover" />
      </motion.div>
      {children ? (
        <div className="absolute inset-0 flex items-center justify-center">{children}</div>
      ) : null}
    </div>
  )
}
