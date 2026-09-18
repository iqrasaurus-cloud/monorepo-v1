import type { ReactNode } from 'react'
import { cn } from '../utils/cn.ts'

interface ContainerProps {
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav'
  id?: string
  className?: string
  'aria-label'?: string
  children: ReactNode
}

export function Container({
  as: Tag = 'div',
  id,
  className,
  'aria-label': ariaLabel,
  children,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={cn('mx-auto w-full max-w-content px-5 md:px-8', className)}
    >
      {children}
    </Tag>
  )
}
