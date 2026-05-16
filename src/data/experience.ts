export interface Experience {
  id:       string
  role:     string
  company:  string
  period:   string
  current:  boolean
  bullets:  string[]
  tech:     string[]
}

export const EXPERIENCE: Experience[] = [
  {
    id:      'current',
    role:    'Full Stack Developer',
    company: 'Freelance & Contract',
    period:  '2024 — Present',
    current: true,
    bullets: [
      'Building enterprise backoffice systems for Ethiopian banks',
      'Architecting React + Spring Boot full stack solutions',
      'Developing cross-platform mobile apps with React Native',
      'Integrating AI capabilities into production applications',
    ],
    tech: ['React', 'Spring Boot', 'React Native', 'TypeScript', 'Java'],
  },
  {
    id:      'enat',
    role:    'Full Stack Developer',
    company: 'Enat Bank Project',
    period:  '2023 — 2024',
    current: false,
    bullets: [
      'Delivered full backoffice management system from scratch',
      'Implemented RBAC with Spring Security and JWT',
      'Built real-time dashboards with React and REST APIs',
      'Managed PostgreSQL database schema and migrations',
    ],
    tech: ['React', 'Vite', 'Spring Boot', 'PostgreSQL', 'Java'],
  },
  {
    id:      'shebelle',
    role:    'Full Stack Developer',
    company: 'Shebelle Bank Project',
    period:  '2022 — 2023',
    current: false,
    bullets: [
      'Built complete banking backoffice platform',
      'Developed Bulk SMS broadcasting system for campaigns',
      'Designed RESTful API architecture with Spring Boot',
      'Delivered responsive UI with React and TypeScript',
    ],
    tech: ['React', 'Spring Boot', 'MySQL', 'TypeScript', 'Java'],
  },
]