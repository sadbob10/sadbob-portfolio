import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactElement,
  type ReactNode,
} from 'react'
import type { Lang } from '../data/translations'

interface LanguageCtx {
  lang:       Lang
  toggle:     () => void
  isAmharic:  boolean
}

const LanguageContext = createContext<LanguageCtx>({
  lang:      'en',
  toggle:    () => {},
  isAmharic: false,
})

export function LanguageProvider({
  children,
}: { children: ReactNode }): ReactElement {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'en' || saved === 'am') {
      setLang(saved)
      document.documentElement.setAttribute('data-lang', saved)
    }
  }, [])

  const toggle = (): void => {
    const next: Lang = lang === 'en' ? 'am' : 'en'
    setLang(next)
    localStorage.setItem('lang', next)
    document.documentElement.setAttribute('data-lang', next)
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle, isAmharic: lang === 'am' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageCtx => useContext(LanguageContext)