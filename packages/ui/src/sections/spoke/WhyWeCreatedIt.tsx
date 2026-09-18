import type { Photo } from '@iqra/config'
import { mascotImage } from '../../layout/brand.ts'
import { Reveal } from '../../motion/Reveal.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'
import { withFallback } from './helpers.ts'

interface WhyWeCreatedItProps {
  body: string[]
  photo?: Photo
}

export function WhyWeCreatedIt({ body, photo }: WhyWeCreatedItProps) {
  const [lede, ...rest] = body
  const image = photo ? withFallback(photo) : mascotImage('mascot-quran.png', 640)
  return (
    <Container className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <Reveal>
          <SectionHeading eyebrow="Why" title="Why we created it" className="mb-8" />
        </Reveal>
        {lede ? (
          <Reveal>
            <p className="mb-6 font-heading text-xl font-semibold leading-snug text-ink md:text-2xl">
              {lede}
            </p>
          </Reveal>
        ) : null}
        <div className="space-y-5 text-lg text-ink/80">
          {rest.map((paragraph, i) => (
            <Reveal key={i} delay={0.06 * (i + 1)}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal slow className="flex justify-center">
        <div className="flex size-64 items-center justify-center overflow-hidden rounded-full bg-white shadow-soft ring-8 ring-sun md:size-80 [&_picture]:contents">
          <Picture
            {...image}
            className={photo ? 'h-full w-full object-cover' : 'size-[80%] object-contain'}
          />
        </div>
      </Reveal>
    </Container>
  )
}
