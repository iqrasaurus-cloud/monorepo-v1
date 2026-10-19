import { getSite, langOf, localized } from '@iqra/config'
import { HubAi, pageMeta } from '@iqra/ui'
import { content } from '../../content'
import { contentMs } from '../../content.ms'

const site = getSite('hub')

export function meta({ location }: { location: { pathname: string } }) {
  const lang = langOf(location.pathname)
  const seo = lang === 'ms' ? localized(content.seo.ai, contentMs.seo?.ai) : content.seo.ai
  return pageMeta(site, { ...seo, path: '/ai' }, lang)
}

export default function Ai() {
  return <HubAi ai={content.ai} aiMs={contentMs.ai} />
}
