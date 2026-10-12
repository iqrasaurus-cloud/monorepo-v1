import { getSite, langOf, localized } from '@iqra/config'
import { HubWorkWithUs, pageMeta } from '@iqra/ui'
import { content } from '../../content'
import { contentMs } from '../../content.ms'

const site = getSite('hub')

export function meta({ location }: { location: { pathname: string } }) {
  const lang = langOf(location.pathname)
  const seo =
    lang === 'ms'
      ? localized(content.seo.workWithUs, contentMs.seo?.workWithUs)
      : content.seo.workWithUs
  return pageMeta(site, { ...seo, path: '/work-with-us' }, lang)
}

export default function WorkWithUs() {
  return (
    <HubWorkWithUs
      site={site}
      workWithUs={content.workWithUs}
      workWithUsMs={contentMs.workWithUs}
    />
  )
}
