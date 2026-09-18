import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

const TEXT =
  'We believe great design is not decoration — it is tension, rhythm and intent. Every pixel earns its place. Every interaction tells the story.'

function Word({
  word,
  progress,
  range,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.35em] inline-block">
      {word}
    </motion.span>
  )
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  })
  const words = TEXT.split(' ')

  return (
    <section id="studio" ref={ref} className="px-6 py-32 md:px-10 md:py-48">
      <p className="mb-10 font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">
        ( Manifesto )
      </p>
      <p className="max-w-5xl font-display text-3xl font-semibold leading-[1.15] tracking-tight md:text-6xl">
        {words.map((word, i) => (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          />
        ))}
      </p>
      <div className="mt-16 grid grid-cols-2 gap-8 border-t border-[#ece9e4]/10 pt-10 md:grid-cols-4">
        {[
          ['47', 'Projects shipped'],
          ['12', 'Intl. awards'],
          ['08', 'Team members'],
          ['02', 'Studios worldwide'],
        ].map(([num, label]) => (
          <div key={label}>
            <p className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
              {num}
            </p>
            <p className="mt-2 font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/50">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
