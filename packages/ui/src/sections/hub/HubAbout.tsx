import { brand, fourI, isPlaceholder, type HubContent, type SiteConfig } from '@iqra/config'
import type { ReactNode } from 'react'
import { mascotImage } from '../../layout/brand.ts'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { CircleCard } from '../../primitives/CircleCard.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { Scallop } from '../../primitives/Scallop.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'
import { cn } from '../../utils/cn.ts'
import { real, STEP_MASCOTS, withFallback, type Bg, bgClass, scallopClass } from '../spoke/helpers.ts'
import { PageHeader } from './PageHeader.tsx'

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-3xl space-y-5 text-lg text-ink/80">
      {paragraphs.map((p, i) => (
        <Reveal key={i} delay={0.06 * i}>
          <p>{p}</p>
        </Reveal>
      ))}
    </div>
  )
}

interface Block {
  id: string
  title: string
  bg: Bg
  show: boolean
  body: ReactNode
}

interface HubAboutProps {
  site: SiteConfig
  about: HubContent['about']
}

/** iqrasaurus.com/about: story, people, foundation, how we teach, trust and press. */
export function HubAbout({ site, about }: HubAboutProps) {
  const story = real(about.story)
  const foundation = real(about.foundation)
  const people = about.people.filter((p) => !isPlaceholder(p.name))
  const verify = [
    { label: 'Verify ARS on MUIS', href: brand.verifyLinks.ars },
    { label: 'Verify IECP on MUIS', href: brand.verifyLinks.iecp },
  ].filter((v) => v.href !== '')

  const blocks: Block[] = [
    { id: 'our-story', title: 'Our story', bg: 'white', show: story.length > 0, body: <Prose paragraphs={story} /> },
    {
      id: 'our-people',
      title: 'Our people',
      bg: 'paper-2',
      show: people.length > 0,
      body: (
        <RevealList as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <RevealItem key={person.name} as="li" className="rounded-card bg-white p-6 text-center shadow-soft">
              {person.photo ? (
                <div className="mx-auto mb-4 size-28 overflow-hidden rounded-full ring-4 ring-sun [&_picture]:contents">
                  <Picture {...withFallback(person.photo)} className="h-full w-full object-cover" />
                </div>
              ) : null}
              <p className="font-heading text-xl font-semibold text-ink">{person.name}</p>
              {!isPlaceholder(person.role) ? <p className="mt-1 text-ink/80">{person.role}</p> : null}
            </RevealItem>
          ))}
        </RevealList>
      ),
    },
    {
      id: 'our-foundation',
      title: 'Our foundation',
      bg: 'white',
      show: foundation.length > 0,
      body: <Prose paragraphs={foundation} />,
    },
    {
      id: 'how-we-teach',
      title: 'How we teach: the 4-I method',
      bg: 'paper-2',
      show: true,
      body: (
        <RevealList as="ol" className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {fourI.map((step, i) => (
            <RevealItem key={step.key} as="li">
              <CircleCard
                step={i + 1}
                image={
                  site.mascotTone !== 'none' ? mascotImage(STEP_MASCOTS[i] ?? site.mascot, 320) : undefined
                }
                label={step.label}
              >
                <p className="text-ink/80">{step.line}</p>
              </CircleCard>
            </RevealItem>
          ))}
        </RevealList>
      ),
    },
    {
      id: 'trust',
      title: 'Who guides us',
      bg: 'white',
      show: true,
      body: (
        <Reveal className="max-w-3xl">
          <p className="text-xl text-ink">{brand.credential}</p>
          {verify.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-4">
              {verify.map((v) => (
                <li key={v.href}>
                  <a href={v.href} rel="noopener" className="link-sweep font-semibold text-primary">
                    {v.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      ),
    },
    {
      id: 'in-the-news',
      title: 'In the news',
      bg: 'paper',
      show: about.press !== undefined,
      body: about.press ? (
        <Reveal className="flex max-w-4xl flex-col gap-6 rounded-card bg-white p-6 shadow-soft md:flex-row md:items-center">
          <div className="w-full shrink-0 overflow-hidden rounded-card ring-1 ring-taupe/30 md:max-w-sm [&_picture]:contents">
            <Picture {...withFallback(about.press.image)} className="h-full w-full object-cover" />
          </div>
          <p className="text-lg text-ink/80">{about.press.caption}</p>
        </Reveal>
      ) : null,
    },
  ]

  const visible = blocks.filter((b) => b.show)

  return (
    <>
      <PageHeader title="About IqraSaurus" lede={brand.positioning} />
      {visible.map((block, i) => {
        const previous: Bg = visible[i - 1]?.bg ?? 'paper'
        return (
          <div key={block.id} id={block.id} className={cn(bgClass[block.bg], 'relative')}>
            {block.bg !== previous ? <Scallop className={scallopClass[previous]} /> : null}
            <section className="section">
              <Container>
                <Reveal>
                  <SectionHeading title={block.title} className="mb-10" />
                </Reveal>
                {block.body}
              </Container>
            </section>
          </div>
        )
      })}
    </>
  )
}
