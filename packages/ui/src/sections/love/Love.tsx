import {
  getSite,
  hub,
  localPath,
  loveFormUrl,
  programmes,
  siteUrl,
  type Lang,
  type LoveNote,
  type SiteConfig,
} from '@iqra/config'
import { useState } from 'react'
import { useLang, useT } from '../../i18n/lang.ts'
import { hubLive } from '../../layout/links.ts'
import { Mascot } from '../../mascot/Mascot.tsx'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { Button } from '../../primitives/Button.tsx'
import { colourClass } from '../../primitives/colours.ts'
import { Container } from '../../primitives/Container.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { Section } from '../../primitives/Section.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'
import { cn } from '../../utils/cn.ts'
import { PageHeader } from '../hub/PageHeader.tsx'

const PROGRAMME_SLUGS = new Set(programmes().map((p) => p.slug))

/**
 * The Wall of Love's address from this site: a page link on the hub, the hub's page from a
 * programme once the hub is live, otherwise nothing (and the link is not shown).
 */
export const loveHref = (site: SiteConfig, lang: Lang = 'en'): string | undefined => {
  if (site.kind === 'hub') return '/love'
  return hubLive() ? siteUrl(hub(), localPath(lang, '/love')) : undefined
}

/** The headings of the Like, Love, Lost, Labs feedback forms, shown in bold. */
const FORM_LABEL = /^(Like|Love|Lost|Labs):/

/** The writer's words, line by line, exactly as written. */
function Words({ text }: { text: string }) {
  return (
    <blockquote className="text-lg text-ink">
      {text.split('\n').map((line, i) => {
        // A blank line between paragraphs stays a visible gap.
        if (line.trim() === '') return <span key={i} aria-hidden="true" className="block h-3" />
        const label = FORM_LABEL.exec(line)?.[0]
        return (
          <span key={i} className="block">
            {label ? <strong className="font-semibold text-primary">{label}</strong> : null}
            {label ? line.slice(label.length) : line}
          </span>
        )
      })}
    </blockquote>
  )
}

function ProgrammeBadge({ slug }: { slug: string }) {
  if (!PROGRAMME_SLUGS.has(slug)) return null
  const home = getSite(slug)
  return (
    <span
      className={cn(
        'label inline-block rounded-pill px-2.5 py-1 text-[10px]',
        colourClass[home.colour].bg,
        colourClass[home.colour].on,
      )}
    >
      {home.name}
    </span>
  )
}

interface LoveCardProps {
  note: LoveNote
  /** The note's picture (the handwritten form or card) under the words. */
  showImage?: boolean
  /** Which programme it is about, on the hub's wall. */
  showProgramme?: boolean
}

function LoveCard({ note, showImage = false, showProgramme = false }: LoveCardProps) {
  const lang = useLang()
  const credit = (lang === 'ms' && note.ms?.credit) || note.credit
  const context = (lang === 'ms' && note.ms?.context) || note.context
  return (
    <figure className="flex h-full flex-col rounded-card bg-surface p-7 shadow-soft">
      <span aria-hidden="true" className="mb-2 font-heading text-6xl leading-none text-sun">
        &ldquo;
      </span>
      <Words text={note.text} />
      {credit || context || (showProgramme && PROGRAMME_SLUGS.has(note.programme)) ? (
        <figcaption className="mt-5 flex flex-col items-start gap-1.5">
          {credit ? <span className="font-semibold text-ink">{credit}</span> : null}
          {context ? <span className="text-sm text-ink/80">{context}</span> : null}
          {showProgramme ? <ProgrammeBadge slug={note.programme} /> : null}
        </figcaption>
      ) : null}
      {showImage && note.image ? (
        <div className="mt-5 overflow-hidden rounded-[18px] bg-paper-2 ring-1 ring-taupe/30 [&_picture]:contents">
          <Picture {...note.image} className="mx-auto h-auto max-h-96 w-auto object-contain" />
        </div>
      ) : null}
    </figure>
  )
}

/** The wall's link and the "Share your story" form link, where each exists. */
function LoveLinks({ site }: { site: SiteConfig }) {
  const t = useT()
  const lang = useLang()
  const wall = loveHref(site, lang)
  const form = loveFormUrl()
  if (!wall && !form) return null
  return (
    <Reveal className="mt-10 flex flex-wrap gap-3">
      {wall ? (
        wall.startsWith('/') ? (
          <Button to={wall} variant="outline" className="bg-surface">
            {t.seeTheWall}
          </Button>
        ) : (
          <Button href={wall} variant="outline" className="bg-surface">
            {t.seeTheWall}
          </Button>
        )
      ) : null}
      {form ? (
        <Button href={form} rel="noopener">
          {t.shareYourStory}
        </Button>
      ) : null}
    </Reveal>
  )
}

