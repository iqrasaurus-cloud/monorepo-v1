import { brandCopy, fourI, type SiteConfig, type SpokeContent } from '@iqra/config'
import { motion } from 'framer-motion'
import { mascotImage } from '../../layout/brand.ts'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { duration, easeReveal, viewportOnce } from '../../motion/presets.ts'
import { useReducedMotionSafe } from '../../motion/useReducedMotionSafe.ts'
import { CircleCard } from '../../primitives/CircleCard.tsx'
import { Container } from '../../primitives/Container.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'

interface JourneyProps {
  site: SiteConfig
  journey: SpokeContent['journey']
}

// A different dino for each step of the journey, for visual variety — the same
// reuse-across-contexts convention already used for "coming soon" spokes in the registry.
const STEP_MASCOTS = [
  'mascot-quran.png',
  'mascot-magnifier.png',
  'mascot-reader.png',
  'mascot-walking.png',
] as const

export function Journey({ site, journey }: JourneyProps) {
  const reduced = useReducedMotionSafe()
  const showMascots = site.mascotTone !== 'none'
  return (
    <Container>
      <Reveal>
        <SectionHeading
          eyebrow="The 4-I journey"
          title="From wonder to sharing, one surah at a time"
          align="center"
          className="mb-16"
        />
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
          transition={
            reduced ? { duration: duration.fade } : { duration: 1.2, ease: easeReveal, delay: 0.2 }
          }
        />
        <RevealList as="ol" className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {fourI.map((step, i) => (
            <RevealItem key={step.key} as="li">
              <CircleCard
                step={i + 1}
                image={showMascots ? mascotImage(STEP_MASCOTS[i] ?? site.mascot, 320) : undefined}
                label={step.label}
              >
                <p className="mb-3 font-semibold text-primary">{step.line}</p>
                <p className="text-ink/80">{journey[step.key].body}</p>
                <p className="mt-4 text-sm italic text-ink/60">
                  {brandCopy.journeyPrompts[step.key].join(' ')}
                </p>
              </CircleCard>
            </RevealItem>
          ))}
        </RevealList>
      </div>
    </Container>
  )
}
