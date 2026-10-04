import { getSite } from '@iqra/config'
import { HubAbout } from '@iqra/ui'
import { content } from '../../content'

const site = getSite('hub')

export function meta() {
  return [
    { title: content.seo.about.title },
    { name: 'description', content: content.seo.about.description },
  ]
}

export default function About() {
  return <HubAbout site={site} about={content.about} />
}
