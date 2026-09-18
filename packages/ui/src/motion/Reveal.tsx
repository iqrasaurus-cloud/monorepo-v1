import { motion, type Transition, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { duration, easeReveal, stagger, viewportOnce } from './presets.ts'
import { useReducedMotionSafe } from './useReducedMotionSafe.ts'

const rise: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }
const fade: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1 } }

const transitionFor = (reduced: boolean, slow: boolean, delay: number): Transition =>
  reduced
    ? { duration: duration.fade }
    : { duration: slow ? duration.revealSlow : duration.reveal, ease: easeReveal, delay }

interface RevealProps {
  id?: string
  className?: string
  delay?: number
  slow?: boolean
  children: ReactNode
}

/** Default in-view entrance: rises 40px and fades in once. */
export function Reveal({ id, className, delay = 0, slow = false, children }: RevealProps) {
  const reduced = useReducedMotionSafe()
  return (
    <motion.div
      id={id}
      data-reveal=""
      className={className}
      variants={reduced ? fade : rise}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={transitionFor(reduced, slow, delay)}
    >
      {children}
    </motion.div>
  )
}

interface RevealListProps {
  as?: 'div' | 'ul' | 'ol'
  className?: string
  children: ReactNode
}

/** Parent for RevealItem children; staggers them 0.06s apart. */
export function RevealList({ as = 'div', className, children }: RevealListProps) {
  const reduced = useReducedMotionSafe()
  const Tag = as === 'ul' ? motion.ul : as === 'ol' ? motion.ol : motion.div
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{ visible: { transition: { staggerChildren: reduced ? 0 : stagger.list } } }}
    >
      {children}
    </Tag>
  )
}

interface RevealItemProps {
  as?: 'div' | 'li'
  className?: string
  slow?: boolean
  children: ReactNode
}

export function RevealItem({ as = 'div', className, slow = false, children }: RevealItemProps) {
  const reduced = useReducedMotionSafe()
  const Tag = as === 'li' ? motion.li : motion.div
  return (
    <Tag
      data-reveal=""
      className={className}
      variants={reduced ? fade : rise}
      transition={transitionFor(reduced, slow, 0)}
    >
      {children}
    </Tag>
  )
}
