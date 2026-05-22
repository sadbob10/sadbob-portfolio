import { useRef, useState, useEffect } from 'react'
import type { ReactElement, ElementType } from 'react'

interface Props {
  text:       string
  className?: string
  delayMs?:   number
  staggerMs?: number
  as?:        ElementType
  once?:      boolean
}

export default function SplitText({
  text,
  className   = '',
  delayMs     = 0,
  staggerMs   = 45,
  as: Tag     = 'span',
  once        = true,
}: Props): ReactElement {
  const ref      = useRef<HTMLElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVis(true), delayMs)
          if (once) obs.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    const t = setTimeout(() => obs.observe(el), 120)
    return () => { clearTimeout(t); obs.disconnect() }
  }, [delayMs, once])

  return (
    // @ts-ignore
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display:    'inline-block',
            opacity:     vis ? 1 : 0,
            transform:   vis ? 'none' : 'translateY(24px) rotateX(-40deg)',
            transition:  vis
              ? `opacity 0.55s ${i * staggerMs}ms cubic-bezier(0.16,1,0.3,1),
                 transform 0.55s ${i * staggerMs}ms cubic-bezier(0.16,1,0.3,1)`
              : 'none',
            transformOrigin: 'bottom center',
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </Tag>
  )
}