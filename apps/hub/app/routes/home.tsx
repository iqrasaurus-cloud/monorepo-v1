import { getSite } from '@iqra/config'
import { HubHome } from '@iqra/ui'
import { content } from '../../content'

const site = getSite('hub')

export function meta() {
  return [
    { title: content.seo.home.title },
    { name: 'description', content: content.seo.home.description },
  ]
}

export default function Home() {
  return <HubHome site={site} content={content} />
}
