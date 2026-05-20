import type { ReactElement, ReactNode, CSSProperties } from 'react'
import { useParallax } from '../../hooks/useParallax'

interface Props {
  speed?:    number
  children:  ReactNode
  style?:    CSSProperties
  className?: string
}

export default function ParallaxLayer({
  speed = 0.3,
  children,
  style,
  className,
}: Props): ReactElement {
  const ref = useParallax(speed)

  return (
    <div ref={ref} style={{ willChange: 'transform', ...style }} className={className}>
      {children}
    </div>
  )
}