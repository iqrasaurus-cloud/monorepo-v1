import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[#ece9e4]/10 px-6 pb-8 pt-24 md:px-10 md:pt-36">
      <p className="mb-8 font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">
        ( Got a project? )
      </p>

      <motion.a
        href="mailto:hello@kern.studio"
        data-hover
        className="group block select-none"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-display text-[14vw] font-extrabold uppercase leading-[0.85] tracking-tighter transition-colors duration-500 group-hover:text-[#ff4d00] md:text-[11vw]">
          Let's
        </span>
        <span className="block font-display text-[14vw] font-extrabold uppercase leading-[0.85] tracking-tighter text-[#ff4d00] transition-colors duration-500 group-hover:text-[#ece9e4] md:text-[11vw]">
          Talk ↗
        </span>
      </motion.a>

      <div className="mt-20 grid gap-10 border-t border-[#ece9e4]/10 pt-10 md:grid-cols-4">
        <div>
          <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">Paris</p>
          <p className="mt-2 text-sm text-[#ece9e4]/70">14 Rue du Faubourg<br />75010 Paris, FR</p>
        </div>
        <div>
          <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">Tokyo</p>
          <p className="mt-2 text-sm text-[#ece9e4]/70">Shibuya City<br />Tokyo 150-0001, JP</p>
        </div>
        <div>
          <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">Contact</p>
          <a href="mailto:hello@kern.studio" data-hover className="link-sweep mt-2 inline-block text-sm text-[#ece9e4]/70">
            hello@kern.studio
          </a>
        </div>
        <div>
          <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">Socials</p>
          <div className="mt-2 flex gap-4 text-sm text-[#ece9e4]/70">
            {['IG', 'X', 'LI', 'BE'].map((s) => (
              <a key={s} href="#contact" onClick={(e) => e.preventDefault()} data-hover className="link-sweep">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">
        <span>© 2026 KERN® Studio</span>
        <a
          href="#top"
          data-hover
          className="link-sweep"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
