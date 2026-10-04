import { useCallback } from 'react'
import { useSmoothScroll } from '../motion/SmoothScroll.tsx'
import { stickyOffset } from './links.ts'

/** Smooth-scrolls to an element on this page (e.g. '#work-with-us'), clear of the sticky header. */
export function useHashJump(): (hash: string) => void {
  const { scrollTo } = useSmoothScroll()
  return useCallback(
    (hash) => {
      const el = document.querySelector<HTMLElement>(hash)
      if (el) scrollTo(el, { offset: -stickyOffset() })
    },
    [scrollTo],
  )
}
