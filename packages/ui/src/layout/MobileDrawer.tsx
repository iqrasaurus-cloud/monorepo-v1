import { hubMenu, siteMenu, siteUrl, type SiteConfig } from '@iqra/config'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { duration, easeWipe, stagger } from '../motion/presets.ts'
import { useSmoothScroll } from '../motion/SmoothScroll.tsx'
import { useReducedMotionSafe } from '../motion/useReducedMotionSafe.ts'
import { cn } from '../utils/cn.ts'
import { HubLink } from './HubLink.tsx'
import { hubLive, toolkitEntries, toolkitLabel } from './links.ts'
import { ComingSoonPill } from './ToolkitMegaMenu.tsx'
import { useAnchorNavigate } from './useAnchorNavigate.ts'

const FOCUSABLE = 'a[href], button:not([disabled])'
const itemClass = 'block py-2.5 font-heading text-2xl font-semibold text-ink'
const hubItemClass = 'block py-2 label'

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

/** Left-hand drawer for screens under 1024px: site menu, then the hub menu. */
export function MobileDrawer({ site, open, onClose }: MobileDrawerProps) {
  const reduced = useReducedMotionSafe()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [toolkitOpen, setToolkitOpen] = useState(false)
  const onAnchor = useAnchorNavigate()
  const { lock } = useSmoothScroll()
  const hubActive = site.kind === 'hub' || hubLive()

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

  // Hub items continue the rise stagger after the site items.
  const hubOffset = siteMenu.length

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
            className="fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-[380px] flex-col overflow-y-auto bg-paper px-6 pb-10 pt-4 shadow-soft"
            initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
            animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)' }}
            exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
            transition={
              reduced ? { duration: duration.fade } : { duration: duration.wipe, ease: easeWipe }
            }
          >
            <div className="flex justify-end">
              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="-mr-2 flex size-10 items-center justify-center rounded-pill text-ink"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>

            <nav aria-label={site.name}>
              <ul>
                {siteMenu.map((item, i) => {
                  if (item.type === 'anchor') {
                    return (
                      <li key={item.label}>
                        <Rise index={i} reduced={reduced}>
                          <a
                            href={item.target}
                            className={itemClass}
                            onClick={(e) => {
                              onClose()
                              onAnchor(e, item.target)
                            }}
                          >
                            {item.label}
                          </a>
                        </Rise>
                      </li>
                    )
                  }
                  if (item.type === 'route') {
                    return (
                      <li key={item.label}>
                        <Rise index={i} reduced={reduced}>
                          <Link to={item.target} className={itemClass} onClick={onClose}>
                            {item.label}
                          </Link>
                        </Rise>
                      </li>
                    )
                  }
                  return (
                    <li key={item.label}>
                      <Rise index={i} reduced={reduced}>
                        <button
                          type="button"
                          aria-expanded={toolkitOpen}
                          aria-controls="mobile-toolkit"
                          onClick={() => setToolkitOpen((o) => !o)}
                          className={cn(itemClass, 'flex w-full items-center justify-between')}
                        >
                          {item.label}
                          <span aria-hidden="true" className="text-primary">
                            {toolkitOpen ? '−' : '+'}
                          </span>
                        </button>
                      </Rise>
                      {toolkitOpen ? (
                        <ul id="mobile-toolkit" className="mb-2 border-l-2 border-sun pl-4">
                          {toolkitEntries().map((entry) => (
                            <li key={entry.slug} className="flex items-center gap-2 py-1.5">
                              {entry.status !== 'live' ? (
                                <>
                                  <span className="text-ink/40">{toolkitLabel(entry)}</span>
                                  <ComingSoonPill />
                                </>
                              ) : entry.slug === site.slug ? (
                                <Link
                                  to="/"
                                  aria-current="true"
                                  onClick={onClose}
                                  className="text-ink"
                                >
                                  {toolkitLabel(entry)}
                                </Link>
                              ) : (
                                <a href={siteUrl(entry)} className="text-ink">
                                  {toolkitLabel(entry)}
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </nav>

            <hr className="my-5 border-taupe/40" />

            <nav aria-label="IqraSaurus">
              <ul>
                {hubMenu.map((item, i) => (
                  <li key={item.path}>
                    <Rise index={hubOffset + i} reduced={reduced}>
                      <HubLink
                        site={site}
                        path={item.path}
                        onClick={onClose}
                        className={cn(hubItemClass, hubActive ? 'text-ink/70' : 'text-ink/40')}
                      >
                        {item.label}
                      </HubLink>
                    </Rise>
                  </li>
                ))}
              </ul>
              {!hubActive ? (
                <p className="label mt-2 text-ink/40">IqraSaurus home: coming soon</p>
              ) : null}
            </nav>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
