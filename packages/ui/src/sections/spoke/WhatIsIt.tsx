import { WordReveal } from '../../motion/WordReveal.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Eyebrow } from '../../primitives/Eyebrow.tsx'

export function WhatIsIt({ body }: { body: string }) {
  return (
    <Container>
      <Eyebrow className="mb-8">What is it?</Eyebrow>
      <WordReveal
        text={body}
        className="max-w-5xl font-heading text-2xl font-semibold leading-snug text-ink sm:text-3xl md:text-[2.75rem] md:leading-[1.25]"
      />
    </Container>
  )
}
