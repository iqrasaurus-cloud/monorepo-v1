import type { ReactNode } from 'react'
import { Mascot, type PoseName } from '../mascot/Mascot.tsx'
import { cn } from '../utils/cn.ts'
import { Eyebrow } from './Eyebrow.tsx'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  level?: 'h1' | 'h2' | 'h3'
  align?: 'left' | 'center'
  /** A small dino that pops up beside the heading, so every section opens the same way. */
  pose?: PoseName
  /** Light text, for headings on plum. */
  onDark?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  level: Heading = 'h2',
  align = 'left',
  pose,
  onDark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex max-w-3xl gap-4',
        align === 'center' ? 'mx-auto flex-col items-center text-center' : 'items-end',
        className,
      )}
    >
      {pose ? <Mascot pose={pose} size={align === 'center' ? 88 : 72} enter /> : null}
      <div className="min-w-0">
        {eyebrow ? <Eyebrow className={cn('mb-3', onDark && 'text-sun')}>{eyebrow}</Eyebrow> : null}
        <Heading
          className={cn(
            'text-balance text-3xl font-bold leading-tight md:text-5xl',
            onDark && 'text-on-plum',
          )}
        >
          {title}
        </Heading>
        {lede ? (
          <p className={cn('mt-4 text-lg', onDark ? 'text-on-plum/85' : 'text-ink/80')}>{lede}</p>
        ) : null}
      </div>
    </div>
  )
}
