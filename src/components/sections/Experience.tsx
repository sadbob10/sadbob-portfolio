import type { ReactElement } from 'react';
import { EXPERIENCE } from '../../data/experience';
import type { Experience as Exp } from '../../data/experience';
import SplitText from '../ui/SplitText';
import { useGSAPLineDraw, useGSAPStagger } from '../../hooks/useGSAP';
import '../../styles/experience.css';

export default function Experience(): ReactElement {
  const itemsRef = useGSAPStagger(0.15, 0.1, '.tl-item');
  const lineRef = useGSAPLineDraw();

  return (
    <>
      <div className="sec-divider" />
      <section className="experience" id="experience">

        <p className="mono-label">Career</p>
        <div className="section-heading">
          <SplitText text="My" className="word-accent" staggerMs={60} />
          <SplitText text=" Experience" className="word-plain" staggerMs={50} delayMs={150} />
        </div>
        <p className="sec-sub">
          Building real enterprise systems used by real people — from day one.
        </p>

        <div
          className="timeline"
          ref={itemsRef as React.RefObject<HTMLDivElement>}
        >
          {/* Animated vertical timeline line */}
          <div
            ref={lineRef as React.RefObject<HTMLDivElement>}
            style={{
              position: 'absolute',
              left: 0,
              top: 8,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, var(--purple), var(--pink), transparent)',
              opacity: 0.3,
              transformOrigin: 'top center',
            }}
          />

          {EXPERIENCE.map((exp: Exp) => (
            <div
              key={exp.id}
              className={`tl-item${exp.current ? ' current' : ''}`}
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
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
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
  );
}