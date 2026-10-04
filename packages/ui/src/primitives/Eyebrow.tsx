import type { ReactNode } from 'react'
import { cn } from '../utils/cn.ts'

interface EyebrowProps {
  as?: 'p' | 'span' | 'div'
  className?: string
  children: ReactNode
}

/** Small bracketed section label: ( Label ). The brackets are decorative only. */
export function Eyebrow({ as: Tag = 'p', className, children }: EyebrowProps) {
  return (
    <Tag className={cn('label text-primary', className)}>
      {/* Non-breaking spaces keep a bracket from wrapping onto a line of its own. */}
      <span aria-hidden="true">(&nbsp;</span>
      {children}
      <span aria-hidden="true">&nbsp;)</span>
    </Tag>
  )
}
