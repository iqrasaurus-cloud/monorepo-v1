import { getSite, langOf, localized } from '@iqra/config'
import { HubHome, pageMeta } from '@iqra/ui'
import { content } from '../../content'
import { contentMs } from '../../content.ms'

const site = getSite('hub')

export function meta({ location }: { location: { pathname: string } }) {
  const lang = langOf(location.pathname)
  const seo = lang === 'ms' ? localized(content.seo.home, contentMs.seo?.home) : content.seo.home
  return pageMeta(site, { ...seo, path: '/' }, lang)
}

export default function Home() {
  return <HubHome site={site} content={content} contentMs={contentMs} />
}
