import { brand, isPlaceholder, type SiteConfig, type SpokeContent } from '@iqra/config'
import { mascotImage } from '../../layout/brand.ts'
import { DonateButton } from '../../layout/HeaderParts.tsx'
import { Reveal } from '../../motion/Reveal.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Pattern } from '../../primitives/Pattern.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { cn } from '../../utils/cn.ts'

const contactButton =
  'inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3.5 font-heading text-base font-semibold transition duration-300 ease-reveal motion-safe:hover:-translate-y-0.5'

interface BringItProps {
  site: SiteConfig
  bringIt: SpokeContent['bringIt']
}

/** Section 5: how to bring the programme to a class, donations and the credential line. */
export function BringIt({ site, bringIt }: BringItProps) {
  const mascot = mascotImage(site.mascot, 320)
  return (
    <div className="relative">
      <Pattern className="text-white opacity-[0.06]" />
      <Container className="relative max-w-3xl text-center text-white">
        <Reveal>
          {site.mascotTone !== 'none' ? (
            <Picture
              {...mascot}
              className={cn(
                'mx-auto mb-6 w-28 object-contain md:w-32',
                site.mascotTone === 'playful' && 'motion-safe:animate-float',
              )}
            />
          ) : null}
          <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
            Bring it to your class
          </h2>
          {!isPlaceholder(bringIt.body) ? (
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85 md:text-xl">{bringIt.body}</p>
          ) : null}
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={brand.contact.whatsappHref}
            rel="noopener"
            className={cn(contactButton, 'bg-sun text-plum shadow-soft hover:bg-sun/85')}
          >
            WhatsApp {brand.contact.whatsapp}
          </a>
          <a
            href={`mailto:${brand.contact.email}`}
            className={cn(contactButton, 'border border-white/40 text-white hover:border-white')}
          >
            {brand.contact.email}
          </a>
        </Reveal>

        {!isPlaceholder(bringIt.donateLine) ? (
          <Reveal
            delay={0.15}
            className="mt-12 flex flex-col items-center gap-4 border-t border-white/15 pt-10 sm:flex-row sm:justify-center"
          >
            <p className="text-white/85">{bringIt.donateLine}</p>
            <DonateButton />
          </Reveal>
        ) : null}

        <Reveal delay={0.2}>
          <p className="mt-10 text-sm text-white/70">{brand.credential}</p>
        </Reveal>
      </Container>
    </div>
  )
}
