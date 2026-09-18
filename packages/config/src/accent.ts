import type { SiteConfig } from './spokes.ts'

const hexToRgbTriple = (hex: string): string => {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h
  const n = Number.parseInt(full, 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

/** Inline CSS variables that let a site override the shared accent colour. */
export const accentVars = (site: SiteConfig): Record<string, string> | undefined =>
  site.accent ? { '--accent': site.accent, '--accent-rgb': hexToRgbTriple(site.accent) } : undefined
