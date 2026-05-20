import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis(): void {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    })

    let raf: number
    const tick = (time: number): void => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(raf)
    }
  }, [])
}