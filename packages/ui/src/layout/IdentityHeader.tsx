import { brand, hub, siteUrl, type SiteConfig } from '@iqra/config'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Container } from '../primitives/Container.tsx'
import { Picture } from '../primitives/Picture.tsx'
import { cn } from '../utils/cn.ts'
import { brandImage } from './brand.ts'
import { hubLive } from './links.ts'

function SiteName({ name }: { name: string }) {
  const words = name.split(' ')
  const last = words.pop()
  return (
    <span className="font-heading text-2xl font-bold leading-none text-ink lg:text-[30px]">
      {words.length > 0 ? `${words.join(' ')} ` : null}
      <span className="text-accent">{last}</span>
    </span>
  )
}

/** Spoke identity: the site's name and one line about it. The mascot lives in the hero. */
function SpokeIdentity({ site }: { site: SiteConfig }) {
  return (
    <Link to="/" className="flex min-w-0 flex-col gap-1.5">
      <SiteName name={site.name} />
      <span className="hidden truncate text-sm text-ink/70 min-[480px]:block">
        {site.description}
      </span>
    </Link>
  )
}

function HubIdentity() {
  const logo = brandImage('logo-horizontal')
  return (
    <Link to="/" aria-label="IqraSaurus home" className="flex items-center">
      <Picture {...logo} priority className="h-11 w-auto lg:h-16" />
    </Link>
  )
}

function HubMotto() {
  const mark = brandImage('icon')
  const lines = brand.motto
    .split('. ')
    .map((line, i, all) => (i < all.length - 1 ? `${line}.` : line))
  return (
    <div className="flex flex-col items-end text-right">
      <Picture {...mark} className="mb-1 size-8 object-contain" />
      <p className="font-heading text-lg font-semibold leading-tight text-ink">
        {lines.map((line, i) => (
          <span key={line} className={cn('block', i === lines.length - 1 && 'text-accent')}>
            {line}
          </span>
        ))}
      </p>
    </div>
  )
}

/** Links to the hub only once it is live; otherwise the brand is shown without a link. */
function ParentBrand({ children }: { children: ReactNode }) {
  if (!hubLive()) return <div className="flex items-center">{children}</div>
  return (
    <a href={siteUrl(hub())} aria-label="IqraSaurus home" className="flex items-center">
      {children}
    </a>
  )
}

/** Band 2: this site's identity on the left, the IqraSaurus brand on the right. */
export function IdentityHeader({ site }: { site: SiteConfig }) {
  const isHub = site.kind === 'hub'
  const logo = brandImage('logo-horizontal')
  const mark = brandImage('icon')

  return (
    <div className="bg-white">
      <Container className="flex items-center justify-between gap-6 py-4 lg:h-[110px] lg:py-0">
        {isHub ? <HubIdentity /> : <SpokeIdentity site={site} />}

        <div className="flex shrink-0 items-center">
          {isHub ? (
            <>
              <div className="hidden lg:block">
                <HubMotto />
              </div>
              <Picture {...mark} className="size-11 object-contain lg:hidden" />
            </>
          ) : (
            <ParentBrand>
              <span className="label mr-4 hidden text-ink/60 lg:block">Part of</span>
              <Picture {...logo} priority className="hidden h-14 w-auto lg:block" />
              <Picture {...mark} className="size-11 object-contain lg:hidden" />
            </ParentBrand>
          )}
        </div>
      </Container>
    </div>
  )
}
