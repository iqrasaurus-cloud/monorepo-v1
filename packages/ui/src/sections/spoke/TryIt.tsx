import type { SpokeContent } from '@iqra/config'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { Button } from '../../primitives/Button.tsx'
import { Container } from '../../primitives/Container.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'

export function TryIt({ tryIt }: { tryIt: SpokeContent['tryIt'] }) {
  const download = tryIt.download && tryIt.download.href ? tryIt.download : undefined
  return (
    <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
      <Reveal>
        <SectionHeading
          eyebrow="Try it yourself"
          title="Run your first session"
          lede={tryIt.intro}
        />
        {download ? (
          <Button href={download.href} className="mt-8" download>
            {download.label}
          </Button>
        ) : null}
      </Reveal>
      <RevealList as="ol" className="space-y-6">
        {tryIt.steps.map((step, i) => (
          <RevealItem key={i} as="li" className="flex gap-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sun font-heading text-lg font-bold text-plum">
              {i + 1}
            </span>
            <p className="pt-2 text-lg text-ink/80">{step}</p>
          </RevealItem>
        ))}
      </RevealList>
    </Container>
  )
}
