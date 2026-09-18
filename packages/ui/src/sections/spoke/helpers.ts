import type { Photo } from '@iqra/config'

export const isBlank = (value: string | undefined): boolean => !value || value.trim() === ''

export const nonBlank = (values: string[] | undefined): string[] =>
  (values ?? []).filter((v) => !isBlank(v))

/** `pnpm assets` writes a JPG beside every photo WebP. */
export const withFallback = (photo: Photo): Photo & { fallback: string } => ({
  ...photo,
  fallback: photo.src.replace(/\.webp$/i, '.jpg'),
})

export type Bg = 'paper' | 'white' | 'paper-2' | 'plum'

export const bgClass: Record<Bg, string> = {
  paper: 'bg-paper',
  white: 'bg-white',
  'paper-2': 'bg-paper-2',
  plum: 'bg-plum',
}

export const scallopClass: Record<Bg, string> = {
  paper: 'text-paper',
  white: 'text-white',
  'paper-2': 'text-paper-2',
  plum: 'text-plum',
}
