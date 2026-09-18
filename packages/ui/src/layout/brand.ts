/**
 * Shared brand images. Files live in apps/<slug>/public/brand/ and are written by
 * `pnpm assets` as <base>-<width>.webp plus a <base>-<width>.png fallback.
 * Logos and mascots are referenced by filename only, so swapping the art needs no code change.
 */

export interface BrandImage {
  src: string
  fallback: string
  width: number
  height: number
  alt: string
}

// Master file sizes, used to keep the aspect ratio exact.
const masters = {
  'logo-horizontal': { w: 1277, h: 391, width: 640, alt: 'IqraSaurus' },
  'logo-square': { w: 1122, h: 1660, width: 320, alt: 'IqraSaurus' },
  icon: { file: 'icon-512', w: 512, h: 512, width: 160, alt: 'IqraSaurus' },
} as const

const image = (base: string, w: number, h: number, width: number, alt: string): BrandImage => ({
  src: `/brand/${base}-${width}.webp`,
  fallback: `/brand/${base}-${width}.png`,
  width,
  height: Math.round((width * h) / w),
  alt,
})

export const brandImage = (name: keyof typeof masters): BrandImage => {
  const m = masters[name]
  const base = 'file' in m ? m.file : name
  return image(base, m.w, m.h, m.width, m.alt)
}

/** Mascot from `SiteConfig.mascot` (e.g. "mascot-magnifier.png"). Decorative: the site name sits beside it. */
export const mascotImage = (file: string, width = 320): BrandImage =>
  image(file.replace(/\.[a-z]+$/i, ''), 1024, 1024, width, '')
