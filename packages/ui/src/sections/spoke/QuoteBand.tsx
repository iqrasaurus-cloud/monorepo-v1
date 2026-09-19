import { brandCopy } from '@iqra/config'
import { mascotImage } from '../../layout/brand.ts'
import { Reveal } from '../../motion/Reveal.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Pattern } from '../../primitives/Pattern.tsx'
import { Picture } from '../../primitives/Picture.tsx'

/** Full-width plum band carrying the brand's central belief, with a mascot looking on. */
export function QuoteBand() {
  const mascot = mascotImage('mascot-binoculars.png', 640)
  return (
    <div className="relative">
      <Pattern className="text-white opacity-[0.06]" />
      <Container className="relative grid items-end gap-8 md:grid-cols-[1fr_auto]">
        <Reveal slow>
          <blockquote className="max-w-3xl">
            <p className="font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
              {brandCopy.belief.quote}
            </p>
            <p className="mt-6 font-heading text-xl font-semibold text-sun md:text-2xl">
              {brandCopy.belief.follow}
            </p>
          </blockquote>
        </Reveal>
        <Reveal className="-mb-20 hidden md:block md:-mb-32">
          <Picture {...mascot} className="w-64 object-contain" />
        </Reveal>
      </Container>
    </div>
  )
}
