import {
  brandCopy,
  localized,
  type Overlay,
  isPlaceholder,
  toolUrl,
  tools,
  type HubContent,
  type SiteConfig,
} from '@iqra/config'
import { m } from 'framer-motion'
import { useBrand, useLang, useT } from '../../i18n/lang.ts'
import { Link } from '../../i18n/Link.tsx'
import { programmeTiles, toolTiles, type TileEntry } from '../../layout/links.ts'
import { MenuTile } from '../../layout/MenuTile.tsx'
import { Mascot, type PoseName } from '../../mascot/Mascot.tsx'
import { LetterRise } from '../../motion/LetterRise.tsx'
import { duration, easeReveal, heroText } from '../../motion/presets.ts'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { useReducedMotionSafe } from '../../motion/useReducedMotionSafe.ts'
import { Button } from '../../primitives/Button.tsx'
import { asPose, colourClass } from '../../primitives/colours.ts'
import { Container } from '../../primitives/Container.tsx'
import { Eyebrow } from '../../primitives/Eyebrow.tsx'
import { Pattern } from '../../primitives/Pattern.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { Section } from '../../primitives/Section.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'
import { cn } from '../../utils/cn.ts'
import { Videos } from '../shared/Videos.tsx'
import { withFallback } from '../spoke/helpers.ts'

interface HubHomeProps {
  site: SiteConfig
  content: HubContent
  /** The Malay version (apps/hub/content.ms.ts); missing parts show in English. */
  contentMs?: Overlay<HubContent>
}

function AyahCard({ line }: { line: string }) {
  const t = useT()
  const tadabbur = tools.find((tool) => tool.slug === 'tadabbur')
  if (!tadabbur || tadabbur.status !== 'live') return null
  return (
    <Reveal className="relative overflow-hidden rounded-[28px] bg-sun p-8 shadow-soft md:p-10">
      <Pattern className="bg-plum/[0.06]" />
      <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <Mascot pose="reading-quran" size={130} overlay="twinkle" motion="bob" />
        <div className="flex-1">
          <p className="label mb-2 text-on-sun/75">{t.todaysAyah}</p>
          <h2 className="font-heading text-3xl font-bold text-on-sun md:text-4xl">
            {tadabbur.name}
          </h2>
          {!isPlaceholder(line) ? <p className="mt-2 text-lg text-on-sun/85">{line}</p> : null}
        </div>
        <Button href={toolUrl(tadabbur)} variant="primary" size="lg" className="font-heading">
          {t.open} {tadabbur.name}
        </Button>
      </div>
    </Reveal>
  )
}

/** A programme as a big card: its colour, its dino, the name, one line and its status. */
function ProgrammeCard({ entry }: { entry: TileEntry }) {
  const t = useT()
  const live = entry.href !== undefined
  const c = colourClass[entry.colour]
  const inner = (
    <>
      <span
        className={cn(
          'relative flex aspect-[16/10] items-end justify-center overflow-hidden rounded-[20px]',
          live ? c.bg : 'bg-paper-2',
        )}
      >
        <Pattern className="bg-plum/[0.07]" />
        <span className="relative w-[46%] translate-y-2 transition-transform duration-500 ease-reveal motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:rotate-[-4deg]">
          <Mascot
            pose={asPose(entry.pose)}
            size={180}
            fluid
            className={cn(!live && 'opacity-70 grayscale-[30%]')}
          />
        </span>
        {!live ? (
          <span className="label absolute left-3 top-3 rounded-pill bg-surface px-2.5 py-1 text-[10px] text-ink/85">
            {t.comingSoon}
          </span>
        ) : null}
      </span>
      <span className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <span className="flex items-center justify-between gap-3 font-heading text-xl font-bold text-ink">
          {entry.name}
          {live ? (
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-transform duration-300 group-hover:translate-x-1"
            >
              <svg viewBox="0 0 24 24" className="size-4">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          ) : null}
        </span>
        {entry.line ? <span className="mt-1.5 text-ink/80">{entry.line}</span> : null}
      </span>
    </>
  )
  const card = cn(
    'group flex h-full flex-col rounded-[24px] bg-surface p-2 shadow-soft transition duration-300 ease-reveal',
    live && 'motion-safe:hover:-translate-y-1.5',
  )
  if (entry.href === undefined) return <div className={card}>{inner}</div>
  return entry.href.startsWith('/') ? (
    <Link to={entry.href} className={card}>
      {inner}
    </Link>
  ) : (
    <a href={entry.href} className={card}>
      {inner}
    </a>
  )
}

/** Photos from instagram.com/iqrasaurus; dinos stand in until the owner adds them. */
function Instagram({ photos }: { photos: HubContent['instagram'] }) {
  const t = useT()
  const brand = useBrand()
  const stand: PoseName[] = [
    'celebrating',
    'writing',
    'telescope',
    'treasure-map',
    'watering-plant',
    'cheering',
  ]
  const tones = [
    'bg-inspire',
    'bg-investigate',
    'bg-integrate',
    'bg-impart',
    'bg-primary-soft',
    'bg-sun',
  ]
  return (
    <Container>
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading title={t.fromOurInstagram} pose="thumbs-up" />
        <Button
          href={brand.social.instagram}
          rel="noopener"
          variant="outline"
          className="bg-surface font-heading"
        >
          {t.followUs}
        </Button>
      </Reveal>
      <RevealList as="ul" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {photos.length > 0
          ? photos.slice(0, 12).map((photo, i) => (
              <RevealItem
                key={`${photo.src}-${i}`}
                as="li"
                className="aspect-square overflow-hidden rounded-card [&_picture]:contents"
              >
                <a href={brand.social.instagram} rel="noopener" className="block h-full">
                  <Picture
                    {...withFallback(photo)}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </a>
              </RevealItem>
            ))
          : stand.map((pose, i) => (
              <RevealItem
                key={pose}
                as="li"
                className={cn(
                  'flex aspect-square items-end justify-center overflow-hidden rounded-card',
                  tones[i],
                )}
              >
                <a
                  href={brand.social.instagram}
                  rel="noopener"
                  aria-label={i === 0 ? t.seeOurPhotos : undefined}
                  tabIndex={i === 0 ? undefined : -1}
                  className="group block w-[70%] translate-y-2"
                >
                  <Mascot pose={pose} size={150} fluid className="iq-mascot-hover" />
                </a>
              </RevealItem>
            ))}
      </RevealList>
    </Container>
  )
}

