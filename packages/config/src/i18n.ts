/**
 * packages/config/src/i18n.ts — languages (owner decision 2026-10-12: English and Malay).
 *
 * English pages keep their addresses; Malay pages live under /ms (e.g. /ms/journal).
 * Anything without a Malay version falls back to English, so a page is never blank.
 * Adding a language later = add its code here, a strings block in packages/ui/src/i18n and
 * optional overlays in the content files.
 */

export const LANGS = ['en', 'ms'] as const
export type Lang = (typeof LANGS)[number]

/** Shown on the EN | BM switch. */
export const LANG_LABEL: Record<Lang, string> = { en: 'EN', ms: 'BM' }
/** The <html lang> value and the Open Graph locale. */
export const LANG_TAG: Record<Lang, { html: string; og: string }> = {
  en: { html: 'en', og: 'en_SG' },
  ms: { html: 'ms', og: 'ms_SG' },
}

/**
 * OWNER: set to true once the Malay text has been checked (by you and your asatizah).
 * Until then the Malay pages work for visitors but are kept out of search results.
 */
export const malayReviewed = false

/** Which language a path is in: /ms and /ms/... are Malay, everything else English. */
export const langOf = (pathname: string): Lang =>
  pathname === '/ms' || pathname.startsWith('/ms/') ? 'ms' : 'en'

/** A path without its language prefix: /ms/journal -> /journal, /ms -> /. */
export const stripLang = (pathname: string): string => {
  if (langOf(pathname) === 'en') return pathname
  const rest = pathname.slice(3)
  return rest === '' ? '/' : rest
}

/** A site path in a language: ('ms', '/journal') -> '/ms/journal'. Hash-only links stay as they are. */
export const localPath = (lang: Lang, path: string): string => {
  if (lang === 'en' || !path.startsWith('/')) return path
  return path === '/' ? '/ms' : `/ms${path}`
}

type Plain = string | number | boolean | null | undefined
/** Every field optional, all the way down; arrays are replaced whole. */
export type Overlay<T> = T extends Plain
  ? T
  : T extends readonly unknown[]
    ? T
    : { [K in keyof T]?: Overlay<T[K]> }

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

/**
 * The English content with a translation laid over it. A translated field wins; a missing or
 * empty one keeps the English. Arrays (e.g. paragraphs) are taken whole when translated.
 */
export function localized<T>(base: T, overlay: NoInfer<Overlay<T>> | undefined): T {
  if (overlay === undefined) return base
  if (!isObject(base) || !isObject(overlay)) {
    if (typeof overlay === 'string' && overlay.trim() === '') return base
    if (Array.isArray(overlay) && overlay.length === 0) return base
    return overlay as T
  }
  const out: Record<string, unknown> = { ...base }
  for (const [key, value] of Object.entries(overlay)) {
    out[key] = localized((base as Record<string, unknown>)[key], value as never)
  }
  return out as T
}
