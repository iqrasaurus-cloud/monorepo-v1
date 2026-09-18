import { fourI, type SiteConfig, type SpokeContent } from '@iqra/config'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { mascotImage } from '../../layout/brand.ts'
import { useAnchorNavigate } from '../../layout/useAnchorNavigate.ts'
import { LetterRise } from '../../motion/LetterRise.tsx'
import { duration, easeReveal, heroScrollOut, heroText } from '../../motion/presets.ts'
import { useReducedMotionSafe } from '../../motion/useReducedMotionSafe.ts'
import { Container } from '../../primitives/Container.tsx'
import { Eyebrow } from '../../primitives/Eyebrow.tsx'
import { Pattern } from '../../primitives/Pattern.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { cn } from '../../utils/cn.ts'

interface HeroProps {
  site: SiteConfig
  hero: SpokeContent['hero']
  nextAnchor: string
}

export function Hero({ site, hero, nextAnchor }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotionSafe()
  const onAnchor = useAnchorNavigate()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], heroScrollOut.y)
  const opacity = useTransform(
    scrollYProgress,
    heroScrollOut.opacityInput,
    heroScrollOut.opacityOutput,
  )

  const mascot = mascotImage(site.mascot, 640)
  const showMascot = site.mascotTone !== 'none'
  const fade = (delay: number) =>
    reduced
      ? { duration: duration.fade }
      : { delay, duration: duration.revealSlow, ease: easeReveal }

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden bg-paper pb-16 pt-12 md:pb-24 md:pt-20"
    >
      <Pattern className="text-plum opacity-[0.04]" />
      <Container>
        <motion.div
          style={reduced ? undefined : { y, opacity }}
          className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]"
        >
          <div className="min-w-0">
            {hero.eyebrow ? (
              <motion.div
                data-reveal=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={fade(heroText.delayFrom)}
              >
                <Eyebrow className="mb-6">{hero.eyebrow}</Eyebrow>
              </motion.div>
            ) : null}

            <LetterRise
              text={hero.headline}
              className="font-heading text-[clamp(2.5rem,9.5vw,5.25rem)] font-bold uppercase leading-[0.98] tracking-tight"
              lineClassName={(i) => (i === 0 ? 'text-ink' : 'text-accent')}
            />

            <motion.p
              data-reveal=""
              initial={{ opacity: 0, y: heroText.y }}
              animate={{ opacity: 1, y: 0 }}
              transition={fade(heroText.delayFrom + 0.2)}
              className="mt-8 max-w-xl text-lg text-ink/80 md:text-xl"
            >
              {hero.intro}
            </motion.p>

            <motion.ul
              data-reveal=""
              aria-label="The 4-I journey"
              initial={{ opacity: 0, y: heroText.y }}
              animate={{ opacity: 1, y: 0 }}
              transition={fade(heroText.delayTo)}
              className="mt-8 flex flex-wrap gap-2"
            >
              {fourI.map((step) => (
                <li
                  key={step.key}
                  className="label rounded-pill border border-taupe/40 bg-white px-4 py-2 text-ink"
                >
                  {step.label}
                </li>
              ))}
            </motion.ul>

            <motion.div
              data-reveal=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={fade(heroText.delayTo)}
              className="mt-10"
            >
              <a
                href={nextAnchor}
                aria-label="Scroll to the next section"
                onClick={(e) => onAnchor(e, nextAnchor)}
                className="inline-flex size-14 items-center justify-center rounded-full bg-sun text-plum shadow-soft transition-transform duration-300 hover:translate-y-1"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
                  <path
                    d="M12 4v16m0 0l-6-6m6 6l6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          {showMascot ? (
            <motion.div
              data-reveal=""
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={fade(0.6)}
              className="flex justify-center lg:justify-end"
            >
              <Picture
                {...mascot}
                priority
                className={cn(
                  'w-full max-w-xs object-contain lg:max-w-md',
                  site.mascotTone === 'playful' && 'animate-float',
                  site.mascotTone === 'calm' && 'max-w-[220px] lg:max-w-xs',
                )}
              />
            </motion.div>
          ) : null}
        </motion.div>
      </Container>
    </section>
  )
}
