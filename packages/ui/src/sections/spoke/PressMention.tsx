import type { Photo } from '@iqra/config'
import { Reveal } from '../../motion/Reveal.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Eyebrow } from '../../primitives/Eyebrow.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { withFallback } from './helpers.ts'

interface PressMentionProps {
  image: Photo
  caption: string
}

/** Small trust strip: a real press clipping, shown before the Support Us ask. */
export function PressMention({ image, caption }: PressMentionProps) {
  const photo = withFallback(image)
  return (
    <Container className="max-w-3xl">
      <Reveal className="flex flex-col items-center gap-6 rounded-card bg-white p-6 text-center shadow-soft md:flex-row md:text-left">
        <div className="w-full max-w-xs shrink-0 overflow-hidden rounded-card ring-1 ring-taupe/30 [&_picture]:contents">
          <Picture {...photo} className="h-full w-full object-cover" />
        </div>
        <div>
          <Eyebrow className="mb-2">As featured in</Eyebrow>
          <p className="text-ink/80">{caption}</p>
        </div>
      </Reveal>
    </Container>
  )
}
