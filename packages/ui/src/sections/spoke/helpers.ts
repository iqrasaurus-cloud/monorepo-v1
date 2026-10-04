import { isPlaceholder, type Photo } from '@iqra/config'

/** A different dino for each 4-I step, reusing the registry's placeholder-pose convention. */
export const STEP_MASCOTS = [
  'mascot-quran.png',
  'mascot-magnifier.png',
  'mascot-reader.png',
  'mascot-walking.png',
] as const

/** Keeps only lines the owner has actually written; placeholders never reach the page. */
export const real = (values: string[] | undefined): string[] =>
  (values ?? []).filter((v) => !isPlaceholder(v))

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
