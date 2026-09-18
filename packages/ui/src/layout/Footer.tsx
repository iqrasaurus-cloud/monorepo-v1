import { brand, hubMenu, siteUrl, type SiteConfig } from '@iqra/config'
import { Link } from 'react-router'
import { Container } from '../primitives/Container.tsx'
import { Picture } from '../primitives/Picture.tsx'
import { Scallop } from '../primitives/Scallop.tsx'
import { cn } from '../utils/cn.ts'
import { brandImage } from './brand.ts'
import { hubHref, toolkitEntries, toolkitLabel } from './links.ts'
import { ComingSoonPill } from './ToolkitMegaMenu.tsx'

const heading = 'label mb-4 text-sun'
const link = 'link-sweep text-white/85 transition-colors hover:text-white'

export function Footer({ site }: { site: SiteConfig }) {
  const logo = brandImage('logo-square')
  const year = new Date().getFullYear()
  const verify = [
    { label: 'Verify ARS on MUIS', href: brand.verifyLinks.ars },
    { label: 'Verify IECP on MUIS', href: brand.verifyLinks.iecp },
  ].filter((v) => v.href !== '')

  return (
    <footer className="mt-20 md:mt-32">
      <Scallop flip className="text-plum" />
      <div className="bg-plum text-white">
        <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Picture {...logo} className="h-36 w-auto object-contain" />
            <p className="mt-5 font-heading text-lg font-semibold text-sun">{brand.tagline}</p>
            <p className="mt-1 text-white/85">{brand.motto}</p>
          </div>

          <nav aria-label="IqraSaurus">
            <h2 className={heading}>IqraSaurus</h2>
            <ul className="space-y-2">
              {hubMenu.map((item) => (
                <li key={item.path}>
                  {site.kind === 'hub' ? (
                    <Link to={item.path} className={link}>
                      {item.label}
                    </Link>
                  ) : (
                    <a href={hubHref(site, item.path)} className={link}>
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Toolkit">
            <h2 className={heading}>Toolkit</h2>
            <ul className="space-y-2">
              {toolkitEntries().map((entry) => (
                <li key={entry.slug} className="flex items-center gap-2">
                  {entry.status === 'live' ? (
                    entry.slug === site.slug ? (
                      <Link to="/" className={link} aria-current="true">
                        {toolkitLabel(entry)}
                      </Link>
                    ) : (
                      <a href={siteUrl(entry)} className={link}>
                        {toolkitLabel(entry)}
                      </a>
                    )
                  ) : (
                    <>
                      <span className="text-white/45">{toolkitLabel(entry)}</span>
                      <ComingSoonPill />
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={heading}>Trust</h2>
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
          </div>
        </Container>

        <Container className="border-t border-white/15 py-8 text-sm text-white/70">
          {site.kind === 'spoke' ? <p className="mb-4 max-w-4xl">{brand.disclaimer}</p> : null}
          <p>
            &copy; {year} {brand.name}. {brand.tagline}.
          </p>
        </Container>
      </div>
    </footer>
  )
}
