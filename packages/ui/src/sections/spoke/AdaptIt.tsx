import type { Photo } from '@iqra/config'
import { Parallax } from '../../motion/Parallax.tsx'
import { Reveal } from '../../motion/Reveal.tsx'
import { Container } from '../../primitives/Container.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'
import { withFallback } from './helpers.ts'

interface AdaptItProps {
  body: string[]
  image?: Photo
}

export function AdaptIt({ body, image }: AdaptItProps) {
  return (
    <div>
      {image ? <Parallax image={withFallback(image)} className="mb-20 md:mb-32" /> : null}
      <Container className="max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow="Adapt it" title="Make it yours" className="mb-8" />
        </Reveal>
        <div className="space-y-5 text-lg text-ink/80">
          {body.map((paragraph, i) => (
            <Reveal key={i} delay={0.06 * i}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  )
}
