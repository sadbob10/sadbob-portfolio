import type { ReactElement } from 'react';
import { MapPin, Calendar, Code2, Zap, Globe } from 'lucide-react';
import '../../styles/about.css';
import GithubStats from '../ui/GithubStats';
import profilePhoto from '../../assets/profile.jpg';

export default function About(): ReactElement {
  return (
    <section className="about" id="about">
      {/* Header */}
      <p className="sec-tag">Who I Am</p>
      <h2 className="sec-title">About Me</h2>

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
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              width: '100%',
            }}
          >
            {[
              { icon: MapPin, text: 'Addis Ababa, Ethiopia' },
              { icon: Zap, text: 'Available for opportunities' },
              { icon: Globe, text: 'Remote & On-site' },
              { icon: Calendar, text: 'Available immediately' },
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
        <div className="about-text">
          <p>
            I'm <strong>Sadam Abate</strong>, a full stack developer based in{' '}
            <em>Addis Ababa, Ethiopia 🇪🇹</em>. I specialize in building
            robust, scalable enterprise applications using{' '}
            <strong>React + Vite</strong> on the frontend and{' '}
            <strong>Spring Boot + Java</strong> on the backend.
          </p>
          <p>
            My work includes building critical banking infrastructure for
            Ethiopian financial institutions — systems that handle{' '}
            <strong>real money</strong>, real users, and real responsibility.
            I care deeply about clean architecture,{' '}
            <strong>system performance</strong>, and developer experience.
          </p>
          <p>
            Outside enterprise work, I build personal projects that blend
            creativity with technology — a <em>tri-calendar converter</em>{' '}
            celebrating Ethiopian culture, a Telegram bot, and an{' '}
            <em>AI-powered roast app</em> that keeps things fun.
            More projects coming soon.
          </p>

          {/* Mini stats */}
          <div className="about-stats">
            <div className="about-stat">
              <div className="about-stat-n grad-text">3+</div>
              <div className="about-stat-l">Years Exp.</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-n grad-text">5+</div>
              <div className="about-stat-l">Projects</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-n grad-text">2</div>
              <div className="about-stat-l">Banks</div>
            </div>
          </div>

          <div className="avail-badge" style={{ marginTop: '2rem' }}>
            <span className="avail-dot" />
            Available for freelance and full-time roles
          </div>

          <GithubStats />
        </div>

        {/* ── Right: Code Card ── */}
        <div className="code-card about-code-card">
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
    </section>
  );
}