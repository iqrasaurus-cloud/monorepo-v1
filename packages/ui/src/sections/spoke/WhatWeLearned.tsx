import type { SpokeContent } from '@iqra/config'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { Container } from '../../primitives/Container.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'

const columns = [
  { key: 'worked', title: 'What worked' },
  { key: 'didnt', title: "What didn't" },
  { key: 'changed', title: 'What we changed' },
] as const

export function WhatWeLearned({ learned }: { learned: SpokeContent['whatWeLearned'] }) {
  return (
    <Container>
      <Reveal>
        <SectionHeading eyebrow="Honest notes" title="What we learned" className="mb-12" />
      </Reveal>
      <RevealList className="grid gap-10 md:grid-cols-3">
        {columns.map((column) => (
          <RevealItem key={column.key}>
            <h3 className="mb-4 font-heading text-2xl font-semibold text-primary">
              {column.title}
            </h3>
            <ul className="space-y-3">
              {learned[column.key].map((item, i) => (
                <li key={i} className="flex gap-3 text-ink/80">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-2 shrink-0 rounded-full bg-sun ring-2 ring-plum/20"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealList>
    </Container>
  )
}
