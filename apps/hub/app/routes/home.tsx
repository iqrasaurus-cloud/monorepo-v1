import { getSite } from '@iqra/config'
import { HubHome, pageMeta } from '@iqra/ui'
import { content } from '../../content'

const site = getSite('hub')

export function meta() {
  return pageMeta(site, { ...content.seo.home, path: '/' })
}

export default function Home() {
  return <HubHome site={site} content={content} />
}
