import { Link } from 'react-router'
import { Picture } from '../primitives/Picture.tsx'
import { cn } from '../utils/cn.ts'
import { mascotImage } from './brand.ts'
import type { TileEntry } from './links.ts'

export function ComingSoonPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'label inline-block rounded-pill bg-paper-2 px-2.5 py-0.5 text-[10px] text-ink/85',
        className,
      )}
    >
      Coming soon
    </span>
  )
}

function HerePill() {
  return (
    <span className="label mt-1.5 inline-block rounded-pill bg-sun px-2.5 py-0.5 text-[10px] text-plum">
      You are here
    </span>
  )
}

interface MenuTileProps {
  entry: TileEntry
  /** Smaller mascot and text, for the mobile drawer. */
  compact?: boolean
  onNavigate?: () => void
}

/** A tool or programme in a menu: mascot, name, one line, and its status. */
export function MenuTile({ entry, compact = false, onNavigate }: MenuTileProps) {
  const mascot = mascotImage(entry.mascot, 160)
  const live = entry.href !== undefined

  const body = (
    <>
      <span
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full bg-white ring-4',
          live ? 'ring-sun' : 'ring-paper-2',
          compact ? 'size-12' : 'size-16',
        )}
      >
        <Picture
          {...mascot}
          className={cn(
            'object-contain transition-transform duration-300 ease-reveal motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110',
            compact ? 'size-9' : 'size-12',
            !live && 'opacity-60',
          )}
        />
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            'block font-heading font-semibold leading-tight',
            live ? 'text-ink' : 'text-ink/85',
            compact ? 'text-base' : 'text-lg',
          )}
        >
          {entry.name}
        </span>
        {entry.line ? <span className="mt-0.5 block text-sm text-ink/80">{entry.line}</span> : null}
        {!live ? <ComingSoonPill className="mt-1.5" /> : entry.current ? <HerePill /> : null}
      </span>
    </>
  )

  const tile = cn(
    'group flex h-full items-center rounded-card border',
    compact ? 'gap-3 p-2.5' : 'gap-4 p-4',
  )

  if (entry.href === undefined) {
    return (
      <div aria-disabled="true" className={cn(tile, 'border-transparent bg-paper-2/50')}>
        {body}
      </div>
    )
  }

  const liveTile = cn(
    tile,
    'border-taupe/25 bg-paper transition duration-300 ease-reveal hover:border-sun hover:bg-white hover:shadow-soft motion-safe:hover:-translate-y-1',
  )

  if (entry.href.startsWith('/')) {
    return (
      <Link
        to={entry.href}
        onClick={onNavigate}
        aria-current={entry.current ? 'page' : undefined}
        className={liveTile}
      >
        {body}
      </Link>
    )
  }
  return (
    <a href={entry.href} onClick={onNavigate} className={liveTile}>
      {body}
    </a>
  )
}
