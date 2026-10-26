import { hub, localPath, siteUrl, stripLang, type SiteConfig } from '@iqra/config'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router'
import { useBrand, useLang, useT } from '../i18n/lang.ts'
import { Link } from '../i18n/Link.tsx'
import { Mascot } from '../mascot/Mascot.tsx'
import { RevealItem, RevealList } from '../motion/Reveal.tsx'
import { asPose, colourClass } from '../primitives/colours.ts'
import { Container } from '../primitives/Container.tsx'
import { Pattern } from '../primitives/Pattern.tsx'
import { Picture } from '../primitives/Picture.tsx'
import { Scallop } from '../primitives/Scallop.tsx'
import { cn } from '../utils/cn.ts'
import { brandImage } from './brand.ts'
import { hubLive, programmeTiles, toolTiles, type TileEntry } from './links.ts'

const heading = 'label mb-5 text-sun'
const link = 'link-sweep text-on-plum/85 transition-colors hover:text-on-plum'
// 60% on-plum on plum is 5.9:1, above the AA minimum of 4.5:1.
const muted = 'text-on-plum/60'
const soonBadge =
  'label shrink-0 rounded-pill bg-on-plum/10 px-2 py-0.5 text-[10px] text-on-plum/70'

/** One row in a footer list: the name, and a small "Soon" badge on the same line. */
function Row({ entry }: { entry: TileEntry }) {
  const t = useT()
  if (entry.href === undefined) {
    return (
      <span className={cn('flex items-center justify-between gap-3', muted)}>
        {entry.name}
        <span className={soonBadge}>{t.soon}</span>
      </span>
    )
  }
  return entry.href.startsWith('/') ? (
    <Link to={entry.href} className={link} aria-current={entry.current ? 'page' : undefined}>
      {entry.name}
    </Link>
  ) : (
    <a href={entry.href} className={link}>
      {entry.name}
    </a>
  )
}

function Column({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <div id={id}>
      <h2 className={heading}>{title}</h2>
      {children}
    </div>
  )
}

/** Every programme as a dino card: the clearest sign that each site is part of one family. */
function FamilyBand({ site }: { site: SiteConfig }) {
  const t = useT()
  const tiles = programmeTiles(site, useLang())
  return (
    <nav id="iqrasaurus-family" aria-label={t.programmesNav} className="scroll-mt-24 pb-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label mb-3 text-sun">{t.family}</p>
          <p className="font-heading text-3xl font-bold text-on-plum md:text-4xl">
            {t.everyProgramme}
          </p>
        </div>
      </div>
      <RevealList as="ul" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map((entry) => {
          const live = entry.href !== undefined
          const inner = (
            <>
              <span
                className={cn(
                  'mb-3 flex size-20 items-end justify-center overflow-hidden rounded-full',
                  live ? colourClass[entry.colour].bg : 'bg-on-plum/10',
                )}
              >
                <Mascot
                  pose={asPose(entry.pose)}
                  size={68}
                  className={cn('iq-mascot-hover translate-y-1.5', !live && 'opacity-70')}
                />
              </span>
              <span className="font-heading text-base font-semibold leading-tight text-on-plum">
                {entry.name}
              </span>
              <span className="mt-1.5">
                {entry.current ? (
                  <span className="label rounded-pill bg-sun px-2 py-0.5 text-[10px] text-on-sun">
                    {t.youAreHere}
                  </span>
                ) : live ? (
                  <span className="label text-[10px] text-sun">{t.visit}</span>
                ) : (
                  <span className={soonBadge}>{t.comingSoon}</span>
                )}
              </span>
            </>
          )
          const card = cn(
            'group flex h-full flex-col items-center rounded-card p-4 text-center transition duration-300 ease-reveal',
            entry.current ? 'bg-on-plum/10 ring-2 ring-sun' : 'bg-on-plum/[0.05]',
            live && !entry.current && 'hover:bg-on-plum/10 motion-safe:hover:-translate-y-1',
          )
          return (
            <RevealItem key={entry.key} as="li">
              {entry.href === undefined ? (
                <div className={card}>{inner}</div>
              ) : entry.href.startsWith('/') ? (
                <Link
                  to={entry.href}
                  className={card}
                  aria-current={entry.current ? 'page' : undefined}
                >
                  {inner}
                </Link>
              ) : (
                <a href={entry.href} className={card}>
                  {inner}
                </a>
              )}
            </RevealItem>
          )
        })}
      </RevealList>
    </nav>
  )
}

function YouTubeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M10 9l5 3-5 3z" fill="currentColor" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  )
}

