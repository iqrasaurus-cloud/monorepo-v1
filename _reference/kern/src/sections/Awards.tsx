import { motion } from 'framer-motion'

const awards = [
  { award: 'Site of the Day ×3', org: 'Awwwards', year: '2026' },
  { award: 'FWA of the Month', org: 'The FWA', year: '2025' },
  { award: 'Best UI Design', org: 'CSS Design Awards', year: '2025' },
  { award: 'Honoree — Websites', org: 'The Webby Awards', year: '2024' },
  { award: 'Graphite Pencil', org: 'D&AD', year: '2024' },
]

export default function Awards() {
  return (
    <section className="px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
        <div>
          <p className="mb-6 font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">
            ( Recognition )
          </p>
          <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tighter md:text-6xl">
            Awards
            <br />& Honors
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#ece9e4]/60">
            Trophies are never the goal — but when the work resonates, the
            industry tends to notice.
          </p>
        </div>

        <div className="border-t border-[#ece9e4]/15">
          {awards.map((a, i) => (
            <motion.div
              key={a.award}
              data-hover
              className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-[#ece9e4]/15 py-6 transition-colors duration-500 hover:bg-[#ece9e4]/5 md:grid-cols-[2fr_1fr_auto] md:px-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-display text-xl font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:text-3xl">
                {a.award}
              </span>
              <span className="hidden font-mono2 text-[11px] uppercase tracking-[0.25em] text-[#ece9e4]/50 md:block">
                {a.org}
              </span>
              <span className="font-mono2 text-[11px] tracking-[0.2em] text-[#ff4d00]">
                {a.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
