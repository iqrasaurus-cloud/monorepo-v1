import { useCallback, type MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useSmoothScroll } from '../motion/SmoothScroll.tsx'
import { stickyOffset } from './links.ts'

/**
 * Click handler for "#section" menu items: scrolls on the home page,
 * otherwise navigates home first (SiteShell then scrolls to the hash).
 */
export function useAnchorNavigate(): (e: MouseEvent<HTMLAnchorElement>, target: string) => void {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { scrollTo } = useSmoothScroll()

  return useCallback(
    (e, target) => {
      e.preventDefault()
      if (pathname !== '/') {
        void navigate(`/${target}`)
        return
      }
      const el = document.querySelector<HTMLElement>(target)
      scrollTo(el ?? 0, { offset: -stickyOffset() })
    },
    [pathname, navigate, scrollTo],
  )
}
