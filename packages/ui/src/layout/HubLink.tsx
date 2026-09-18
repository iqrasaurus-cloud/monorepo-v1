import type { SiteConfig } from '@iqra/config'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { hubHref, hubLive } from './links.ts'

interface HubLinkProps {
  site: SiteConfig
  path: string
  className?: string
  children: ReactNode
  onClick?: () => void
}

/**
 * A link to a hub page. On the hub it is a router link; on spokes it is a plain
 * <a href="https://iqrasaurus.com/..."> — but only once the hub is live in the registry.
 */
export function HubLink({ site, path, className, children, onClick }: HubLinkProps) {
  if (site.kind === 'hub') {
    return (
      <Link to={path} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }
  if (!hubLive()) {
    return (
      <span className={className} aria-disabled="true" title="Coming soon">
        {children}
      </span>
    )
  }
  return (
    <a href={hubHref(site, path)} className={className}>
      {children}
    </a>
  )
}
