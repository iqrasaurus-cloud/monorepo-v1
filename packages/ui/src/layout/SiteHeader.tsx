import { brand, hub, localPath, mainMenu, siteUrl, stripLang, type SiteConfig } from '@iqra/config'
import { AnimatePresence, m, useScroll, useSpring } from 'framer-motion'
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
import { menuLabel, useLang, useT } from '../i18n/lang.ts'
import { Link, NavLink } from '../i18n/Link.tsx'
import { LangSwitch } from '../i18n/LangSwitch.tsx'
import { Mascot, type PoseName } from '../mascot/Mascot.tsx'
import { duration, easeReveal, headerEntrance, springPop, tileStagger } from '../motion/presets.ts'
import { useReducedMotionSafe } from '../motion/useReducedMotionSafe.ts'
import { Container } from '../primitives/Container.tsx'
import { cn } from '../utils/cn.ts'
import { DonateButton, Logo } from './HeaderParts.tsx'
import { hubItemHref, hubLive, programmeTiles, SITE_MENU_ID, toolTiles } from './links.ts'
import { MenuTile } from './MenuTile.tsx'
import { MobileDrawer } from './MobileDrawer.tsx'
import { useHashJump } from './useHashJump.ts'

type PanelKey = 'tools' | 'programmes'
const panelId = (key: PanelKey) => `menu-panel-${key}`

/** The dino on the left-hand card in each panel. */
const PANEL_POSE: Record<PanelKey, PoseName> = { tools: 'laptop', programmes: 'signpost' }

const itemClass = (active: boolean) =>
  cn(
    'inline-flex items-center gap-1.5 rounded-pill px-4 py-2 font-heading text-base font-semibold transition-colors duration-300',
    active ? 'bg-primary-soft text-primary' : 'text-ink hover:bg-primary-soft hover:text-primary',
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
      <path
        d="M4 7h16M4 12h10M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Thin 4-I coloured line under the bar showing how far down the page you are. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-inspire via-investigate to-impart"
    />
  )
}

/**
 * The one header bar on every site (CLAUDE.md rule 8): logo, Tools ▾, Programmes ▾,
 * About, Work with us, Donate. Under 1024px the four items move into the drawer.
 */
