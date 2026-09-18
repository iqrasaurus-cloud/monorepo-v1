import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Fragment, useRef } from 'react'
import { wordReveal } from './presets.ts'
import { useReducedMotionSafe } from './useReducedMotionSafe.ts'

interface WordProps {
  progress: MotionValue<number>
  range: [number, number]
  reduced: boolean
  children: string
}

function Word({ progress, range, reduced, children }: WordProps) {
  const opacity = useTransform(progress, range, [wordReveal.from, 1])
  return (
    <motion.span data-reveal="" style={{ opacity: reduced ? 1 : opacity }}>
      {children}
    </motion.span>
  )
}

interface WordRevealProps {
  text: string
  className?: string
}

/** Paragraph whose words brighten one by one as it scrolls through the viewport. */
export function WordReveal({ text, className }: WordRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: [...wordReveal.offset] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <Word
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            reduced={reduced}
          >
            {word}
          </Word>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </p>
  )
}
