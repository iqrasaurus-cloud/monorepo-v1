import { fourI, isPlaceholder, type SiteConfig, type SpokeContent } from '@iqra/config'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Mascot, type PoseName } from '../../mascot/Mascot.tsx'
import { Reveal, RevealItem, RevealList } from '../../motion/Reveal.tsx'
import { useReducedMotionSafe } from '../../motion/useReducedMotionSafe.ts'
import { colourClass } from '../../primitives/colours.ts'
import { Container } from '../../primitives/Container.tsx'
import { SectionHeading } from '../../primitives/SectionHeading.tsx'
import { cn } from '../../utils/cn.ts'

/** A different dino for each 4-I step, from the pose library. */
const STEP_POSES: Record<(typeof fourI)[number]['key'], PoseName> = {
  inspire: 'amazed-stars',
  investigate: 'magnifying-glass',
  integrate: 'peaceful-heart',
  impart: 'heart-gift',
}

interface SessionProps {
  site: SiteConfig
  session: SpokeContent['session']
}

/** Section 3: the four 4-I steps of one session, then a tip for younger and older children. */
export function Session({ site, session }: SessionProps) {
  const reduced = useReducedMotionSafe()
  const pathRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: pathRef, offset: ['start 0.8', 'end 0.55'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const showMascots = site.mascotTone !== 'none'
  const tips = [
    { label: 'Younger children', text: session.tips.younger, pose: 'jumping-joy' as PoseName },
    { label: 'Older children', text: session.tips.older, pose: 'books-stack' as PoseName },
  ].filter((t) => !isPlaceholder(t.text))

  return (
    <Container>
      <Reveal className="mb-14 flex flex-col items-center gap-4 text-center">
        <SectionHeading title="How a session runs" align="center" />
        {!isPlaceholder(session.duration) ? (
          <span className="label inline-flex items-center gap-2 rounded-pill bg-surface px-4 py-2 text-ink shadow-soft">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 text-primary">
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
              <path
                d="M12 7v5l3 2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            {session.duration}
          </span>
        ) : null}
      </Reveal>

      <div ref={pathRef} className="relative">
        {/* The path between the steps fills in as the visitor scrolls. */}
        <div
          aria-hidden="true"
          className="absolute bottom-10 left-[30px] top-10 w-1 rounded-full bg-line lg:hidden"
        >
          <motion.div
            style={reduced ? undefined : { scaleY: progress }}
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-inspire via-investigate to-impart"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute left-[12.5%] right-[12.5%] top-[42px] hidden h-1 rounded-full bg-line lg:block"
        >
          <motion.div
            style={reduced ? undefined : { scaleX: progress }}
            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-inspire via-investigate via-60% to-impart"
          />
        </div>

        <RevealList as="ol" className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
          {fourI.map((step, i) => {
            const c = colourClass[step.key]
            return (
              <RevealItem
                key={step.key}
                as="li"
                className="flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                <div className="relative shrink-0">
                  <div
                    className={cn(
                      'flex size-16 items-end justify-center overflow-hidden rounded-full ring-4 ring-paper-2 lg:size-[88px] lg:ring-8',
                      c.bg,
                    )}
                  >
                    {showMascots ? (
                      <span className="w-[82%] translate-y-1.5">
                        <Mascot pose={STEP_POSES[step.key]} size={72} fluid enter />
                      </span>
                    ) : (
                      <span
                        className={cn(
                          'mb-3 font-heading text-3xl font-bold lg:mb-5 lg:text-4xl',
                          c.on,
                        )}
                      >
                        {i + 1}
                      </span>
                    )}
                  </div>
                  {showMascots ? (
                    <span
                      aria-hidden="true"
                      className="absolute -right-1 -top-1 flex size-8 items-center justify-center rounded-full bg-surface font-heading text-sm font-bold text-ink shadow-soft"
                    >
                      {i + 1}
                    </span>
                  ) : null}
                </div>
                <div className="flex-1 rounded-card bg-surface p-5 shadow-soft lg:mt-6 lg:w-full">
                  <h3
                    className={cn(
                      'inline-block rounded-pill px-3 py-1 font-heading text-base font-bold',
                      c.bg,
                      c.on,
                    )}
                  >
                    {step.label}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-primary">{step.line}</p>
                  <p className="mt-2 text-ink/80">{session.steps[step.key]}</p>
                </div>
              </RevealItem>
            )
          })}
        </RevealList>
      </div>

      {tips.length > 0 ? (
        <RevealList className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          {tips.map((tip) => (
            <RevealItem
              key={tip.label}
              className="flex items-center gap-4 rounded-card border-2 border-dashed border-line bg-surface/70 p-5"
            >
              {showMascots ? <Mascot pose={tip.pose} size={64} enter /> : null}
              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">{tip.label}</h3>
                <p className="text-ink/80">{tip.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealList>
      ) : null}
    </Container>
  )
}
