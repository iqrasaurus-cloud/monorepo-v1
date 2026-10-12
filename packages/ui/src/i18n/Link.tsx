import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  type LinkProps,
  type NavLinkProps,
} from 'react-router'
import { useLocalPath } from './lang.ts'

/**
 * The router's Link and NavLink, keeping the visitor in their language: on a Malay page,
 * to="/journal" goes to /ms/journal. Every in-site link in packages/ui uses these.
 */
export function Link({ to, ...rest }: LinkProps) {
  const local = useLocalPath()
  return <RouterLink to={typeof to === 'string' ? local(to) : to} {...rest} />
}

export function NavLink({ to, end, ...rest }: NavLinkProps) {
  const local = useLocalPath()
  const target = typeof to === 'string' ? local(to) : to
  // The Malay home page (/ms) would otherwise count as "active" on every Malay page.
  return <RouterNavLink to={target} end={end ?? target === '/ms'} {...rest} />
}
