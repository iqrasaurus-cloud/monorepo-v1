import {
  brand,
  localPath,
  type Colour,
  type Lang,
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
export const hubItemHref = (
  site: SiteConfig,
  path: string,
  fallback: string,
  lang: Lang = 'en',
): string => {
  if (site.kind === 'hub') return path
  return hubLive() ? siteUrl(hub(), localPath(lang, path)) : fallback
}

/** The logo goes to the hub once it is live; until then, to this site's home. */
export const logoHref = (site: SiteConfig, lang: Lang = 'en'): string =>
  site.kind === 'spoke' && hubLive() ? siteUrl(hub(), localPath(lang, '/')) : '/'

export const donateHref = (): string => brand.donate.href || '#work-with-us'

export interface TileEntry {
  key: string
  name: string
  /** Absent when the registry still holds a placeholder. */
  line?: string
  mascot: string
  /** Pose from the dino library. */
  pose: string
  colour: Colour
  /** Router path ('/'), in-page hash or absolute URL. Absent = coming soon. */
  href?: string
  current?: boolean
}

export const toolTiles = (lang: Lang = 'en'): TileEntry[] =>
  tools.map((t) => {
    const line = (lang === 'ms' && t.ms?.line) || t.line
    return {
      key: t.slug,
      name: t.name,
      line: isPlaceholder(line) ? undefined : line,
      mascot: t.mascot,
      pose: t.pose,
      colour: t.colour,
      href: t.status === 'live' ? toolUrl(t) : undefined,
    }
  })

export const programmeTiles = (site: SiteConfig, lang: Lang = 'en'): TileEntry[] =>
  programmes().map((p) => {
    const current = p.slug === site.slug
    const line = (lang === 'ms' && p.ms?.description) || p.description
    return {
      key: p.slug,
      name: p.name,
      line: isPlaceholder(line) ? undefined : line,
      mascot: p.mascot,
      pose: p.pose,
      colour: p.colour,
      href: p.status === 'live' ? (current ? '/' : siteUrl(p, localPath(lang, '/'))) : undefined,
      current,
    }
  })

export const SITE_MENU_ID = 'site-menu'

/** Height of the sticky header, for scroll offsets. Browser only. */
export const stickyOffset = (): number => document.getElementById(SITE_MENU_ID)?.offsetHeight ?? 0
