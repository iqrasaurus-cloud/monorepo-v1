import { brand, isPlaceholder, type HubContent, type SiteConfig } from '@iqra/config'
import { programmeTiles } from '../../layout/links.ts'
import { MenuTile } from '../../layout/MenuTile.tsx'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Scallop } from '../../primitives/Scallop.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'
import { cn } from '../../utils/cn.ts'
import { PageHeader } from './PageHeader.tsx'

const contactButton =
  'inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3.5 font-heading text-base font-semibold transition duration-300 ease-reveal motion-safe:hover:-translate-y-0.5'

interface HubWorkWithUsProps {
  site: SiteConfig
  workWithUs: HubContent['workWithUs']
}

/** iqrasaurus.com/work-with-us: how to get in touch and which programmes to bring in. */
export function HubWorkWithUs({ site, workWithUs }: HubWorkWithUsProps) {
  return (
    <>
      <PageHeader
        title="Work with us"
        lede={!isPlaceholder(workWithUs.body) ? workWithUs.body : undefined}
      />
      <Container className="-mt-6 pb-4">
        <Reveal className="flex flex-wrap gap-3">
          <a
            href={brand.contact.whatsappHref}
            rel="noopener"
            className={cn(contactButton, 'bg-sun text-plum shadow-soft hover:bg-sun/85')}
          >
            WhatsApp {brand.contact.whatsapp}
          </a>
          <a
            href={`mailto:${brand.contact.email}`}
            className={cn(contactButton, 'border border-taupe/60 bg-white text-primary hover:border-primary')}
          >
            {brand.contact.email}
          </a>
        </Reveal>
      </Container>

      <div className="relative mt-16 bg-white">
        <Scallop className="text-paper" />
        <section className="section">
          <Container>
            <Reveal>
              <SectionHeading title="Bring a programme to your class" className="mb-10" />
            </Reveal>
            <RevealList as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {programmeTiles(site).map((entry) => (
                <RevealItem key={entry.key} as="li">
                  <MenuTile entry={entry} />
                </RevealItem>
              ))}
            </RevealList>
          </Container>
        </section>
      </div>
    </>
  )
}
