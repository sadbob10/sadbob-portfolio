export interface Project {
  id:          string
  title:       string
  description: string
  tech:        string[]
  type:        'Enterprise' | 'Personal'
  emoji:       string
  github?:     string
  live?:       string
  featured:    boolean
  nda:         boolean
}

export const PROJECTS: Project[] = [
  {
    id:          'enat-bank',
    title:       'Enat Bank Backoffice',
    description: 'Enterprise-grade backoffice management system for Enat Bank — handling core banking operations, role-based access control, audit trails, user management, and real-time reporting dashboards.',
    tech:        ['React', 'Vite', 'Spring Boot', 'PostgreSQL', 'Java', 'TypeScript'],
    type:        'Enterprise',
    emoji:       '🏦',
    featured:    true,
    nda:         true,
  },
  {
    id:          'shebelle-bank',
    title:       'Shebelle Bank Backoffice',
    description: 'Full-scale backoffice platform for Shebelle Bank — transaction oversight, compliance workflows, advanced analytics dashboards, and multi-role access management.',
    tech:        ['React', 'Vite', 'Spring Boot', 'MySQL', 'Java', 'TypeScript'],
    type:        'Enterprise',
    emoji:       '🏛️',
    featured:    true,
    nda:         true,
  },
  {
    id:          'bulk-sms',
    title:       'Bulk SMS Platform',
    description: 'High-throughput SMS broadcasting system for banking institutions — audience targeting, message scheduling, delivery tracking, analytics, and campaign management.',
    tech:        ['Spring Boot', 'Java', 'React', 'MySQL'],
    type:        'Enterprise',
    emoji:       '📨',
    featured:    false,
    nda:         true,
  },
  {
    id:          'calendar-converter',
    title:       'Calendar Converter',
    description: 'Tri-calendar conversion tool supporting Ethiopian, Gregorian, and Hijri calendars seamlessly in both directions. Includes a fully functional Telegram Bot integration for quick conversions.',
    tech:        ['React', 'Vite', 'Spring Boot', 'Java', 'Telegram Bot API'],
    type:        'Personal',
    emoji:       '📅',
    github:      'https://github.com/sadbob10',
    featured:    true,
    nda:         false,
  },
  {
    id:          'roast-my-life',
    title:       'Roast My Life',
    description: 'AI-powered React Native app that delivers brutally honest and hilarious roasts of your life decisions. Because sometimes you just need that kind of honesty.',
    tech:        ['React Native', 'JavaScript', 'AI Integration'],
    type:        'Personal',
    emoji:       '🔥',
    github:      'https://github.com/sadbob10',
    featured:    true,
    nda:         false,
  },
]

export const PROJECT_FILTERS = ['All', 'Enterprise', 'Personal'] as const
export type ProjectFilter = typeof PROJECT_FILTERS[number]