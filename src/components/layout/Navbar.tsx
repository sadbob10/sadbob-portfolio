import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import { Menu, X, Mail, Home } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/Icons'
import ThemeToggle from '../ui/ThemeToggle'
import { useScramble } from '../../hooks/useScramble'
import '../../styles/navbar.css'

interface NavLink {
  label: string
  id:    string
}

const LINKS: NavLink[] = [
  { label: 'About',      id: 'about'      },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',    id: 'contact'    },
]

function ScrambleLink({
  label,
  active,
  onClick,
}: {
  label:   string
  active:  boolean
  onClick: () => void
}): ReactElement {
  const { text, scramble, reset } = useScramble(label)
  return (
    <span
      className={`nav-link${active ? ' active' : ''}`}
      onClick={onClick}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      role="button"
      tabIndex={0}
    >
      {text}
    </span>
  )
}

export default function Navbar(): ReactElement {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeId,  setActiveId]  = useState('')

  // Scroll detection
  useEffect(() => {
    const fn = (): void => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Active section highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const goTo = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const goTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>

        {/* Logo */}
        <div
          className="nav-logo"
          onClick={goTop}
          role="button"
          tabIndex={0}
          aria-label="Go to top"
        >
          <span className="logo-sad">sad</span>
          <span className="logo-bob">bob</span>
          <span className="logo-dot">.</span>
        </div>

        {/* Desktop links */}
        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.id}>
              <ScrambleLink
                label={link.label}
                active={activeId === link.id}
                onClick={() => goTo(link.id)}
              />
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="nav-actions">
          <button
            type="button"
            className="nav-cta"
            onClick={() => goTo('contact')}
          >
            Hire Me
          </button>

          {/* Desktop-only ThemeToggle */}
          <span className="nav-theme-desktop">
            <ThemeToggle />
          </span>

          <button
            type="button"
            className="nav-ham"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <button
          type="button"
          className="mobile-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={22} />
        </button>

        {/* Logo */}
        <div className="mobile-logo">
          <span className="logo-sad">sad</span>
          <span className="logo-bob">bob</span>
          <span className="logo-dot">.</span>
        </div>

        {/* Nav links */}
        <div className="mobile-links">
          <span
            className="mobile-link mobile-link-home"
            onClick={goTop}
            role="button"
            tabIndex={0}
          >
            <Home size={16} />
            Home
          </span>

          <div className="mobile-divider" />

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
        </div>

        {/* Bottom actions */}
        <div className="mobile-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={() => goTo('contact')}
            style={{ width: '100%', justifyContent: 'center' }}
          >
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

          {/* Mobile ThemeToggle */}
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}