import type { ReactElement } from 'react'
import { useLanguage } from '../../context/LanguageContext'

export default function LanguageToggle(): ReactElement {
  const { lang, toggle } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle language"
      title={lang === 'en' ? 'Switch to Amharic' : 'Switch to English'}
      style={{
        background:     'rgba(255,255,255,0.05)',
        border:         '1px solid rgba(255,255,255,0.1)',
        borderRadius:   '8px',
        padding:        '0.3rem 0.65rem',
        cursor:         'pointer',
        display:        'flex',
        alignItems:     'center',
        gap:            '0.35rem',
        transition:     'all 0.2s',
        flexShrink:     0,
      }}
    >
      <span style={{ fontSize: '0.95rem' }}>
        {lang === 'en' ? '🇪🇹' : '🇬🇧'}
      </span>
      <span style={{
        fontSize:      '0.72rem',
        fontFamily:    'var(--font-mono)',
        color:         'var(--muted)',
        letterSpacing: '0.04em',
        fontWeight:    600,
      }}>
        {lang === 'en' ? 'አማ' : 'EN'}
      </span>
    </button>
  )
}