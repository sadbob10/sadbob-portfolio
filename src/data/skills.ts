export interface Skill {
  name:     string
  category: string
  icon:     string
  level:    number  // 1-100
}

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React',       category: 'Frontend',  icon: '⚛️',  level: 95 },
  { name: 'TypeScript',  category: 'Frontend',  icon: '🔷',  level: 88 },
  { name: 'JavaScript',  category: 'Frontend',  icon: '🟡',  level: 92 },
  { name: 'Vite',        category: 'Frontend',  icon: '⚡',  level: 90 },
  { name: 'HTML / CSS',  category: 'Frontend',  icon: '🎨',  level: 90 },
  { name: 'Tailwind',    category: 'Frontend',  icon: '🌊',  level: 85 },

  // Mobile
  { name: 'React Native', category: 'Mobile',   icon: '📱',  level: 82 },

  // Backend
  { name: 'Spring Boot', category: 'Backend',   icon: '🍃',  level: 93 },
  { name: 'Java',        category: 'Backend',   icon: '☕',  level: 92 },
  { name: 'REST API',    category: 'Backend',   icon: '🔗',  level: 90 },

  // Database
  { name: 'PostgreSQL',  category: 'Database',  icon: '🐘',  level: 85 },
  { name: 'MySQL',       category: 'Database',  icon: '🗄️',  level: 85 },

  // DevOps & Tools
  { name: 'Docker',      category: 'DevOps',    icon: '🐳',  level: 75 },
  { name: 'Git',         category: 'DevOps',    icon: '📂',  level: 90 },
  { name: 'Linux',       category: 'DevOps',    icon: '🐧',  level: 78 },

  // Integrations
  { name: 'Telegram Bot', category: 'Other',    icon: '🤖',  level: 88 },
  { name: 'AI / LLM',    category: 'Other',     icon: '🧠',  level: 80 },
]

export const SKILL_CATEGORIES = [
  'All', 'Frontend', 'Backend', 'Mobile', 'Database', 'DevOps', 'Other'
] as const

export type SkillCategory = typeof SKILL_CATEGORIES[number]