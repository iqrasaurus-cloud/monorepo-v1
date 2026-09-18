import type { Photo } from '@iqra/config'
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
  return (
    <Container className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <Reveal>
          <SectionHeading eyebrow="Why" title="Why we created it" className="mb-8" />
        </Reveal>
        <div className="space-y-5 text-lg text-ink/80">
          {body.map((paragraph, i) => (
            <Reveal key={i} delay={0.06 * i}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
      {photo ? (
        <Reveal slow className="flex justify-center">
          <div className="size-64 overflow-hidden rounded-full shadow-soft ring-8 ring-sun md:size-80 [&_picture]:contents">
            <Picture {...withFallback(photo)} className="h-full w-full object-cover" />
          </div>
        </Reveal>
      ) : null}
    </Container>
  )
}
