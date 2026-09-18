import { frameOrigins, type SiteConfig } from './spokes.ts'

export interface HeaderRule {
  source: string
  headers: { key: string; value: string }[]
}

type FrameAncestors = "'none'" | "'self'"

export const contentSecurityPolicy = (site: SiteConfig, frameAncestors: FrameAncestors): string =>
  [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    `frame-src ${["'self'", ...frameOrigins(site)].join(' ')}`,
    `frame-ancestors ${frameAncestors}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ].join('; ')

/** Origins of external embeds that declare a given feature in `allow`. */
const allowedOrigins = (site: SiteConfig, feature: string): string[] =>
  [site.journal, site.chat]
    .filter((e) => e.src.startsWith('https://') && (e.allow ?? '').split(/\s+/).includes(feature))
    .map((e) => new URL(e.src).origin)
    .filter((o, i, a) => a.indexOf(o) === i)

export const permissionsPolicy = (site: SiteConfig): string => {
  const mic = allowedOrigins(site, 'microphone')
  const micValue = mic.length > 0 ? ['self', ...mic.map((o) => `"${o}"`)].join(' ') : ''
  return `camera=(), microphone=(${micValue}), geolocation=(), payment=(), usb=()`
}

const commonHeaders = (site: SiteConfig) => [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: permissionsPolicy(site) },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]

// The two CSP sources are mutually exclusive so a response never carries two CSP headers.
export const securityHeaders = (site: SiteConfig): HeaderRule[] => [
  {
    source: '/((?!embeds/).*)',
    headers: [
      { key: 'Content-Security-Policy', value: contentSecurityPolicy(site, "'none'") },
      ...commonHeaders(site),
    ],
  },
  {
    source: '/embeds/(.*)',
    headers: [
      { key: 'Content-Security-Policy', value: contentSecurityPolicy(site, "'self'") },
      ...commonHeaders(site),
    ],
  },
  {
    source: '/assets/(.*)',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
  },
]
