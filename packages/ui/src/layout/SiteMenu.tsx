import { siteMenu, type SiteConfig } from '@iqra/config'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from 'react'
import { NavLink, useLocation } from 'react-router'
import { Container } from '../primitives/Container.tsx'
import { cn } from '../utils/cn.ts'
import { anchorIds, SITE_MENU_ID } from './links.ts'
import { MobileDrawer } from './MobileDrawer.tsx'
import { TOOLKIT_PANEL_ID, ToolkitMegaMenu } from './ToolkitMegaMenu.tsx'
import { useActiveSection } from './useActiveSection.ts'
import { useAnchorNavigate } from './useAnchorNavigate.ts'

const itemClass = (isActive: boolean) =>
  cn(
    'link-sweep label py-2 text-ink transition-colors hover:text-primary',
    isActive && 'is-active text-primary',
  )

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className={cn('ml-1.5 inline size-3 transition-transform duration-300', open && 'rotate-180')}
    >
      <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
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

/** Band 3 on desktop, the hamburger bar on mobile. Sticky once Bands 1–2 have scrolled away. */
export function SiteMenu({ site }: { site: SiteConfig }) {
  const { pathname } = useLocation()
  const navRef = useRef<HTMLElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const toolkitButtonRef = useRef<HTMLButtonElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const pointerDown = useRef(false)
  const openedByFocus = useRef(false)

  const [stuck, setStuck] = useState(false)
  const [toolkitOpen, setToolkitOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const active = useActiveSection(anchorIds, pathname === '/')
  const onAnchor = useAnchorNavigate()

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
    if (!toolkitOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setToolkitOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [toolkitOpen])

  const closeToolkit = useCallback(() => setToolkitOpen(false), [])

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape' && toolkitOpen) {
      e.preventDefault()
      setToolkitOpen(false)
      toolkitButtonRef.current?.focus()
    }
  }

  const onBlur = (e: FocusEvent<HTMLElement>) => {
    if (toolkitOpen && !e.currentTarget.contains(e.relatedTarget)) setToolkitOpen(false)
  }

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    hamburgerRef.current?.focus()
  }, [])

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="-mb-px h-px" />
      <nav
        ref={navRef}
        id={SITE_MENU_ID}
        aria-label={site.name}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={cn(
          'sticky top-0 z-40 border-t border-taupe/30 transition-shadow duration-300',
          stuck && 'shadow-soft',
        )}
      >
        <div className="hidden bg-white lg:block">
          <Container>
            <ul className="flex h-14 items-center justify-center gap-8">
              {siteMenu.map((item) => {
                if (item.type === 'anchor') {
                  const id = item.target.slice(1)
                  const isActive = active === id
                  return (
                    <li key={item.label}>
                      <a
                        href={item.target}
                        aria-current={isActive ? 'true' : undefined}
                        className={itemClass(isActive)}
                        onClick={(e) => {
                          closeToolkit()
                          onAnchor(e, item.target)
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  )
                }
                if (item.type === 'route') {
                  return (
                    <li key={item.label}>
                      <NavLink
                        to={item.target}
                        className={({ isActive }) => itemClass(isActive)}
                        onClick={closeToolkit}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  )
                }
                return (
                  <li key={item.label}>
                    <button
                      ref={toolkitButtonRef}
                      type="button"
                      aria-expanded={toolkitOpen}
                      aria-controls={TOOLKIT_PANEL_ID}
                      aria-haspopup="true"
                      className={itemClass(toolkitOpen)}
                      onPointerDown={() => {
                        pointerDown.current = true
                      }}
                      onFocus={() => {
                        if (!pointerDown.current && !toolkitOpen) {
                          openedByFocus.current = true
                          setToolkitOpen(true)
                        }
                        pointerDown.current = false
                      }}
                      onClick={() => {
                        if (openedByFocus.current) {
                          openedByFocus.current = false
                          return
                        }
                        setToolkitOpen((open) => !open)
                      }}
                    >
                      {item.label}
                      <Chevron open={toolkitOpen} />
                    </button>
                  </li>
                )
              })}
            </ul>
          </Container>
          <ToolkitMegaMenu site={site} open={toolkitOpen} onNavigate={closeToolkit} />
        </div>

        <div className="bg-paper-2 lg:hidden">
          <Container className="flex h-12 items-center">
            <button
              ref={hamburgerRef}
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-menu"
              onClick={() => setDrawerOpen(true)}
              className="-ml-2 flex size-10 items-center justify-center rounded-pill text-ink"
            >
              <Hamburger />
            </button>
          </Container>
          <MobileDrawer site={site} open={drawerOpen} onClose={closeDrawer} />
        </div>
      </nav>
    </>
  )
}
