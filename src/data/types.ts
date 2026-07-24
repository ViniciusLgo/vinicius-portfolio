export interface Project {
  id: string
  title: string
  shortDesc: { pt: string; en: string }
  fullDesc: { pt: string; en: string }
  stack: string[]
  status: 'production' | 'open-source' | 'production-internal'
  statusLabel: { pt: string; en: string }
  github?: string
  demo?: string
  featured: boolean
  impact?: { pt: string; en: string }
}

export interface SkillCategory {
  name: { pt: string; en: string }
  skills: { name: string }[]
}

export interface Experience {
  role: { pt: string; en: string }
  company: string
  period: { pt: string; en: string }
  location: string
  current: boolean
  bullets: { pt: string[]; en: string[] }
}

export interface Education {
  degree: { pt: string; en: string }
  institution: string
  period: string
  status: 'ongoing' | 'completed'
  progress?: number
}

export interface Certification {
  name: string
  issuer: string
  date: { pt: string; en: string }
  credentialUrl?: string
}
