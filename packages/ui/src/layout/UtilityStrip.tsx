import { hubMenu, type SiteConfig } from '@iqra/config'
import { Container } from '../primitives/Container.tsx'
import { cn } from '../utils/cn.ts'
import { HubLink } from './HubLink.tsx'
import { hubLive } from './links.ts'

/** Band 1: hub links, identical on every site. Desktop only; the drawer carries them on mobile. */
export function UtilityStrip({ site }: { site: SiteConfig }) {
  const active = site.kind === 'hub' || hubLive()
  return (
    <div className="hidden bg-plum text-white lg:block">
      <Container as="nav" aria-label="IqraSaurus" className="flex h-9 items-center justify-between">
        <ul className="flex items-center gap-7">
          {hubMenu.map((item) => (
            <li key={item.path}>
              <HubLink
                site={site}
                path={item.path}
                className={cn(
                  'label py-2',
                  active
                    ? 'link-sweep text-white/85 transition-colors hover:text-white'
                    : 'text-white/60',
                )}
              >
                {item.label}
              </HubLink>
            </li>
          ))}
        </ul>
        <div aria-hidden="true" />
      </Container>
    </div>
  )
}
