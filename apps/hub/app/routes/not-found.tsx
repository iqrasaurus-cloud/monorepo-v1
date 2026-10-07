import { getSite } from '@iqra/config'
import { NotFound, pageMeta } from '@iqra/ui'

const site = getSite('hub')

export function meta() {
  return pageMeta(site, { title: `Page not found — ${site.name}`, path: '/404', noindex: true })
}

export default function NotFoundRoute() {
  return <NotFound site={site} />
}
