import { useState, useRef, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%'

export function useScramble(original: string) {
  const [text, setText]   = useState<string>(original)
  const rafRef            = useRef<number>(0)
  const iterRef           = useRef<number>(0)

  const scramble = useCallback((): void => {
    cancelAnimationFrame(rafRef.current)
    iterRef.current = 0

    const animate = (): void => {
      const progress = iterRef.current / (original.length * 3)

      setText(
        original
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            if (i < iterRef.current / 3) return ch
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      iterRef.current++
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setText(original)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [original])

  const reset = useCallback((): void => {
    cancelAnimationFrame(rafRef.current)
    setText(original)
  }, [original])

  return { text, scramble, reset }
}