import type { CSSProperties } from 'react'
import { cn } from '../utils/cn.ts'

interface ScallopProps {
  /** Height of one scallop in px. */
  size?: number
  /** Point the scallops upward instead of downward. */
  flip?: boolean
  /** Colour with a bg-* class matching the section the scallops belong to, e.g. bg-paper-2. */
  className?: string
}

/**
 * Scalloped divider at the boundary between two section colours. It is a mask over a
 * background colour (see .scallop in base.css), so it follows its section in Night and under
 * dark-mode browser extensions instead of staying light.
 */
export function Scallop({ size = 24, flip = false, className }: ScallopProps) {
  return (
    <div
      aria-hidden="true"
      style={{ '--s': `${size}px` } as CSSProperties}
      className={cn('scallop block w-full', flip && 'rotate-180', className)}
    />
  )
}
