import { localized, type HubContent, type Overlay } from '@iqra/config'
import { useBrand, useLang, useT } from '../../i18n/lang.ts'
import { Reveal } from '../../motion/Reveal.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Scallop } from '../../primitives/Scallop.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'
import { cn } from '../../utils/cn.ts'
import { bgClass, type Bg } from '../spoke/helpers.ts'
import { PageHeader } from './PageHeader.tsx'

const contactButton =
  'inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3.5 font-heading text-base font-semibold transition duration-300 ease-reveal motion-safe:hover:-translate-y-0.5'

interface HubAiProps {
  ai: HubContent['ai']
  /** The Malay version from apps/hub/content.ms.ts. */
  aiMs?: Overlay<HubContent['ai']>
}

/** iqrasaurus.com/ai: what we use AI for, what we never use it for, and who checks. */
export function HubAi({ ai: english, aiMs }: HubAiProps) {
  const t = useT()
  const lang = useLang()
  const brand = useBrand()
  const ai = lang === 'ms' ? localized(english, aiMs) : english
  const bgs: Bg[] = ['surface', 'paper-2']

  return (
    <>
      <PageHeader title={t.howWeUseAi} lede={ai.lede} pose="laptop" />
      <Container className="relative pb-12">
        {/* Fixed wording, never translated (CLAUDE.md rule 3). */}
        <Reveal>
          <p className="max-w-3xl font-heading text-xl font-semibold text-ink">{brand.credential}</p>
        </Reveal>
      </Container>
      {ai.sections.map((section, i) => {
        const bg = bgs[i % 2] ?? 'surface'
        const previous: Bg = i === 0 ? 'paper' : (bgs[(i - 1) % 2] ?? 'surface')
        return (
          <div key={section.title} className={cn(bgClass[bg], 'relative')}>
            <Scallop className={bgClass[previous]} />
            <section className="section">
              <Container>
                <Reveal>
                  <SectionHeading title={section.title} className="mb-8" />
                </Reveal>
                <div className="max-w-3xl space-y-5 text-lg text-ink/80">
                  {section.paragraphs?.map((p) => (
                    <Reveal key={p}>
                      <p>{p}</p>
                    </Reveal>
                  ))}
                  {section.items ? (
                    <Reveal>
                      <ul className="space-y-4">
                      {section.items.map((item) => (
                        <li key={item.lead} className="flex gap-3">
                          <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full bg-primary" />
                          <span>
                            <strong className="font-semibold text-ink">{item.lead}</strong>
                            {item.text ? ` ${item.text}` : ''}
                          </span>
                        </li>
                      ))}
                      </ul>
                    </Reveal>
                  ) : null}
                  {section.contact ? (
                    <Reveal className="flex flex-wrap gap-3 pt-2">
                      <a
                        href={brand.contact.whatsappHref}
                        rel="noopener"
                        className={cn(contactButton, 'bg-sun text-on-sun shadow-soft hover:bg-sun/85')}
                      >
                        WhatsApp {brand.contact.whatsapp}
                      </a>
                      <a
                        href={`mailto:${brand.contact.email}`}
                        className={cn(contactButton, 'border border-taupe/60 bg-surface text-primary hover:border-primary')}
                      >
                        {brand.contact.email}
                      </a>
                    </Reveal>
                  ) : null}
                </div>
              </Container>
            </section>
          </div>
        )
      })}
      <Container className="pb-16 pt-2">
        <p className="text-sm text-ink/70">{ai.updated}</p>
      </Container>
    </>
  )
}
