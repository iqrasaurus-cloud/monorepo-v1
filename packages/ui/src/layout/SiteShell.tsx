import { accentVars, type SiteConfig } from '@iqra/config'
import { useEffect, type CSSProperties, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { SmoothScroll, useSmoothScroll } from '../motion/SmoothScroll.tsx'
import { Footer } from './Footer.tsx'
import { stickyOffset } from './links.ts'
import { SiteHeader } from './SiteHeader.tsx'
import { MAIN_ID, SkipLink } from './SkipLink.tsx'

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

interface SiteShellProps {
  site: SiteConfig
  children: ReactNode
}

/** The shared frame of every site: skip link, the header bar, main, footer. */
export function SiteShell({ site, children }: SiteShellProps) {
  return (
    <SmoothScroll>
      <div
        style={accentVars(site) as CSSProperties | undefined}
        className="flex min-h-screen flex-col"
      >
        <SkipLink />
        <SiteHeader site={site} />
        <main id={MAIN_ID} tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer site={site} />
      </div>
      <HashScroll />
    </SmoothScroll>
  )
}