/** iqrasaurus.com: tools first, then today's ayah, the programmes, videos and who we are. */
export function HubHome({ site, content: english, contentMs }: HubHomeProps) {
  const reduced = useReducedMotionSafe()
  const t = useT()
  const lang = useLang()
  const brand = useBrand()
  const content = lang === 'ms' ? localized(english, contentMs) : english
  const fade = (delay: number) =>
    reduced
      ? { duration: duration.fade }
      : { delay, duration: duration.revealSlow, ease: easeReveal }

  return (
    <>
      <section id="top" className="relative overflow-hidden bg-paper pb-16 pt-8 md:pb-24 md:pt-14">
        <Pattern className="bg-plum/[0.05]" />
        <Container className="relative">
          <div className="grid items-center gap-8 md:grid-cols-[1.35fr_1fr]">
            <div className="min-w-0">
              <m.div
                data-reveal=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={fade(0.1)}
              >
                <Eyebrow className="mb-5">{brand.tagline}</Eyebrow>
              </m.div>
              <LetterRise
                text={content.home.headline}
                className="font-heading text-[clamp(2.25rem,7vw,4.25rem)] font-bold leading-[1.02] tracking-tight md:text-[clamp(2.25rem,4.6vw,4.25rem)]"
                lineClassName={(i) => (i === 0 ? 'text-ink' : 'text-accent')}
              />
            </div>
            {site.mascotTone !== 'none' ? (
              <m.div
                data-reveal=""
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={fade(0.4)}
                className="relative mx-auto w-full max-w-[340px] md:max-w-none"
              >
                <div className="relative mx-auto aspect-square w-[82%] rounded-full bg-primary-soft">
                  <div className="absolute inset-[10%] rounded-full bg-sun/40" />
                  <div className="absolute inset-x-[8%] bottom-[5%]">
                    <Mascot
                      pose={asPose(site.pose)}
                      size={300}
                      fluid
                      motion="nod"
                      overlay="twinkle"
                      priority
                    />
                  </div>
                </div>
                <div className="absolute -left-2 bottom-2 w-[30%]">
                  <Mascot pose="reading-quran" size={110} fluid enter />
                </div>
                <div className="absolute -right-1 top-2 w-[26%]">
                  <Mascot pose="magnifying-glass" size={100} fluid enter />
                </div>
              </m.div>
            ) : null}
          </div>

          <m.div
            data-reveal=""
            initial={{ opacity: 0, y: heroText.y }}
            animate={{ opacity: 1, y: 0 }}
            transition={fade(heroText.delayFrom)}
            className="mt-10"
          >
            <p className="label mb-4 text-ink/80">{t.startWithTool}</p>
            <ul aria-label={t.tools} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {toolTiles(lang).map((entry) => (
                <li key={entry.key}>
                  <MenuTile entry={entry} />
                </li>
              ))}
            </ul>
          </m.div>
        </Container>
      </section>

      <Section bg="surface" prev="paper">
        <Container className="space-y-20 md:space-y-28">
          <AyahCard line={content.home.ayah.line} />
          <div id="programmes" className="scroll-mt-24">
            <Reveal>
              <SectionHeading title={t.ourProgrammes} pose="signpost" className="mb-10" />
            </Reveal>
            <RevealList as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {programmeTiles(site, lang).map((entry) => (
                <RevealItem key={entry.key} as="li">
                  <ProgrammeCard entry={entry} />
                </RevealItem>
              ))}
            </RevealList>
          </div>
        </Container>
      </Section>

      <Section id="watch" bg="paper" prev="surface">
        <Videos site={site} />
      </Section>

      <Section id="instagram" bg="paper-2" prev="paper">
        <Instagram photos={content.instagram} />
      </Section>

      <Section bg="plum" prev="paper-2" className="relative">
        <Pattern className="bg-on-plum/[0.05]" />
        <Container className="relative max-w-4xl text-center text-on-plum">
          <Reveal>
            <div className="mb-4 flex justify-center">
              <Mascot pose="grateful" size={120} enter />
            </div>
            <h2 className="font-heading text-4xl font-bold text-on-plum md:text-5xl">
              {t.whoWeAre}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-on-plum/85 md:text-xl">
              {brand.positioning}
            </p>
            <p className="mt-4 text-on-plum/70">{brand.credential}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <blockquote className="font-heading text-3xl font-bold leading-tight text-on-plum md:text-5xl">
              {brandCopy.belief.quote}
            </blockquote>
            <p className="mt-5 font-heading text-xl font-semibold text-sun md:text-2xl">
              {brandCopy.belief.follow}
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-12">
            <Button to="/about" size="lg" className="font-heading">
              {t.aboutUs}
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
