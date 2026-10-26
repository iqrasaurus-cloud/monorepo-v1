import { getSite, langOf } from '@iqra/config'
import { LoveWall, pageMeta, strings } from '@iqra/ui'
import { notes } from '../love.ts'

const site = getSite('hub')

export function meta({ location }: { location: { pathname: string } }) {
  const lang = langOf(location.pathname)
  return pageMeta(
    site,
    {
      title: `${strings[lang].wallOfLove} — ${site.name}`,
      description: strings[lang].wallOfLoveLede,
      path: '/love',
    },
    lang,
  )
}

export default function Love() {
  return <LoveWall site={site} notes={notes} />
}
