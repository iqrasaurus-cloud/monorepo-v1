import { fourI, type SpokeContent } from '@iqra/config'
import { motion } from 'framer-motion'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { duration, easeReveal, viewportOnce } from '../../motion/presets.ts'
import { useReducedMotionSafe } from '../../motion/useReducedMotionSafe.ts'
import { CircleCard } from '../../primitives/CircleCard.tsx'
import { Container } from '../../primitives/Container.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'

export function Journey({ journey }: { journey: SpokeContent['journey'] }) {
  const reduced = useReducedMotionSafe()
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
              <CircleCard step={i + 1} label={step.label}>
                <p className="text-ink/80">{journey[step.key].body}</p>
              </CircleCard>
            </RevealItem>
          ))}
        </RevealList>
      </div>
    </Container>
  )
}
