import { useId } from 'react'
import { cn } from '../utils/cn.ts'

interface PatternProps {
  /** Colour and strength, e.g. "text-plum opacity-[0.04]" or "text-white opacity-10". */
  className?: string
}

/** Faint repeating geometric tile, drawn in currentColor. Fills its positioned parent. */
export function Pattern({ className }: PatternProps) {
  const id = useId()
  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    >
      <defs>
        <pattern id={id} width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M36 6 L66 36 L36 66 L6 36 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="36" cy="36" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
