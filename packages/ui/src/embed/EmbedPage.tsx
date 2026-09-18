import { brand, type SiteConfig } from '@iqra/config'
import { Container } from '../primitives/Container.tsx'
import { SectionHeading } from '../primitives/SectionHeading.tsx'
import { SafeEmbed } from './SafeEmbed.tsx'

interface EmbedPageProps {
  site: SiteConfig
  kind: 'journal' | 'chat'
}

/** The /journal and /chat pages: compact heading, then the embed filling the viewport. */
export function EmbedPage({ site, kind }: EmbedPageProps) {
  const embed = site[kind]
  const title = kind === 'journal' ? 'Journal' : 'Chat'
  return (
    <Container className="py-10 md:py-14">
      <SectionHeading eyebrow={site.name} title={title} level="h1" className="mb-6" />
      {kind === 'chat' ? (
        <p className="mb-6 rounded-card border border-taupe/40 bg-paper-2 px-5 py-4 text-sm text-ink/80">
          {brand.chatNotice}
        </p>
      ) : null}
      <SafeEmbed site={site} embed={embed} className="min-h-[calc(100svh-16rem)]" />
    </Container>
  )
}
