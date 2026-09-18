import type { MouseEvent } from 'react'

export const MAIN_ID = 'main'

export function SkipLink() {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const main = document.getElementById(MAIN_ID)
    if (!main) return
    e.preventDefault()
    main.focus()
    main.scrollIntoView()
  }
  return (
    <a
      href={`#${MAIN_ID}`}
      onClick={onClick}
      className="sr-only z-[100] rounded-pill bg-sun px-5 py-3 font-body text-sm font-semibold text-plum focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
    >
      Skip to content
    </a>
  )
}
