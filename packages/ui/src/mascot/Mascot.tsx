import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../utils/cn.ts'
import { POSES, POSE_URLS, type PoseName } from './mascot-data.ts'
import { useMotionSlot } from './motion-slot.ts'

export { POSE_NAMES, type PoseName } from './mascot-data.ts'

/** Motions from the tools' MOTION.md. Loops: bob, sway, heartbeat, breathe. The rest play once. */
export type MascotMotion =
  'bob' | 'pop' | 'hop' | 'tilt' | 'nod' | 'sway' | 'heartbeat' | 'wiggle' | 'breathe'
/** Little things drawn in code around the dino. */
export type MascotOverlay = 'twinkle' | 'hearts' | 'bubbles'

const LOOPS = new Set<MascotMotion>(['bob', 'sway', 'heartbeat', 'breathe'])
const CALM_LOOPS = new Set<MascotMotion>(['bob', 'breathe'])
/** A sitting dino's height in the md images, so `size` means the same dino size for every pose. */
const DINO_MD = 330
const CALM_AFTER_MS = 6000

const SPOTS = {
  twinkle: [
    [8, 14, 0],
    [82, 10, 0.5],
    [88, 52, 1],
    [6, 58, 1.3],
    [74, 30, 0.8],
  ],
  hearts: [
    [18, 70, 0],
    [76, 64, 0.7],
    [56, 74, 1.4],
    [30, 60, 1.9],
  ],
  bubbles: [
    [18, 70, 0],
    [76, 64, 0.7],
    [56, 74, 1.4],
    [30, 60, 1.9],
  ],
} as const

export interface MascotProps {
  /** A pose from the dino library, e.g. "thinking-lightbulb". */
  pose: PoseName
  /** How tall a sitting dino is, in CSS px. Poses with props get a box to match. Default 160. */
  size?: number
  /** How it moves while it holds the one moving slot on screen. Default: still. */
  motion?: MascotMotion | 'none'
  /** Sparkles, hearts or bubbles around it while it moves. */
  overlay?: MascotOverlay
  /** Pops in once when it first scrolls into view. Doesn't count as the screen's moving dino. */
  enter?: boolean
  /** Describe the dino only when it adds meaning; it is decorative by default. */
  alt?: string
  /** Fill the width of its container instead of a fixed size; `size` then sets the image detail. */
  fluid?: boolean
  /** Load at once (the main dino above the fold). */
  priority?: boolean
  className?: string
}

/** Size of the box a pose takes at a given dino size, in CSS px. */
export function mascotBox(pose: PoseName, size = 160) {
  const [, wMd, , hMd] = POSES[pose]
  return { width: Math.round((wMd * size) / DINO_MD), height: Math.round((hMd * size) / DINO_MD) }
}

/**
 * An IqraSaurus dino from the pose library, by name. The images are the owner's artwork,
 * only cut and resized. Only one Mascot moves on a screen at a time; with reduce motion every
 * Mascot is still. On Night screens it sits on a soft glow.
 */
export function Mascot(props: MascotProps) {
  // A new pose or motion starts the motion again from the beginning.
  return <MascotInner key={`${props.pose}|${props.motion ?? 'none'}`} {...props} />
}

function MascotInner({
  pose,
  size = 160,
  motion = 'none',
  overlay,
  enter = false,
  alt = '',
  fluid = false,
  priority = false,
  className,
}: MascotProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [settled, setSettled] = useState(false)
  const wanted = motion !== 'none'
  const moving = useMotionSlot(ref, wanted)
  const seen = useInView(ref, { once: true, margin: '-40px' })
  const isLoop = wanted && LOOPS.has(motion)

  // Busy loops calm down to a bob after a few seconds on screen.
  useEffect(() => {
    if (!moving || !isLoop || CALM_LOOPS.has(motion as MascotMotion) || settled) return
    const t = setTimeout(() => setSettled(true), CALM_AFTER_MS)
    return () => clearTimeout(t)
  }, [moving, isLoop, motion, settled])

  const current = !moving ? undefined : settled ? (isLoop ? 'bob' : undefined) : motion
  const showFx = moving && !settled && overlay

  const { width, height } = mascotBox(pose, size)
  const [wSm, wMd, wLg] = POSES[pose]
  const [sm, md, lg] = POSE_URLS[pose]

  return (
    <span
      ref={ref}
      className={cn('iq-mascot', className)}
      style={fluid ? { width: '100%', aspectRatio: `${width} / ${height}` } : { width, height }}
      data-pose={pose}
      data-enter={enter ? (seen ? 'in' : 'wait') : undefined}
    >
      {/* data-reveal lets the <noscript> rule in each app's root show it without JavaScript. */}
      <span className="iq-mascot-enter" data-reveal={enter ? '' : undefined}>
        <span
          className="iq-mascot-body"
          data-motion={current}
          onAnimationEnd={(e) => {
            // A one-time motion has finished (for "hop", the hop after the pop-in).
            if (!isLoop && (motion !== 'hop' || e.animationName.endsWith('hop'))) setSettled(true)
          }}
        >
          <img
            src={md}
            srcSet={`${sm} ${wSm}w, ${md} ${wMd}w, ${lg} ${wLg}w`}
            sizes={fluid ? `(min-width: 768px) ${width}px, 70vw` : `${width}px`}
            width={width}
            height={height}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            decoding="async"
            draggable={false}
          />
        </span>
      </span>
      {showFx ? (
        <span className={`iq-fx iq-fx-${overlay}`} aria-hidden="true">
          {SPOTS[overlay].map(([x, y, d], i) => (
            <span key={i} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }}>
              {overlay === 'twinkle' ? '✦' : overlay === 'hearts' ? '♥' : ''}
            </span>
          ))}
        </span>
      ) : null}
    </span>
  )
}
