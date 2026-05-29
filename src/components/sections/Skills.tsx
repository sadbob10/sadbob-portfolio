import { useState } from 'react';
import type { ReactElement } from 'react';
import { SKILLS, SKILL_CATEGORIES } from '../../data/skills';
import type { Skill, SkillCategory } from '../../data/skills';
import '../../styles/skills.css';
import SplitText from '../ui/SplitText';
import { useGSAPStagger } from '../../hooks/useGSAP';
import { useTranslation } from '../../hooks/useTranslation';

export default function Skills(): ReactElement {
  const [active, setActive] = useState<SkillCategory>('All');
  const { t } = useTranslation();
  const s = t.skills;

  // GSAP Stagger for skills grid
  const gridRef = useGSAPStagger(0.06, 0.1);

  // Filter skills
  const filtered: Skill[] = active === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.category === active);

  return (
    <>
      <div className="sec-divider" />

      <section className="skills" id="skills">
        {/* Header */}
        <p className="mono-label">{s.tag}</p>

        {/* Updated SplitText Title */}
        <div className="section-heading">
          <SplitText text={s.title1} className="word-accent" staggerMs={50} />
          <SplitText text={s.title2} className="word-plain" staggerMs={50} delayMs={150} />
          <SplitText text={s.title3} className="word-plain" staggerMs={50} delayMs={250} />
          <SplitText text={s.title4} className="word-plain" staggerMs={50} delayMs={350} />
        </div>

        <p className="sec-sub">{s.sub}</p>

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

        {/* Skills grid — GSAP stagger applied */}
        <div
          className="skills-grid"
          ref={gridRef as React.RefObject<HTMLDivElement>}
        >
          {filtered.map((skill: Skill) => (
            <div
              key={skill.name}
              className="skill-card"
              style={{ '--level': `${skill.level}%` } as React.CSSProperties}
            >
              <span className="skill-icon">{skill.icon}</span>
              <div className="skill-name">{skill.name}</div>
              <div className="skill-cat">{skill.category}</div>
              <div className="skill-bar-bg">
                <div className="skill-bar-fill" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}