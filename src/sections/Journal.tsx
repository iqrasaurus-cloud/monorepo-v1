import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { articles } from '@/data/content'

const posts = articles.slice(0, 3)

export default function Journal() {
  return (
    <section id="journal" className="px-6 pb-28 md:px-10 md:pb-40">
      <div className="mb-14 flex items-end justify-between">
        <h2 className="font-display text-5xl font-extrabold uppercase tracking-tighter md:text-7xl">
          Journal
        </h2>
        <Link to="/journal" data-hover className="link-sweep hidden font-mono2 text-[11px] uppercase tracking-[0.3em] text-[#ece9e4]/60 md:block">
          All articles ↗
        </Link>
      </div>

      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {posts.map((p, i) => (
          <motion.div
            key={p.title}
            className="group block"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={`/journal/${p.slug}`} data-hover className="block">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={p.img}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <span className="absolute left-4 top-4 bg-[#0a0a0a]/80 px-3 py-1 font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#ece9e4] backdrop-blur-sm">
                {p.tag}
              </span>
            </div>
            <p className="mt-5 font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ff4d00]">
              {p.date}
            </p>
            <h3 className="mt-2 font-display text-xl font-bold leading-snug tracking-tight transition-colors duration-300 group-hover:text-[#ece9e4]/70 md:text-2xl">
              {p.title}
            </h3>
            <span className="link-sweep mt-3 inline-block font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/50">
              Read article →
            </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
