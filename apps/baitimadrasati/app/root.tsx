import { getSite, langOf } from '@iqra/config'
import { NightScript, NotFound, SiteShell } from '@iqra/ui'
import type { ReactNode } from 'react'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  useLocation,
  useRouteError,
} from 'react-router'
import '@iqra/ui/styles/base.css'

const site = getSite('baitimadrasati')

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang={langOf(useLocation().pathname)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Light first (owner, 2026-10-19): Day unless the family chose Night in the tools. */}
        <meta name="color-scheme" content="light" />
        <NightScript />
        <link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/brand/favicon-192.png" />
        <link rel="apple-touch-icon" href="/brand/apple-touch-icon.png" />
        <Meta />
        <Links />
        {/* Animated elements start hidden; without JavaScript, show everything. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <SiteShell site={site}>
      <Outlet />
    </SiteShell>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  const notFound = isRouteErrorResponse(error) && error.status === 404
  return (
    <SiteShell site={site}>
      <NotFound site={site} message={notFound ? undefined : 'Something went wrong on our side.'} />
    </SiteShell>
  )
}
