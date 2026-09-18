import type { SiteConfig } from '@iqra/config'
import { Reveal } from '../../motion/Reveal.tsx'
import { Button } from '../../primitives/Button.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Eyebrow } from '../../primitives/Eyebrow.tsx'

interface SupportUsProps {
  site: SiteConfig
  body: string[]
}

export function SupportUs({ site, body }: SupportUsProps) {
  return (
    <Container className="max-w-3xl text-center text-white">
      <Reveal>
        <Eyebrow className="mb-6 text-sun">Support Us</Eyebrow>
        <h2 className="mb-8 font-heading text-4xl font-bold text-white md:text-5xl">Support Us</h2>
      </Reveal>
      <div className="space-y-5 text-lg text-white/85">
        {body.map((paragraph, i) => (
          <Reveal key={i} delay={0.06 * i}>
            <p>{paragraph}</p>
          </Reveal>
        ))}
      </div>
      {site.support.href ? (
        <Reveal className="mt-10">
          <Button href={site.support.href} size="lg">
            {site.support.label}
          </Button>
        </Reveal>
      ) : null}
    </Container>
  )
}
