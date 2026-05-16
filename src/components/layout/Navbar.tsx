import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import { Menu, X, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/Icons'
import '../../styles/navbar.css'

interface NavLink {
  label: string
  id: string
}

const LINKS: NavLink[] = [
  { label: 'About',    id: 'about'    },
  { label: 'Skills',   id: 'skills'   },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact',  id: 'contact'  },
]

export default function Navbar(): ReactElement {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeId,  setActiveId]  = useState('')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>

        <div className="nav-logo" onClick={goTop} role="button" tabIndex={0}>
          <span className="logo-sad">sad</span>
          <span className="logo-bob">bob</span>
          <span className="logo-dot">.</span>
        </div>

        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.id}>
              <span
                className={`nav-link${activeId === link.id ? ' active' : ''}`}
                onClick={() => goTo(link.id)}
                role="button"
                tabIndex={0}
              >
                {link.label}
              </span>
            </li>
          ))}
        </ul>

        <button type="button" className="nav-cta" onClick={() => goTo('contact')}>
          Hire Me
        </button>

        <button type="button" className="nav-ham" onClick={() => setMenuOpen(true)}>
          <Menu size={22} />
        </button>

      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>

        <button type="button" className="mobile-close" onClick={() => setMenuOpen(false)}>
          <X size={26} />
        </button>

        {LINKS.map((link) => (
          <span
            key={link.id}
            className="mobile-link"
            onClick={() => goTo(link.id)}
            role="button"
            tabIndex={0}
          >
            {link.label}
          </span>
        ))}

        <button type="button" className="btn-primary" onClick={() => goTo('contact')}>
          Hire Me
        </button>

        <div className="mobile-socials">

          <a href="https://github.com/sadbob10" target="_blank" rel="noreferrer" className="soc">
            <GithubIcon size={18} />
          </a>

          <a href="https://www.linkedin.com/in/sadam-abate" target="_blank" rel="noreferrer" className="soc">
            <LinkedinIcon size={18} />
          </a>

          <a href="mailto:abate.shallo@gmail.com" className="soc">
            <Mail size={18} />
          </a>

        </div>

      </div>
    </>
  )
}