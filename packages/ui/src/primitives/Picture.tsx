import type { ImgHTMLAttributes } from 'react'

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

export function Picture({
  src,
  alt,
  width,
  height,
  fallback,
  priority = false,
  ...rest
}: PictureProps) {
  const isWebp = src.endsWith('.webp')
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
        {...rest}
      />
    </picture>
  )
}
