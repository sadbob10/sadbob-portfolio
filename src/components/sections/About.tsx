import type { ReactElement } from 'react';
import { MapPin, Calendar, Zap, Globe } from 'lucide-react';
import '../../styles/about.css';
import GithubStats from '../ui/GithubStats';
import profilePhoto from '../../assets/profile.jpg';
import SplitText from '../ui/SplitText';
import { useGSAPStagger, useGSAPFade } from '../../hooks/useGSAP';
import { useTranslation } from '../../hooks/useTranslation';

export default function About(): ReactElement {
  const { t } = useTranslation();
  const a = t.about;

  // GSAP Animations
  const pillsRef = useGSAPStagger(0.1, 0.2);
  const textRef = useGSAPFade('up', 0.1);
  const statsRef = useGSAPStagger(0.12, 0.3);
  const codeRef = useGSAPFade('right', 0.2);

  return (
    <section className="about" id="about" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* ── Gradient blob background ── */}
      <div
        className="blob blob-1"
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: 'clamp(300px, 50vw, 600px)',
          height: 'clamp(300px, 50vw, 600px)',
          background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        className="blob blob-2"
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: 'clamp(250px, 40vw, 500px)',
          height: 'clamp(250px, 40vw, 500px)',
          background: 'radial-gradient(circle, rgba(123,0,255,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        className="blob blob-3"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'clamp(200px, 30vw, 400px)',
          height: 'clamp(200px, 30vw, 400px)',
          background: 'radial-gradient(circle, rgba(255,0,195,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── All existing content wrapped with relative positioning ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <p className="mono-label">{a.tag}</p>

        {/* Updated SplitText Title */}
        <div className="section-heading">
          <SplitText text={a.title1} className="word-accent" staggerMs={55} />
          <SplitText text={a.title2} className="word-plain" staggerMs={55} delayMs={250} />
        </div>

        {/* Grid with class only - no inline styles */}
        <div className="about-grid">
          {/* ── Premium Profile Card ── */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            {/* Profile Photo */}
            <div
              style={{
                position: 'relative',
                width: '260px',
                height: '260px',
                padding: '6px',
                background: 'linear-gradient(145deg, #00e5ff, #7b00ff, #ff00c3)',
                borderRadius: '50%',
                boxShadow: '0 20px 40px rgba(0, 229, 255, 0.15)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="profile-wrapper"
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: 'var(--bg3)',
                  border: '4px solid rgba(0,0,0,0.6)',
                }}
              >
                <img
                  src={profilePhoto}
                  alt="Sadam Abate"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    borderRadius: '50%',
                  }}
                />
              </div>

              {/* Available Status Ring */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  width: '28px',
                  height: '28px',
                  background: '#10b981',
                  border: '3px solid var(--bg)',
                  borderRadius: '50%',
                  boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.3)',
                }}
              />
            </div>

            {/* Quick Info Pills */}
            <div
              ref={pillsRef as React.RefObject<HTMLDivElement>}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                width: '100%',
              }}
            >
              {[
                { icon: MapPin, text: a.pills.location },
                { icon: Zap, text: a.pills.available },
                { icon: Globe, text: a.pills.remote },
                { icon: Calendar, text: a.pills.immediate },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    color: 'var(--muted)',
                    transition: 'all 0.2s',
                  }}
                  className="info-pill"
                >
                  <Icon size={18} style={{ color: '#00e5ff' }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* ── Middle: Text Content ── */}
          <div className="about-text" ref={textRef as React.RefObject<HTMLDivElement>}>
            <p>{a.p1}</p>
            <p>{a.p2}</p>
            <p>{a.p3}</p>

            {/* Mini stats */}
            <div className="about-stats" ref={statsRef as React.RefObject<HTMLDivElement>}>
              <div className="about-stat">
                <div className="about-stat-n grad-text">3+</div>
                <div className="about-stat-l">{a.stats.years}</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-n grad-text">5+</div>
                <div className="about-stat-l">{a.stats.projects}</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-n grad-text">2</div>
                <div className="about-stat-l">{a.stats.banks}</div>
              </div>
            </div>

            <div className="avail-badge" style={{ marginTop: '2rem' }}>
              <span className="avail-dot" />
              {a.badge}
            </div>

            <GithubStats />
          </div>

          {/* ── Right: Code Card ── */}
          <div className="code-card about-code-card" ref={codeRef as React.RefObject<HTMLDivElement>}>
            <div className="code-bar">
              <div className="code-dot dot-r" />
              <div className="code-dot dot-y" />
              <div className="code-dot dot-g" />
              <span className="code-filename">developer.json</span>
            </div>
            <div className="code-body">
              <div><span className="cm">{'{'}</span></div>

              <div>
                &nbsp;&nbsp;<span className="ck">"name"</span>
                <span className="cm">: </span>
                <span className="cv">"Sadam Abate"</span>
                <span className="cm">,</span>
              </div>

              <div>
                &nbsp;&nbsp;<span className="ck">"alias"</span>
                <span className="cm">: </span>
                <span className="cv">"sadbob"</span>
                <span className="cm">,</span>
              </div>

              <div>
                &nbsp;&nbsp;<span className="ck">"location"</span>
                <span className="cm">: </span>
                <span className="cv">"Addis Ababa 🇪🇹"</span>
                <span className="cm">,</span>
              </div>

              <div>
                &nbsp;&nbsp;<span className="ck">"role"</span>
                <span className="cm">: </span>
                <span className="cv">"Full Stack Developer"</span>
                <span className="cm">,</span>
              </div>

              <div>
                &nbsp;&nbsp;<span className="ck">"openToWork"</span>
                <span className="cm">: </span>
                <span className="cb">true</span>
                <span className="cm">,</span>
              </div>

              <div>
                &nbsp;&nbsp;<span className="ck">"experience"</span>
                <span className="cm">: </span>
                <span className="cn">3</span>
                <span className="cm">,</span>
              </div>

              <div>
                &nbsp;&nbsp;<span className="ck">"stack"</span>
                <span className="cm">: [</span>
              </div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">"React"</span><span className="cm">,</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">"Spring Boot"</span><span className="cm">,</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">"Java"</span><span className="cm">,</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">"React Native"</span></div>
              <div>&nbsp;&nbsp;<span className="cm">],</span></div>

              <div>
                &nbsp;&nbsp;<span className="ck">"loves"</span>
                <span className="cm">: [</span>
                <span className="cv">"clean code"</span>
                <span className="cm">, </span>
                <span className="cv">"coffee ☕"</span>
                <span className="cm">]</span>
              </div>

              <div><span className="cm">{'}'}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}