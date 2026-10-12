import { getSite, langOf } from '@iqra/config'
import { EmbedPage, pageMeta, strings } from '@iqra/ui'

const site = getSite('umrahforkids')

export function meta({ location }: { location: { pathname: string } }) {
  const lang = langOf(location.pathname)
  return pageMeta(site, { title: `${strings[lang].chat} — ${site.name}`, path: '/chat' }, lang)
}

export default function Chat() {
  return <EmbedPage site={site} kind="chat" />
}
