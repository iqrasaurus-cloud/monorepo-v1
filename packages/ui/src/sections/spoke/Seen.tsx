import { isPlaceholder, type SiteConfig, type SpokeContent } from '@iqra/config'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { Button } from '../../primitives/Button.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'
import { real, withFallback } from './helpers.ts'

/** True when the owner has supplied at least one real quote, lesson or photo. */
export const hasSeen = (seen: SpokeContent['seen']): boolean =>
  seen.quotes.some((q) => !isPlaceholder(q.text)) ||
  real(seen.lessons).length > 0 ||
  seen.photos.length > 0

interface SeenProps {
  site: SiteConfig
  seen: SpokeContent['seen']
}

/** Section 4: real quotes, lessons and photos. Only rendered when hasSeen() is true. */
export function Seen({ site, seen }: SeenProps) {
  const quotes = seen.quotes.filter((q) => !isPlaceholder(q.text))
  const lessons = real(seen.lessons)
  const photos = seen.photos.map(withFallback)

  return (
    <Container>
      <Reveal>
        <SectionHeading title="What we've seen" className="mb-12" />
      </Reveal>

      {quotes.length > 0 ? (
        <RevealList as="ul" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote, i) => (
            <RevealItem key={i} as="li" className="flex">
              <figure className="flex w-full flex-col overflow-hidden rounded-card bg-white shadow-soft">
                {quote.image ? (
                  <div className="[&_picture]:contents">
                    <Picture {...withFallback(quote.image)} className="h-40 w-full object-cover" />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-7">
                  <span aria-hidden="true" className="mb-3 font-heading text-6xl leading-none text-sun">
                    &ldquo;
                  </span>
                  <blockquote className="flex-1 text-lg text-ink">{quote.text}</blockquote>
                  {quote.attribution ? (
                    <figcaption className="label mt-5 text-ink/80">{quote.attribution}</figcaption>
                  ) : null}
                </div>
              </figure>
            </RevealItem>
          ))}
        </RevealList>
      ) : null}

      {lessons.length > 0 ? (
        <Reveal className="mt-10 rounded-card bg-white p-7 shadow-soft">
          <h3 className="mb-4 font-heading text-2xl font-semibold text-primary">What we learned</h3>
          <ul className="space-y-3">
            {lessons.map((lesson, i) => (
              <li key={i} className="flex gap-3 text-ink/80">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-2 shrink-0 rounded-full bg-sun ring-2 ring-plum/20"
                />
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}

      {photos.length > 0 ? (
        <RevealList as="ul" className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {photos.map((photo, i) => (
            <RevealItem
              key={`${photo.src}-${i}`}
              as="li"
              className="aspect-[4/3] overflow-hidden rounded-card [&_picture]:contents"
            >
              <Picture {...photo} className="h-full w-full object-cover" />
            </RevealItem>
          ))}
        </RevealList>
      ) : null}

      {site.journal.src ? (
        <Reveal className="mt-10">
          <Button to="/journal" variant="outline" className="bg-white">
            Read our journal
          </Button>
        </Reveal>
      ) : null}
    </Container>
  )
}
