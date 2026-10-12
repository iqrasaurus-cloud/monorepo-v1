import { brand, mainMenu, type SiteConfig } from '@iqra/config'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { Link } from 'react-router'
import { Mascot } from '../mascot/Mascot.tsx'
import {
  duration,
  easeReveal,
  easeWipe,
  springPop,
  springSheet,
  stagger,
  tileStagger,
} from '../motion/presets.ts'
import { useSmoothScroll } from '../motion/SmoothScroll.tsx'
import { useReducedMotionSafe } from '../motion/useReducedMotionSafe.ts'
import { Pattern } from '../primitives/Pattern.tsx'
import { cn } from '../utils/cn.ts'
import { DonateButton, Logo } from './HeaderParts.tsx'
import { hubItemHref, programmeTiles, toolTiles } from './links.ts'
import { MenuTile } from './MenuTile.tsx'
import { useHashJump } from './useHashJump.ts'

const FOCUSABLE = 'a[href], button:not([disabled])'
const itemClass =
  'group flex w-full items-center justify-between gap-3 py-4 text-left font-heading text-[1.75rem] font-bold leading-none text-ink transition-colors hover:text-primary'

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

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="flex size-10 items-center justify-center rounded-full bg-primary-soft text-primary transition-transform duration-300 group-hover:translate-x-1"
    >
      <svg viewBox="0 0 24 24" className="size-5">
        <path
          d="M5 12h14M13 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-10 items-center justify-center rounded-full transition-colors duration-300',
        open ? 'bg-sun text-on-sun' : 'bg-primary-soft text-primary',
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn('size-5 transition-transform duration-300', open && 'rotate-45')}
      >
        <path
          d="M12 5v14M5 12h14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

interface MobileDrawerProps {
  site: SiteConfig
  open: boolean
  onClose: () => void
}

/** Drawer for screens under 1024px: the same four items as the header bar, then Donate. */
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
            className="fixed inset-0 z-40 bg-plum/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? duration.fade : 0.3 }}
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
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto overscroll-contain bg-paper shadow-soft sm:max-w-[460px] sm:rounded-l-[28px]"
            initial={reduced ? { opacity: 0 } : { x: '100%' }}
            animate={reduced ? { opacity: 1 } : { x: 0 }}
            exit={reduced ? { opacity: 0 } : { x: '100%' }}
            transition={reduced ? { duration: duration.fade } : springSheet}
          >
            <Pattern className="bg-plum/[0.04]" />
            <div className="relative flex min-h-full flex-col px-5 pb-8 pt-4">
              <div className="mb-2 flex h-14 items-center justify-between">
                <Logo site={site} className="h-9" />
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Close menu"
                  onClick={onClose}
                  className="-mr-1 flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary transition-transform duration-300 hover:rotate-90 active:scale-90"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <nav aria-label="Main" className="flex-1">
                <ul className="divide-y divide-line">
                  {mainMenu.map((item, i) => {
                    if (item.type === 'site') {
                      return (
                        <li key={item.label}>
                          <Rise index={i} reduced={reduced}>
                            <Link to={item.path} onClick={onClose} className={itemClass}>
                              {item.label}
                              <Arrow />
                            </Link>
                          </Rise>
                        </li>
                      )
                    }
                    if (item.type === 'hub') {
                      const href = hubItemHref(site, item.path, item.fallback)
                      return (
                        <li key={item.label}>
                          <Rise index={i} reduced={reduced}>
                            {href.startsWith('/') ? (
                              <Link to={href} onClick={onClose} className={itemClass}>
                                {item.label}
                                <Arrow />
                              </Link>
                            ) : (
                              <a href={href} onClick={(e) => follow(e, href)} className={itemClass}>
                                {item.label}
                                <Arrow />
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
                            <span>
                              {item.label}
                              <span className="ml-2 align-middle font-body text-sm font-semibold text-ink/60">
                                {tiles.length}
                              </span>
                            </span>
                            <PlusMinus open={isOpen} />
                          </button>
                        </Rise>
                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.div
                              key="list"
                              className="overflow-hidden"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: reduced ? duration.fade : 0.4,
                                ease: easeReveal,
                              }}
                            >
                              <motion.ul
                                id={listId}
                                className="grid gap-2 pb-5 min-[420px]:grid-cols-2"
                                initial="hidden"
                                animate="shown"
                                variants={{
                                  shown: {
                                    transition: { staggerChildren: reduced ? 0 : tileStagger },
                                  },
                                }}
                              >
                                {tiles.map((entry) => (
                                  <motion.li
                                    key={entry.key}
                                    variants={
                                      reduced
                                        ? { hidden: { opacity: 0 }, shown: { opacity: 1 } }
                                        : {
                                            hidden: { opacity: 0, y: 12, scale: 0.94 },
                                            shown: {
                                              opacity: 1,
                                              y: 0,
                                              scale: 1,
                                              transition: springPop,
                                            },
                                          }
                                    }
                                  >
                                    <MenuTile entry={entry} compact onNavigate={onClose} />
                                  </motion.li>
                                ))}
                              </motion.ul>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              {/* shrink-0: Rise clips its overflow, so flexbox would otherwise squash it to nothing. */}
              <div className="relative mt-24 shrink-0">
                <div className="pointer-events-none absolute -top-[86px] right-2">
                  <Mascot pose="waving-wink" size={96} motion="nod" />
                </div>
                <Rise index={mainMenu.length} reduced={reduced}>
                  <DonateButton size="lg" onClick={follow} />
                </Rise>
                <Rise index={mainMenu.length + 1} reduced={reduced}>
                  <p className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-ink/80">
                    <a href={brand.contact.whatsappHref} rel="noopener" className="link-sweep">
                      WhatsApp {brand.contact.whatsapp}
                    </a>
                    <a href={`mailto:${brand.contact.email}`} className="link-sweep">
                      {brand.contact.email}
                    </a>
                  </p>
                </Rise>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
