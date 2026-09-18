import type { SpokeContent } from '@iqra/config'
import { Reveal } from '../../motion/Reveal.tsx'
import { Button } from '../../primitives/Button.tsx'
import { Container } from '../../primitives/Container.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'

export function WorkWithUs({ workWithUs }: { workWithUs: SpokeContent['workWithUs'] }) {
  return (
    <Container className="max-w-3xl">
      <Reveal>
        <SectionHeading eyebrow="Work with us" title="Work with us" className="mb-8" />
      </Reveal>
      <div className="space-y-5 text-lg text-ink/80">
        {workWithUs.body.map((paragraph, i) => (
          <Reveal key={i} delay={0.06 * i}>
            <p>{paragraph}</p>
          </Reveal>
        ))}
      </div>
      {workWithUs.contactHref ? (
        <Reveal className="mt-8">
          <Button href={workWithUs.contactHref}>{workWithUs.contactLabel}</Button>
        </Reveal>
      ) : null}
    </Container>
  )
}
