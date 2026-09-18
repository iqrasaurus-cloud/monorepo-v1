import { hubMenu, type SiteConfig } from '@iqra/config'
import { Link } from 'react-router'
import { Container } from '../primitives/Container.tsx'
import { hubHref } from './links.ts'

const linkClass = 'link-sweep label py-2 text-white/85 transition-colors hover:text-white'

/** Band 1: hub links, identical on every site. Desktop only; the drawer carries them on mobile. */
export function UtilityStrip({ site }: { site: SiteConfig }) {
  return (
    <div className="hidden bg-plum text-white lg:block">
      <Container as="nav" aria-label="IqraSaurus" className="flex h-9 items-center justify-between">
        <ul className="flex items-center gap-7">
          {hubMenu.map((item) => (
            <li key={item.path}>
              {site.kind === 'hub' ? (
                <Link to={item.path} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <a href={hubHref(site, item.path)} className={linkClass}>
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        <div aria-hidden="true" />
      </Container>
    </div>
  )
}
