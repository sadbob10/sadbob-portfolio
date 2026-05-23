import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type FadeDir = 'up' | 'down' | 'left' | 'right' | 'scale'

/* ── Fade + slide single element ── */
export function useGSAPFade(
  dir:      FadeDir = 'up',
  delay:    number  = 0,
  distance: number  = 50
) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const from: gsap.TweenVars = {
      opacity:  0,
      duration: 0.9,
      delay,
      ease:     'power3.out',
      scrollTrigger: {
        trigger: el,
        start:   'top 88%',
        once:    true,
      },
    }

    if (dir === 'up')    { from.y = distance  }
    if (dir === 'down')  { from.y = -distance }
    if (dir === 'left')  { from.x = -distance }
    if (dir === 'right') { from.x = distance  }
    if (dir === 'scale') { from.scale = 0.85  }

    const anim = gsap.from(el, from)

    // ✅ Wrap in {} so nothing is returned (void)
    return () => { anim.kill() }
  }, [dir, delay, distance])

  return ref
}

/* ── Stagger children ── */
export function useGSAPStagger(
  stagger:  number = 0.1,
  delay:    number = 0,
  selector: string = ':scope > *'
) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll(selector)
    if (!children.length) return

    const anim = gsap.from(children, {
      y:        40,
      opacity:  0,
      duration: 0.7,
      stagger,
      delay,
      ease:     'power3.out',
      scrollTrigger: {
        trigger: el,
        start:   'top 85%',
        once:    true,
      },
    })

    // ✅ Wrap in {} — void return
    return () => { anim.kill() }
  }, [stagger, delay, selector])

  return ref
}

/* ── Draw a line (scaleY from 0 to 1) ── */
export function useGSAPLineDraw() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const anim = gsap.from(el, {
      scaleY:          0,
      transformOrigin: 'top center',
      duration:        2,
      ease:            'power2.out',
      scrollTrigger: {
        trigger: el,
        start:   'top 80%',
        once:    true,
      },
    })

    // ✅ Wrap in {} — void return
    return () => { anim.kill() }
  }, [])

  return ref
}

/* ── Counter number ── */
export function useGSAPCounter(target: number, duration: number = 2) {
  const ref    = useRef<HTMLDivElement>(null)
  const numRef = useRef<{ val: number }>({ val: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const anim = gsap.to(numRef.current, {
      val:      target,
      duration,
      ease:     'power2.out',
      scrollTrigger: {
        trigger: el,
        start:   'top 85%',
        once:    true,
      },
      onUpdate: () => {
        if (el) el.textContent = Math.round(numRef.current.val) + '+'
      },
    })

    // ✅ Wrap in {} — void return
    return () => { anim.kill() }
  }, [target, duration])

  return ref
}