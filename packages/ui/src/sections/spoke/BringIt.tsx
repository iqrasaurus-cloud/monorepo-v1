import { isPlaceholder, type SiteConfig, type SpokeContent } from '@iqra/config'
import { useBrand, useT } from '../../i18n/lang.ts'
import { DonateButton } from '../../layout/HeaderParts.tsx'
import { Reveal } from '../../motion/Reveal.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Pattern } from '../../primitives/Pattern.tsx'
import { Mascot } from '../../mascot/Mascot.tsx'
import { cn } from '../../utils/cn.ts'

const contactButton =
  'inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3.5 font-heading text-base font-semibold transition duration-300 ease-reveal motion-safe:hover:-translate-y-0.5'

interface BringItProps {
  site: SiteConfig
  bringIt: SpokeContent['bringIt']
}

/** Section 5: how to bring the programme to a class, donations and the credential line. */
export function BringIt({ site, bringIt }: BringItProps) {
  const t = useT()
  const brand = useBrand()
  return (
    <div className="relative">
      <Pattern className="bg-on-plum/[0.05]" />
      <Container className="relative max-w-3xl text-center text-on-plum">
        <Reveal>
          {site.mascotTone !== 'none' ? (
            <div className="mb-4 flex justify-center">
              <Mascot
                pose="waving-wink"
                size={130}
                motion={site.mascotTone === 'playful' ? 'nod' : 'none'}
                overlay="hearts"
              />
            </div>
          ) : null}
          <h2 className="font-heading text-4xl font-bold text-on-plum md:text-5xl">
            {t.bringItToYourClass}
          </h2>
          {!isPlaceholder(bringIt.body) ? (
            <p className="mx-auto mt-5 max-w-2xl text-lg text-on-plum/85 md:text-xl">
              {bringIt.body}
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={brand.contact.whatsappHref}
            rel="noopener"
            className={cn(
              contactButton,
              'bg-sun text-on-sun shadow-[0_4px_0_rgb(var(--plum-rgb)/0.35)] hover:brightness-105 active:translate-y-1 active:shadow-none',
            )}
          >
            WhatsApp {brand.contact.whatsapp}
          </a>
          <a
            href={`mailto:${brand.contact.email}`}
            className={cn(
              contactButton,
              'border border-on-plum/40 text-on-plum hover:border-on-plum',
            )}
          >
            {brand.contact.email}
          </a>
        </Reveal>

        {!isPlaceholder(bringIt.donateLine) ? (
          <Reveal
            delay={0.15}
            className="mt-12 flex flex-col items-center gap-4 border-t border-on-plum/15 pt-10 sm:flex-row sm:justify-center"
          >
            <p className="text-on-plum/85">{bringIt.donateLine}</p>
            <DonateButton />
          </Reveal>
        ) : null}

        <Reveal delay={0.2}>
          <p className="mt-10 text-sm text-on-plum/70">{brand.credential}</p>
        </Reveal>
      </Container>
    </div>
  )
}
