import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Mail, ArrowRight, ChevronDown, Download } from 'lucide-react';

import { useGlitch } from '../../hooks/useGlitch';
import { useTyping } from '../../hooks/useTyping';
import { useCountUp } from '../../hooks/useCountUp';
import { useTranslation } from '../../hooks/useTranslation';

import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import ParallaxLayer from '../ui/ParallaxLayer';
import ParticleScene from '../../lib/three/ParticleScene';
import RippleButton from '../ui/RippleButton';
import MagneticButton from '../ui/MagneticButton';
import TextReveal from '../ui/TextReveal';

import '../../styles/hero.css';

const CV_URL = 'https://drive.google.com/uc?export=download&id=1D7aJmS9sViElkp5qz81a489JlX7lHGiC';

function StatCounter({
  value,
  label,
  isInfinity = false,
}: {
  value: number;
  label: string;
  isInfinity?: boolean;
}): ReactElement {
  const { count, ref } = useCountUp(value, 1800);

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-n grad-text">
        {isInfinity ? '∞' : `${count}+`}
      </div>
      <div className="stat-l">{label}</div>
    </div>
  );
}

export default function Hero(): ReactElement {
  const [visible, setVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  const sadamGlitch = useGlitch('SADAM', 600);
  const abateGlitch = useGlitch('ABATE', 1100);

  // Use translated roles
  const role = useTyping(t.hero.roles);

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
          {t.hero.badge}
        </div>

        {/* Location */}
        <p className="h-location">{t.hero.location}</p>

        {/* Name — Glitch Decode with stroke effect */}
        <div className="name-block">
          {/* SADAM — white */}
          <span className="name-line name-first">
            {sadamGlitch.text.split('').map((ch: string, i: number) => (
              <span
                key={i}
                className={`glyph${!sadamGlitch.done ? ' scrambling' : ''}`}
              >
                {ch}
              </span>
            ))}
          </span>

          {/* ABATE — gradient + stroke shadow */}
          <span className="name-line name-last">
            <span className="name-last-fill">
              {abateGlitch.text.split('').map((ch: string, i: number) => (
                <span
                  key={i}
                  className={`glyph${!abateGlitch.done ? ' scrambling' : ''}`}
                >
                  {ch}
                </span>
              ))}
            </span>
            {/* Decorative offset stroke */}
            <span className="name-last-stroke" aria-hidden="true">
              {abateGlitch.text}
            </span>
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
        <TextReveal
          text={t.hero.desc}
          className="h-desc"
          delay={0.3}
          stagger={0.04}
        />

        {/* CTA Buttons */}
        <div className="btn-row">
          <MagneticButton
            className="btn-primary"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ overflow: 'visible' }}
          >
            {t.hero.seeWork} <ArrowRight size={15} />
          </MagneticButton>

          <RippleButton href="mailto:abate.shallo@gmail.com" className="btn-outline">
            {t.hero.letsTalk} <Mail size={15} />
          </RippleButton>

          <a
            href={CV_URL}
            download="Sadam_Abate_Resume.pdf"
            className="btn-outline"
            style={{
              borderColor: 'rgba(0,229,255,0.3)',
              color: 'var(--cyan)',
            }}
          >
            <Download size={15} />
            {t.hero.downloadCV}
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

        {/* Animated Stats */}
        <div className="h-stats">
          <StatCounter value={3} label={t.hero.stats.years} />
          <StatCounter value={5} label={t.hero.stats.projects} />
          <StatCounter value={2} label={t.hero.stats.banks} />
          <StatCounter value={0} label={t.hero.stats.code} isInfinity />
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