/** A few notes as words only, with links to the whole wall. For About and programme pages. */
export function LoveNotes({ site, notes }: { site: SiteConfig; notes: LoveNote[] }) {
  return (
    <>
      <RevealList as="ul" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notes.slice(0, 3).map((note) => (
          <RevealItem key={note.id} as="li" className="flex">
            <LoveCard note={note} />
          </RevealItem>
        ))}
      </RevealList>
      <LoveLinks site={site} />
    </>
  )
}

/** The programme page's band: a few of this programme's notes. Only rendered when it has some. */
export function LoveStrip({ site, notes }: { site: SiteConfig; notes: LoveNote[] }) {
  const t = useT()
  return (
    <Container>
      <Reveal>
        <SectionHeading title={t.fromOurWall} pose="heart-hug" className="mb-12" />
      </Reveal>
      <LoveNotes site={site} notes={notes} />
    </Container>
  )
}

/** iqrasaurus.com/love: every approved note, with a filter per programme. */
export function LoveWall({ site, notes }: { site: SiteConfig; notes: LoveNote[] }) {
  const t = useT()
  const [programme, setProgramme] = useState<string | null>(null)
  const present = new Set(notes.map((n) => n.programme))
  const filters = [
    ...programmes()
      .filter((p) => present.has(p.slug))
      .map((p) => ({ key: p.slug, name: p.name })),
    ...(present.has('hub') ? [{ key: 'hub', name: t.everyone }] : []),
  ]
  const shown = programme ? notes.filter((n) => n.programme === programme) : notes
  const form = loveFormUrl()

  return (
    <>
      <PageHeader title={t.wallOfLove} lede={t.wallOfLoveLede} pose="heart-hug" />
      <Section bg="surface" prev="paper" tight>
        <Container>
          {notes.length === 0 ? (
            <Reveal className="flex flex-col items-center gap-5 py-10 text-center">
              <Mascot pose="heart-hug" size={140} enter />
              <p className="max-w-md text-lg text-ink/80">{t.loveEmpty}</p>
            </Reveal>
          ) : (
            <>
              {filters.length > 1 ? (
                <div
                  role="group"
                  aria-label={t.filterByProgramme}
                  className="mb-8 flex flex-wrap gap-2"
                >
                  {[{ key: null, name: t.all }, ...filters].map((f) => {
                    const active = programme === f.key
                    return (
                      <button
                        key={f.key ?? 'all'}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setProgramme(f.key)}
                        className={cn(
                          'rounded-pill px-4 py-2 font-heading text-sm font-semibold transition-colors',
                          active
                            ? 'bg-primary text-on-primary'
                            : 'bg-primary-soft text-primary hover:bg-primary hover:text-on-primary',
                        )}
                      >
                        {f.name}
                      </button>
                    )
                  })}
                </div>
              ) : null}
              {/* Columns rather than a grid, so notes of every length sit close together. */}
              <RevealList
                key={programme ?? 'all'}
                as="ul"
                className="gap-6 md:columns-2 lg:columns-3"
              >
                {shown.map((note) => (
                  <RevealItem key={note.id} as="li" className="mb-6 break-inside-avoid">
                    <LoveCard note={note} showImage showProgramme={site.kind === 'hub'} />
                  </RevealItem>
                ))}
              </RevealList>
              <p className="mt-4 max-w-2xl text-sm text-ink/80">{t.loveHowWeShow}</p>
            </>
          )}
        </Container>
      </Section>
      {form ? (
        <Section bg="paper-2" prev="surface" tight>
          <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <Mascot pose="writing" size={120} className="shrink-0" />
            <Reveal className="max-w-2xl">
              <h2 className="font-heading text-3xl font-bold text-ink">{t.shareYourStory}</h2>
              <p className="mt-3 text-lg text-ink/80">{t.shareYourStoryLine}</p>
              <Button href={form} rel="noopener" className="mt-6">
                {t.shareYourStory}
              </Button>
            </Reveal>
          </Container>
        </Section>
      ) : null}
    </>
  )
}
