import { hub, siteMenu, siteUrl, toolkit, type SiteConfig } from '@iqra/config'

/** Absolute hub URL for a Band 1 link, or a router path when already on the hub. */
export const hubHref = (site: SiteConfig, path: string): string =>
  site.kind === 'hub' ? path : siteUrl(hub(), path)

/** Seven spokes in order, then the hub last. */
export const toolkitEntries = (): SiteConfig[] => {
  const all = toolkit()
  return [...all.filter((s) => s.kind === 'spoke'), ...all.filter((s) => s.kind === 'hub')]
}

export const toolkitLabel = (site: SiteConfig): string =>
  site.kind === 'hub' ? 'IqraSaurus Home' : site.name

export const anchorIds: string[] = siteMenu
  .filter((item) => item.type === 'anchor')
  .map((item) => item.target.slice(1))

export const SITE_MENU_ID = 'site-menu'

/** Height of the sticky menu band, for scroll offsets. Browser only. */
export const stickyOffset = (): number => document.getElementById(SITE_MENU_ID)?.offsetHeight ?? 0
