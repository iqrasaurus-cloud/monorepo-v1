import type { ReactNode } from 'react'
import { cn } from '../utils/cn.ts'
import { Scallop } from './Scallop.tsx'

export type Bg = 'paper' | 'surface' | 'paper-2' | 'plum'

/** Section backgrounds. A Scallop in the previous section's colour marks each change. */
export const bgClass: Record<Bg, string> = {
  paper: 'bg-paper',
  surface: 'bg-surface',
  'paper-2': 'bg-paper-2',
  plum: 'bg-plum',
}

interface SectionProps {
  id?: string
  bg: Bg
  /** The background above this section. A scallop in that colour marks the change. */
  prev?: Bg
  /** Less padding, for short bands. */
  tight?: boolean
  className?: string
  children: ReactNode
}

/** One band of a page: background, the scallop from the band above, and even padding. */
export function Section({ id, bg, prev, tight = false, className, children }: SectionProps) {
  return (
    <div id={id} className={cn(bgClass[bg], 'relative')}>
      {prev && prev !== bg ? <Scallop className={bgClass[prev]} /> : null}
      <section className={cn(tight ? 'py-14 md:py-20' : 'section', className)}>{children}</section>
    </div>
  )
}
