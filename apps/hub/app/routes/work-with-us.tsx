import { getSite } from '@iqra/config'
import { HubWorkWithUs } from '@iqra/ui'
import { content } from '../../content'

const site = getSite('hub')

export function meta() {
  return [
    { title: content.seo.workWithUs.title },
    { name: 'description', content: content.seo.workWithUs.description },
  ]
}

export default function WorkWithUs() {
  return <HubWorkWithUs site={site} workWithUs={content.workWithUs} />
}
