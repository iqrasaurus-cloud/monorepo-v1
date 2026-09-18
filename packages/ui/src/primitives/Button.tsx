import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from '../utils/cn.ts'

type Variant = 'sun' | 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-pill font-body font-semibold transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50'

// sun and magenta are never used as text on light backgrounds (BUILD_SPEC.md §3.2).
const variants: Record<Variant, string> = {
  sun: 'bg-sun text-plum hover:bg-sun/85',
  primary: 'bg-primary text-white hover:bg-plum',
  outline: 'border border-taupe/60 bg-transparent text-primary hover:border-primary',
  ghost: 'bg-transparent text-primary hover:bg-paper-2',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

interface Common {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type AsRouterLink = Common & { to: string; href?: never } & Omit<
    LinkProps,
    'to' | 'className' | 'children'
  >
type AsAnchor = Common & { href: string; to?: never } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'className' | 'children'
  >
type AsButton = Common & { to?: never; href?: never } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'children'
  >

export type ButtonProps = AsRouterLink | AsAnchor | AsButton

/** Pill button. Renders a router <Link> with `to`, an <a> with `href`, otherwise a <button>. */
export function Button({
  variant = 'sun',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...link } = rest
    return (
      <Link to={to} className={classes} {...link}>
        {children}
      </Link>
    )
  }
  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }
  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