export function SiteHeader({ site }: { site: SiteConfig }) {
  const reduced = useReducedMotionSafe()
  const lang = useLang()
  const t = useT()
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

  const tiles = openKey === 'tools' ? toolTiles(lang) : openKey ? programmeTiles(site, lang) : []
  const intro = openKey
    ? {
        title: openKey === 'tools' ? t.tools : t.programmes,
        line: openKey === 'tools' ? t.toolsLine : t.programmesLine,
        pose: PANEL_POSE[openKey],
      }
    : null
  // Once the hub is live, each panel offers the full list on iqrasaurus.com.
  const seeAll =
    site.kind === 'hub' ? null : hubLive() ? siteUrl(hub(), localPath(lang, '/')) : null

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="-mb-px h-px" />
      <header
        ref={headerRef}
        id={SITE_MENU_ID}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={cn(
          'sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300',
          stuck || openKey
            ? 'border-line bg-surface/90 shadow-soft backdrop-blur-md'
            : 'border-transparent bg-surface',
        )}
      >
        <m.div
          data-reveal=""
          initial={reduced ? { opacity: 0 } : headerEntrance.initial}
          animate={reduced ? { opacity: 1 } : headerEntrance.animate}
          transition={reduced ? { duration: duration.fade } : headerEntrance.transition}
        >
          <Container
            className={cn(
              'flex items-center justify-between gap-4 transition-[height] duration-300 ease-reveal',
              stuck ? 'h-16' : 'h-16 lg:h-20',
            )}
          >
            <Logo
              site={site}
              className={cn(
                'transition-[height] duration-300 ease-reveal',
                stuck ? 'h-9 lg:h-10' : 'h-9 lg:h-12',
              )}
            />

            <nav aria-label={t.mainNav} className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {mainMenu.map((item) => {
                  if (item.type === 'site') {
                    return (
                      <li key={menuLabel(t, item.label)}>
                        <NavLink
                          to={item.path}
                          onClick={close}
                          className={({ isActive }) => itemClass(isActive)}
                        >
                          {menuLabel(t, item.label)}
                        </NavLink>
                      </li>
                    )
                  }
                  if (item.type === 'hub') {
                    const href = hubItemHref(site, item.path, item.fallback, lang)
                    return (
                      <li key={menuLabel(t, item.label)}>
                        {href.startsWith('/') ? (
                          <NavLink
                            to={href}
                            onClick={close}
                            className={({ isActive }) => itemClass(isActive)}
                          >
                            {menuLabel(t, item.label)}
                          </NavLink>
                        ) : (
                          <a
                            href={href}
                            onClick={(e) => followLink(e, href)}
                            className={itemClass(false)}
                          >
                            {menuLabel(t, item.label)}
                          </a>
                        )}
                      </li>
                    )
                  }
                  const isOpen = openKey === item.type
                  return (
                    <li key={menuLabel(t, item.label)}>
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
                        {menuLabel(t, item.label)}
                        <Chevron open={isOpen} />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <LangSwitch className="hidden sm:flex" />
              <DonateButton onClick={followLink} />
              <button
                ref={hamburgerRef}
                type="button"
                aria-label={t.openMenu}
                aria-expanded={drawerOpen}
                aria-controls="mobile-menu"
                onClick={() => setDrawerOpen(true)}
                className="-mr-1 flex size-11 items-center justify-center rounded-pill bg-primary-soft text-primary transition-transform duration-200 active:scale-90 lg:hidden"
              >
                <Hamburger />
              </button>
            </div>
          </Container>
        </m.div>

        {reduced ? null : <ScrollProgress />}

        <AnimatePresence>
          {openKey && intro ? (
            <m.div
              key={openKey}
              id={panelId(openKey)}
              data-lenis-prevent=""
              className="absolute inset-x-0 top-full hidden max-h-[calc(100vh-6rem)] overflow-y-auto border-t border-line bg-surface shadow-soft lg:block"
              initial={{ opacity: 0, y: reduced ? 0 : -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -8 }}
              transition={{
                duration: reduced ? duration.fade : duration.preview,
                ease: easeReveal,
              }}
            >
              <Container className="grid grid-cols-[260px_1fr] gap-8 py-8">
                <div className="relative flex flex-col overflow-hidden rounded-card bg-primary-soft p-6">
                  <p className="font-heading text-2xl font-bold text-primary">{intro.title}</p>
                  <p className="mt-2 text-sm text-ink/80">{intro.line}</p>
                  {seeAll ? (
                    <a
                      href={seeAll}
                      className="link-sweep mt-4 self-start text-sm font-semibold text-primary"
                    >
                      {t.seeAllOn} {brand.name}
                    </a>
                  ) : site.kind === 'hub' && stripLang(pathname) !== '/' ? (
                    <Link
                      to="/"
                      onClick={close}
                      className="link-sweep mt-4 self-start text-sm font-semibold text-primary"
                    >
                      {t.seeAll}
                    </Link>
                  ) : null}
                  <div className="mt-auto flex justify-end pt-4">
                    <Mascot pose={intro.pose} size={110} motion="nod" />
                  </div>
                </div>
                <m.ul
                  className="menu-scroll grid max-h-[min(26rem,calc(100vh-12rem))] content-start grid-cols-3 gap-3 pb-1 pr-2"
                  initial="hidden"
                  animate="shown"
                  variants={{
                    shown: { transition: { staggerChildren: reduced ? 0 : tileStagger } },
                  }}
                >
                  {tiles.map((entry) => (
                    <m.li
                      key={entry.key}
                      variants={
                        reduced
                          ? { hidden: { opacity: 0 }, shown: { opacity: 1 } }
                          : {
                              hidden: { opacity: 0, y: 14, scale: 0.96 },
                              shown: { opacity: 1, y: 0, scale: 1, transition: springPop },
                            }
                      }
                    >
                      <MenuTile entry={entry} onNavigate={close} />
                    </m.li>
                  ))}
                </m.ul>
              </Container>
            </m.div>
          ) : null}
        </AnimatePresence>
      </header>
      {/* Outside <header> so its position:fixed is relative to the viewport. */}
      <MobileDrawer site={site} open={drawerOpen} onClose={closeDrawer} />
    </>
  )
}
