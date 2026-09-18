import { brandCopy, type Photo } from '@iqra/config'
import { Fragment } from 'react'
import { mascotImage } from '../../layout/brand.ts'
import { Parallax } from '../../motion/Parallax.tsx'
import { Reveal } from '../../motion/Reveal.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Pattern } from '../../primitives/Pattern.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'
import { withFallback } from './helpers.ts'

interface AdaptItProps {
  body: string[]
  image?: Photo
}

/** Shown above the text when the site has no hero image yet. */
function MascotBand() {
  const mascot = mascotImage('mascot-reader.png', 640)
  return (
    <div className="relative mb-20 overflow-hidden bg-primary py-10 md:mb-32">
      <Pattern className="text-white opacity-[0.08]" />
      <Container className="relative flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <ol
          aria-label="How educators can use the Toolkit"
          className="flex flex-wrap items-center gap-3"
        >
          {brandCopy.educators.map((step, i) => (
            <Fragment key={step}>
              <li className="rounded-pill bg-sun px-5 py-2 font-heading text-lg font-semibold text-plum">
                {step}
              </li>
              {i < brandCopy.educators.length - 1 ? (
                <li aria-hidden="true" className="text-white/70">
                  &rarr;
                </li>
              ) : null}
            </Fragment>
          ))}
        </ol>
        <Picture {...mascot} className="w-40 object-contain md:w-52" />
      </Container>
    </div>
  )
}

export function AdaptIt({ body, image }: AdaptItProps) {
  return (
    <div>
      {image ? <Parallax image={withFallback(image)} className="mb-20 md:mb-32" /> : <MascotBand />}
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
