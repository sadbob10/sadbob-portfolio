import type { ReactElement } from 'react'
import { MapPin, Calendar, Code2 } from 'lucide-react'
import '../../styles/about.css'

export default function About(): ReactElement {
  return (
    <section className="about" id="about">

      {/* Header */}
      <p className="sec-tag">Who I Am</p>
      <h2 className="sec-title">About Me</h2>

      <div className="about-grid">

        {/* ── Left: Text ── */}
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

          <div className="avail-badge" style={{ marginTop: '1.5rem' }}>
            <span className="avail-dot" />
            Available for freelance and full-time roles
          </div>
        </div>

        {/* ── Right: Code Card ── */}
        <div className="code-card">
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
  )
}