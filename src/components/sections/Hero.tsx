import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Mail, ArrowRight, ChevronDown } from 'lucide-react';

import { useGlitch } from '../../hooks/useGlitch';
import { useTyping } from '../../hooks/useTyping';

import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import ParallaxLayer from '../ui/ParallaxLayer';

import ParticleScene from '../../lib/three/ParticleScene';

import '../../styles/hero.css';

interface StatItem {
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: '3+', label: 'Years Experience' },
  { value: '5+', label: 'Projects Delivered' },
  { value: '2', label: 'Banks Powered' },
  { value: '∞', label: 'Lines of Code' },
];

export default function Hero(): ReactElement {
  const [visible, setVisible] = useState<boolean>(false);

  const sadamGlitch = useGlitch('SADAM', 600);
  const abateGlitch = useGlitch('ABATE', 1100);

  const role = useTyping();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      {/* 3D Background */}
      <ParticleScene />

      {/* Aurora Overlay */}
      <ParallaxLayer
        speed={0.15}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <div className="aurora" style={{ position: 'absolute', inset: 0 }} />
      </ParallaxLayer>

      {/* Hero Grid Background */}
      <ParallaxLayer
        speed={0.08}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        <div className="hero-grid" style={{ position: 'absolute', inset: 0 }} />
      </ParallaxLayer>

      {/* Main Content */}
      <div className={`hero-content ${visible ? 'show' : ''}`}>
        {/* Status Badge */}
        <div className="h-badge">
          <span className="h-dot" />
          open to work — let's build something great
        </div>

        {/* Location */}
        <p className="h-location">📍 Addis Ababa, Ethiopia · 🇪🇹</p>

        {/* Name */}
        <div className="name-block">
          <span className="name-line name-first">
            {sadamGlitch.text.split('').map((ch: string, i: number) => (
              <span
                key={i}
                className={`glyph ${!sadamGlitch.done ? 'scrambling' : ''}`}
              >
                {ch}
              </span>
            ))}
          </span>

          <span className="name-line name-last grad-text">
            {abateGlitch.text.split('').map((ch: string, i: number) => (
              <span
                key={i}
                className={`glyph ${!abateGlitch.done ? 'scrambling' : ''}`}
              >
                {ch}
              </span>
            ))}
          </span>
        </div>

        {/* Nickname */}
        <p className="h-nick">
          aka <span>@sadbob</span>
        </p>

        {/* Typing Role */}
        <div className="role-wrap">
          <div className="role-bar" />
          <div className="role-text">
            {role}
            <span className="cursor" />
          </div>
        </div>

        {/* Description */}
        <p className="h-desc">
          Building <strong>enterprise-grade</strong> systems that power{' '}
          <em>Ethiopian banks</em> and real businesses. Expert in{' '}
          <strong>React + Spring Boot</strong> full-stack development and{' '}
          <strong>React Native</strong> mobile apps.
        </p>

        {/* CTA Buttons */}
        <div className="btn-row">
          <a href="#projects" className="btn-primary">
            See My Work
            <ArrowRight size={15} />
          </a>

          <a href="mailto:abate.shallo@gmail.com" className="btn-outline">
            Let's Talk
            <Mail size={15} />
          </a>
        </div>

        {/* Social Links */}
        <div className="h-socials">
          <a
            href="https://github.com/sadbob10"
            target="_blank"
            rel="noreferrer"
            className="soc"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/sadam-abate"
            target="_blank"
            rel="noreferrer"
            className="soc"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>

          <a
            href="mailto:abate.shallo@gmail.com"
            className="soc"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Stats */}
        <div className="h-stats">
          {STATS.map(({ value, label }) => (
            <div className="stat-item" key={label}>
              <div className="stat-n grad-text">{value}</div>
              <div className="stat-l">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-ind">
        <div className="scroll-line" />
        <span className="scroll-txt">scroll</span>
        <ChevronDown size={13} color="var(--muted)" />
      </div>
    </section>
  );
}