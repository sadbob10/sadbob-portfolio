import { useRef, useEffect } from 'react'
import type { ReactElement, ElementType } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  text:       string
  className?: string
  delay?:     number
  stagger?:   number
  as?:        ElementType
}

export default function TextReveal({
  text,
  className = '',
  delay     = 0,
  stagger   = 0.06,
  as: Tag   = 'p',
}: Props): ReactElement {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const words = el.querySelectorAll<HTMLSpanElement>('.tr-word')
    if (!words.length) return

    const anim = gsap.from(words, {
      y:        '110%',
      opacity:  0,
      duration: 0.75,
      stagger,
      delay,
      ease:     'power3.out',
      scrollTrigger: {
        trigger: el,
        start:   'top 88%',
        once:    true,
      },
    })

    return () => { anim.kill() }
  }, [delay, stagger])

  return (
    // @ts-ignore — dynamic tag ref typing
    <Tag ref={ref} className={className}>
      {text.split(' ').map((word: string, i: number) => (
        <span
          key={i}
          style={{
            display:       'inline-block',
            overflow:      'hidden',
            marginRight:   '0.28em',
            verticalAlign: 'bottom',
          }}
        >
          <span className="tr-word" style={{ display: 'inline-block' }}>
            {word}
          </span>
        </span>
      ))}
    </Tag>
  )
}