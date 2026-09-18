import type { ReactNode } from 'react'
import { cn } from '../utils/cn.ts'
import { Eyebrow } from './Eyebrow.tsx'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  level?: 'h1' | 'h2' | 'h3'
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  level: Heading = 'h2',
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <Heading className="text-3xl font-bold leading-tight md:text-5xl">{title}</Heading>
      {lede ? <p className="mt-5 text-lg text-ink/80">{lede}</p> : null}
    </div>
  )
}
