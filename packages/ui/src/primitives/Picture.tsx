import { useState, type ImgHTMLAttributes } from 'react'
import { cn } from '../utils/cn.ts'

interface PictureProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'width' | 'height' | 'loading'
> {
  src: string
  alt: string
  width: number
  height: number
  /** PNG/JPG written next to the WebP by `pnpm assets`. Falls back to `src` when omitted. */
  fallback?: string
  /** Only for the hero image: eager, high priority, not lazy. */
  priority?: boolean
}

/** Shown in place of a picture whose file is not there yet, so nothing looks broken. */
function Placeholder({ alt, className }: { alt: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={alt ? `Photo to come: ${alt}` : 'Photo to come'}
      className={cn(
        'flex flex-col items-center justify-center gap-3 border-2 border-dashed border-taupe/60 bg-paper-2 p-6 text-center',
        className,
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-8 text-taupe">
        <path
          d="M4 8h3l2-2h6l2 2h3v11H4z M12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      {alt ? <span className="label max-w-[26ch] text-ink/60">{alt}</span> : null}
    </div>
  )
}

export function Picture({
  src,
  alt,
  width,
  height,
  fallback,
  priority = false,
  className,
  ...rest
}: PictureProps) {
  const [missing, setMissing] = useState(false)
  const isWebp = src.endsWith('.webp')

  if (missing) return <Placeholder alt={alt} className={className} />

  return (
    <picture>
      {isWebp ? <source type="image/webp" srcSet={src} /> : null}
      <img
        src={fallback ?? src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        onError={() => setMissing(true)}
        className={className}
        {...rest}
      />
    </picture>
  )
}
