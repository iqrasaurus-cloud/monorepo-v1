import type { ReactNode } from 'react'
import { Mascot, type PoseName } from '../../mascot/Mascot.tsx'
import { Reveal } from '../../motion/Reveal.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Pattern } from '../../primitives/Pattern.tsx'

interface PageHeaderProps {
  title: string
  lede?: ReactNode
  /** The dino beside the title. */
  pose?: PoseName
}

/** Title band for the hub's inner pages. */
export function PageHeader({ title, lede, pose = 'waving-wink' }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-paper pb-14 pt-12 md:pb-20 md:pt-16">
      <Pattern className="bg-plum/[0.05]" />
      <Container className="relative flex items-center justify-between gap-8">
        <Reveal>
          <h1 className="font-heading text-5xl font-bold leading-none text-ink md:text-6xl">
            {title}
          </h1>
          {lede ? <p className="mt-6 max-w-2xl text-xl text-ink/80">{lede}</p> : null}
        </Reveal>
        <Mascot pose={pose} size={150} motion="nod" className="hidden sm:inline-block" />
      </Container>
    </section>
  )
}
