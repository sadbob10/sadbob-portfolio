import { useRef } from 'react'
import type { ReactElement, ReactNode, MouseEvent } from 'react'

interface Props {
  children:   ReactNode
  className?: string
  onClick?:   () => void
  href?:      string
  type?:      'button' | 'submit'
  style?:     React.CSSProperties
}

export default function RippleButton({
  children,
  className = '',
  onClick,
  href,
  type = 'button',
  style,
}: Props): ReactElement {
  const ref = useRef<HTMLElement>(null)

  const createRipple = (e: MouseEvent): void => {
    const el   = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x    = e.clientX - rect.left - size / 2
    const y    = e.clientY - rect.top  - size / 2

    const ripple       = document.createElement('span')
    ripple.className   = 'ripple'
    ripple.style.width  = ripple.style.height = `${size}px`
    ripple.style.left   = `${x}px`
    ripple.style.top    = `${y}px`
    el.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove())
  }

  if (href) {
    return (
      // @ts-ignore
      <a ref={ref} href={href} className={`ripple-wrap ${className}`}
        style={style} onClick={createRipple} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    // @ts-ignore
    <button ref={ref} type={type} className={`ripple-wrap ${className}`}
      style={style} onClick={(e) => { createRipple(e); onClick?.() }}>
      {children}
    </button>
  )
}