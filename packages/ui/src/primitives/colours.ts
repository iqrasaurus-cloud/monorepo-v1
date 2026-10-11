import type { Colour } from '@iqra/config'
import { POSE_NAMES, type PoseName } from '../mascot/mascot-data.ts'

/** Tailwind classes for each family colour, written out in full so Tailwind keeps them. */
export const colourClass: Record<
  Colour,
  {
    bg: string
    on: string
    soft: string
    ring: string
    text: string
    border: string
    hoverBorder: string
  }
> = {
  inspire: {
    bg: 'bg-inspire',
    on: 'text-on-inspire',
    soft: 'bg-inspire/25',
    ring: 'ring-inspire',
    text: 'text-inspire-ink',
    border: 'border-inspire',
    hoverBorder: 'hover:border-inspire',
  },
  investigate: {
    bg: 'bg-investigate',
    on: 'text-on-investigate',
    soft: 'bg-investigate/15',
    ring: 'ring-investigate',
    text: 'text-investigate',
    border: 'border-investigate',
    hoverBorder: 'hover:border-investigate',
  },
  integrate: {
    bg: 'bg-integrate',
    on: 'text-on-integrate',
    soft: 'bg-integrate/15',
    ring: 'ring-integrate',
    text: 'text-integrate',
    border: 'border-integrate',
    hoverBorder: 'hover:border-integrate',
  },
  impart: {
    bg: 'bg-impart',
    on: 'text-on-impart',
    soft: 'bg-impart/15',
    ring: 'ring-impart',
    text: 'text-impart',
    border: 'border-impart',
    hoverBorder: 'hover:border-impart',
  },
}

/** The four colours in 4-I order, for things that cycle through them. */
export const COLOURS: Colour[] = ['inspire', 'investigate', 'integrate', 'impart']

/** A registry pose name as a library pose. Unknown names fall back to the waving dino. */
export const asPose = (name: string): PoseName =>
  (POSE_NAMES as readonly string[]).includes(name) ? (name as PoseName) : 'waving-wink'
