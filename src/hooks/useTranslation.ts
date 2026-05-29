import { useLanguage } from '../context/LanguageContext'
import { T } from '../data/translations'
import type { Translations } from '../data/translations'

export function useTranslation(): { t: Translations } {
  const { lang } = useLanguage()
  return { t: T[lang] }
}