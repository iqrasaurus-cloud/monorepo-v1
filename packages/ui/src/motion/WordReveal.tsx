import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Fragment, useRef } from 'react'
import { cn } from '../utils/cn.ts'
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

/**
 * Text whose words brighten one by one as it scrolls through the viewport.
 * Split into sentences and given breathing room between them so a long
 * paragraph reads as distinct ideas rather than one dense block; the
 * word-by-word reveal still runs continuously across the whole text.
 */
export function WordReveal({ text, className }: WordRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: [...wordReveal.offset] })
  const words = text.split(' ')
  const sentences = text.match(/\S.*?(?:[.!?](?=\s|$)|$)/g) ?? [text]

  // Precompute each sentence's word range before rendering, so nothing is
  // mutated inside the JSX map below.
  const groups = sentences.reduce<{ words: string[]; startIndex: number }[]>((acc, sentence) => {
    const previous = acc[acc.length - 1]
    const startIndex = previous ? previous.startIndex + previous.words.length : 0
    return [...acc, { words: sentence.trim().split(' '), startIndex }]
  }, [])

  return (
    <div ref={ref} className={cn('space-y-4', className)}>
      {groups.map((group, si) => (
        <p key={si}>
          {group.words.map((word, i) => (
            <Fragment key={i}>
              <Word
                progress={scrollYProgress}
                range={[
                  (group.startIndex + i) / words.length,
                  (group.startIndex + i + 1) / words.length,
                ]}
                reduced={reduced}
              >
                {word}
              </Word>
              {i < group.words.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  )
}
