import { useState, useEffect, useRef } from 'react'
import type { ReactElement } from 'react'
import '../../styles/cursor.css'

const HOVER_TARGETS = [
  'a', 'button', '.proj-card', '.skill-card',
  '.nav-link', '.ftab', '.soc', '.contact-item',
  '.nav-cta', '.nav-logo', '.mobile-link',
  '.btn-primary', '.btn-outline', '.scroll-top',
].join(',')

export default function CustomCursor(): ReactElement {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const raf     = useRef<number>(0)

  const [visible,  setVisible]  = useState(false)
  const [hovered,  setHovered]  = useState(false)
  const [clicked,  setClicked]  = useState(false)

  useEffect(() => {
    // ── Mouse move ──
    const onMove = (e: MouseEvent): void => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)

      const dot = dotRef.current
      if (dot) {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    // ── Hover detection ──
    const onOver = (e: MouseEvent): void => {
      if ((e.target as HTMLElement).closest(HOVER_TARGETS)) setHovered(true)
    }
    const onOut = (e: MouseEvent): void => {
      if ((e.target as HTMLElement).closest(HOVER_TARGETS)) setHovered(false)
    }

    // ── Click ──
    const onDown = (): void => setClicked(true)
    const onUp   = (): void => setClicked(false)

    // ── Leave window ──
    const onLeave = (): void => setVisible(false)
    const onEnter = (): void => setVisible(true)

    window.addEventListener('mousemove',  onMove)
    window.addEventListener('mouseover',  onOver)
    window.addEventListener('mouseout',   onOut)
    window.addEventListener('mousedown',  onDown)
    window.addEventListener('mouseup',    onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    // ── Ring smooth follow (RAF loop) ──
    const animate = (): void => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.11
      ring.current.y += (mouse.current.y - ring.current.y) * 0.11

      const el = ringRef.current
      if (el) {
        el.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseover',  onOver)
      window.removeEventListener('mouseout',   onOut)
      window.removeEventListener('mousedown',  onDown)
      window.removeEventListener('mouseup',    onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const cls = (base: string): string =>
    [base, visible ? 'visible' : '', hovered ? 'hovered' : '', clicked ? 'clicked' : '']
      .filter(Boolean).join(' ')

  return (
    <>
      <div ref={dotRef}  className={cls('cursor-dot')}  />
      <div ref={ringRef} className={cls('cursor-ring')} />
    </>
  )
}