export function Footer({ site }: { site: SiteConfig }) {
  const { pathname } = useLocation()
  const lang = useLang()
  const t = useT()
  const brand = useBrand()
  // The hub's home page already shows every programme just above the footer.
  const showFamily = !(site.kind === 'hub' && stripLang(pathname) === '/')
  // The footer sits on plum, so it uses the owner-approved light logo (CLAUDE.md rule 9).
  const logo = brandImage('logo-horizontal-light')
  const year = new Date().getFullYear()
  const aboutPage = site.kind === 'hub' || hubLive()
  const verify = [
    { label: t.verifyArs, href: brand.verifyLinks.ars },
    { label: t.verifyIecp, href: brand.verifyLinks.iecp },
  ].filter((v) => v.href !== '')
  const social = [
    { label: 'YouTube', href: brand.social.youtube, icon: <YouTubeIcon /> },
    { label: 'Instagram', href: brand.social.instagram, icon: <InstagramIcon /> },
  ]

  return (
    <footer>
      {/* Overlaps the last section, so its background shows between the scallops; invisible
          when that section is plum too. */}
      <Scallop flip className="relative -mt-6 bg-plum" />
      <div className="relative overflow-hidden bg-plum text-on-plum">
        <Pattern className="bg-on-plum/[0.04]" />
        <Container className="relative pt-14 md:pt-20">
          {showFamily ? <FamilyBand site={site} /> : null}

          <div
            className={cn(
              'grid gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.1fr] lg:gap-12',
              showFamily && 'border-t border-on-plum/15 pt-14',
            )}
          >
            <div>
              <Picture {...logo} className="h-auto w-full max-w-[220px] object-contain" />
              <p className="mt-5 font-heading text-lg font-semibold text-sun">{brand.tagline}</p>
              <p className="mt-1 text-on-plum/85">{brand.motto}</p>
              <ul className="mt-6 flex gap-2">
                {social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      rel="noopener"
                      aria-label={`${brand.name} ${t.onSocial} ${s.label}`}
                      className="flex size-10 items-center justify-center rounded-full bg-on-plum/10 text-on-plum transition duration-300 hover:bg-sun hover:text-on-sun"
                    >
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Column title={t.tools}>
              <ul className="max-w-[220px] space-y-2.5">
                {toolTiles(lang).map((entry) => (
                  <li key={entry.key}>
                    <Row entry={entry} />
                  </li>
                ))}
              </ul>
            </Column>

            {/* The header's "About" item lands here until the hub's About page is live. */}
            <Column id="about-iqrasaurus" title={t.aboutBrand}>
              <p className="text-on-plum/85">{brand.credential}</p>
              {verify.length > 0 ? (
                <ul className="mt-3 space-y-1">
                  {verify.map((v) => (
                    <li key={v.href}>
                      <a
                        href={v.href}
                        className={cn(link, 'text-sun hover:text-sun')}
                        rel="noopener"
                      >
                        {v.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="mt-4">
                {aboutPage ? (
                  site.kind === 'hub' ? (
                    <Link to="/about" className={link}>
                      {t.storyPeople}
                    </Link>
                  ) : (
                    <a href={siteUrl(hub(), localPath(lang, '/about'))} className={link}>
                      {t.storyPeople}
                    </a>
                  )
                ) : (
                  <span className={cn('flex items-center gap-3', muted)}>
                    {t.storyPeople}
                    <span className={soonBadge}>{t.soon}</span>
                  </span>
                )}
              </p>
              {aboutPage ? (
                <p className="mt-2.5">
                  {site.kind === 'hub' ? (
                    <Link to="/ai" className={link}>
                      {t.howWeUseAi}
                    </Link>
                  ) : (
                    <a href={siteUrl(hub(), localPath(lang, '/ai'))} className={link}>
                      {t.howWeUseAi}
                    </a>
                  )}
                </p>
              ) : null}
              {aboutPage ? (
                <p className="mt-2.5">
                  {site.kind === 'hub' ? (
                    <Link to="/love" className={link}>
                      {t.wallOfLove}
                    </Link>
                  ) : (
                    <a href={siteUrl(hub(), localPath(lang, '/love'))} className={link}>
                      {t.wallOfLove}
                    </a>
                  )}
                </p>
              ) : null}
            </Column>

            {/* The header's "Work with us" item and the Donate placeholder land here. */}
            <Column id="work-with-us" title={t.workWithUs}>
              <ul className="space-y-2.5">
                <li>
                  <a href={brand.contact.whatsappHref} className={link} rel="noopener">
                    WhatsApp {brand.contact.whatsapp}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${brand.contact.email}`} className={link}>
                    {brand.contact.email}
                  </a>
                </li>
              </ul>
            </Column>
          </div>
        </Container>

        <Container className="relative border-t border-on-plum/15 py-8 text-sm text-on-plum/70">
          {site.kind === 'spoke' ? <p className="mb-5 max-w-4xl">{brand.disclaimer}</p> : null}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p>
              &copy; {year} {brand.name}. {brand.tagline}.
            </p>
            {site.kind === 'spoke' ? (
              <ul className="flex gap-5">
                <li>
                  <Link to="/journal" className={link}>
                    {t.journal}
                  </Link>
                </li>
                <li>
                  <Link to="/chat" className={link}>
                    {t.askOurGuide}
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </Container>
      </div>
    </footer>
  )
}
