import { brand, hub, siteUrl, type SiteConfig } from '@iqra/config'
import { Link } from 'react-router'
import { Container } from '../primitives/Container.tsx'
import { Picture } from '../primitives/Picture.tsx'
import { Scallop } from '../primitives/Scallop.tsx'
import { cn } from '../utils/cn.ts'
import { brandImage } from './brand.ts'
import { hubLive, programmeTiles, toolTiles, type TileEntry } from './links.ts'

const heading = 'label mb-4 text-sun'
const link = 'link-sweep text-white/85 transition-colors hover:text-white'
const muted = 'text-white/45'

function TileList({ label, entries }: { label: string; entries: TileEntry[] }) {
  return (
    <nav aria-label={label}>
      <h2 className={heading}>{label}</h2>
      <ul className="space-y-2">
        {entries.map((entry) => (
          <li key={entry.key}>
            {entry.href === undefined ? (
              <span className={muted}>
                {entry.name}
                <span className="label block text-[10px]">Coming soon</span>
              </span>
            ) : entry.href.startsWith('/') ? (
              <Link to={entry.href} className={link} aria-current={entry.current ? 'page' : undefined}>
                {entry.name}
              </Link>
            ) : (
              <a href={entry.href} className={link}>
                {entry.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer({ site }: { site: SiteConfig }) {
  // The footer sits on plum, so it uses the owner-approved light logo (CLAUDE.md rule 9).
  const logo = brandImage('logo-horizontal-light')
  const year = new Date().getFullYear()
  const aboutPage = site.kind === 'hub' || hubLive()
  const verify = [
    { label: 'Verify ARS on MUIS', href: brand.verifyLinks.ars },
    { label: 'Verify IECP on MUIS', href: brand.verifyLinks.iecp },
  ].filter((v) => v.href !== '')

  return (
    <footer className="mt-20 md:mt-32">
      <Scallop flip className="text-plum" />
      <div className="bg-plum text-white">
        <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr_1.1fr]">
          <div>
            <Picture {...logo} className="h-auto w-full max-w-[240px] object-contain" />
            <p className="mt-5 font-heading text-lg font-semibold text-sun">{brand.tagline}</p>
            <p className="mt-1 text-white/85">{brand.motto}</p>
          </div>

          <TileList label="Programmes" entries={programmeTiles(site)} />
          <TileList label="Tools" entries={toolTiles()} />

          {/* The header's "About" item lands here until the hub's About page is live. */}
          <div id="about-iqrasaurus">
            <h2 className={heading}>About IqraSaurus</h2>
            <p className="text-white/85">{brand.credential}</p>
            {verify.length > 0 ? (
              <ul className="mt-3 space-y-1">
                {verify.map((v) => (
                  <li key={v.href}>
                    <a href={v.href} className={cn(link, 'text-sun hover:text-sun')} rel="noopener">
                      {v.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-3">
              {aboutPage ? (
                site.kind === 'hub' ? (
                  <Link to="/about" className={link}>
                    Our story, people and foundation
                  </Link>
                ) : (
                  <a href={siteUrl(hub(), '/about')} className={link}>
                    Our story, people and foundation
                  </a>
                )
              ) : (
                <span className={muted}>
                  Our story, people and foundation
                  <span className="label block text-[10px]">Coming soon</span>
                </span>
              )}
            </p>
          </div>

          {/* The header's "Work with us" item and the Donate placeholder land here. */}
          <div id="work-with-us">
            <h2 className={heading}>Work with us</h2>
            <ul className="space-y-2">
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
          </div>
        </Container>

        <Container className="border-t border-white/15 py-8 text-sm text-white/70">
          {site.kind === 'spoke' ? <p className="mb-4 max-w-4xl">{brand.disclaimer}</p> : null}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p>
              &copy; {year} {brand.name}. {brand.tagline}.
            </p>
            {site.kind === 'spoke' ? (
              <ul className="flex gap-5">
                <li>
                  <Link to="/journal" className={link}>
                    Journal
                  </Link>
                </li>
                <li>
                  <Link to="/chat" className={link}>
                    Ask our guide
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
