import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import { ArrowRight } from 'lucide-react'
import '../../styles/floatingcta.css'

export default function FloatingCTA(): ReactElement {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    const onScroll = (): void => {
      // Show after scrolling past hero, hide near contact section
      const scrollY     = window.scrollY
      const docHeight   = document.documentElement.scrollHeight
      const winHeight   = window.innerHeight
      const nearBottom  = scrollY + winHeight > docHeight - 300

      setShow(scrollY > 500 && !nearBottom)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goToContact = (): void => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={`float-cta${show ? ' show' : ''}`}>
      <button type="button" className="float-cta-btn" onClick={goToContact}>
        <span className="float-cta-dot" />
        Available for work — Hire Me
        <ArrowRight size={15} className="float-cta-arrow" />
      </button>
    </div>
  )
}