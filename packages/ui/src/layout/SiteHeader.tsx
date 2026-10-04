import { mainMenu, type SiteConfig } from '@iqra/config'
import { AnimatePresence, motion } from 'framer-motion'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import { useLocation } from 'react-router'
import { duration, easeReveal, headerEntrance } from '../motion/presets.ts'
import { useReducedMotionSafe } from '../motion/useReducedMotionSafe.ts'
import { Container } from '../primitives/Container.tsx'
import { cn } from '../utils/cn.ts'
import { DonateButton, Logo } from './HeaderParts.tsx'
import { hubItemHref, programmeTiles, SITE_MENU_ID, toolTiles } from './links.ts'
import { MenuTile } from './MenuTile.tsx'
import { MobileDrawer } from './MobileDrawer.tsx'
import { useHashJump } from './useHashJump.ts'

type PanelKey = 'tools' | 'programmes'
const panelId = (key: PanelKey) => `menu-panel-${key}`

const itemClass = (active: boolean) =>
  cn(
    'inline-flex items-center gap-1.5 rounded-pill px-4 py-2 font-heading text-base font-semibold transition-colors duration-300',
    active ? 'bg-paper-2 text-primary' : 'text-ink hover:bg-paper-2 hover:text-primary',
  )

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className={cn('size-3 transition-transform duration-300', open && 'rotate-180')}
    >
      <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

function Hamburger() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
      <path d="M3 6h18M3 12h18M3 18h18" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/**
 * The one header bar on every site (CLAUDE.md rule 8): logo, Tools ▾, Programmes ▾,
 * About, Work with us, Donate. Under 1024px the four items move into the drawer.
 */
export function SiteHeader({ site }: { site: SiteConfig }) {
  const reduced = useReducedMotionSafe()
  const { pathname } = useLocation()
  const jump = useHashJump()
  const headerRef = useRef<HTMLElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const triggerRefs = useRef<Partial<Record<PanelKey, HTMLButtonElement | null>>>({})

  const [stuck, setStuck] = useState(false)
  // Remembering the path a panel was opened on closes it on any navigation, without an effect.
  const [panel, setPanel] = useState<{ key: PanelKey; path: string } | null>(null)
  const openKey = panel?.path === pathname ? panel.key : null
  const [drawerOpen, setDrawerOpen] = useState(false)

  const close = useCallback(() => setPanel(null), [])
  const toggle = (key: PanelKey) =>
    setPanel((p) => (p?.key === key && p.path === pathname ? null : { key, path: pathname }))

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry) setStuck(!entry.isIntersecting)
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!openKey) return
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setPanel(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [openKey])

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key !== 'Escape' || !openKey) return
    e.preventDefault()
    triggerRefs.current[openKey]?.focus()
    setPanel(null)
  }

  const onBlur = (e: FocusEvent<HTMLElement>) => {
    if (openKey && !e.currentTarget.contains(e.relatedTarget)) setPanel(null)
  }

  const followLink = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    close()
    if (!href.startsWith('#')) return
    e.preventDefault()
    jump(href)
  }

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    hamburgerRef.current?.focus()
  }, [])

  const tiles = openKey === 'tools' ? toolTiles() : openKey ? programmeTiles(site) : []

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="-mb-px h-px" />
      <header
        ref={headerRef}
        id={SITE_MENU_ID}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={cn(
          'sticky top-0 z-40 border-b border-taupe/20 bg-white transition-shadow duration-300',
          (stuck || openKey) && 'shadow-soft',
        )}
      >
        <motion.div
          data-reveal=""
          initial={reduced ? { opacity: 0 } : headerEntrance.initial}
          animate={reduced ? { opacity: 1 } : headerEntrance.animate}
          transition={reduced ? { duration: duration.fade } : headerEntrance.transition}
        >
          <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
            <Logo site={site} className="h-9 lg:h-12" />

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {mainMenu.map((item) => {
                  if (item.type === 'hub') {
                    const href = hubItemHref(site, item.path, item.fallback)
                    return (
                      <li key={item.label}>
                        <a
                          href={href}
                          onClick={(e) => followLink(e, href)}
                          className={itemClass(false)}
                        >
                          {item.label}
                        </a>
                      </li>
                    )
                  }
                  const isOpen = openKey === item.type
                  return (
                    <li key={item.label}>
                      <button
                        ref={(el) => {
                          triggerRefs.current[item.type] = el
                        }}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId(item.type)}
                        onClick={() => toggle(item.type)}
                        className={itemClass(isOpen)}
                      >
                        {item.label}
                        <Chevron open={isOpen} />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <DonateButton onClick={followLink} />
              <button
                ref={hamburgerRef}
                type="button"
                aria-label="Open menu"
                aria-expanded={drawerOpen}
                aria-controls="mobile-menu"
                onClick={() => setDrawerOpen(true)}
                className="-mr-2 flex size-10 items-center justify-center rounded-pill text-ink lg:hidden"
              >
                <Hamburger />
              </button>
            </div>
          </Container>
        </motion.div>

        <AnimatePresence>
          {openKey ? (
            <motion.div
              key={openKey}
              id={panelId(openKey)}
              data-lenis-prevent=""
              className="absolute inset-x-0 top-full hidden max-h-[calc(100vh-6rem)] overflow-y-auto border-t border-taupe/20 bg-white shadow-soft lg:block"
              initial={{ opacity: 0, y: reduced ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -8 }}
              transition={{ duration: reduced ? duration.fade : duration.preview, ease: easeReveal }}
            >
              <Container className="py-8">
                <ul className="grid grid-cols-3 gap-4">
                  {tiles.map((entry) => (
                    <li key={entry.key}>
                      <MenuTile entry={entry} onNavigate={close} />
                    </li>
                  ))}
                </ul>
              </Container>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
      {/* Outside <header> so its position:fixed is relative to the viewport. */}
      <MobileDrawer site={site} open={drawerOpen} onClose={closeDrawer} />
    </>
  )
}
