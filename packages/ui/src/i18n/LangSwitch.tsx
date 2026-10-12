import { LANG_LABEL, LANGS, localPath, stripLang } from '@iqra/config'
import { Link as RouterLink, useLocation } from 'react-router'
import { cn } from '../utils/cn.ts'
import { useLang, useT } from './lang.ts'

/** EN | BM: the same page in the other language (owner decision 2026-10-12). */
export function LangSwitch({ className }: { className?: string }) {
  const lang = useLang()
  const t = useT()
  const { pathname, hash } = useLocation()
  const path = stripLang(pathname)
  return (
    <div
      role="group"
      aria-label={t.switchLanguage}
      className={cn(
        'flex items-center rounded-pill bg-primary-soft p-0.5 font-heading text-xs font-bold',
        className,
      )}
    >
      {LANGS.map((l) => (
        <RouterLink
          key={l}
          to={localPath(l, path) + hash}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? 'true' : undefined}
          className={cn(
            'rounded-pill px-2.5 py-1.5 transition-colors',
            l === lang ? 'bg-primary text-on-primary' : 'text-primary hover:bg-surface',
          )}
        >
          {LANG_LABEL[l]}
        </RouterLink>
      ))}
    </div>
  )
}
