import { getSite, langOf } from '@iqra/config'
import { NotFound, pageMeta, strings } from '@iqra/ui'

const site = getSite('umrahforkids')

export function meta({ location }: { location: { pathname: string } }) {
  const lang = langOf(location.pathname)
  const title = `${strings[lang].pageNotFound} — ${site.name}`
  return pageMeta(site, { title, path: '/404', noindex: true }, lang)
}

export default function NotFoundRoute() {
  return <NotFound site={site} />
}
