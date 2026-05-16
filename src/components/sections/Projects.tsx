import { useState, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { PROJECTS, PROJECT_FILTERS } from '../../data/projects';
import type { Project, ProjectFilter } from '../../data/projects';
import '../../styles/projects.css';

export default function Projects(): ReactElement {
  const [active, setActive] = useState<ProjectFilter>('All');
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Filter projects
  const filtered: Project[] =
    active === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.type === active);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.id ?? '';
            setVisible((prev) => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [active]); // Better to depend on `active` instead of `filtered`

  // 3D tilt on mouse move
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    el: HTMLDivElement
  ): void => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    const mx = (x / rect.width) * 100;
    const my = (y / rect.height) * 100;

    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(0px)`;
    el.style.setProperty('--mx', `${mx}%`);
    el.style.setProperty('--my', `${my}%`);
  };

  const handleMouseLeave = (el: HTMLDivElement): void => {
    el.style.transform = '';
  };

  return (
    <>
      <div className="sec-divider" />

      <section className="projects" id="projects">
        {/* Header */}
        <p className="sec-tag">Portfolio</p>
        <h2 className="sec-title">Featured Projects</h2>
        <p className="sec-sub">
          Enterprise systems powering real banks.
          <br />
          Personal tools solving real problems. More on the way.
        </p>

        {/* Filter tabs */}
        <div className="filter-row">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`ftab${active === f ? ' active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="projects-grid">
          {filtered.map((project: Project, i: number) => (
            <div
              key={project.id}
              data-id={project.id}
              ref={(el) => {
                if (el) cardRefs.current.set(project.id, el);
              }}
              className={`proj-card${visible.has(project.id) ? ' visible' : ''}`}
              style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
              onMouseMove={(e) => {
                const el = cardRefs.current.get(project.id);
                if (el) handleMouseMove(e, el);
              }}
              onMouseLeave={() => {
                const el = cardRefs.current.get(project.id);
                if (el) handleMouseLeave(el);
              }}
            >
              {/* Featured badge */}
              {project.featured && (
                <span className="proj-featured">★ Featured</span>
              )}

              {/* Emoji */}
              <span className="proj-emoji">{project.emoji}</span>

              {/* Type + NDA */}
              <div className="proj-meta">
                <span className={`proj-type type-${project.type.toLowerCase()}`}>
                  {project.type}
                </span>
                {project.nda && <span className="proj-nda">🔒 NDA</span>}
              </div>

              {/* Title */}
              <h3 className="proj-title">{project.title}</h3>

              {/* Description */}
              <p className="proj-desc">{project.description}</p>

              {/* Tech tags */}
              <div className="proj-tech">
                {project.tech.map((t) => (
                  <span className="tech-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="proj-links">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="proj-link"
                  >
                    <GithubIcon size={14} />
                    GitHub
                  </a>
                ) : (
                  <span className="proj-link disabled">
                    <GithubIcon size={14} />
                    Private
                  </span>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="proj-link"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}