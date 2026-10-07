import { brand, hub, isPlaceholder, siteUrl, type SiteConfig } from '@iqra/config'
import type { MetaDescriptor } from 'react-router'

interface PageSeo {
  title: string
  /** Falls back to the site's registry description. A placeholder is dropped. */
  description?: string
  /** Route path, e.g. '/' or '/journal'. Used for the canonical URL. */
  path: string
  /** Keep this page out of search results (the 404 page). */
  noindex?: boolean
}

/** JSON-LD for the home page: `Organization` on the hub, `WebSite` on a programme. */
const structuredData = (site: SiteConfig, description: string | undefined) => {
  const organization = {
    '@type': 'Organization',
    name: brand.name,
    url: siteUrl(hub()),
    logo: siteUrl(hub(), '/brand/logo-square-640.png'),
    email: brand.contact.email,
  }
  if (site.kind === 'hub') {
    return { '@context': 'https://schema.org', ...organization, description }
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: siteUrl(site),
    description,
    publisher: organization,
  }
}

/**
 * Every tag a page needs for search and link previews: title, description, canonical,
 * Open Graph, Twitter card, and robots. Sites that are still `coming-soon` are noindex,
 * so a preview deployment never competes with the real site in search.
 */
export function pageMeta(site: SiteConfig, page: PageSeo): MetaDescriptor[] {
  const raw = page.description ?? site.description
  const description = isPlaceholder(raw) ? undefined : raw
  const url = siteUrl(site, page.path)
  const image = siteUrl(site, '/brand/og.png')
  const noindex = page.noindex === true || site.status === 'coming-soon'

  const tags: MetaDescriptor[] = [
    { title: page.title },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: brand.name },
    { property: 'og:title', content: page.title },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: site.name },
    { property: 'og:locale', content: 'en_SG' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: page.title },
    { name: 'twitter:image', content: image },
  ]
  // A noindex page (the 404) has no address of its own to claim.
  if (!page.noindex) tags.push({ tagName: 'link', rel: 'canonical', href: url })
  if (description) {
    tags.push(
      { name: 'description', content: description },
      { property: 'og:description', content: description },
      { name: 'twitter:description', content: description },
    )
  }
  if (noindex) tags.push({ name: 'robots', content: 'noindex' })
  if (page.path === '/' && !page.noindex) {
    tags.push({ 'script:ld+json': structuredData(site, description) })
  }
  return tags
}
