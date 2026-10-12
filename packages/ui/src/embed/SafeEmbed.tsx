import { frameOrigins, type EmbedConfig, type SiteConfig } from '@iqra/config'
import { useT } from '../i18n/lang.ts'
import { useEffect, useState } from 'react'
import { mascotImage } from '../layout/brand.ts'
import { useIsClient } from '../motion/useIsClient.ts'
import { Button } from '../primitives/Button.tsx'
import { Picture } from '../primitives/Picture.tsx'
import { cn } from '../utils/cn.ts'

const SLOW_AFTER_MS = 10_000

type Verdict = 'empty' | 'ok' | 'rejected'

const verdict = (site: SiteConfig, src: string): Verdict => {
  if (src === '') return 'empty'
  if (src.startsWith('/embeds/')) return 'ok'
  if (src.startsWith('https://')) {
    try {
      return frameOrigins(site).includes(new URL(src).origin) ? 'ok' : 'rejected'
    } catch {
      return 'rejected'
    }
  }
  return 'rejected'
}

function Notice({ site, title, body }: { site: SiteConfig; title: string; body: string }) {
  const t = useT()
  const mascot = mascotImage(site.mascot)
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 rounded-card bg-paper-2 px-6 py-16 text-center">
      {site.mascotTone !== 'none' ? (
        <Picture {...mascot} className="size-32 object-contain" />
      ) : null}
      <p className="font-heading text-2xl font-semibold text-primary">{title}</p>
      <p className="max-w-md text-ink/80">{body}</p>
      <Button to="/" variant="outline" size="sm">
        {t.backToHome}
      </Button>
    </div>
  )
}

interface SafeEmbedProps {
  site: SiteConfig
  embed: EmbedConfig
  /** Sets the height. The frame fills it edge to edge. */
  className?: string
}

/**
 * The only way an iframe is rendered on any site. Accepts an https:// source whose
 * origin is listed in the registry, or an /embeds/ file of the site's own.
 */
export function SafeEmbed({ site, embed, className }: SafeEmbedProps) {
  const t = useT()
  const [loaded, setLoaded] = useState(false)
  const [slow, setSlow] = useState(false)
  // The frame is only created in the browser so its load event is never missed.
  const isClient = useIsClient()
  const status = verdict(site, embed.src)

  useEffect(() => {
    if (status !== 'ok' || loaded) return
    const timer = window.setTimeout(() => setSlow(true), SLOW_AFTER_MS)
    return () => window.clearTimeout(timer)
  }, [status, loaded])

  if (status === 'empty') {
    return (
      <div className={className}>
        <Notice site={site} title={t.comingSoon} body={t.embedComingSoonBody} />
      </div>
    )
  }

  if (status === 'rejected') {
    return (
      <div className={className}>
        <Notice site={site} title={t.embedRejectedTitle} body={t.embedRejectedBody} />
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      {!loaded ? (
        <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-paper-2" />
      ) : null}
      {isClient ? (
        <iframe
          src={embed.src}
          title={embed.title}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow={embed.allow ?? ''}
          onLoad={() => setLoaded(true)}
          className={cn(
            'relative block h-full w-full border-0 bg-transparent transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      ) : null}
      {!loaded && slow ? (
        <p className="absolute inset-x-0 bottom-6 text-center text-sm text-ink/80">
          {t.embedSlow}{' '}
          <a
            href={embed.src}
            target="_blank"
            rel="noopener noreferrer"
            className="link-sweep font-semibold text-primary"
          >
            {t.openInNewTab}
          </a>
        </p>
      ) : null}
    </div>
  )
}
