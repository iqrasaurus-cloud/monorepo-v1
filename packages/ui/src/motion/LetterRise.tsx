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

/**
 * Hero headline: each letter rises out of its line. Long headlines animate per word.
 * Letters are grouped by word so a line can only ever wrap between words.
 */
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
  const words = lines.map((line) => line.split(' ').map((w) => (perWord ? [w] : Array.from(w))))
  const total = words.flat(2).length
  const step = total > 1 ? Math.min(stagger.letter, stagger.letterCap / (total - 1)) : 0

  // Index of the first unit of each word across the whole headline, so the stagger flows on.
  const lengths = words.flatMap((line) => line.map((units) => units.length))
  const prefix = lengths.map((_, i) => lengths.slice(0, i).reduce((a, b) => a + b, 0))
  const starts = words.map((line, li) => {
    const before = words.slice(0, li).reduce((n, l) => n + l.length, 0)
    return line.map((_, wi) => prefix[before + wi] ?? 0)
  })

  const transitionFor = (i: number) =>
    reduced
      ? { duration: duration.fade }
      : { duration: duration.letter, ease: easeReveal, delay: delay + i * step }

  return (
    <Tag className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      {words.map((line, li) => (
        <span
          key={li}
          aria-hidden="true"
          className={cn('block overflow-hidden', lineClassName?.(li))}
        >
          {line.map((units, wi) => (
            <Fragment key={wi}>
              <span className="inline-block whitespace-nowrap">
                {units.map((unit, ui) => (
                  <motion.span
                    key={ui}
                    data-reveal=""
                    className="inline-block"
                    initial={reduced ? { opacity: 0 } : { y: '110%', rotate: 4 }}
                    animate={reduced ? { opacity: 1 } : { y: '0%', rotate: 0 }}
                    transition={transitionFor((starts[li]?.[wi] ?? 0) + ui)}
                  >
                    {unit}
                  </motion.span>
                ))}
              </span>
              {wi < line.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  )
}
