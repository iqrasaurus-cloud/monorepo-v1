import { getSite } from '@iqra/config'
import { EmbedPage } from '@iqra/ui'

const site = getSite('quraninvestigators')

export function meta() {
  return [{ title: `Journal — ${site.name}` }]
}

export default function Journal() {
  return <EmbedPage site={site} kind="journal" />
}
