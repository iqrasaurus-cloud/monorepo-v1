import { fourI, isPlaceholder, type SiteConfig, type SpokeContent } from '@iqra/config'
import { motion } from 'framer-motion'
import { mascotImage } from '../../layout/brand.ts'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { duration, easeReveal, viewportOnce } from '../../motion/presets.ts'
import { useReducedMotionSafe } from '../../motion/useReducedMotionSafe.ts'
import { CircleCard } from '../../primitives/CircleCard.tsx'
import { Container } from '../../primitives/Container.tsx'
import { Picture } from '../../primitives/Picture.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'

// A different dino for each step, reusing the registry's placeholder-pose convention.
const STEP_MASCOTS = [
  'mascot-quran.png',
  'mascot-magnifier.png',
  'mascot-reader.png',
  'mascot-walking.png',
] as const

interface SessionProps {
  site: SiteConfig
  session: SpokeContent['session']
}

/** Section 3: the four 4-I steps of one session, then a tip for younger and older children. */
export function Session({ site, session }: SessionProps) {
  const reduced = useReducedMotionSafe()
  const showMascots = site.mascotTone !== 'none'
  const tips = [
    { label: 'Younger children', text: session.tips.younger, mascot: 'mascot-quran.png' },
    { label: 'Older children', text: session.tips.older, mascot: 'mascot-magnifier.png' },
  ].filter((t) => !isPlaceholder(t.text))

  return (
    <Container>
      <Reveal className="mb-16 flex flex-col items-center gap-4 text-center">
        <SectionHeading title="How a session runs" align="center" />
        {!isPlaceholder(session.duration) ? (
          <span className="label rounded-pill bg-white px-4 py-2 text-ink shadow-soft">
            {session.duration}
          </span>
        ) : null}
      </Reveal>

      <div className="relative">
        {/* Connecting line behind the circles, drawn in on scroll. */}
        <motion.div
          aria-hidden="true"
          data-reveal=""
          className="absolute left-[12.5%] right-[12.5%] top-20 hidden h-0.5 origin-left bg-taupe/50 lg:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={reduced ? { duration: duration.fade } : { duration: 1.2, ease: easeReveal, delay: 0.2 }}
        />
        <RevealList as="ol" className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {fourI.map((step, i) => (
            <RevealItem key={step.key} as="li">
              <CircleCard
                step={i + 1}
                image={showMascots ? mascotImage(STEP_MASCOTS[i] ?? site.mascot, 320) : undefined}
                label={step.label}
              >
                <p className="mb-2 text-sm font-semibold text-primary">{step.line}</p>
                <p className="text-ink/80">{session.steps[step.key]}</p>
              </CircleCard>
            </RevealItem>
          ))}
        </RevealList>
      </div>

      {tips.length > 0 ? (
        <RevealList className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {tips.map((tip) => (
            <RevealItem
              key={tip.label}
              className="flex items-start gap-4 rounded-card bg-white p-6 shadow-soft"
            >
              {showMascots ? (
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-paper ring-4 ring-sun">
                  <Picture {...mascotImage(tip.mascot, 160)} className="size-10 object-contain" />
                </span>
              ) : null}
              <div>
                <h3 className="mb-1 font-heading text-xl font-semibold text-primary">{tip.label}</h3>
                <p className="text-ink/80">{tip.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealList>
      ) : null}
    </Container>
  )
}
