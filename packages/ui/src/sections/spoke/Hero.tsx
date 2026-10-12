import {
  brand,
  hub,
  isPlaceholder,
  localPath,
  siteUrl,
  type SiteConfig,
  type SpokeContent,
} from '@iqra/config'
import { useLang, useT } from '../../i18n/lang.ts'
import { m, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { brandImage } from '../../layout/brand.ts'
import { hubLive, toolTiles } from '../../layout/links.ts'
import { MenuTile } from '../../layout/MenuTile.tsx'
import { useAnchorNavigate } from '../../layout/useAnchorNavigate.ts'
import { Mascot } from '../../mascot/Mascot.tsx'
import { LetterRise } from '../../motion/LetterRise.tsx'
import { duration, easeReveal, heroScrollOut, heroText } from '../../motion/presets.ts'
import { useReducedMotionSafe } from '../../motion/useReducedMotionSafe.ts'
import { Button } from '../../primitives/Button.tsx'
import { asPose, colourClass } from '../../primitives/colours.ts'
import { Container } from '../../primitives/Container.tsx'
import { Pattern } from '../../primitives/Pattern.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { cn } from '../../utils/cn.ts'
import { withFallback } from './helpers.ts'

export const SESSION_ANCHOR = '#session'
/** The footer's "Every IqraSaurus programme" band. */
export const FAMILY_ANCHOR = '#iqrasaurus-family'

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

/** "An IqraSaurus programme": ties this site to the family, linking to the hub once it's live. */
function FamilyBadge() {
  const t = useT()
  const lang = useLang()
  const onAnchor = useAnchorNavigate()
  const icon = brandImage('icon')
  const href = hubLive() ? siteUrl(hub(), localPath(lang, '/')) : FAMILY_ANCHOR
  return (
    <a
      href={href}
      onClick={href.startsWith('#') ? (e) => onAnchor(e, href) : undefined}
      className="group inline-flex items-center gap-2 rounded-pill border border-line bg-surface py-1 pl-1 pr-4 shadow-soft transition hover:border-primary"
    >
      <span className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-primary-soft">
        <Picture {...icon} alt="" priority className="size-7 object-contain" />
      </span>
      <span className="text-sm text-ink/85">
        {t.anProgrammeBefore}{' '}
        <span className="font-heading font-semibold text-primary">{brand.name}</span>
        {t.anProgrammeAfter ? ` ${t.anProgrammeAfter}` : null}
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-4 text-primary transition-transform group-hover:translate-x-0.5"
      >
        <path
          d="M9 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </a>
  )
}

interface HeroProps {
  site: SiteConfig
  hero: SpokeContent['hero']
}

/** Section 1: the programme's name, one plain line, its dino and photo, the tools to use at home. */
export function Hero({ site, hero }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotionSafe()
  const t = useT()
  const lang = useLang()
  const onAnchor = useAnchorNavigate()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], heroScrollOut.y)
  const opacity = useTransform(
    scrollYProgress,
    heroScrollOut.opacityInput,
    heroScrollOut.opacityOutput,
  )

  const c = colourClass[site.colour]
  const showMascot = site.mascotTone !== 'none'
  const photo = hero.image ? withFallback(hero.image) : undefined
  const tiles = toolTiles(lang).filter((tile) => hero.useAtHome.includes(tile.key))
  const fade = (delay: number) =>
    reduced
      ? { duration: duration.fade }
      : { delay, duration: duration.revealSlow, ease: easeReveal }

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden bg-paper pb-16 pt-8 md:pb-24 md:pt-14"
    >
      <Pattern className="bg-plum/[0.05]" />
      <Container className="relative">
        <m.div
          style={reduced ? undefined : { y, opacity }}
          className="grid items-center gap-x-10 gap-y-10 md:grid-cols-[1.05fr_1fr] lg:gap-x-16"
        >
          <div className="min-w-0 md:col-start-1 md:row-start-1">
            <m.div
              data-reveal=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={fade(0.1)}
            >
              <FamilyBadge />
            </m.div>

            <LetterRise
              text={twoLines(site.name)}
              as="h1"
              // Words never break mid-letter (LetterRise), so size to the narrow two-column layout.
              className="mt-6 font-heading text-[clamp(2.5rem,8.5vw,4.75rem)] font-bold leading-[0.98] tracking-tight md:text-[clamp(2.5rem,5.4vw,4.75rem)]"
              lineClassName={(i) => (i === 0 ? 'text-ink' : c.text)}
            />

            {!isPlaceholder(hero.line) ? (
              <m.p
                data-reveal=""
                initial={{ opacity: 0, y: heroText.y }}
                animate={{ opacity: 1, y: 0 }}
                transition={fade(heroText.delayFrom)}
                className="mt-5 max-w-xl text-lg text-ink/80 md:text-xl"
              >
                {hero.line}
              </m.p>
            ) : null}

            <m.div
              data-reveal=""
              initial={{ opacity: 0, y: heroText.y }}
              animate={{ opacity: 1, y: 0 }}
              transition={fade(heroText.delayFrom + 0.15)}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Button
                href={SESSION_ANCHOR}
                size="lg"
                onClick={(e) => onAnchor(e, SESSION_ANCHOR)}
                className="font-heading"
              >
                {t.howSessionRuns}
              </Button>
              <Button to="/chat" variant="outline" size="lg" className="bg-surface font-heading">
                <ChatIcon />
                {t.askOurGuide}
              </Button>
            </m.div>
          </div>

          <m.div
            data-reveal=""
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={fade(0.4)}
            className="relative mx-auto w-full max-w-[420px] md:col-start-2 md:row-span-2 md:row-start-1 md:max-w-none"
          >
            {/* The programme's colour as a soft disc, the dino in front of it. */}
            <div className={cn('relative mx-auto aspect-square w-[78%] rounded-full', c.soft)}>
              <div className={cn('absolute inset-[9%] rounded-full opacity-60', c.soft)} />
              {showMascot ? (
                <div className="absolute inset-x-[7%] bottom-[6%]">
                  <Mascot
                    pose={asPose(site.pose)}
                    size={320}
                    fluid
                    motion={site.mascotTone === 'playful' ? 'bob' : 'none'}
                    overlay="twinkle"
                    priority
                  />
                </div>
              ) : null}
            </div>
            {photo ? (
              <div className="relative z-10 -mt-[14%] ml-auto w-[82%] overflow-hidden rounded-card bg-surface p-2 shadow-soft motion-safe:rotate-2 [&_picture]:contents">
                <Picture {...photo} priority className="h-auto w-full rounded-xl object-cover" />
              </div>
            ) : null}
          </m.div>

          {tiles.length > 0 ? (
            <m.div
              data-reveal=""
              initial={{ opacity: 0, y: heroText.y }}
              animate={{ opacity: 1, y: 0 }}
              transition={fade(heroText.delayTo)}
              className="md:col-start-1 md:row-start-2 md:self-start"
            >
              <p className="label mb-3 text-ink/80">{t.useAtHome}</p>
              <ul className="grid gap-3 min-[480px]:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {tiles.map((entry) => (
                  <li key={entry.key}>
                    <MenuTile entry={entry} compact />
                  </li>
                ))}
              </ul>
            </m.div>
          ) : null}
        </m.div>
      </Container>
    </section>
  )
}
