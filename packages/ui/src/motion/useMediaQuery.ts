import { useSyncExternalStore } from 'react'

const getServerSnapshot = () => false

/** Pre-render safe media query hook: false in Node, live value in the browser. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    getServerSnapshot,
  )
}
