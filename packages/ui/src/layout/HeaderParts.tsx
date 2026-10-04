import { brand, type SiteConfig } from '@iqra/config'
import type { MouseEvent } from 'react'
import { Link } from 'react-router'
import { Picture } from '../primitives/Picture.tsx'
import { cn } from '../utils/cn.ts'
import { brandImage } from './brand.ts'
import { donateHref, hubLive, logoHref } from './links.ts'

export function Logo({ site, className }: { site: SiteConfig; className?: string }) {
  const logo = brandImage('logo-horizontal')
  const href = logoHref(site)
  const label = site.kind === 'hub' || hubLive() ? 'IqraSaurus home' : `${site.name} home`
  const image = <Picture {...logo} priority className={cn('w-auto', className)} />
  if (href.startsWith('/')) {
    return (
      <Link to={href} aria-label={label} className="flex shrink-0 items-center">
        {image}
      </Link>
    )
  }
  return (
    <a href={href} aria-label={label} className="flex shrink-0 items-center">
      {image}
    </a>
  )
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path
        d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"
        fill="currentColor"
      />
    </svg>
  )
}

interface DonateButtonProps {
  size?: 'sm' | 'lg'
  className?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>, href: string) => void
}

/** The one bright call to action, on every site. */
export function DonateButton({ size = 'sm', className, onClick }: DonateButtonProps) {
  const href = donateHref()
  return (
    <a
      href={href}
      onClick={onClick ? (e) => onClick(e, href) : undefined}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-pill bg-sun font-heading font-semibold text-plum shadow-soft transition duration-300 ease-reveal hover:bg-sun/85 motion-safe:hover:-translate-y-0.5',
        size === 'sm' ? 'px-4 py-2 text-sm lg:px-5 lg:py-2.5 lg:text-base' : 'w-full px-6 py-4 text-lg',
        className,
      )}
    >
      <HeartIcon className={size === 'sm' ? 'size-4' : 'size-5'} />
      {brand.donate.label}
    </a>
  )
}
