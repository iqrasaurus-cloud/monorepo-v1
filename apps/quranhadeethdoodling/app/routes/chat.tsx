import { getSite } from '@iqra/config'
import { EmbedPage, pageMeta } from '@iqra/ui'

const site = getSite('quranhadeethdoodling')

export function meta() {
  return pageMeta(site, { title: `Chat — ${site.name}`, path: '/chat' })
}

export default function Chat() {
  return <EmbedPage site={site} kind="chat" />
}
