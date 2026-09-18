import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/** False during pre-rendering and the first hydration pass, true once running in the browser. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
