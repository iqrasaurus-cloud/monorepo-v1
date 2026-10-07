import { getSite } from '@iqra/config'
import { HubAbout, pageMeta } from '@iqra/ui'
import { content } from '../../content'

const site = getSite('hub')

export function meta() {
  return pageMeta(site, { ...content.seo.about, path: '/about' })
}

export default function About() {
  return <HubAbout site={site} about={content.about} />
}
