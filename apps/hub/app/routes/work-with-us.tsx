import { getSite } from '@iqra/config'
import { HubWorkWithUs, pageMeta } from '@iqra/ui'
import { content } from '../../content'

const site = getSite('hub')

export function meta() {
  return pageMeta(site, { ...content.seo.workWithUs, path: '/work-with-us' })
}

export default function WorkWithUs() {
  return <HubWorkWithUs site={site} workWithUs={content.workWithUs} />
}
