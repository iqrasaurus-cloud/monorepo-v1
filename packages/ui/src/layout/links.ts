import {
  brand,
  hub,
  isPlaceholder,
  programmes,
  siteUrl,
  toolUrl,
  tools,
  type SiteConfig,
} from '@iqra/config'

/**
 * Links to iqrasaurus.com pages are switched on for every site at once by setting the
 * hub's status to 'live' in packages/config/src/spokes.ts.
 */
export const hubLive = (): boolean => hub().status === 'live'

/** A header "hub" item: the hub page once it is live, otherwise its footer block on this page. */
export const hubItemHref = (site: SiteConfig, path: string, fallback: string): string => {
  if (site.kind === 'hub') return path
  return hubLive() ? siteUrl(hub(), path) : fallback
}

/** The logo goes to the hub once it is live; until then, to this site's home. */
export const logoHref = (site: SiteConfig): string =>
  site.kind === 'spoke' && hubLive() ? siteUrl(hub()) : '/'

export const donateHref = (): string => brand.donate.href || '#work-with-us'

export interface TileEntry {
  key: string
  name: string
  /** Absent when the registry still holds a placeholder. */
  line?: string
  mascot: string
  /** Router path ('/'), in-page hash or absolute URL. Absent = coming soon. */
  href?: string
  current?: boolean
}

export const toolTiles = (): TileEntry[] =>
  tools.map((t) => ({
    key: t.slug,
    name: t.name,
    line: isPlaceholder(t.line) ? undefined : t.line,
    mascot: t.mascot,
    href: t.status === 'live' ? toolUrl(t) : undefined,
  }))

export const programmeTiles = (site: SiteConfig): TileEntry[] =>
  programmes().map((p) => {
    const current = p.slug === site.slug
    return {
      key: p.slug,
      name: p.name,
      line: isPlaceholder(p.description) ? undefined : p.description,
      mascot: p.mascot,
      href: p.status === 'live' ? (current ? '/' : siteUrl(p)) : undefined,
      current,
    }
  })

export const SITE_MENU_ID = 'site-menu'

/** Height of the sticky header, for scroll offsets. Browser only. */
export const stickyOffset = (): number => document.getElementById(SITE_MENU_ID)?.offsetHeight ?? 0
