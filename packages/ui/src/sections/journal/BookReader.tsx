import type { JournalPost } from '@iqra/config'
import { useRef, useState } from 'react'
import { useT } from '../../i18n/lang.ts'
import { Picture } from '../../primitives/Picture.tsx'
import { cn } from '../../utils/cn.ts'

type Figure = NonNullable<JournalPost['figures']>[number]

/**
 * A child's book inside a journal post: one page at a time, swiped (phone) or scrolled with
 * the arrow buttons, the child's own words typed under each page exactly as written.
 * Native scroll-snap only, so it works the same with reduced motion and without Lenis.
 */
export function BookReader({ pages }: { pages: Figure[] }) {
  const t = useT()
  const track = useRef<HTMLDivElement>(null)
  const [at, setAt] = useState(0)

  const go = (to: number) => {
    const el = track.current
    if (!el) return
    const i = Math.max(0, Math.min(pages.length - 1, to))
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <figure className="not-prose my-8 rounded-card bg-paper-2 p-3 shadow-soft md:p-5" aria-roledescription="book">
      <div
        ref={track}
        data-lenis-prevent
        onScroll={(e) => {
          const el = e.currentTarget
          setAt(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)))
        }}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {pages.map((page, i) => (
          <div
            key={page.src}
            className="flex w-full shrink-0 snap-center flex-col items-center gap-4 px-1"
            aria-label={`${t.page} ${i + 1} ${t.of} ${pages.length}`}
            role="group"
          >
            <div className="flex h-[min(70vh,560px)] w-full items-center justify-center [&_picture]:contents">
              <Picture
                {...page}
                alt={page.alt}
                className="max-h-full w-auto max-w-full rounded-[12px] object-contain shadow-soft"
              />
            </div>
            {page.caption ? (
              <p className="max-w-xl text-center text-xl leading-relaxed text-ink">{page.caption}</p>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(at - 1)}
          disabled={at === 0}
          aria-label={t.previousPage}
          className={cn(
            'flex size-11 items-center justify-center rounded-full bg-surface text-primary shadow-soft transition-opacity',
            at === 0 && 'opacity-40',
          )}
        >
          <span aria-hidden="true">←</span>
        </button>
        <span className="font-heading text-sm font-semibold text-ink/75" aria-live="polite">
          {t.page} {at + 1} {t.of} {pages.length}
        </span>
        <button
          type="button"
          onClick={() => go(at + 1)}
          disabled={at === pages.length - 1}
          aria-label={t.nextPage}
          className={cn(
            'flex size-11 items-center justify-center rounded-full bg-surface text-primary shadow-soft transition-opacity',
            at === pages.length - 1 && 'opacity-40',
          )}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </figure>
  )
}
