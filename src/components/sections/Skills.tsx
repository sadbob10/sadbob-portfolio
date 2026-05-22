import { useState, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import { SKILLS, SKILL_CATEGORIES } from '../../data/skills';
import type { Skill, SkillCategory } from '../../data/skills';
import '../../styles/skills.css';
import SplitText from '../ui/SplitText';

export default function Skills(): ReactElement {
  const [active, setActive] = useState<SkillCategory>('All');
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Filter skills
  const filtered: Skill[] = active === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.category === active);

  // Scroll reveal for cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = (entry.target as HTMLElement).dataset.key ?? '';
            setVisible((prev) => new Set([...prev, key]));
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filtered]);

  return (
    <>
      <div className="sec-divider" />

      <section className="skills" id="skills">
        {/* Header */}
        <p className="mono-label">Tech Arsenal</p>

        {/* Updated SplitText Title */}
        <div className="section-heading">
          <SplitText text="What" className="word-accent" staggerMs={50} />
          <SplitText text=" I" className="word-plain" staggerMs={50} delayMs={150} />
          <SplitText text=" Work" className="word-plain" staggerMs={50} delayMs={250} />
          <SplitText text=" With" className="word-plain" staggerMs={50} delayMs={350} />
        </div>

        <p className="sec-sub">
          From Java backends to React frontends, mobile apps to databases —
          my toolkit spans the complete modern stack.
        </p>

        {/* Filter tabs */}
        <div className="filter-row">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`ftab${active === cat ? ' active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="skills-grid">
          {filtered.map((skill: Skill, i: number) => {
            const key = skill.name;
            const isVisible = visible.has(key);

            return (
              <div
                key={key}
                data-key={key}
                ref={(el) => {
                  if (el) cardRefs.current.set(key, el);
                }}
                className={`skill-card${isVisible ? ' visible' : ''}`}
                style={{
                  transitionDelay: `${(i % 8) * 0.06}s`,
                  '--level': `${skill.level}%`,
                } as React.CSSProperties}
              >
                <span className="skill-icon">{skill.icon}</span>
                <div className="skill-name">{skill.name}</div>
                <div className="skill-cat">{skill.category}</div>
                <div className="skill-bar-bg">
                  <div className="skill-bar-fill" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}