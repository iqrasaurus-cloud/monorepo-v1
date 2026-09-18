import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const line1 = 'KERN®'.split('')
const line2 = 'STUDIO'.split('')

const letterAnim = {
  hidden: { y: '110%', rotate: 4 },
  show: (i: number) => ({
    y: '0%',
    rotate: 0,
    transition: { delay: 0.2 + i * 0.06, duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="top" ref={ref} className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-8 pt-28 md:px-10">
      <motion.div style={{ y, opacity }} className="flex flex-1 flex-col justify-between">
        <motion.p
          className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ece9e4]/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          ( Digital design studio — est. 2019 )
        </motion.p>

        <div className="select-none">
          <h1 className="font-display font-extrabold leading-[0.82] tracking-tighter">
            <span className="block overflow-hidden whitespace-nowrap pr-[2vw] text-[19vw] md:text-[16vw]">
              {line1.map((ch, i) => (
                <motion.span
                  key={i}
                  className={
                    ch === '®'
                      ? 'inline-block align-top text-[0.3em] leading-[1.6]'
                      : 'inline-block'
                  }
                  custom={i}
                  variants={letterAnim}
                  initial="hidden"
                  animate="show"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden whitespace-nowrap text-[17vw] text-[#ff4d00] md:text-[13.5vw]">
              {line2.map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  custom={i + 4}
                  variants={letterAnim}
                  initial="hidden"
                  animate="show"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          </h1>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-md text-sm leading-relaxed text-[#ece9e4]/70 md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            We craft award-winning brands, websites and digital experiences for
            companies that refuse to be ordinary. Strategy, design, motion and
            code — under one roof.
          </motion.p>
          <motion.div
            className="flex items-center gap-10 font-mono2 text-[11px] uppercase tracking-[0.25em] text-[#ece9e4]/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff4d00]" />
              Available Q3 2026
            </span>
            <span className="hidden md:inline">Scroll ↓</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
