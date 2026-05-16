import { useState, useEffect } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%!?&*<>'

interface UseGlitchReturn {
  text: string
  done: boolean
}

export function useGlitch(finalText: string, startDelay: number = 0): UseGlitchReturn {
  const [chars, setChars] = useState<string[]>(finalText.split('').map(() => ''))
  const [done, setDone]   = useState<boolean>(false)

  useEffect(() => {
    let raf: number
    let start: number

    const DURATION = 1200

    const timeout = setTimeout(() => {
      const tick = (ts: number) => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / DURATION, 1)

        setChars(
          finalText.split('').map((ch, i) => {
            if (ch === ' ') return ' '
            const revealAt = i / finalText.length
            if (progress > revealAt + 0.15) return ch
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
        )

        if (progress < 1) {
          raf = requestAnimationFrame(tick)
        } else {
          setChars(finalText.split(''))
          setDone(true)
        }
      }
      raf = requestAnimationFrame(tick)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [finalText, startDelay])

  return { text: chars.join(''), done }
}