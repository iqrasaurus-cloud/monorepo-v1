import { brand, type SiteConfig } from '@iqra/config'
import { Container } from '../primitives/Container.tsx'
import { Eyebrow } from '../primitives/Eyebrow.tsx'
import { SafeEmbed } from './SafeEmbed.tsx'

interface EmbedPageProps {
  site: SiteConfig
  kind: 'journal' | 'chat'
}

/**
 * The /journal and /chat pages: a compact heading, then the embed filling the rest
 * of the screen edge to edge so it reads as part of the site, not a box inside it.
 */
export function EmbedPage({ site, kind }: EmbedPageProps) {
  const embed = site[kind]
  const title = kind === 'journal' ? 'Journal' : 'Chat'
  return (
    <>
      <Container className="flex flex-wrap items-end justify-between gap-4 py-6 md:py-8">
        <div>
          <Eyebrow className="mb-2">{site.name}</Eyebrow>
          <h1 className="font-heading text-3xl font-bold md:text-4xl">{title}</h1>
        </div>
        {kind === 'chat' ? (
          <p className="max-w-xl text-sm text-ink/70 md:text-right">{brand.chatNotice}</p>
        ) : null}
      </Container>
      <Container className="px-0 md:px-8">
        <SafeEmbed
          site={site}
          embed={embed}
          className="h-[calc(100svh-12rem)] min-h-[700px] md:h-[calc(100svh-15rem)]"
        />
      </Container>
    </>
  )
}
