// Used at build time to pre-render each route (ssr: false). React Router streams the
// page state into the HTML, so the streaming renderer is required for hydration to work.
import { PassThrough } from 'node:stream'
import { createReadableStreamFromReadable } from '@react-router/node'
import { renderToPipeableStream } from 'react-dom/server'
import { ServerRouter, type EntryContext } from 'react-router'

const ABORT_AFTER_MS = 10_000

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  return new Promise<Response>((resolve, reject) => {
    let status = responseStatusCode
    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        // Every page is static, so wait for the whole document before responding.
        onAllReady() {
          const body = new PassThrough()
          responseHeaders.set('Content-Type', 'text/html')
          resolve(
            new Response(createReadableStreamFromReadable(body), {
              status,
              headers: responseHeaders,
            }),
          )
          pipe(body)
        },
        onShellError(error) {
          reject(error)
        },
        onError(error) {
          status = 500
          console.error(error)
        },
      },
    )
    setTimeout(abort, ABORT_AFTER_MS)
  })
}
