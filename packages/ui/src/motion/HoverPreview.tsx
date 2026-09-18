import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useEffect, type RefObject } from 'react'
import { Picture } from '../primitives/Picture.tsx'
import { duration, easeReveal, previewRotation, previewScale, previewSpring } from './presets.ts'
import { useMediaQuery } from './useMediaQuery.ts'
import { useReducedMotionSafe } from './useReducedMotionSafe.ts'

export interface HoverPreviewItem {
  key: string
  src: string
  alt: string
  width: number
  height: number
  fallback?: string
}

interface HoverPreviewProps {
  /** The `relative` element whose pointer movement the preview follows. */
  containerRef: RefObject<HTMLElement | null>
  items: HoverPreviewItem[]
  activeKey: string | null
  className?: string
}

/** Image that trails the cursor with a spring and tilts with its velocity (megamenu rows). */
export function HoverPreview({ containerRef, items, activeKey, className }: HoverPreviewProps) {
  const reduced = useReducedMotionSafe()
  const finePointer = useMediaQuery('(pointer: fine)')
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, previewSpring)
  const springY = useSpring(y, previewSpring)
  const velocity = useVelocity(springX)
  const rotate = useTransform(velocity, previewRotation.input, previewRotation.output, {
    clamp: true,
  })

  useEffect(() => {
    const el = containerRef.current
    if (!el || !finePointer) return
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      x.set(e.clientX - rect.left)
      y.set(e.clientY - rect.top)
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [containerRef, finePointer, x, y])

  const visible = activeKey !== null && finePointer && !reduced

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          aria-hidden="true"
          className={className ?? 'pointer-events-none absolute left-0 top-0 z-20'}
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: previewScale.hidden }}
          animate={{ opacity: 1, scale: previewScale.visible }}
          exit={{ opacity: 0, scale: previewScale.hidden }}
          transition={{ duration: duration.preview, ease: easeReveal }}
        >
          <motion.div
            style={{ rotate }}
            className="relative size-56 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-card bg-white shadow-soft"
          >
            {items.map((item) => (
              <motion.div
                key={item.key}
                className="absolute inset-0 flex items-center justify-center p-4 [&_picture]:contents"
                initial={false}
                animate={{
                  opacity: activeKey === item.key ? 1 : 0,
                  scale: activeKey === item.key ? 1 : 1.15,
                }}
                transition={{ duration: duration.crossfade, ease: easeReveal }}
              >
                <Picture {...item} className="h-full w-full object-contain" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
