import { getSite } from '@iqra/config'
import { NotFound } from '@iqra/ui'

const site = getSite('quraninvestigators')

export function meta() {
  return [{ title: `Page not found — ${site.name}` }, { name: 'robots', content: 'noindex' }]
}

export default function NotFoundRoute() {
  return <NotFound site={site} />
}
