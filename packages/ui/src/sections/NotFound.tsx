import type { SiteConfig } from '@iqra/config'
import { mascotImage } from '../layout/brand.ts'
import { Button } from '../primitives/Button.tsx'
import { Container } from '../primitives/Container.tsx'
import { Eyebrow } from '../primitives/Eyebrow.tsx'
import { Picture } from '../primitives/Picture.tsx'

interface NotFoundProps {
  site: SiteConfig
  message?: string
}

export function NotFound({ site, message }: NotFoundProps) {
  const mascot = mascotImage(site.mascot)
  return (
    <Container className="section flex flex-col items-center text-center">
      {site.mascotTone !== 'none' ? (
        <Picture {...mascot} priority className="mb-8 size-40 object-contain" />
      ) : null}
      <Eyebrow className="mb-4">{site.name}</Eyebrow>
      <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">
        {message ? 'Something went wrong' : 'Page not found'}
      </h1>
      <p className="mb-8 max-w-md text-lg text-ink/80">
        {message ?? 'That page is not here. It may have moved, or the address may be mistyped.'}
      </p>
      <Button to="/">Back to home</Button>
    </Container>
  )
}
