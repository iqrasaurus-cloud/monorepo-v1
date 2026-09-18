import { motion } from 'framer-motion'

const services = [
  {
    n: '01',
    name: 'Brand Identity',
    desc: 'Naming, strategy, visual systems and guidelines that give brands an unmistakable voice.',
    tags: ['Strategy', 'Logo & Type', 'Guidelines'],
  },
  {
    n: '02',
    name: 'Digital Design',
    desc: 'Websites and products designed to win attention — and awards. UX, UI and design systems.',
    tags: ['Web Design', 'E-commerce', 'Design Systems'],
  },
  {
    n: '03',
    name: 'Motion & 3D',
    desc: 'Cinematic CGI, interactive WebGL and motion identities that bring static brands to life.',
    tags: ['WebGL', 'CGI', 'Animation'],
  },
  {
    n: '04',
    name: 'Creative Development',
    desc: 'Bespoke front-end builds with obsessive attention to performance, physics and feel.',
    tags: ['React', 'Shaders', 'CMS'],
  },
]

export default function Services() {
  return (
    <section id="services" className="px-6 pb-28 pt-16 md:px-10 md:pb-40 md:pt-24">
      <div className="mb-14 flex items-end justify-between">
        <h2 className="font-display text-5xl font-extrabold uppercase tracking-tighter md:text-7xl">
          Services
        </h2>
        <span className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-[#ece9e4]/50">
          ( What we do )
        </span>
      </div>

      <div className="border-t border-[#ece9e4]/15">
        {services.map((s, i) => (
          <motion.div
            key={s.n}
            data-hover
            className="group relative overflow-hidden border-b border-[#ece9e4]/15"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* hover fill */}
            <div className="absolute inset-0 origin-bottom scale-y-0 bg-[#ece9e4] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
            <div className="relative grid gap-4 py-8 transition-colors duration-500 group-hover:text-[#0a0a0a] md:grid-cols-[4rem_1fr_1.2fr] md:items-center md:gap-8 md:py-12">
              <span className="font-mono2 text-[11px] tracking-[0.2em] text-[#ece9e4]/40 transition-colors duration-500 group-hover:text-[#ff4d00]">
                ({s.n})
              </span>
              <h3 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
                {s.name}
              </h3>
              <div>
                <p className="max-w-md text-sm leading-relaxed text-[#ece9e4]/60 transition-colors duration-500 group-hover:text-[#0a0a0a]/70">
                  {s.desc}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-[#ece9e4]/20 px-3 py-1 font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#ece9e4]/60 transition-colors duration-500 group-hover:border-[#0a0a0a]/30 group-hover:text-[#0a0a0a]/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
