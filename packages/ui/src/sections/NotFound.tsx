import type { SiteConfig } from '@iqra/config'
import { useT } from '../i18n/lang.ts'
import { Mascot } from '../mascot/Mascot.tsx'
import { Button } from '../primitives/Button.tsx'
import { Container } from '../primitives/Container.tsx'
import { Eyebrow } from '../primitives/Eyebrow.tsx'

interface NotFoundProps {
  site: SiteConfig
  message?: string
}

export function NotFound({ site, message }: NotFoundProps) {
  const t = useT()
  return (
    <Container className="section flex flex-col items-center text-center">
      {site.mascotTone !== 'none' ? (
        <Mascot pose="wondering" size={160} motion="tilt" priority className="mb-8" />
      ) : null}
      <Eyebrow className="mb-4">{site.name}</Eyebrow>
      <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">
        {message ? t.somethingWentWrong : t.pageNotFound}
      </h1>
      <p className="mb-8 max-w-md text-lg text-ink/80">{message ?? t.pageNotFoundBody}</p>
      <Button to="/">{t.backToHome}</Button>
    </Container>
  )
}
