import { isPlaceholder, type SiteConfig, type SpokeContent } from '@iqra/config'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { mascotImage } from '../../layout/brand.ts'
import { toolTiles } from '../../layout/links.ts'
import { MenuTile } from '../../layout/MenuTile.tsx'
import { useAnchorNavigate } from '../../layout/useAnchorNavigate.ts'
import { LetterRise } from '../../motion/LetterRise.tsx'
import { duration, easeReveal, heroScrollOut, heroText } from '../../motion/presets.ts'
import { useReducedMotionSafe } from '../../motion/useReducedMotionSafe.ts'
import { Button } from '../../primitives/Button.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Eyebrow } from '../../primitives/Eyebrow.tsx'
import { Pattern } from '../../primitives/Pattern.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { cn } from '../../utils/cn.ts'
import { withFallback } from './helpers.ts'

export const SESSION_ANCHOR = '#session'

/** "Quran Investigators" -> "Quran\nInvestigators": last word on its own line, in the accent. */
const twoLines = (name: string): string => {
  const words = name.split(' ')
  const last = words.pop() ?? name
  return words.length > 0 ? `${words.join(' ')}\n${last}` : last
}

function ChatIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
      <path
        d="M4 5h16v10H9l-5 4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface HeroProps {
  site: SiteConfig
  hero: SpokeContent['hero']
}

/** Section 1: the programme's name, one plain line, a real photo and the tools to use at home. */
export function Hero({ site, hero }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotionSafe()
  const onAnchor = useAnchorNavigate()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], heroScrollOut.y)
  const opacity = useTransform(scrollYProgress, heroScrollOut.opacityInput, heroScrollOut.opacityOutput)

  const showMascot = site.mascotTone !== 'none'
  const mascot = mascotImage(site.mascot, 640)
  const photo = hero.image ? withFallback(hero.image) : undefined
  const tiles = toolTiles().filter((t) => hero.useAtHome.includes(t.key))
  const fade = (delay: number) =>
    reduced ? { duration: duration.fade } : { delay, duration: duration.revealSlow, ease: easeReveal }

  return (
    <section ref={ref} id="top" className="relative overflow-hidden bg-paper pb-16 pt-10 md:pb-24 md:pt-16">
      <Pattern className="text-plum opacity-[0.04]" />
      <Container>
        <motion.div
          style={reduced ? undefined : { y, opacity }}
          className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]"
        >
          <div className="min-w-0">
            <motion.div data-reveal="" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fade(0.1)}>
              <Eyebrow className="mb-5">Programme</Eyebrow>
            </motion.div>

            <LetterRise
              text={twoLines(site.name)}
              // Words never break mid-letter (LetterRise), so size to the narrow two-column layout.
              className="font-heading text-[clamp(2.5rem,9vw,4.5rem)] font-bold leading-[0.98] tracking-tight lg:text-[clamp(3rem,5vw,4.75rem)]"
              lineClassName={(i) => (i === 0 ? 'text-ink' : 'text-accent')}
            />

            {!isPlaceholder(hero.line) ? (
              <motion.p
                data-reveal=""
                initial={{ opacity: 0, y: heroText.y }}
                animate={{ opacity: 1, y: 0 }}
                transition={fade(heroText.delayFrom)}
                className="mt-6 max-w-xl text-xl text-ink/80 md:text-2xl"
              >
                {hero.line}
              </motion.p>
            ) : null}

            <motion.div
              data-reveal=""
              initial={{ opacity: 0, y: heroText.y }}
              animate={{ opacity: 1, y: 0 }}
              transition={fade(heroText.delayFrom + 0.15)}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button
                href={SESSION_ANCHOR}
                size="lg"
                onClick={(e) => onAnchor(e, SESSION_ANCHOR)}
                className="font-heading"
              >
                How a session runs
              </Button>
              <Button to="/chat" variant="outline" size="lg" className="bg-white font-heading">
                <ChatIcon />
                Ask our guide
              </Button>
            </motion.div>

            {tiles.length > 0 ? (
              <motion.div
                data-reveal=""
                initial={{ opacity: 0, y: heroText.y }}
                animate={{ opacity: 1, y: 0 }}
                transition={fade(heroText.delayTo)}
                className="mt-10"
              >
                <p className="label mb-3 text-ink/60">Use this at home</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {tiles.map((entry) => (
                    <li key={entry.key}>
                      <MenuTile entry={entry} compact />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </div>

          <motion.div
            data-reveal=""
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={fade(0.5)}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {photo ? (
              <>
                <div className="overflow-hidden rounded-card bg-white shadow-soft ring-8 ring-white lg:rotate-2 [&_picture]:contents">
                  <Picture {...photo} priority className="h-auto w-full object-cover" />
                </div>
                {showMascot ? (
                  <Picture
                    {...mascot}
                    priority
                    className={cn(
                      'absolute -bottom-14 -left-4 w-32 object-contain drop-shadow-md md:-left-10 md:w-44',
                      site.mascotTone === 'playful' && 'motion-safe:animate-float',
                    )}
                  />
                ) : null}
              </>
            ) : showMascot ? (
              <Picture
                {...mascot}
                priority
                className={cn(
                  'mx-auto w-full max-w-xs object-contain lg:max-w-md',
                  site.mascotTone === 'playful' && 'motion-safe:animate-float',
                )}
              />
            ) : null}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
