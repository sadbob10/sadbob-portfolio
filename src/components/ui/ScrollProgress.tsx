import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'

export default function ScrollProgress(): ReactElement {
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const onScroll = (): void => {
      const scrolled   = window.scrollY
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrolled / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position:   'fixed',
        top:        0,
        left:       0,
        height:     '2.5px',
        width:      `${progress}%`,
        background: 'linear-gradient(90deg, #00e5ff, #a259ff, #f72585)',
        zIndex:     99999,
        boxShadow:  '0 0 10px rgba(0,229,255,0.6)',
        transition: 'width 0.08s linear',
        pointerEvents: 'none',
      }}
    />
  )
}