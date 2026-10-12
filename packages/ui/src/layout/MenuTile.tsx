import { useT } from '../i18n/lang.ts'
import { Link } from '../i18n/Link.tsx'
import { Mascot } from '../mascot/Mascot.tsx'
import { asPose, colourClass } from '../primitives/colours.ts'
import { cn } from '../utils/cn.ts'
import type { TileEntry } from './links.ts'

export function ComingSoonPill({ className }: { className?: string }) {
  const t = useT()
  return (
    <span
      className={cn(
        'label inline-block whitespace-nowrap rounded-pill bg-paper-2 px-2.5 py-0.5 text-[10px] text-ink/85',
        className,
      )}
    >
      {t.comingSoon}
    </span>
  )
}

function HerePill() {
  const t = useT()
  return (
    <span className="label mt-1.5 inline-block rounded-pill bg-sun px-2.5 py-0.5 text-[10px] text-on-sun">
      {t.youAreHere}
    </span>
  )
}

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

interface MenuTileProps {
  entry: TileEntry
  /** Smaller dino and text, for the mobile drawer and the hero. */
  compact?: boolean
  onNavigate?: () => void
}

/** A tool or programme in a menu: its dino on its colour, the name, one line and its status. */
export function MenuTile({ entry, compact = false, onNavigate }: MenuTileProps) {
  const live = entry.href !== undefined
  const c = colourClass[entry.colour]

  const body = (
    <>
      <span
        className={cn(
          'flex shrink-0 items-end justify-center overflow-hidden rounded-[22px] transition-transform duration-300 ease-reveal motion-safe:group-hover:-rotate-3',
          live ? c.soft : 'bg-paper-2',
          compact ? 'size-14' : 'size-[72px]',
        )}
      >
        <Mascot
          pose={asPose(entry.pose)}
          size={compact ? 50 : 64}
          className={cn('iq-mascot-hover translate-y-1', !live && 'opacity-60 grayscale-[35%]')}
        />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            'flex items-center gap-1.5 font-heading font-semibold leading-tight',
            live ? 'text-ink' : 'text-ink/85',
            compact ? 'text-base' : 'text-lg',
          )}
        >
          {entry.name}
          {live && !entry.current ? (
            <span className="text-primary opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
              <Arrow />
            </span>
          ) : null}
        </span>
        {entry.line ? (
          <span className={cn('mt-0.5 block text-ink/80', compact ? 'text-xs' : 'text-sm')}>
            {entry.line}
          </span>
        ) : null}
        {!live ? <ComingSoonPill className="mt-1.5" /> : entry.current ? <HerePill /> : null}
      </span>
    </>
  )

  const tile = cn(
    'group flex h-full items-center rounded-card border',
    compact ? 'gap-3 p-2' : 'gap-4 p-3',
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
    'border-line bg-surface transition duration-300 ease-reveal hover:shadow-soft motion-safe:hover:-translate-y-1',
    c.hoverBorder,
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
