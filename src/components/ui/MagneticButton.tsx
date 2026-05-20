import { useRef, useState } from 'react'
import type { ReactElement, ReactNode, MouseEvent } from 'react'

interface Props {
  children: ReactNode
  className?: string
  onClick?: () => void
  strength?: number
  type?: 'button' | 'submit'
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.35,
  type = 'button',
}: Props): ReactElement {
  const ref  = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = (e: MouseEvent<HTMLButtonElement>): void => {
    const el   = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    })
  }

  const onLeave = (): void => setPos({ x: 0, y: 0 })

  return (
    <button
      ref={ref}
      type={type}
      className={className}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform:  `translate(${pos.x}px, ${pos.y}px)`,
        transition: pos.x === 0 && pos.y === 0
          ? 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
          : 'transform 0.1s ease',
      }}
    >
      {children}
    </button>
  )
}