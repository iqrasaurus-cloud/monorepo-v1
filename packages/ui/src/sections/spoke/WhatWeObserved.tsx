import { brandCopy, type SpokeContent } from '@iqra/config'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'
import { withFallback } from './helpers.ts'

export function WhatWeObserved({ items }: { items: SpokeContent['whatWeObserved']['items'] }) {
  return (
    <Container>
      <Reveal>
        <SectionHeading
          eyebrow="We tried this"
          title="What we observed"
          lede={brandCopy.weTriedThis}
          className="mb-12"
        />
      </Reveal>
      <RevealList as="ul" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <RevealItem key={i} as="li" className="flex">
            <figure className="flex w-full flex-col overflow-hidden rounded-card bg-white shadow-soft">
              {item.image ? (
                <div className="[&_picture]:contents">
                  <Picture {...withFallback(item.image)} className="h-40 w-full object-cover" />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-7">
                <span
                  aria-hidden="true"
                  className="mb-3 font-heading text-6xl leading-none text-sun"
                >
                  &ldquo;
                </span>
                <blockquote className="flex-1 text-lg text-ink">{item.text}</blockquote>
                {item.attribution ? (
                  <figcaption className="label mt-5 text-ink/60">{item.attribution}</figcaption>
                ) : null}
              </div>
            </figure>
          </RevealItem>
        ))}
      </RevealList>
    </Container>
  )
}
