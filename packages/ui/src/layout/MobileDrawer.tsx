import { mainMenu, type SiteConfig } from '@iqra/config'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { Link } from 'react-router'
import { duration, easeWipe, stagger } from '../motion/presets.ts'
import { useSmoothScroll } from '../motion/SmoothScroll.tsx'
import { useReducedMotionSafe } from '../motion/useReducedMotionSafe.ts'
import { cn } from '../utils/cn.ts'
import { DonateButton, Logo } from './HeaderParts.tsx'
import { hubItemHref, programmeTiles, toolTiles } from './links.ts'
import { MenuTile } from './MenuTile.tsx'
import { useHashJump } from './useHashJump.ts'

const FOCUSABLE = 'a[href], button:not([disabled])'
const itemClass =
  'flex w-full items-center justify-between py-3 font-heading text-2xl font-semibold text-ink'

interface RiseProps {
  index: number
  reduced: boolean
  children: ReactNode
}

function Rise({ index, reduced, children }: RiseProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={reduced ? { opacity: 0 } : { y: '110%' }}
        animate={reduced ? { opacity: 1 } : { y: '0%' }}
        transition={
          reduced
            ? { duration: duration.fade }
            : {
                duration: duration.wipe,
                ease: easeWipe,
                delay: stagger.drawerStart + index * stagger.drawerItem,
              }
        }
      >
        {children}
      </motion.div>
    </div>
  )
}

interface MobileDrawerProps {
  site: SiteConfig
  open: boolean
  onClose: () => void
}

/** Right-hand drawer for screens under 1024px: the same four items as the header bar. */
export function MobileDrawer({ site, open, onClose }: MobileDrawerProps) {
  const reduced = useReducedMotionSafe()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [section, setSection] = useState<'tools' | 'programmes' | null>(null)
  const { lock } = useSmoothScroll()
  const jump = useHashJump()

  useEffect(() => {
    if (!open) return
    lock(true)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (!first || !last) return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      lock(false)
    }
  }, [open, onClose, lock])

  // Closing unlocks smooth scrolling and body overflow only once the effect cleanup
  // runs, so an in-page jump waits a frame or it silently does nothing.
  const follow = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    onClose()
    if (!href.startsWith('#')) return
    e.preventDefault()
    requestAnimationFrame(() => jump(href))
  }

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-plum/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.fade }}
          />
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            // Lenis takes over wheel and touch scrolling even while stopped; this lets
            // the drawer scroll on its own.
            data-lenis-prevent=""
            className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-[400px] flex-col overflow-y-auto bg-paper px-5 pb-8 pt-4 shadow-soft"
            initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 0 100%)' }}
            animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0 0 0%)' }}
            exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 0 100%)' }}
            transition={
              reduced ? { duration: duration.fade } : { duration: duration.wipe, ease: easeWipe }
            }
          >
            <div className="mb-4 flex items-center justify-between">
              <Logo site={site} className="h-8" />
              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="-mr-2 flex size-10 items-center justify-center rounded-pill text-ink"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
                  <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>

            <nav aria-label="Main" className="flex-1">
              <ul className="divide-y divide-taupe/25">
                {mainMenu.map((item, i) => {
                  if (item.type === 'hub') {
                    const href = hubItemHref(site, item.path, item.fallback)
                    return (
                      <li key={item.label}>
                        <Rise index={i} reduced={reduced}>
                          {href.startsWith('/') ? (
                            <Link to={href} onClick={onClose} className={itemClass}>
                              {item.label}
                            </Link>
                          ) : (
                            <a href={href} onClick={(e) => follow(e, href)} className={itemClass}>
                              {item.label}
                            </a>
                          )}
                        </Rise>
                      </li>
                    )
                  }
                  const isOpen = section === item.type
                  const listId = `mobile-${item.type}`
                  const tiles = item.type === 'tools' ? toolTiles() : programmeTiles(site)
                  return (
                    <li key={item.label}>
                      <Rise index={i} reduced={reduced}>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={listId}
                          onClick={() => setSection((s) => (s === item.type ? null : item.type))}
                          className={itemClass}
                        >
                          {item.label}
                          <span
                            aria-hidden="true"
                            className={cn(
                              'flex size-8 items-center justify-center rounded-full text-xl transition-colors',
                              isOpen ? 'bg-sun text-plum' : 'bg-paper-2 text-primary',
                            )}
                          >
                            {isOpen ? '−' : '+'}
                          </span>
                        </button>
                      </Rise>
                      {isOpen ? (
                        <ul id={listId} className="grid gap-2 pb-4">
                          {tiles.map((entry) => (
                            <li key={entry.key}>
                              <MenuTile entry={entry} compact onNavigate={onClose} />
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* shrink-0: Rise clips its overflow, so flexbox would otherwise squash it to nothing. */}
            <div className="shrink-0 pt-6">
              <Rise index={mainMenu.length} reduced={reduced}>
                <DonateButton size="lg" onClick={follow} />
              </Rise>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
