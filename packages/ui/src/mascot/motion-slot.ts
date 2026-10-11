import { useEffect, useState, useSyncExternalStore, type RefObject } from 'react'

/*
 * One moving dino per screen (tools' MOTION.md). Each moving Mascot claims the slot while
 * it is on screen; the newest claim wins and the others hold still. When it lets go
 * (scrolled away, unmounted), the previous one moves again.
 */
const stack: symbol[] = []
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

function claim(id: symbol) {
  const i = stack.indexOf(id)
  if (i !== -1) stack.splice(i, 1)
  stack.push(id)
  emit()
}

function release(id: symbol) {
  const i = stack.indexOf(id)
  if (i === -1) return
  stack.splice(i, 1)
  emit()
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}

const REDUCE = '(prefers-reduced-motion: reduce)'
function subscribeReduce(l: () => void) {
  const q = matchMedia(REDUCE)
  q.addEventListener('change', l)
  return () => q.removeEventListener('change', l)
}

/** True when the device asks for reduced motion. While pre-rendering, assume it does. */
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduce,
    () => matchMedia(REDUCE).matches,
    () => true,
  )
}

/**
 * Whether the element may move now: motion is wanted, the device allows it, the element is
 * on screen and it holds the slot.
 */
export function useMotionSlot(el: RefObject<Element | null>, wanted: boolean) {
  const [id] = useState(() => Symbol('mascot'))
  const reduce = useReducedMotion()
  const active = useSyncExternalStore(
    subscribe,
    () => stack[stack.length - 1] === id,
    () => false,
  )

  useEffect(() => {
    const node = el.current
    if (!wanted || reduce || !node) return
    const io = new IntersectionObserver(([entry]) =>
      entry?.isIntersecting ? claim(id) : release(id),
    )
    io.observe(node)
    return () => {
      io.disconnect()
      release(id)
    }
  }, [el, id, wanted, reduce])

  return wanted && !reduce && active
}
