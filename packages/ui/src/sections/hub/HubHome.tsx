import {
  brand,
  brandCopy,
  isPlaceholder,
  toolUrl,
  tools,
  type HubContent,
  type SiteConfig,
} from '@iqra/config'
import { motion } from 'framer-motion'
import { mascotImage } from '../../layout/brand.ts'
import { programmeTiles, toolTiles } from '../../layout/links.ts'
import { MenuTile } from '../../layout/MenuTile.tsx'
import { LetterRise } from '../../motion/LetterRise.tsx'
import { duration, easeReveal, heroText } from '../../motion/presets.ts'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { useReducedMotionSafe } from '../../motion/useReducedMotionSafe.ts'
import { Button } from '../../primitives/Button.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Eyebrow } from '../../primitives/Eyebrow.tsx'
import { Pattern } from '../../primitives/Pattern.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { Scallop } from '../../primitives/Scallop.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'

interface HubHomeProps {
  site: SiteConfig
  content: HubContent
}

function AyahCard({ line }: { line: string }) {
  const tadabbur = tools.find((t) => t.slug === 'tadabbur')
  if (!tadabbur || tadabbur.status !== 'live') return null
  const mascot = mascotImage(tadabbur.mascot, 320)
  return (
    <Reveal className="relative overflow-hidden rounded-card bg-sun p-8 shadow-soft md:p-10">
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <Picture {...mascot} className="w-28 shrink-0 object-contain motion-safe:animate-float md:w-36" />
        <div className="flex-1">
          <p className="label mb-2 text-plum/70">Today&rsquo;s ayah</p>
          <h2 className="font-heading text-3xl font-bold text-plum md:text-4xl">{tadabbur.name}</h2>
          {!isPlaceholder(line) ? <p className="mt-2 text-lg text-plum/85">{line}</p> : null}
        </div>
        <Button href={toolUrl(tadabbur)} variant="primary" size="lg" className="font-heading">
          Open {tadabbur.name}
        </Button>
      </div>
    </Reveal>
  )
}

/** iqrasaurus.com: tools first, then today's ayah, the programmes and who we are. */
export function HubHome({ site, content }: HubHomeProps) {
  const reduced = useReducedMotionSafe()
  const mascot = mascotImage(site.mascot, 640)
  const fade = (delay: number) =>
    reduced ? { duration: duration.fade } : { delay, duration: duration.revealSlow, ease: easeReveal }

  return (
    <>
      <section id="top" className="relative overflow-hidden bg-paper pb-16 pt-10 md:pb-24 md:pt-16">
        <Pattern className="text-plum opacity-[0.04]" />
        <Container className="relative">
          <div className="grid items-center gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div className="min-w-0">
              <motion.div data-reveal="" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fade(0.1)}>
                <Eyebrow className="mb-5">{brand.tagline}</Eyebrow>
              </motion.div>
              <LetterRise
                text={content.home.headline}
                className="font-heading text-[clamp(2.25rem,7vw,4.25rem)] font-bold leading-[1.02] tracking-tight"
                lineClassName={(i) => (i === 0 ? 'text-ink' : 'text-accent')}
              />
            </div>
            {site.mascotTone !== 'none' ? (
              <motion.div
                data-reveal=""
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={fade(0.5)}
                className="hidden justify-center lg:flex"
              >
                <Picture {...mascot} priority className="w-full max-w-xs object-contain motion-safe:animate-float" />
              </motion.div>
            ) : null}
          </div>

          <motion.ul
            data-reveal=""
            aria-label="Tools"
            initial={{ opacity: 0, y: heroText.y }}
            animate={{ opacity: 1, y: 0 }}
            transition={fade(heroText.delayFrom)}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {toolTiles().map((entry) => (
              <li key={entry.key}>
                <MenuTile entry={entry} />
              </li>
            ))}
          </motion.ul>
        </Container>
      </section>

      <div className="relative bg-white">
        <Scallop className="text-paper" />
        <section className="section">
          <Container className="space-y-20 md:space-y-28">
            <AyahCard line={content.home.ayah.line} />

            <div>
              <Reveal>
                <SectionHeading title="Our programmes" className="mb-10" />
              </Reveal>
              <RevealList as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {programmeTiles(site).map((entry) => (
                  <RevealItem key={entry.key} as="li">
                    <MenuTile entry={entry} />
                  </RevealItem>
                ))}
              </RevealList>
            </div>
          </Container>
        </section>
      </div>

      <div className="relative bg-plum">
        <Scallop className="text-white" />
        <section className="section relative">
          <Pattern className="text-white opacity-[0.06]" />
          <Container className="relative max-w-4xl text-center text-white">
            <Reveal>
              <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">Who we are</h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85 md:text-xl">{brand.positioning}</p>
              <p className="mt-4 text-white/70">{brand.credential}</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-12">
              <blockquote className="font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
                {brandCopy.belief.quote}
              </blockquote>
              <p className="mt-5 font-heading text-xl font-semibold text-sun md:text-2xl">
                {brandCopy.belief.follow}
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-12">
              <Button to="/about" size="lg" className="font-heading">
                About us
              </Button>
            </Reveal>
          </Container>
        </section>
      </div>
    </>
  )
}
