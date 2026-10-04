import { isPlaceholder, type SiteConfig, type SpokeContent } from '@iqra/config'
import type { ReactNode } from 'react'
import { Scallop } from '../../primitives/Scallop.tsx'
import { cn } from '../../utils/cn.ts'
import { BringIt } from './BringIt.tsx'
import { bgClass, real, scallopClass, type Bg } from './helpers.ts'
import { Hero, SESSION_ANCHOR } from './Hero.tsx'
import { hasSeen, Seen } from './Seen.tsx'
import { Session } from './Session.tsx'
import { WhatItIs } from './WhatItIs.tsx'

interface Block {
  id: string
  bg: Bg
  show: boolean
  node: ReactNode
}

interface SpokeHomeProps {
  site: SiteConfig
  content: SpokeContent
}

/** The five-section programme page (BUILD_SPEC.md section 6B). Empty sections don't render. */
export function SpokeHome({ site, content: c }: SpokeHomeProps) {
  const blocks: Block[] = [
    {
      id: 'what-it-is',
      bg: 'white',
      show: real(c.whatItIs.body).length > 0 || c.whatItIs.photos.length > 0,
      node: <WhatItIs site={site} whatItIs={c.whatItIs} />,
    },
    {
      id: SESSION_ANCHOR.slice(1),
      bg: 'paper-2',
      show: Object.values(c.session.steps).some((s) => !isPlaceholder(s)),
      node: <Session site={site} session={c.session} />,
    },
    {
      id: 'seen',
      bg: 'paper',
      show: hasSeen(c.seen),
      node: <Seen site={site} seen={c.seen} />,
    },
    {
      id: 'bring-it-to-your-class',
      bg: 'plum',
      show: true,
      node: <BringIt site={site} bringIt={c.bringIt} />,
    },
  ]

  const visible = blocks.filter((b) => b.show)

  return (
    <>
      <Hero site={site} hero={c.hero} />
      {visible.map((block, i) => {
        // The hero is on paper; a scalloped edge marks every change of background.
        const previous: Bg = visible[i - 1]?.bg ?? 'paper'
        return (
          <div key={block.id} id={block.id} className={cn(bgClass[block.bg], 'relative')}>
            {block.bg !== previous ? <Scallop className={scallopClass[previous]} /> : null}
            <section className="section">{block.node}</section>
          </div>
        )
      })}
    </>
  )
}
