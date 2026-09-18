// Motion values carried over from the KERN reference (BUILD_SPEC.md §5).
// Components import these; they never write raw easing arrays or durations.

export const easeReveal = [0.22, 1, 0.36, 1] as const
export const easeWipe = [0.76, 0, 0.24, 1] as const

export const duration = {
  /** Used for everything when the visitor prefers reduced motion. */
  fade: 0.2,
  reveal: 0.7,
  revealSlow: 0.9,
  letter: 1,
  header: 0.8,
  wipe: 0.6,
  sweep: 0.5,
  rowHover: 0.5,
  preview: 0.35,
  crossfade: 0.45,
} as const

export const stagger = {
  list: 0.06,
  letter: 0.06,
  letterStart: 0.2,
  /** Total letter stagger is capped here for long headlines. */
  letterCap: 1.2,
  /** Beyond this many characters a headline animates per word instead of per letter. */
  letterWordThreshold: 18,
  drawerStart: 0.15,
  drawerItem: 0.06,
} as const

export const viewportOnce = { once: true, margin: '-60px' } as const

export const headerEntrance = {
  initial: { y: -60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { delay: 0.2, duration: duration.header, ease: easeReveal },
} as const

export const heroScrollOut = {
  y: ['0%', '30%'],
  opacityInput: [0, 0.8],
  opacityOutput: [1, 0],
}

export const heroText = { y: 20, delayFrom: 0.9, delayTo: 1.3 } as const

export const wordReveal = {
  offset: ['start 0.85', 'end 0.45'],
  from: 0.12,
} as const

export const parallax = {
  y: ['-18%', '18%'],
  scaleInput: [0, 0.5, 1],
  scale: [1.15, 1.05, 1.15],
}

export const splitScroll = {
  minPhotos: 6,
  left: ['2%', '-34%'],
  right: ['-34%', '2%'],
  titleInput: [0, 0.5, 1],
  titleScale: [0.92, 1, 0.92],
}

export const previewSpring = { stiffness: 200, damping: 25, mass: 0.5 } as const
export const previewRotation = { input: [-1200, 1200], output: [-10, 10] }
export const previewScale = { hidden: 0.6, visible: 1 } as const

export const rowHover = { x: 24 } as const
export const lenisOptions = { lerp: 0.09 } as const
export const marquee = { duration: 28 } as const
