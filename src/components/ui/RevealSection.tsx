import { useEffect, useRef, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'

type Direction = 'up' | 'left' | 'right' | 'depth'

interface Props {
  children: ReactNode
  direction?: Direction
  delay?: number
}

const transforms: Record<Direction, string> = {
  up:    'perspective(1000px) rotateX(12deg) translateY(60px)',
  left:  'perspective(1000px) rotateY(15deg) translateX(-60px)',
  right: 'perspective(1000px) rotateY(-15deg) translateX(60px)',
  depth: 'perspective(1000px) scale(0.9) translateZ(-80px)',
}

export default function RevealSection({
  children,
  direction = 'up',
  delay = 0,
}: Props): ReactElement {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) translateX(0) translateZ(0) scale(1)' : transforms[direction],
        transition: visible
          ? `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms,
             transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
          : 'none',
        transformOrigin: 'center top',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  )
}