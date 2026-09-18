import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { projects } from '@/data/content'

export default function WorksPage() {
  return (
    <main className="px-6 pb-28 pt-32 md:px-10 md:pt-40">
      <div className="mb-14 flex items-end justify-between">
        <div>
          <p className="mb-6 font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">
            ( Index )
          </p>
          <h1 className="font-display text-6xl font-extrabold uppercase tracking-tighter md:text-8xl">
            All Works
          </h1>
        </div>
        <span className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-[#ece9e4]/50">
          ( {projects.length.toString().padStart(2, '0')} projects )
        </span>
      </div>

      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: (i % 2) * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={i % 2 === 1 ? 'md:mt-24' : ''}
          >
            <Link to={`/works/${p.slug}`} data-cursor="view" className="group block">
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 bg-[#0a0a0a]/80 px-3 py-1 font-mono2 text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">
                  {p.category}
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between">
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:text-4xl">
                  <span className="mr-4 font-mono2 text-xs tracking-[0.2em] text-[#ff4d00]">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  {p.title}
                </h2>
                <span className="font-mono2 text-[11px] tracking-[0.2em] text-[#ece9e4]/40">
                  {p.year}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  )
}
