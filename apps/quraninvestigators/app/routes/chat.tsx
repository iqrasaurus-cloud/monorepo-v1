import { getSite } from '@iqra/config'
import { EmbedPage } from '@iqra/ui'

const site = getSite('quraninvestigators')

export function meta() {
  return [{ title: `Chat — ${site.name}` }]
}

export default function Chat() {
  return <EmbedPage site={site} kind="chat" />
}
