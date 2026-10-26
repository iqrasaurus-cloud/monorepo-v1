import { getSite, langOf, localized } from '@iqra/config'
import { HubAbout, pageMeta } from '@iqra/ui'
import { content } from '../../content'
import { contentMs } from '../../content.ms'
import { notes } from '../love.ts'

const site = getSite('hub')

export function meta({ location }: { location: { pathname: string } }) {
  const lang = langOf(location.pathname)
  const seo = lang === 'ms' ? localized(content.seo.about, contentMs.seo?.about) : content.seo.about
  return pageMeta(site, { ...seo, path: '/about' }, lang)
}

export default function About() {
  return <HubAbout site={site} about={content.about} aboutMs={contentMs.about} love={notes} />
}
