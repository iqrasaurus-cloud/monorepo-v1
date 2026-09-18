import type { ReactNode } from 'react'
import { cn } from '../utils/cn.ts'

interface RibbonProps {
  className?: string
  children: ReactNode
}

/** Sun ribbon with notched ends and plum text (the 4-I step labels). */
export function Ribbon({ className, children }: RibbonProps) {
  return (
    <span
      className={cn(
        'ribbon inline-block bg-sun px-6 py-1.5 font-heading text-sm font-semibold uppercase tracking-wide text-plum',
        className,
      )}
    >
      {children}
    </span>
  )
}
