import type { SiteConfig, SpokeContent } from '@iqra/config'
import { Fragment, type ReactNode } from 'react'
import { Scallop } from '../../primitives/Scallop.tsx'
import { cn } from '../../utils/cn.ts'
import { AdaptIt } from './AdaptIt.tsx'
import { bgClass, isBlank, nonBlank, scallopClass, type Bg } from './helpers.ts'
import { Hero } from './Hero.tsx'
import { Journey } from './Journey.tsx'
import { JourneyStrip } from './JourneyStrip.tsx'
import { PressMention } from './PressMention.tsx'
import { QuoteBand } from './QuoteBand.tsx'
import { SupportUs } from './SupportUs.tsx'
import { TryIt } from './TryIt.tsx'
import { WhatIsIt } from './WhatIsIt.tsx'
import { WhatWeDid } from './WhatWeDid.tsx'
import { WhatWeLearned } from './WhatWeLearned.tsx'
import { WhatWeObserved } from './WhatWeObserved.tsx'
import { WhyWeCreatedIt } from './WhyWeCreatedIt.tsx'
import { WorkWithUs } from './WorkWithUs.tsx'

interface Block {
  id?: string
  bg: Bg
  empty: boolean
  /** Shorter vertical padding for narrow bands. */
  compact?: boolean
  /** The block draws its own background and full-bleed layout. */
  flush?: boolean
  node: ReactNode
}

interface SpokeHomeProps {
  site: SiteConfig
  content: SpokeContent
}

/** The one-page spoke: sections in the fixed order from BUILD_SPEC.md §6.2. */
export function SpokeHome({ site, content }: SpokeHomeProps) {
  const c = content
  const journeyEmpty = Object.values(c.journey).every((step) => isBlank(step.body))
  const observed = c.whatWeObserved.items.filter((item) => !isBlank(item.text))
  const learned = {
    worked: nonBlank(c.whatWeLearned.worked),
    didnt: nonBlank(c.whatWeLearned.didnt),
    changed: nonBlank(c.whatWeLearned.changed),
  }
  const steps = nonBlank(c.tryIt.steps)

  const blocks: Block[] = [
    { bg: 'paper-2', empty: false, compact: true, node: <JourneyStrip /> },
    {
      id: 'about',
      bg: 'white',
      empty: isBlank(c.whatIsIt.body),
      node: <WhatIsIt body={c.whatIsIt.body} />,
    },
    {
      bg: 'paper',
      empty: nonBlank(c.whyWeCreatedIt.body).length === 0,
      node: <WhyWeCreatedIt body={nonBlank(c.whyWeCreatedIt.body)} photo={c.hero.image} />,
    },
    {
      id: 'methodology',
      bg: 'paper-2',
      empty: journeyEmpty,
      node: <Journey site={site} journey={c.journey} />,
    },
    { bg: 'plum', empty: false, node: <QuoteBand /> },
    {
      bg: 'white',
      empty: nonBlank(c.whatWeDid.body).length === 0 && c.whatWeDid.photos.length === 0,
      node: (
        <WhatWeDid site={site} whatWeDid={{ ...c.whatWeDid, body: nonBlank(c.whatWeDid.body) }} />
      ),
    },
    {
      id: 'impact',
      bg: 'paper-2',
      empty: observed.length === 0,
      node: <WhatWeObserved items={observed} />,
    },
    {
      bg: 'paper',
      empty: learned.worked.length + learned.didnt.length + learned.changed.length === 0,
      node: <WhatWeLearned learned={learned} />,
    },
    {
      id: 'try',
      bg: 'white',
      empty: isBlank(c.tryIt.intro) && steps.length === 0,
      node: <TryIt tryIt={{ ...c.tryIt, steps }} />,
    },
    {
      bg: 'paper-2',
      empty: nonBlank(c.adaptIt.body).length === 0,
      flush: true,
      node: <AdaptIt body={nonBlank(c.adaptIt.body)} image={c.hero.image} />,
    },
    {
      bg: 'paper',
      empty: nonBlank(c.workWithUs.body).length === 0,
      node: <WorkWithUs workWithUs={{ ...c.workWithUs, body: nonBlank(c.workWithUs.body) }} />,
    },
    {
      bg: 'paper',
      compact: true,
      empty: !c.press,
      node: c.press ? <PressMention image={c.press.image} caption={c.press.caption} /> : null,
    },
    {
      id: 'support',
      bg: 'plum',
      empty: nonBlank(c.supportUs.body).length === 0 && !site.support.href,
      node: <SupportUs site={site} body={nonBlank(c.supportUs.body)} />,
    },
  ]

  const visible = blocks.filter((b) => !b.empty)
  const firstAnchor = visible.find((b) => b.id)?.id ?? 'support'

  let previous: Bg = 'paper'
  let carried: string[] = []

  return (
    <>
      <Hero site={site} hero={c.hero} nextAnchor={`#${firstAnchor}`} />
      {blocks.map((block, i) => {
        if (block.empty) {
          if (block.id) carried.push(block.id)
          return null
        }
        const anchors = carried
        carried = []
        const changed = block.bg !== previous
        const scallop = previous
        previous = block.bg
        return (
          <Fragment key={i}>
            {anchors.map((id) => (
              <span key={id} id={id} aria-hidden="true" />
            ))}
            <div id={block.id} className={cn(bgClass[block.bg], 'relative')}>
              {changed ? <Scallop className={scallopClass[scallop]} /> : null}
              <section
                className={cn(
                  block.compact ? 'py-6 md:py-8' : block.flush ? 'pb-20 md:pb-32' : 'section',
                )}
              >
                {block.node}
              </section>
            </div>
          </Fragment>
        )
      })}
    </>
  )
}
