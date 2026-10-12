import {
  brand,
  brandMs,
  fourI,
  fourIMs,
  langOf,
  localPath,
  type JournalPost,
  type Lang,
  type SiteConfig,
} from '@iqra/config'
import { useLocation } from 'react-router'
import { strings, type Strings } from './strings.ts'

/** The language of the page being shown, from its address (/ms/... is Malay). */
export function useLang(): Lang {
  return langOf(useLocation().pathname)
}

/** The interface text in the page's language. */
export function useT(): Strings {
  return strings[useLang()]
}

/** Turns a site path into the same path in the page's language: '/journal' -> '/ms/journal'. */
export function useLocalPath(): (path: string) => string {
  const lang = useLang()
  return (path) => localPath(lang, path)
}

/** The brand sentences in a language. The credential always stays in English (rule 3). */
export const brandText = (lang: Lang) =>
  lang === 'ms'
    ? {
        ...brand,
        motto: brandMs.motto,
        positioning: brandMs.positioning,
        supporting: brandMs.supporting,
        disclaimer: brandMs.disclaimer,
        chatNotice: brandMs.chatNotice,
        donate: { ...brand.donate, label: brandMs.donateLabel },
      }
    : brand

export const useBrand = () => brandText(useLang())

/** The 4-I steps with their one-line meaning in a language. */
export const fourIText = (lang: Lang) =>
  fourI.map((step) => (lang === 'ms' ? { ...step, line: fourIMs[step.key] } : step))

/** A site's one-line description in a language. */
export const siteDescription = (site: SiteConfig, lang: Lang): string =>
  (lang === 'ms' && site.ms?.description) || site.description

/** A journal post in a language: its Malay title, excerpt and body where the sheet has them. */
export const localPost = (post: JournalPost, lang: Lang): JournalPost =>
  lang === 'ms' && post.ms
    ? {
        ...post,
        title: post.ms.title || post.title,
        excerpt: post.ms.excerpt || post.excerpt,
        body: post.ms.body && post.ms.body.length > 0 ? post.ms.body : post.body,
      }
    : post

/** A header item's label (registry labels are English) in the page's language. */
export const menuLabel = (t: Strings, label: string): string =>
  (
    ({
      Tools: t.tools,
      Programmes: t.programmes,
      Journal: t.journal,
      About: t.about,
      'Work with us': t.workWithUs,
    }) as Record<string, string>
  )[label] ?? label
