import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { articles } from '@/data/content'

export default function JournalPage() {
  return (
    <main className="px-6 pb-28 pt-32 md:px-10 md:pt-40">
      <div className="mb-14 flex items-end justify-between">
        <div>
          <p className="mb-6 font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">
            ( Index )
          </p>
          <h1 className="font-display text-6xl font-extrabold uppercase tracking-tighter md:text-8xl">
            Journal
          </h1>
        </div>
        <span className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-[#ece9e4]/50">
          ( {articles.length.toString().padStart(2, '0')} articles )
        </span>
      </div>

      <div className="border-t border-[#ece9e4]/15">
        {articles.map((a, i) => (
          <motion.div
            key={a.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={`/journal/${a.slug}`}
              data-cursor="view"
              className="group grid items-center gap-6 border-b border-[#ece9e4]/15 py-8 md:grid-cols-[220px_1fr_auto] md:gap-12 md:py-12"
            >
              <div className="aspect-[3/2] overflow-hidden md:aspect-[4/3]">
                <img
                  src={a.img}
                  alt={a.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div>
                <div className="flex items-center gap-4 font-mono2 text-[10px] uppercase tracking-[0.25em]">
                  <span className="text-[#ff4d00]">{a.tag}</span>
                  <span className="text-[#ece9e4]/40">{a.date}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:text-4xl">
                  {a.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#ece9e4]/60">
                  {a.excerpt}
                </p>
              </div>
              <span className="hidden font-display text-4xl text-[#ece9e4]/30 transition-all duration-500 group-hover:translate-x-2 group-hover:text-[#ff4d00] md:block">
                →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  )
}
