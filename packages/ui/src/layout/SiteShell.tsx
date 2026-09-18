import { accentVars, type SiteConfig } from '@iqra/config'
import { motion } from 'framer-motion'
import { useEffect, type CSSProperties, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { duration, headerEntrance } from '../motion/presets.ts'
import { SmoothScroll, useSmoothScroll } from '../motion/SmoothScroll.tsx'
import { useReducedMotionSafe } from '../motion/useReducedMotionSafe.ts'
import { Footer } from './Footer.tsx'
import { IdentityHeader } from './IdentityHeader.tsx'
import { stickyOffset } from './links.ts'
import { SiteMenu } from './SiteMenu.tsx'
import { MAIN_ID, SkipLink } from './SkipLink.tsx'
import { UtilityStrip } from './UtilityStrip.tsx'

/** Scrolls to the URL hash after arriving on a page (e.g. from /journal to /#about). */
function HashScroll() {
  const { hash, pathname } = useLocation()
  const { scrollTo } = useSmoothScroll()
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (!el) return
    const frame = requestAnimationFrame(() => scrollTo(el, { offset: -stickyOffset() }))
    return () => cancelAnimationFrame(frame)
  }, [hash, pathname, scrollTo])
  return null
}

function HeaderEntrance({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionSafe()
  return (
    <motion.header
      data-reveal=""
      initial={reduced ? { opacity: 0 } : headerEntrance.initial}
      animate={reduced ? { opacity: 1 } : headerEntrance.animate}
      transition={reduced ? { duration: duration.fade } : headerEntrance.transition}
    >
      {children}
    </motion.header>
  )
}

interface SiteShellProps {
  site: SiteConfig
  children: ReactNode
}

/** The shared frame of every site: skip link, three header bands, main, footer. */
export function SiteShell({ site, children }: SiteShellProps) {
  return (
    <SmoothScroll>
      <div
        style={accentVars(site) as CSSProperties | undefined}
        className="flex min-h-screen flex-col"
      >
        <SkipLink />
        <HeaderEntrance>
          <UtilityStrip site={site} />
          <IdentityHeader site={site} />
        </HeaderEntrance>
        <SiteMenu site={site} />
        <main id={MAIN_ID} tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer site={site} />
      </div>
      <HashScroll />
    </SmoothScroll>
  )
}
