import { getSite } from '@iqra/config'
import { EmbedPage, pageMeta } from '@iqra/ui'

const site = getSite('quraninvestigators')

export function meta() {
  return pageMeta(site, { title: `Journal — ${site.name}`, path: '/journal' })
}

export default function Journal() {
  return <EmbedPage site={site} kind="journal" />
}
