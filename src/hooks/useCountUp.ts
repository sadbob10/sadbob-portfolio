import { useState, useEffect, useRef } from 'react'

export function useCountUp(target: number, duration: number = 2000) {
  const [count,  setCount]  = useState<number>(0)
  const started             = useRef<boolean>(false)
  const ref                 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()

          const animate = (now: number): void => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased    = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
            else setCount(target)
          }

          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}