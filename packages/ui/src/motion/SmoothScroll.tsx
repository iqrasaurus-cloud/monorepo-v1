import Lenis from 'lenis'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import { useLocation } from 'react-router'
import { lenisOptions } from './presets.ts'
import { useReducedMotionSafe } from './useReducedMotionSafe.ts'

interface ScrollOptions {
  offset?: number
  immediate?: boolean
}

interface SmoothScrollApi {
  scrollTo: (target: string | HTMLElement | number, options?: ScrollOptions) => void
  /** Pause smooth scrolling while a drawer or dialog is open. */
  lock: (locked: boolean) => void
}

const nativeScrollTo: SmoothScrollApi['scrollTo'] = (target, options) => {
  const behavior = options?.immediate ? 'auto' : 'smooth'
  const offset = options?.offset ?? 0
  if (typeof target === 'number') {
    window.scrollTo({ top: target + offset, behavior })
    return
  }
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior })
}

const SmoothScrollContext = createContext<SmoothScrollApi>({
  scrollTo: nativeScrollTo,
  lock: () => {},
})

export const useSmoothScroll = (): SmoothScrollApi => useContext(SmoothScrollContext)

/**
 * Lenis smooth-scroll provider. Routes in-page anchor clicks through Lenis and
 * resets to the top on route change. Does nothing when reduced motion is preferred.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionSafe()
  const lenisRef = useRef<Lenis | null>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: lenisOptions.lerp })
    lenisRef.current = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return
      const anchor = (e.target as Element | null)?.closest('a[href^="#"]')
      const href = anchor?.getAttribute('href')
      if (!href || href === '#') return
      const el = document.querySelector<HTMLElement>(href)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el)
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
  }, [pathname])

  const scrollTo = useCallback<SmoothScrollApi['scrollTo']>((target, options) => {
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(target, options)
    else nativeScrollTo(target, options)
  }, [])

  const lock = useCallback((locked: boolean) => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (locked) lenis.stop()
    else lenis.start()
  }, [])

  const api = useMemo(() => ({ scrollTo, lock }), [scrollTo, lock])

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>
}
