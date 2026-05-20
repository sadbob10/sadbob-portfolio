import { useEffect, useRef, useState } from 'react'
import type { ReactElement } from 'react'
import { EXPERIENCE } from '../../data/experience'
import type { Experience as Exp } from '../../data/experience'
import '../../styles/experience.css'

export default function Experience(): ReactElement {
  const [visible, setVisible] = useState<Set<string>>(new Set())
  const refs = useRef<Map<string, HTMLDivElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).dataset.id ?? ''
            setVisible((prev) => new Set([...prev, id]))
          }
        })
      },
      { threshold: 0.15 }
    )
    refs.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="sec-divider" />
      <section className="experience" id="experience">

        <p className="sec-tag">Career</p>
        <h2 className="sec-title">Experience</h2>
        <p className="sec-sub">
          Building real enterprise systems used by real people — from day one.
        </p>

        <div className="timeline">
          {EXPERIENCE.map((exp: Exp, i: number) => (
            <div
              key={exp.id}
              data-id={exp.id}
              ref={(el) => { if (el) refs.current.set(exp.id, el) }}
              className={[
                'tl-item',
                exp.current ? 'current' : '',
                visible.has(exp.id) ? 'visible' : '',
              ].filter(Boolean).join(' ')}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="tl-dot" />
              <div className="tl-card">

                <div className="tl-head">
                  <div className="tl-role">{exp.role}</div>
                  <div className="tl-period">{exp.period}</div>
                </div>

                <div className="tl-company">
                  {exp.company}
                  {exp.current && (
                    <span className="tl-current-badge">● Now</span>
                  )}
                </div>

                <ul className="tl-bullets">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>

                <div className="tl-tech">
                  {exp.tech.map((t) => (
                    <span className="tech-tag" key={t}>{t}</span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}