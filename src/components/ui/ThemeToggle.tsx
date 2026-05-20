import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'

type Theme = 'dark' | 'light'

export default function ThemeToggle(): ReactElement {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    const initial = saved ?? 'dark'
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const toggle = (): void => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        background:   'transparent',
        border:       '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        width:        '36px',
        height:       '36px',
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'center',
        cursor:       'pointer',
        fontSize:     '1rem',
        transition:   'all 0.2s',
        flexShrink:   0,
      }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}