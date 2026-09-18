import { useMediaQuery } from './useMediaQuery.ts'

export function useReducedMotionSafe(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
