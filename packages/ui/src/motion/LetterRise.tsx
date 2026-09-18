import { motion } from 'framer-motion'
import { Fragment } from 'react'
import { cn } from '../utils/cn.ts'
import { duration, easeReveal, stagger } from './presets.ts'
import { useReducedMotionSafe } from './useReducedMotionSafe.ts'

interface LetterRiseProps {
  /** Headline text. Use "\n" to break lines. */
  text: string
  as?: 'h1' | 'h2' | 'p'
  className?: string
  /** Class for a given line, e.g. line 0 text-ink, line 1 text-accent. */
  lineClassName?: (lineIndex: number) => string | undefined
  delay?: number
}

/** Hero headline: each letter rises out of its line. Long headlines animate per word. */
export function LetterRise({
  text,
  as: Tag = 'h1',
  className,
  lineClassName,
  delay = stagger.letterStart,
}: LetterRiseProps) {
  const reduced = useReducedMotionSafe()
  const lines = text.split('\n')
  const perWord = lines.some((line) => line.length > stagger.letterWordThreshold)
  const units = lines.map((line) => (perWord ? line.split(' ') : Array.from(line)))
  const total = units.reduce((n, u) => n + u.length, 0)
  const step = total > 1 ? Math.min(stagger.letter, stagger.letterCap / (total - 1)) : 0
  // Index of each line's first unit in the whole headline, so the stagger runs across lines.
  const lineStart = units.map((_, li) => units.slice(0, li).reduce((n, u) => n + u.length, 0))

  return (
    <Tag className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      {units.map((lineUnits, li) => (
        <span
          key={li}
          aria-hidden="true"
          className={cn('block overflow-hidden', lineClassName?.(li))}
        >
          {lineUnits.map((unit, ui) => {
            const i = (lineStart[li] ?? 0) + ui
            return (
              <Fragment key={ui}>
                <motion.span
                  data-reveal=""
                  className="inline-block"
                  initial={reduced ? { opacity: 0 } : { y: '110%', rotate: 4 }}
                  animate={reduced ? { opacity: 1 } : { y: '0%', rotate: 0 }}
                  transition={
                    reduced
                      ? { duration: duration.fade }
                      : { duration: duration.letter, ease: easeReveal, delay: delay + i * step }
                  }
                >
                  {unit === ' ' ? ' ' : unit}
                </motion.span>
                {perWord && ui < lineUnits.length - 1 ? ' ' : null}
              </Fragment>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
