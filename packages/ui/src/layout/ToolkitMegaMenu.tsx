import type { SiteConfig } from '@iqra/config'
import { siteUrl } from '@iqra/config'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { HoverPreview } from '../motion/HoverPreview.tsx'
import { duration, easeReveal } from '../motion/presets.ts'
import { useReducedMotionSafe } from '../motion/useReducedMotionSafe.ts'
import { Container } from '../primitives/Container.tsx'
import { Eyebrow } from '../primitives/Eyebrow.tsx'
import { cn } from '../utils/cn.ts'
import { mascotImage } from './brand.ts'
import { toolkitEntries, toolkitLabel } from './links.ts'

export const TOOLKIT_PANEL_ID = 'toolkit-menu'

export function ComingSoonPill() {
  return (
    <span className="label rounded-pill bg-paper-2 px-3 py-1 text-[10px] text-ink/60">
      Coming soon
    </span>
  )
}

interface ToolkitMegaMenuProps {
  site: SiteConfig
  open: boolean
  onNavigate: () => void
}

/** Full-width panel under Band 3 listing every site in the registry. */
export function ToolkitMegaMenu({ site, open, onNavigate }: ToolkitMegaMenuProps) {
  const reduced = useReducedMotionSafe()
  const listRef = useRef<HTMLUListElement>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const entries = toolkitEntries()
  const previews = entries.map((s) => ({ key: s.slug, ...mascotImage(s.mascot) }))

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={TOOLKIT_PANEL_ID}
          className="absolute inset-x-0 top-full max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-taupe/30 bg-white shadow-soft"
          initial={{ opacity: 0, y: reduced ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : -8 }}
          transition={{ duration: reduced ? duration.fade : duration.preview, ease: easeReveal }}
        >
          <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <Eyebrow className="mb-4">Toolkit</Eyebrow>
              <p className="font-heading text-2xl font-semibold text-ink">
                Things we&rsquo;ve tried, learned and shared.
              </p>
            </div>

            <ul
              ref={listRef}
              className="relative divide-y divide-taupe/30"
              onMouseLeave={() => setHovered(null)}
            >
              <HoverPreview containerRef={listRef} items={previews} activeKey={hovered} />
              {entries.map((entry, i) => {
                const isCurrent = entry.slug === site.slug
                const isLive = entry.status === 'live'
                const label = toolkitLabel(entry)
                const index = String(i + 1).padStart(2, '0')
                const rowClass = 'grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-4'
                const title = (
                  <span
                    className={cn(
                      'font-heading text-xl font-semibold transition-transform duration-500 ease-reveal',
                      isLive ? 'text-ink group-hover:translate-x-4' : 'text-ink/40',
                    )}
                  >
                    {label}
                  </span>
                )
                const description = (
                  <span className={cn('block text-sm', isLive ? 'text-ink/70' : 'text-ink/40')}>
                    {entry.description}
                  </span>
                )

                if (!isLive) {
                  return (
                    <li key={entry.slug} className={rowClass} aria-disabled="true">
                      <span className="label text-ink/40">{index}</span>
                      <span className="flex flex-col gap-1">
                        {title}
                        {description}
                      </span>
                      <ComingSoonPill />
                    </li>
                  )
                }

                const inner = (
                  <>
                    <span className="label text-ink/50 transition-colors group-hover:text-accent">
                      {index}
                    </span>
                    <span className="flex flex-col gap-1">
                      {title}
                      {description}
                    </span>
                    {isCurrent ? (
                      <span className="label rounded-pill bg-sun px-3 py-1 text-[10px] text-plum">
                        You are here
                      </span>
                    ) : (
                      <span aria-hidden="true" className="text-primary">
                        &rarr;
                      </span>
                    )}
                  </>
                )

                return (
                  <li key={entry.slug} onMouseEnter={() => setHovered(entry.slug)}>
                    {isCurrent ? (
                      <Link
                        to="/"
                        aria-current="true"
                        onClick={onNavigate}
                        className={cn(rowClass, 'group focus-visible:outline-offset-[-2px]')}
                      >
                        {inner}
                      </Link>
                    ) : (
                      <a
                        href={siteUrl(entry)}
                        className={cn(rowClass, 'group focus-visible:outline-offset-[-2px]')}
                      >
                        {inner}
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </Container>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
