import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import work1 from '@/assets/work1.jpg'
import work2 from '@/assets/work2.jpg'
import work3 from '@/assets/work3.jpg'
import work4 from '@/assets/work4.jpg'
import work5 from '@/assets/work5.jpg'
import work6 from '@/assets/work6.jpg'

const leftImages = [work1, work2, work3]
const rightImages = [work4, work5, work6]

function Column({
  images,
  y,
}: {
  images: string[]
  y: MotionValue<string>
}) {
  return (
    <motion.div style={{ y }} className="flex w-full flex-col gap-[3vh]">
      {images.map((src, i) => (
        <div key={i} className="h-[38vh] w-full overflow-hidden">
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      ))}
    </motion.div>
  )
}

export default function SplitScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const yLeft = useTransform(scrollYProgress, [0, 1], ['2%', '-34%'])
  const yRight = useTransform(scrollYProgress, [0, 1], ['-34%', '2%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92])

  return (
    <section ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* image columns */}
        <div className="grid h-full w-full grid-cols-2 items-center gap-[3vh] px-[3vh] md:grid-cols-[1fr_1.2fr_1fr] md:px-[6vw]">
          <Column images={leftImages} y={yLeft} />
          <div className="hidden md:block" />
          <Column images={rightImages} y={yRight} />
        </div>

        {/* center title */}
        <motion.div
          style={{ scale }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center mix-blend-difference"
        >
          <p className="mb-4 font-mono2 text-[11px] uppercase tracking-[0.4em] text-[#ece9e4]">
            ( 2024 — 2026 )
          </p>
          <h2 className="text-center font-display text-[13vw] font-extrabold uppercase leading-[0.85] tracking-tighter text-[#ece9e4] md:text-[9vw]">
            Selected
            <br />
            <span className="text-[#ff4d00]">Works</span>
          </h2>
        </motion.div>
      </div>
    </section>
  )
}
