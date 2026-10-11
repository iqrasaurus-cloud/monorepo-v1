import { cn } from '../utils/cn.ts'

interface PatternProps {
  /** Colour and strength as a background class, e.g. "bg-plum/[0.05]" or "bg-on-plum/10". */
  className?: string
}

/** Faint repeating geometric tile. Fills its positioned parent. A mask, like Scallop. */
export function Pattern({ className }: PatternProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pattern-tile pointer-events-none absolute inset-0', className)}
    />
  )
}
