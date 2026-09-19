import { brandCopy, type SpokeContent } from '@iqra/config'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'
import { cn } from '../../utils/cn.ts'
import { withFallback } from './helpers.ts'

const columns = [
  {
    key: 'worked',
    title: 'What worked',
    badge: 'bg-sun text-plum',
    icon: 'M5 12l5 5 9-10',
  },
  {
    key: 'didnt',
    title: "What didn't",
    badge: 'bg-paper-2 text-ink',
    icon: 'M6 6l12 12M18 6L6 18',
  },
  {
    key: 'changed',
    title: 'What we changed',
    badge: 'bg-primary text-white',
    icon: 'M4 12h14m0 0l-5-5m5 5l-5 5',
  },
] as const

export function WhatWeLearned({ learned }: { learned: SpokeContent['whatWeLearned'] }) {
  return (
    <Container>
      <Reveal>
        <SectionHeading
          eyebrow="Honest notes"
          title="What we learned"
          lede={brandCopy.toolkitPrinciple}
          className="mb-12"
        />
      </Reveal>
      <RevealList className="grid gap-6 md:grid-cols-3">
        {columns.map((column) => {
          const image = learned.images?.[column.key]
          return (
            <RevealItem key={column.key} className="flex">
              <div className="w-full overflow-hidden rounded-card bg-white shadow-soft">
                {image ? (
                  <div className="[&_picture]:contents">
                    <Picture {...withFallback(image)} className="h-32 w-full object-cover" />
                  </div>
                ) : null}
                <div className="p-7">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mb-5 flex size-12 items-center justify-center rounded-full',
                      column.badge,
                    )}
                  >
                    <svg viewBox="0 0 24 24" className="size-6">
                      <path d={column.icon} fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
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
                </div>
              </div>
            </RevealItem>
          )
        })}
      </RevealList>
    </Container>
  )
}
