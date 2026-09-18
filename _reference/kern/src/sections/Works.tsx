import { useRef, useState } from 'react'
import { Link } from 'react-router'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { projects } from '@/data/content'

export default function Works() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 25, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 200, damping: 25, mass: 0.5 })
  const velocity = useVelocity(springX)
  const rotate = useTransform(velocity, [-1200, 1200], [-10, 10], { clamp: true })

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return (
    <section id="works" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mb-14 flex items-end justify-between">
        <h2 className="font-display text-5xl font-extrabold uppercase tracking-tighter md:text-7xl">
          Works
        </h2>
        <Link
          to="/works"
          data-hover
          className="link-sweep font-mono2 text-[11px] uppercase tracking-[0.3em] text-[#ece9e4]/60"
        >
          All works ↗
        </Link>
      </div>

      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setActive(null)}
        className="relative"
      >
        {/* floating preview */}
        <AnimatePresence>
          {active !== null && (
            <motion.div
              className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
              style={{ x: springX, y: springY }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                style={{ rotate }}
                className="relative aspect-[3/2] w-[26vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
              >
                {projects.map((p, i) => (
                  <motion.img
                    key={p.title}
                    src={p.img}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={false}
                    animate={{
                      opacity: active === i ? 1 : 0,
                      scale: active === i ? 1 : 1.15,
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* rows */}
        <div className="border-t border-[#ece9e4]/15">
          {projects.map((p, i) => (
            <Link
              key={p.title}
              to={`/works/${p.slug}`}
              data-cursor="view"
              onMouseEnter={() => setActive(i)}
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden border-b border-[#ece9e4]/15 py-6 md:grid-cols-[3rem_1fr_auto_5rem] md:gap-8 md:py-9"
            >
              <span className="font-mono2 text-[11px] tracking-[0.2em] text-[#ece9e4]/40 transition-colors duration-500 group-hover:text-[#ff4d00]">
                {(i + 1).toString().padStart(2, '0')}
              </span>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight transition-all duration-500 group-hover:translate-x-4 group-hover:text-[#ece9e4] md:text-5xl md:group-hover:translate-x-8">
                {p.title}
              </h3>
              <span className="hidden font-mono2 text-[11px] uppercase tracking-[0.25em] text-[#ece9e4]/50 md:block">
                {p.category}
              </span>
              <span className="text-right font-mono2 text-[11px] tracking-[0.2em] text-[#ece9e4]/40">
                {p.year}
              </span>
              {/* mobile thumb */}
              <div className="col-span-3 mt-2 aspect-[3/2] w-full overflow-hidden md:hidden">
                <img src={p.img} alt={p.title} className="h-full w-full object-cover" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
