// Used only at build time to pre-render each route to static HTML (ssr: false).
import { renderToString } from 'react-dom/server'
import { ServerRouter, type EntryContext } from 'react-router'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  const html = renderToString(<ServerRouter context={routerContext} url={request.url} />)
  responseHeaders.set('Content-Type', 'text/html')
  return new Response(`<!DOCTYPE html>${html}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
