import { getSite } from '@iqra/config'
import { pageMeta, SpokeHome } from '@iqra/ui'
import { content } from '../../content'

const site = getSite('quraninvestigators')

export function meta() {
  return pageMeta(site, { ...content.seo, path: '/' })
}

export default function Home() {
  return <SpokeHome site={site} content={content} />
}
