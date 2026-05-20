import type { ReactElement } from 'react'
import '../../styles/marquee.css'

interface TechItem {
  name: string
  icon: string
}

const ROW1: TechItem[] = [
  { name: 'React',        icon: '⚛️' },
  { name: 'TypeScript',   icon: '🔷' },
  { name: 'Spring Boot',  icon: '🍃' },
  { name: 'Java',         icon: '☕' },
  { name: 'React Native', icon: '📱' },
  { name: 'PostgreSQL',   icon: '🐘' },
  { name: 'Vite',         icon: '⚡' },
  { name: 'Docker',       icon: '🐳' },
  { name: 'REST API',     icon: '🔗' },
  { name: 'JavaScript',   icon: '🟡' },
]

const ROW2: TechItem[] = [
  { name: 'MySQL',        icon: '🗄️' },
  { name: 'Git',          icon: '📂' },
  { name: 'Linux',        icon: '🐧' },
  { name: 'Tailwind',     icon: '🌊' },
  { name: 'Telegram Bot', icon: '🤖' },
  { name: 'AI / LLM',    icon: '🧠' },
  { name: 'Node.js',      icon: '🟩' },
  { name: 'HTML / CSS',   icon: '🎨' },
  { name: 'NestJS',       icon: '🏗️' },
  { name: 'JWT Auth',     icon: '🔐' },
]

function Track({ items }: { items: TechItem[] }): ReactElement {
  // Duplicate for seamless loop
  const all = [...items, ...items]
  return (
    <div className="marquee-track">
      {all.map((item, i) => (
        <div className="marquee-item" key={`${item.name}-${i}`}>
          <span className="marquee-icon">{item.icon}</span>
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default function Marquee(): ReactElement {
  return (
    <div className="marquee-section">
      <div className="marquee-row">
        <Track items={ROW1} />
      </div>
      <div className="marquee-row reverse">
        <Track items={ROW2} />
      </div>
    </div>
  )
}