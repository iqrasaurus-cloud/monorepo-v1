import { getSite } from '@iqra/config'
import { SpokeHome } from '@iqra/ui'
import { content } from '../../content'

const site = getSite('quraninvestigators')

export function meta() {
  return [{ title: content.seo.title }, { name: 'description', content: content.seo.description }]
}

export default function Home() {
  return <SpokeHome site={site} content={content} />
}
