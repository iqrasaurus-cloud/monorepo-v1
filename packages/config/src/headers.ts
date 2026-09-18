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

const commonHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]

// The two CSP sources are mutually exclusive so a response never carries two CSP headers.
export const securityHeaders = (site: SiteConfig): HeaderRule[] => [
  {
    source: '/((?!embeds/).*)',
    headers: [
      { key: 'Content-Security-Policy', value: contentSecurityPolicy(site, "'none'") },
      ...commonHeaders,
    ],
  },
  {
    source: '/embeds/(.*)',
    headers: [
      { key: 'Content-Security-Policy', value: contentSecurityPolicy(site, "'self'") },
      ...commonHeaders,
    ],
  },
  {
    source: '/assets/(.*)',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
  },
]
