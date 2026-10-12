import {
  isPlaceholder,
  localized,
  videosFor,
  type Overlay,
  type SiteConfig,
  type SpokeContent,
} from '@iqra/config'
import { useLang } from '../../i18n/lang.ts'
import type { ReactNode } from 'react'
import { Section, type Bg } from '../../primitives/Section.tsx'
import { Videos } from '../shared/Videos.tsx'
import { BringIt } from './BringIt.tsx'
import { real } from './helpers.ts'
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
  /** The Malay version (apps/<slug>/content.ms.ts); missing parts show in English. */
  contentMs?: Overlay<SpokeContent>
}

/**
 * The programme page (BUILD_SPEC.md section 6B, plus the videos from phase 10).
 * Empty sections don't render. The last band is plum, so it runs straight into the footer.
 */
export function SpokeHome({ site, content, contentMs }: SpokeHomeProps) {
  const lang = useLang()
  const c = lang === 'ms' ? localized(content, contentMs) : content
  const blocks: Block[] = [
    {
      id: 'what-it-is',
      bg: 'surface',
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
      id: 'watch',
      bg: 'paper',
      show: videosFor(site.slug).length > 0,
      node: <Videos site={site} />,
    },
    {
      id: 'seen',
      bg: 'surface',
      show: hasSeen(c.seen),
      node: <Seen seen={c.seen} />,
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
      {visible.map((block, i) => (
        // The hero is on paper; a scalloped edge marks every change of background.
        <Section key={block.id} id={block.id} bg={block.bg} prev={visible[i - 1]?.bg ?? 'paper'}>
          {block.node}
        </Section>
      ))}
    </>
  )
}
