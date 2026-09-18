import { useId } from 'react'
import { cn } from '../utils/cn.ts'

interface ScallopProps {
  /** Height of one scallop in px. */
  size?: number
  /** Point the scallops upward instead of downward. */
  flip?: boolean
  /** Colour with a text-* class matching the section the scallops belong to, e.g. text-paper-2. */
  className?: string
}

/** Scalloped divider drawn in currentColor. Sits at the boundary between two section colours. */
export function Scallop({ size = 24, flip = false, className }: ScallopProps) {
  const id = useId()
  return (
    <svg
      aria-hidden="true"
      className={cn('block w-full fill-current', flip && 'rotate-180', className)}
      height={size}
      width="100%"
    >
      <defs>
        <pattern id={id} patternUnits="userSpaceOnUse" width={size * 2} height={size}>
          <circle cx={size} cy={0} r={size} />
        </pattern>
      </defs>
      <rect width="100%" height={size} fill={`url(#${id})`} />
    </svg>
  )
}
