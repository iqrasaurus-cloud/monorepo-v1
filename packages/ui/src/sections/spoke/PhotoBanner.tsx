import type { Photo } from '@iqra/config'
import { Reveal } from '../../motion/Reveal.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { withFallback } from './helpers.ts'

/** Modest banner image above a section's cards — a slot for a real photo later. */
export function PhotoBanner({ photo }: { photo: Photo }) {
  return (
    <Reveal className="mb-10">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-card shadow-soft [&_picture]:contents">
        <Picture {...withFallback(photo)} className="h-48 w-full object-cover md:h-64" />
      </div>
    </Reveal>
  )
}
