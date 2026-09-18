import type { ReactNode } from 'react'
import { cn } from '../utils/cn.ts'
import { Picture } from './Picture.tsx'
import { Ribbon } from './Ribbon.tsx'

interface CircleImage {
  src: string
  alt: string
  width: number
  height: number
  fallback?: string
}

interface CircleCardProps {
  as?: 'div' | 'li'
  /** Big number shown inside the circle (the 4-I steps). Ignored when `image` is given. */
  step?: number | string
  /** Mascot or photo shown inside the circle (the hub Toolkit grid). */
  image?: CircleImage
  label: string
  className?: string
  children?: ReactNode
}

/** Circle with a sun ring, a ribbon label beneath it, and short text. */
export function CircleCard({
  as: Tag = 'div',
  step,
  image,
  label,
  className,
  children,
}: CircleCardProps) {
  return (
    <Tag className={cn('flex flex-col items-center text-center', className)}>
      <div className="flex size-40 items-center justify-center overflow-hidden rounded-full bg-white shadow-soft ring-8 ring-sun">
        {image ? (
          <Picture {...image} className="size-28 object-contain" />
        ) : (
          <span className="font-heading text-6xl font-bold text-primary">{step}</span>
        )}
      </div>
      <Ribbon className="-mt-4">{label}</Ribbon>
      {children ? <div className="mt-5 max-w-xs text-ink/80">{children}</div> : null}
    </Tag>
  )
}
