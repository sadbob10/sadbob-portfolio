import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import '../../styles/preloader.css'

interface Props {
  onDone: () => void
}

export default function Preloader({ onDone }: Props): ReactElement {
  const [count,   setCount]   = useState<number>(0)
  const [leaving, setLeaving] = useState<boolean>(false)

  useEffect(() => {
    let current = 0

    const interval = setInterval(() => {
      // Random increments for realistic feel
      const step = Math.floor(Math.random() * 9) + 2
      current = Math.min(current + step, 100)
      setCount(current)

      if (current >= 100) {
        clearInterval(interval)
        // Pause at 100, then trigger split reveal
        setTimeout(() => {
          setLeaving(true)
          // After animation completes, unmount
          setTimeout(onDone, 900)
        }, 450)
      }
    }, 45)

    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div className={`preloader${leaving ? ' leaving' : ''}`}>

      {/* Split reveal panels */}
      <div className="pre-panel pre-panel-top"    />
      <div className="pre-panel pre-panel-bottom" />

      {/* Center content */}
      <div className="pre-content">

        <div className="pre-logo">
          <span className="pre-sad">sad</span>
          <span className="pre-bob">bob</span>
          <span className="pre-dot">.</span>
        </div>

        <div className="pre-counter">{count}</div>

        <div className="pre-bar-bg">
          <div className="pre-bar-fill" style={{ width: `${count}%` }} />
        </div>

        <p className="pre-text">initializing portfolio...</p>

      </div>
    </div>
  )
}