import type { SkillCategory } from './types'

export const skillCategories: SkillCategory[] = [
  {
    name: { pt: 'Back-end', en: 'Back-end' },
    skills: [
      { name: 'Java 17/21' },
      { name: 'Spring Boot 3' },
      { name: 'PHP 8' },
      { name: 'Laravel 12' },
      { name: 'JWT' },
      { name: 'REST API' },
      { name: 'Swagger/OpenAPI' },
    ],
  },
  {
    name: { pt: 'Front-end', en: 'Front-end' },
    skills: [
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'Tailwind CSS' },
      { name: 'JavaScript (ES6+)' },
    ],
  },
  {
    name: { pt: 'Banco de Dados', en: 'Databases' },
    skills: [
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'Supabase' },
      { name: 'MariaDB' },
    ],
  },
  {
    name: { pt: 'Infra / DevOps', en: 'Infra / DevOps' },
    skills: [
      { name: 'Linux (Debian/Ubuntu)' },
      { name: 'Docker' },
      { name: 'Nginx' },
      { name: 'Cloudflare' },
      { name: 'GitHub Actions' },
      { name: 'CI/CD' },
      { name: 'Git' },
    ],
  },
]
