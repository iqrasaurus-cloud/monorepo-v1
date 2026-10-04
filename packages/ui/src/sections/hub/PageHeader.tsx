import type { ReactNode } from 'react'
import { Reveal } from '../../motion/Reveal.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Pattern } from '../../primitives/Pattern.tsx'

interface PageHeaderProps {
  title: string
  lede?: ReactNode
}

/** Title band for the hub's inner pages. */
export function PageHeader({ title, lede }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-paper pb-14 pt-12 md:pb-20 md:pt-16">
      <Pattern className="text-plum opacity-[0.04]" />
      <Container className="relative">
        <Reveal>
          <h1 className="font-heading text-5xl font-bold leading-none text-ink md:text-6xl">{title}</h1>
          {lede ? <p className="mt-6 max-w-2xl text-xl text-ink/80">{lede}</p> : null}
        </Reveal>
      </Container>
    </section>
  )
}
