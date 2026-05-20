import { useState, useEffect, useRef } from 'react'
import type { ReactElement, KeyboardEvent } from 'react'
import { Search, Mail, Download, User, Code2, Briefcase, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import '../../styles/commandpalette.css'

const CV_URL = 'https://drive.google.com/uc?export=download&id=1D7aJmS9sViElkp5qz81a489JlX7lHGiC'

interface CmdItem {
  id:     string
  icon:   ReactElement
  name:   string
  hint:   string
  action: () => void
}

interface Props {
  open:    boolean
  onClose: () => void
}

export default function CommandPalette({ open, onClose }: Props): ReactElement {
  const [query,   setQuery]   = useState<string>('')
  const [focused, setFocused] = useState<number>(0)
  const inputRef              = useRef<HTMLInputElement>(null)

  const goTo = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    onClose()
  }

  const ALL_ITEMS: CmdItem[] = [
    { id: 'nav-about',    icon: <User size={15} />,      name: 'Go to About',       hint: 'section',  action: () => goTo('about')    },
    { id: 'nav-skills',   icon: <Code2 size={15} />,     name: 'Go to Skills',      hint: 'section',  action: () => goTo('skills')   },
    { id: 'nav-projects', icon: <Briefcase size={15} />, name: 'Go to Projects',    hint: 'section',  action: () => goTo('projects') },
    { id: 'nav-exp',      icon: <Briefcase size={15} />, name: 'Go to Experience',  hint: 'section',  action: () => goTo('experience')},
    { id: 'nav-contact',  icon: <Phone size={15} />,     name: 'Go to Contact',     hint: 'section',  action: () => goTo('contact')  },
    { id: 'act-email',    icon: <Mail size={15} />,      name: 'Send Email',        hint: 'action',   action: () => { window.location.href = 'mailto:abate.shallo@gmail.com'; onClose() } },
    { id: 'act-github',   icon: <GithubIcon size={15} />,name: 'Open GitHub',       hint: 'action',   action: () => { window.open('https://github.com/sadbob10','_blank'); onClose() } },
    { id: 'act-linkedin', icon: <LinkedinIcon size={15}/>,name:'Open LinkedIn',     hint: 'action',   action: () => { window.open('https://www.linkedin.com/in/sadam-abate','_blank'); onClose() } },
    { id: 'act-cv',       icon: <Download size={15} />,  name: 'Download CV',       hint: 'action',   action: () => {window.open(CV_URL, '_blank'); onClose() } },  
]

  const items = query
    ? ALL_ITEMS.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
    : ALL_ITEMS

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setFocused(0)
    }
  }, [open])

  // Keyboard navigation
  const onKey = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocused((f) => Math.min(f + 1, items.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocused((f) => Math.max(f - 1, 0))
    } else if (e.key === 'Enter') {
      items[focused]?.action()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div
      className={`cmd-overlay${open ? ' open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      onKeyDown={onKey}
      role="dialog"
      aria-modal="true"
    >
      <div className="cmd-box">

        {/* Search */}
        <div className="cmd-input-wrap">
          <Search size={17} className="cmd-search-icon" />
          <input
            ref={inputRef}
            className="cmd-input"
            placeholder="Search sections, actions..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setFocused(0) }}
          />
          <span className="cmd-kbd">ESC</span>
        </div>

        {/* Items */}
        <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
          {!query && <div className="cmd-section-label">NAVIGATE</div>}
          {items.map((item, i) => {
            if (!query && i === 5) return (
              <>
                <div className="cmd-section-label" key="act-label">ACTIONS</div>
                <button
                  key={item.id}
                  type="button"
                  className={`cmd-item${focused === i ? ' focused' : ''}`}
                  onClick={item.action}
                  onMouseEnter={() => setFocused(i)}
                >
                  <div className="cmd-item-icon">{item.icon}</div>
                  <div className="cmd-item-name">{item.name}</div>
                  <div className="cmd-item-hint">{item.hint}</div>
                </button>
              </>
            )
            return (
              <button
                key={item.id}
                type="button"
                className={`cmd-item${focused === i ? ' focused' : ''}`}
                onClick={item.action}
                onMouseEnter={() => setFocused(i)}
              >
                <div className="cmd-item-icon">{item.icon}</div>
                <div className="cmd-item-name">{item.name}</div>
                <div className="cmd-item-hint">{item.hint}</div>
              </button>
            )
          })}
        </div>

        {/* Footer hints */}
        <div className="cmd-footer">
          <div className="cmd-hint"><span className="cmd-kbd">↑↓</span> navigate</div>
          <div className="cmd-hint"><span className="cmd-kbd">↵</span> select</div>
          <div className="cmd-hint"><span className="cmd-kbd">ESC</span> close</div>
        </div>

      </div>
    </div>
  )
}