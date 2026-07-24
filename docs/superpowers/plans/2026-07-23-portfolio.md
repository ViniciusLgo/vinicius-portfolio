# Portfólio Vinicius Lago Cruz — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir portfólio web profissional com Next.js 14 + TypeScript, estética neon dark, bilíngue PT/EN, deploy na Vercel.

**Architecture:** SPA com âncoras na rota `/` e rota separada `/blog` com Markdown. Dados em arquivos TypeScript tipados em `/src/data/`. Traduções em `messages/pt.json` e `messages/en.json` via next-intl.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, next-intl, EmailJS, gray-matter, remark.

## Global Constraints

- Node.js 18+
- Next.js 14 (App Router)
- TypeScript strict mode
- Tailwind CSS v3
- Cores: background `#0a0a0f`, neon verde `#00ff88`, neon azul `#00d4ff`
- Fontes: JetBrains Mono (hero/terminal), Inter (corpo)
- Apenas dark mode
- EmailJS para formulário de contato (sem backend)
- PDF do CV em `/public/cv-vinicius-lago.pdf`

---

### Task 1: Setup do Projeto

**Files:**
- Create: `package.json` (gerado pelo Next.js)
- Create: `tailwind.config.ts`
- Create: `src/app/globals.css`
- Create: `next.config.ts`
- Create: `.env.local.example`

- [ ] **Step 1: Criar projeto Next.js**

```bash
cd C:\Users\Vinicius-pc-suporte\Music\GITHUB\vinicius_portifolio
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

- [ ] **Step 2: Instalar dependências**

```bash
npm install framer-motion next-intl emailjs-com gray-matter remark remark-html
npm install -D @types/node
```

- [ ] **Step 3: Configurar tailwind.config.ts**

Substituir conteúdo por:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        'neon-green': '#00ff88',
        'neon-blue': '#00d4ff',
        surface: '#0f0f1a',
        border: '#1a1a2e',
        muted: '#4a4a6a',
        text: '#e2e8f0',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.3)',
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 4: Configurar globals.css**

```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-bg text-text font-sans;
  }
  ::selection {
    @apply bg-neon-green text-bg;
  }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { @apply bg-bg; }
  ::-webkit-scrollbar-thumb { @apply bg-neon-green rounded; }
}

@layer utilities {
  .glow-green { box-shadow: 0 0 20px rgba(0, 255, 136, 0.3); }
  .glow-blue  { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
  .text-glow-green { text-shadow: 0 0 10px rgba(0, 255, 136, 0.5); }
}
```

- [ ] **Step 5: Criar .env.local.example**

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

- [ ] **Step 6: Verificar**

```bash
npm run dev
```

Esperado: página padrão Next.js em `http://localhost:3000` sem erros.

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "chore: setup Next.js 14 + TypeScript + Tailwind + deps"
```

---

### Task 2: Dados e Traduções

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/experience.ts`
- Create: `src/data/education.ts`
- Create: `src/data/certifications.ts`
- Create: `src/data/types.ts`
- Create: `messages/pt.json`
- Create: `messages/en.json`
- Create: `next.config.ts` (atualizar com next-intl)
- Create: `src/i18n.ts`
- Create: `src/middleware.ts`

- [ ] **Step 1: Criar tipos compartilhados em `src/data/types.ts`**

```ts
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
  skills: { name: string; icon: string }[]
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
```

- [ ] **Step 2: Criar `src/data/projects.ts`**

```ts
import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'daxcode',
    title: 'Plataforma DaxCode',
    shortDesc: {
      pt: 'Sistema de gestão escolar e seleção de candidatos em produção.',
      en: 'School management and candidate selection platform in production.',
    },
    fullDesc: {
      pt: 'Plataforma educacional com sistema de gestão escolar e módulo de seleção de candidatos, cobrindo matrículas, turmas, disciplinas, documentos, avaliações e fluxo seletivo. Responsabilidade total pelo desenvolvimento, infraestrutura, deploy e evolução do produto, utilizado por aproximadamente 60 usuários entre coordenação, professores e alunos.',
      en: 'Educational platform with a school management system and candidate selection module, covering enrollments, classes, subjects, documents, assessments, and the selection workflow. Full ownership of development, infrastructure, deploy, and product evolution — used by approximately 60 users including coordinators, teachers, and students.',
    },
    stack: ['PHP 8.4', 'Laravel 12', 'MySQL', 'Tailwind CSS', 'JavaScript', 'Nginx', 'Cloudflare'],
    status: 'production',
    statusLabel: { pt: 'Em produção', en: 'In production' },
    featured: true,
    impact: {
      pt: '~60 usuários ativos · Deploy em Linux/Nginx · Cloudflare',
      en: '~60 active users · Linux/Nginx deploy · Cloudflare',
    },
  },
  {
    id: 'meusemestre',
    title: 'MeuSemestreUCSAL',
    shortDesc: {
      pt: 'Plataforma para avaliações anônimas de professores da UCSAL.',
      en: 'Platform for anonymous professor reviews at UCSAL.',
    },
    fullDesc: {
      pt: 'Plataforma web onde alunos da UCSAL avaliam professores anonimamente e planejam sua grade acadêmica. Autenticação por OTP, Row Level Security no PostgreSQL via Supabase, notificações via bot Telegram e deploy contínuo na Vercel.',
      en: 'Web platform where UCSAL students anonymously review professors and plan their academic schedule. OTP authentication, Row Level Security in PostgreSQL via Supabase, Telegram bot notifications, and continuous deployment on Vercel.',
    },
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    status: 'open-source',
    statusLabel: { pt: 'Em produção · Open Source', en: 'In production · Open Source' },
    github: 'https://github.com/ViniciusLgo/MeuSemestreUcsal',
    demo: 'https://meu-semestre-ucsal.vercel.app',
    featured: true,
    impact: {
      pt: 'OTP auth · RLS PostgreSQL · Bot Telegram · CI/CD Vercel',
      en: 'OTP auth · RLS PostgreSQL · Telegram Bot · CI/CD Vercel',
    },
  },
  {
    id: 'movieflix',
    title: 'MovieFlix API',
    shortDesc: {
      pt: 'API REST para catálogo de filmes com autenticação JWT.',
      en: 'REST API for movie catalog with JWT authentication.',
    },
    fullDesc: {
      pt: 'API REST para catálogo de filmes com autenticação JWT, Spring Security, controle de acesso por perfil de usuário e documentação Swagger/OpenAPI. Desenvolvida com Java 17, Spring Boot 3, PostgreSQL, Flyway e JPA/Hibernate.',
      en: 'REST API for movie catalog with JWT authentication, Spring Security, role-based access control, and Swagger/OpenAPI documentation. Built with Java 17, Spring Boot 3, PostgreSQL, Flyway, and JPA/Hibernate.',
    },
    stack: ['Java 17', 'Spring Boot 3', 'Spring Security', 'PostgreSQL', 'JWT', 'Swagger'],
    status: 'open-source',
    statusLabel: { pt: 'Open Source', en: 'Open Source' },
    github: 'https://github.com/ViniciusLgo/Movieflix',
    featured: false,
  },
  {
    id: 'daxcontrol',
    title: 'DAX Control Center',
    shortDesc: {
      pt: 'Sistema corporativo para inventário de ativos e chamados de TI.',
      en: 'Corporate system for IT asset inventory and support tickets.',
    },
    fullDesc: {
      pt: 'Sistema interno para gestão de ativos de TI, abertura de chamados e controle da infraestrutura. Utilizado pela equipe de TI da DAX Oil Refino S.A. para monitorar equipamentos, registrar incidentes e acompanhar projetos internos.',
      en: 'Internal system for IT asset management, support ticket handling, and infrastructure control. Used by the IT team at DAX Oil Refino S.A. to monitor equipment, log incidents, and track internal projects.',
    },
    stack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'Blade'],
    status: 'production-internal',
    statusLabel: { pt: 'Em produção · Uso interno', en: 'In production · Internal use' },
    featured: false,
  },
]
```

- [ ] **Step 3: Criar `src/data/skills.ts`**

```ts
import type { SkillCategory } from './types'

export const skillCategories: SkillCategory[] = [
  {
    name: { pt: 'Back-end', en: 'Back-end' },
    skills: [
      { name: 'Java 17/21', icon: 'java' },
      { name: 'Spring Boot 3', icon: 'spring' },
      { name: 'PHP 8', icon: 'php' },
      { name: 'Laravel 12', icon: 'laravel' },
      { name: 'JWT', icon: 'jwt' },
      { name: 'REST API', icon: 'api' },
    ],
  },
  {
    name: { pt: 'Front-end', en: 'Front-end' },
    skills: [
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React', icon: 'react' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'JavaScript', icon: 'javascript' },
    ],
  },
  {
    name: { pt: 'Banco de Dados', en: 'Databases' },
    skills: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'MariaDB', icon: 'mariadb' },
    ],
  },
  {
    name: { pt: 'Infra / DevOps', en: 'Infra / DevOps' },
    skills: [
      { name: 'Linux', icon: 'linux' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Nginx', icon: 'nginx' },
      { name: 'Cloudflare', icon: 'cloudflare' },
      { name: 'GitHub Actions', icon: 'github' },
      { name: 'CI/CD', icon: 'cicd' },
    ],
  },
]
```

- [ ] **Step 4: Criar `src/data/experience.ts`**

```ts
import type { Experience } from './types'

export const experiences: Experience[] = [
  {
    role: { pt: 'Coordenador de TI e Desenvolvedor Full Stack', en: 'IT Coordinator & Full Stack Developer' },
    company: 'DAXCode',
    period: { pt: 'jan/2026 – atual', en: 'Jan 2026 – Present' },
    location: 'Camaçari, BA',
    current: true,
    bullets: {
      pt: [
        'Desenvolvimento e manutenção da Plataforma DaxCode com Laravel 12, PHP 8.4 e MySQL (~60 usuários).',
        'Implementação de módulos para seleção de candidatos, alunos, professores, turmas, disciplinas, matrículas, documentos e avaliações.',
        'Levantamento de requisitos, modelagem de dados, controle de acesso e evolução contínua do sistema.',
        'Administração do ambiente Linux, configuração de Nginx e Cloudflare, análise de logs e deploys em produção.',
      ],
      en: [
        'Development and maintenance of the DaxCode Platform using Laravel 12, PHP 8.4, and MySQL (~60 users).',
        'Implementation of modules for candidate selection, students, teachers, classes, subjects, enrollments, documents, and assessments.',
        'Requirements gathering, data modeling, access control, and continuous system evolution.',
        'Linux environment administration, Nginx and Cloudflare configuration, log analysis, and production deploys.',
      ],
    },
  },
  {
    role: { pt: 'Analista de Infraestrutura e Suporte', en: 'Infrastructure and Support Analyst' },
    company: 'DAX Oil Refino S.A.',
    period: { pt: 'ago/2024 – atual', en: 'Aug 2024 – Present' },
    location: 'Camaçari, BA',
    current: true,
    bullets: {
      pt: [
        'Gestão da infraestrutura de TI e suporte a mais de 100 colaboradores.',
        'Administração de Windows Server, Active Directory, GPOs, DNS, DHCP e VPN.',
        'Configuração e manutenção de Linux, Nginx, Cloudflare e análise de incidentes.',
        'Implantação de sistemas e automação de rotinas administrativas.',
      ],
      en: [
        'IT infrastructure management and support for over 100 employees.',
        'Administration of Windows Server, Active Directory, GPOs, DNS, DHCP, and VPN.',
        'Linux, Nginx, and Cloudflare configuration, maintenance, and incident analysis.',
        'System deployment and automation of administrative routines.',
      ],
    },
  },
  {
    role: { pt: 'Assistente de TI', en: 'IT Assistant' },
    company: 'DAX Oil Refino S.A.',
    period: { pt: 'dez/2022 – ago/2024', en: 'Dec 2022 – Aug 2024' },
    location: 'Camaçari, BA',
    current: false,
    bullets: {
      pt: [
        'Administração de servidores e redes, aplicação de políticas de segurança e rotinas de backup.',
        'Implantação e integração de sistemas com documentação técnica dos processos.',
        'Suporte técnico N1/N2 remoto e presencial.',
      ],
      en: [
        'Server and network administration, security policy enforcement, and backup routines.',
        'System deployment and integration with technical process documentation.',
        'Remote and on-site N1/N2 technical support.',
      ],
    },
  },
  {
    role: { pt: 'Aprendiz de TI / Help Desk', en: 'IT Apprentice / Help Desk' },
    company: 'DAX Oil Refino S.A.',
    period: { pt: 'out/2021 – nov/2022', en: 'Oct 2021 – Nov 2022' },
    location: 'Camaçari, BA',
    current: false,
    bullets: {
      pt: [
        'Suporte aos usuários, instalação e manutenção de hardware e software.',
        'Monitoramento de redes e gestão de chamados.',
        'Configuração de contas e permissões para novos colaboradores.',
      ],
      en: [
        'User support, hardware and software installation and maintenance.',
        'Network monitoring and ticket management.',
        'Account and permission setup for new employees.',
      ],
    },
  },
]
```

- [ ] **Step 5: Criar `src/data/education.ts`**

```ts
import type { Education } from './types'

export const education: Education[] = [
  {
    degree: { pt: 'Bacharelado em Engenharia de Software', en: 'Bachelor\'s in Software Engineering' },
    institution: 'Universidade Católica do Salvador (UCSAL)',
    period: 'jan/2023 – dez/2026',
    status: 'ongoing',
    progress: 89,
  },
  {
    degree: { pt: 'Tecnólogo em Redes de Computadores', en: 'Associate\'s in Computer Networks' },
    institution: 'Faculdade Pitágoras',
    period: 'jan/2022 – jun/2024',
    status: 'completed',
  },
]
```

- [ ] **Step 6: Criar `src/data/certifications.ts`**

```ts
import type { Certification } from './types'

export const certifications: Certification[] = [
  {
    name: 'Java Developer',
    issuer: 'Java10x',
    date: { pt: 'nov/2024', en: 'Nov 2024' },
    credentialUrl: 'https://java10x.dev',
  },
]
```

- [ ] **Step 7: Criar `messages/pt.json`**

```json
{
  "nav": {
    "about": "Sobre",
    "skills": "Skills",
    "experience": "Experiência",
    "projects": "Projetos",
    "education": "Formação",
    "blog": "Blog",
    "contact": "Contato",
    "downloadCV": "Baixar CV"
  },
  "hero": {
    "greeting": "Olá, eu sou",
    "roles": ["Desenvolvedor Backend", "Full Stack Dev", "Java & PHP Developer"],
    "viewProjects": "Ver Projetos",
    "downloadCV": "Baixar CV"
  },
  "about": {
    "title": "Sobre",
    "description": "Desenvolvedor Backend e Full Stack com mais de quatro anos de experiência em tecnologia. Responsável pelo desenvolvimento e evolução da Plataforma DaxCode, sistema em produção com ~60 usuários. Background em infraestrutura, Linux e servidores — entendo o software de ponta a ponta: do requisito ao deploy, do código ao servidor.",
    "stats": [
      { "value": "4+", "label": "Anos em TI" },
      { "value": "4", "label": "Sistemas em produção" },
      { "value": "~60", "label": "Usuários ativos" },
      { "value": "8º", "label": "Semestre · UCSAL" }
    ]
  },
  "skills": { "title": "Skills" },
  "experience": { "title": "Experiência" },
  "projects": {
    "title": "Projetos",
    "viewGithub": "GitHub",
    "viewDemo": "Demo",
    "close": "Fechar"
  },
  "education": { "title": "Formação", "ongoing": "Em andamento", "completed": "Concluído" },
  "certifications": { "title": "Certificações", "viewCredential": "Ver credencial" },
  "blog": { "title": "Blog", "readMore": "Ler mais", "viewAll": "Ver todos os posts" },
  "contact": {
    "title": "Contato",
    "name": "Nome",
    "email": "E-mail",
    "message": "Mensagem",
    "send": "Enviar mensagem",
    "sending": "Enviando...",
    "success": "Mensagem enviada! Entrarei em contato em breve.",
    "error": "Erro ao enviar. Tente novamente ou entre em contato pelo LinkedIn."
  }
}
```

- [ ] **Step 8: Criar `messages/en.json`**

```json
{
  "nav": {
    "about": "About",
    "skills": "Skills",
    "experience": "Experience",
    "projects": "Projects",
    "education": "Education",
    "blog": "Blog",
    "contact": "Contact",
    "downloadCV": "Download CV"
  },
  "hero": {
    "greeting": "Hi, I'm",
    "roles": ["Backend Developer", "Full Stack Dev", "Java & PHP Developer"],
    "viewProjects": "View Projects",
    "downloadCV": "Download CV"
  },
  "about": {
    "title": "About",
    "description": "Backend and Full Stack Developer with over four years of experience in technology. Responsible for the development and evolution of the DaxCode Platform, a production system with ~60 users. Background in infrastructure, Linux, and servers — I understand software end-to-end: from requirements to deployment, from code to server.",
    "stats": [
      { "value": "4+", "label": "Years in IT" },
      { "value": "4", "label": "Systems in production" },
      { "value": "~60", "label": "Active users" },
      { "value": "8th", "label": "Semester · UCSAL" }
    ]
  },
  "skills": { "title": "Skills" },
  "experience": { "title": "Experience" },
  "projects": {
    "title": "Projects",
    "viewGithub": "GitHub",
    "viewDemo": "Demo",
    "close": "Close"
  },
  "education": { "title": "Education", "ongoing": "In progress", "completed": "Completed" },
  "certifications": { "title": "Certifications", "viewCredential": "View credential" },
  "blog": { "title": "Blog", "readMore": "Read more", "viewAll": "View all posts" },
  "contact": {
    "title": "Contact",
    "name": "Name",
    "email": "Email",
    "message": "Message",
    "send": "Send message",
    "sending": "Sending...",
    "success": "Message sent! I'll get back to you soon.",
    "error": "Failed to send. Try again or reach out via LinkedIn."
  }
}
```

- [ ] **Step 9: Configurar next-intl — criar `src/i18n.ts`**

```ts
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
}))
```

- [ ] **Step 10: Criar `src/middleware.ts`**

```ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
```

- [ ] **Step 11: Atualizar `next.config.ts`**

```ts
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default withNextIntl(nextConfig)
```

- [ ] **Step 12: Verificar compilação**

```bash
npm run build
```

Esperado: build sem erros de tipo.

- [ ] **Step 13: Commit**

```bash
git add .
git commit -m "feat: data layer, types, and i18n (pt/en)"
```

---

### Task 3: Layout, NavBar e estrutura de rotas

**Files:**
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx` (shell vazia)
- Create: `src/components/NavBar.tsx`
- Delete: `src/app/page.tsx` (substituído pela rota localizada)

- [ ] **Step 1: Criar `src/app/[locale]/layout.tsx`**

```tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import type { Metadata } from 'next'
import '../globals.css'
import NavBar from '@/components/NavBar'

export const metadata: Metadata = {
  title: 'Vinicius Lago Cruz — Backend / Full Stack Developer',
  description: 'Portfólio de Vinicius Lago Cruz, Desenvolvedor Backend e Full Stack com 4+ anos de experiência em Java, Spring Boot, PHP, Laravel e Next.js.',
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <NavBar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Criar `src/app/[locale]/page.tsx`**

```tsx
export default function Home() {
  return (
    <main>
      <div id="hero" />
      <div id="sobre" />
      <div id="skills" />
      <div id="experiencia" />
      <div id="projetos" />
      <div id="formacao" />
      <div id="certificacoes" />
      <div id="contato" />
    </main>
  )
}
```

- [ ] **Step 3: Criar `src/components/NavBar.tsx`**

```tsx
'use client'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function NavBar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleLocale = () => {
    const next = locale === 'pt' ? 'en' : 'pt'
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/') || '/')
  }

  const links = [
    { href: '#sobre', label: t('about') },
    { href: '#skills', label: t('skills') },
    { href: '#experiencia', label: t('experience') },
    { href: '#projetos', label: t('projects') },
    { href: '#formacao', label: t('education') },
    { href: '#contato', label: t('contact') },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-bg/90 backdrop-blur border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-mono text-neon-green font-bold text-lg text-glow-green">
          VL<span className="text-neon-blue">.</span>
        </span>
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted hover:text-neon-green transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLocale}
            className="font-mono text-xs border border-border px-2 py-1 rounded hover:border-neon-green hover:text-neon-green transition-all"
          >
            {locale === 'pt' ? 'EN' : 'PT'}
          </button>
          <a
            href="/cv-vinicius-lago.pdf"
            download
            className="text-xs bg-neon-green text-bg font-semibold px-3 py-1.5 rounded hover:glow-green transition-all"
          >
            {t('downloadCV')}
          </a>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 4: Verificar**

```bash
npm run dev
```

Esperado: NavBar visível em `http://localhost:3000`, toggle PT/EN funcional, link de CV presente.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: layout, NavBar com toggle PT/EN e download CV"
```

---

### Task 4: Seção Hero

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/Terminal.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Criar `src/components/Terminal.tsx`**

```tsx
'use client'
import { useEffect, useState } from 'react'

const lines = [
  { cmd: '$ whoami', out: 'vinicius-lago-cruz' },
  { cmd: '$ cat role.txt', out: 'Backend / Full Stack Developer' },
  { cmd: '$ cat stack.json', out: '{ "backend": ["Java", "Spring", "PHP", "Laravel"],\n  "frontend": ["Next.js", "TypeScript", "React"],\n  "infra": ["Linux", "Docker", "Nginx"] }' },
  { cmd: '$ git log --oneline -3', out: '✓ 4 systems in production\n✓ ~60 active users/day\n✓ 4+ years in tech' },
]

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [typedCmd, setTypedCmd] = useState('')
  const [showOutput, setShowOutput] = useState(false)

  useEffect(() => {
    if (visibleLines >= lines.length) return
    const line = lines[visibleLines]
    let i = 0
    setTypedCmd('')
    setShowOutput(false)

    const typeInterval = setInterval(() => {
      i++
      setTypedCmd(line.cmd.slice(0, i))
      if (i >= line.cmd.length) {
        clearInterval(typeInterval)
        setTimeout(() => {
          setShowOutput(true)
          setTimeout(() => setVisibleLines(v => v + 1), 600)
        }, 300)
      }
    }, 45)

    return () => clearInterval(typeInterval)
  }, [visibleLines])

  const done = lines.slice(0, visibleLines)

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden font-mono text-sm">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-bg">
        <span className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
        <span className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
        <span className="ml-2 text-muted text-xs">vinicius@portfolio:~</span>
      </div>
      <div className="p-4 space-y-2 min-h-[260px]">
        {done.map((l, i) => (
          <div key={i}>
            <div className="text-neon-green">{l.cmd}</div>
            <div className="text-text/70 whitespace-pre">{l.out}</div>
          </div>
        ))}
        {visibleLines < lines.length && (
          <div>
            <span className="text-neon-green">{typedCmd}</span>
            <span className="animate-pulse text-neon-green">▋</span>
            {showOutput && (
              <div className="text-text/70 whitespace-pre mt-0.5">
                {lines[visibleLines].out}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Criar `src/components/sections/Hero.tsx`**

```tsx
'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Terminal from '@/components/Terminal'

const ROLES_PT = ['Desenvolvedor Backend', 'Full Stack Dev', 'Java & PHP Developer']
const ROLES_EN = ['Backend Developer', 'Full Stack Dev', 'Java & PHP Developer']

export default function Hero() {
  const t = useTranslations('hero')
  const locale = typeof window !== 'undefined'
    ? document.documentElement.lang
    : 'pt'
  const roles = locale === 'en' ? ROLES_EN : ROLES_PT
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIdx]
    let timeout: NodeJS.Timeout

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx((roleIdx + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIdx, roles])

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-neon-blue text-sm mb-2">{t('greeting')}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-3">
            Vinicius Lago Cruz
          </h1>
          <div className="h-10 flex items-center">
            <span className="text-xl md:text-2xl text-neon-green font-mono text-glow-green">
              {displayed}
              <span className="animate-pulse">|</span>
            </span>
          </div>
          <div className="flex gap-3 mt-8 flex-wrap">
            <a
              href="#projetos"
              className="px-5 py-2.5 bg-neon-green text-bg font-semibold rounded hover:glow-green transition-all text-sm"
            >
              {t('viewProjects')}
            </a>
            <a
              href="/cv-vinicius-lago.pdf"
              download
              className="px-5 py-2.5 border border-neon-blue text-neon-blue rounded hover:glow-blue transition-all text-sm"
            >
              {t('downloadCV')}
            </a>
          </div>
          <div className="flex gap-4 mt-6">
            <a href="https://github.com/ViniciusLgo" target="_blank" rel="noopener noreferrer"
              className="text-muted hover:text-neon-green transition-colors text-sm font-mono">
              github ↗
            </a>
            <a href="https://linkedin.com/in/viniciuslagocruz" target="_blank" rel="noopener noreferrer"
              className="text-muted hover:text-neon-blue transition-colors text-sm font-mono">
              linkedin ↗
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Atualizar `src/app/[locale]/page.tsx` para incluir Hero**

```tsx
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <main>
      <Hero />
      <div id="sobre" className="h-1" />
      <div id="skills" className="h-1" />
      <div id="experiencia" className="h-1" />
      <div id="projetos" className="h-1" />
      <div id="formacao" className="h-1" />
      <div id="certificacoes" className="h-1" />
      <div id="contato" className="h-1" />
    </main>
  )
}
```

- [ ] **Step 4: Verificar**

```bash
npm run dev
```

Esperado: Hero visível com texto typewriter na esquerda e terminal animado na direita. Sem erros no console.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: Hero section com typewriter e terminal animado"
```

---

### Task 5: Componente SectionTitle + Seção Sobre

**Files:**
- Create: `src/components/SectionTitle.tsx`
- Create: `src/components/sections/About.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Criar `src/components/SectionTitle.tsx`**

```tsx
interface Props { title: string; accent?: 'green' | 'blue' }

export default function SectionTitle({ title, accent = 'green' }: Props) {
  const color = accent === 'green' ? 'bg-neon-green' : 'bg-neon-blue'
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-text">{title}</h2>
      <div className={`h-0.5 w-16 mt-2 ${color}`} />
    </div>
  )
}
```

- [ ] **Step 2: Criar `src/components/sections/About.tsx`**

```tsx
'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'

export default function About() {
  const t = useTranslations('about')
  const stats = t.raw('stats') as { value: string; label: string }[]

  return (
    <section id="sobre" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-text/80 leading-relaxed text-lg"
          >
            {t('description')}
          </motion.p>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-surface border border-border rounded-lg p-5 text-center hover:border-neon-green transition-colors"
              >
                <div className="text-3xl font-bold font-mono text-neon-green text-glow-green">
                  {s.value}
                </div>
                <div className="text-sm text-muted mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Adicionar About em `src/app/[locale]/page.tsx`**

```tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <div id="skills" className="h-1" />
      <div id="experiencia" className="h-1" />
      <div id="projetos" className="h-1" />
      <div id="formacao" className="h-1" />
      <div id="certificacoes" className="h-1" />
      <div id="contato" className="h-1" />
    </main>
  )
}
```

- [ ] **Step 4: Verificar**

```bash
npm run dev
```

Esperado: seção "Sobre" visível com parágrafo e 4 cards de impacto animados ao rolar.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: SectionTitle e seção Sobre com cards de impacto"
```

---

### Task 6: Seção Skills

**Files:**
- Create: `src/components/SkillBadge.tsx`
- Create: `src/components/sections/Skills.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Criar `src/components/SkillBadge.tsx`**

```tsx
interface Props { name: string }

export default function SkillBadge({ name }: Props) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded border border-border bg-surface text-sm text-text/80 font-mono hover:border-neon-green hover:text-neon-green transition-all duration-200 cursor-default">
      {name}
    </span>
  )
}
```

- [ ] **Step 2: Criar `src/components/sections/Skills.tsx`**

```tsx
'use client'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import SkillBadge from '@/components/SkillBadge'
import { skillCategories } from '@/data/skills'

export default function Skills() {
  const t = useTranslations('skills')
  const locale = useLocale() as 'pt' | 'en'

  return (
    <section id="skills" className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} accent="blue" />
        <div className="space-y-10">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <h3 className="text-sm font-mono text-neon-blue mb-4 uppercase tracking-widest">
                {cat.name[locale]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s, j) => (
                  <SkillBadge key={j} name={s.name} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Adicionar Skills em `src/app/[locale]/page.tsx`**

```tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <div id="experiencia" className="h-1" />
      <div id="projetos" className="h-1" />
      <div id="formacao" className="h-1" />
      <div id="certificacoes" className="h-1" />
      <div id="contato" className="h-1" />
    </main>
  )
}
```

- [ ] **Step 4: Verificar**

```bash
npm run dev
```

Esperado: seção Skills com badges agrupados por categoria, hover verde neon funcional.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: seção Skills com badges por categoria"
```

---

### Task 7: Seção Experiência

**Files:**
- Create: `src/components/TimelineItem.tsx`
- Create: `src/components/sections/Experience.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Criar `src/components/TimelineItem.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'
import type { Experience } from '@/data/types'

interface Props {
  item: Experience
  locale: 'pt' | 'en'
  index: number
}

export default function TimelineItem({ item, locale, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-neon-green bg-bg" />
      {index < 3 && (
        <div className="absolute left-[5px] top-4 bottom-0 w-px bg-border" />
      )}
      <div className={`mb-1 flex flex-wrap items-center gap-2`}>
        <h3 className={`font-semibold text-lg ${item.current ? 'text-neon-green' : 'text-text'}`}>
          {item.role[locale]}
        </h3>
        {item.current && (
          <span className="text-xs font-mono bg-neon-green/10 text-neon-green border border-neon-green/30 px-2 py-0.5 rounded">
            atual
          </span>
        )}
      </div>
      <p className="text-neon-blue font-mono text-sm">{item.company} · {item.location}</p>
      <p className="text-muted text-sm mb-3">{item.period[locale]}</p>
      <ul className="space-y-1.5">
        {item.bullets[locale].map((b, i) => (
          <li key={i} className="text-text/70 text-sm flex gap-2">
            <span className="text-neon-green mt-1 shrink-0">›</span>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
```

- [ ] **Step 2: Criar `src/components/sections/Experience.tsx`**

```tsx
'use client'
import { useTranslations, useLocale } from 'next-intl'
import SectionTitle from '@/components/SectionTitle'
import TimelineItem from '@/components/TimelineItem'
import { experiences } from '@/data/experience'

export default function Experience() {
  const t = useTranslations('experience')
  const locale = useLocale() as 'pt' | 'en'

  return (
    <section id="experiencia" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} />
        <div className="max-w-3xl">
          {experiences.map((exp, i) => (
            <TimelineItem key={i} item={exp} locale={locale} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Adicionar Experience em `src/app/[locale]/page.tsx`**

```tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <div id="projetos" className="h-1" />
      <div id="formacao" className="h-1" />
      <div id="certificacoes" className="h-1" />
      <div id="contato" className="h-1" />
    </main>
  )
}
```

- [ ] **Step 4: Verificar**

```bash
npm run dev
```

Esperado: linha do tempo vertical com 4 experiências, cargo atual destacado em verde.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: seção Experiência com linha do tempo"
```

---

### Task 8: Seção Projetos com Modal

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/ProjectModal.tsx`
- Create: `src/components/sections/Projects.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Criar `src/components/ProjectCard.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'
import type { Project } from '@/data/types'

interface Props {
  project: Project
  locale: 'pt' | 'en'
  onClick: () => void
  featured?: boolean
}

export default function ProjectCard({ project, locale, onClick, featured }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`bg-surface border border-border rounded-lg p-6 cursor-pointer hover:border-neon-green transition-all group ${
        featured ? 'md:col-span-1' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-text group-hover:text-neon-green transition-colors">
          {project.title}
        </h3>
        <span className="text-xs font-mono text-neon-blue border border-neon-blue/30 px-2 py-0.5 rounded shrink-0 ml-2">
          {project.statusLabel[locale]}
        </span>
      </div>
      <p className="text-text/60 text-sm mb-4 leading-relaxed">
        {project.shortDesc[locale]}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((s, i) => (
          <span key={i} className="text-xs font-mono bg-bg border border-border px-2 py-0.5 rounded text-muted">
            {s}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="text-xs font-mono text-muted">+{project.stack.length - 4}</span>
        )}
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Criar `src/components/ProjectModal.tsx`**

```tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import type { Project } from '@/data/types'

interface Props {
  project: Project | null
  locale: 'pt' | 'en'
  onClose: () => void
}

export default function ProjectModal({ project, locale, onClose }: Props) {
  const t = useTranslations('projects')

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-bg/80 backdrop-blur flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-surface border border-border rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text">{project.title}</h2>
                <span className="text-xs font-mono text-neon-blue mt-1 inline-block">
                  {project.statusLabel[locale]}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-muted hover:text-neon-green transition-colors text-xl ml-4"
              >
                ✕
              </button>
            </div>

            <p className="text-text/80 leading-relaxed mb-6">
              {project.fullDesc[locale]}
            </p>

            {project.impact && (
              <div className="bg-bg border border-neon-green/20 rounded-lg p-4 mb-6">
                <p className="text-neon-green text-sm font-mono">
                  ⚡ {project.impact[locale]}
                </p>
              </div>
            )}

            <div className="mb-6">
              <h4 className="text-xs font-mono text-muted uppercase tracking-widest mb-3">Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s, i) => (
                  <span key={i} className="text-sm font-mono bg-bg border border-border px-3 py-1 rounded text-text/70">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-neon-green text-neon-green text-sm rounded hover:glow-green transition-all"
                >
                  {t('viewGithub')} ↗
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neon-blue text-bg text-sm font-semibold rounded hover:glow-blue transition-all"
                >
                  {t('viewDemo')} ↗
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 3: Criar `src/components/sections/Projects.tsx`**

```tsx
'use client'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import SectionTitle from '@/components/SectionTitle'
import ProjectCard from '@/components/ProjectCard'
import ProjectModal from '@/components/ProjectModal'
import { projects } from '@/data/projects'
import type { Project } from '@/data/types'

export default function Projects() {
  const t = useTranslations('projects')
  const locale = useLocale() as 'pt' | 'en'
  const [selected, setSelected] = useState<Project | null>(null)

  const featured = projects.filter(p => p.featured)
  const others = projects.filter(p => !p.featured)

  return (
    <section id="projetos" className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} accent="blue" />
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map(p => (
            <ProjectCard key={p.id} project={p} locale={locale} onClick={() => setSelected(p)} featured />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {others.map(p => (
            <ProjectCard key={p.id} project={p} locale={locale} onClick={() => setSelected(p)} />
          ))}
        </div>
      </div>
      <ProjectModal project={selected} locale={locale} onClose={() => setSelected(null)} />
    </section>
  )
}
```

- [ ] **Step 4: Adicionar Projects em `src/app/[locale]/page.tsx`**

```tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <div id="formacao" className="h-1" />
      <div id="certificacoes" className="h-1" />
      <div id="contato" className="h-1" />
    </main>
  )
}
```

- [ ] **Step 5: Verificar**

```bash
npm run dev
```

Esperado: 4 cards de projetos, clicar em qualquer um abre modal com detalhes. ESC fecha o modal.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: seção Projetos com cards e modal de detalhes"
```

---

### Task 9: Seções Formação e Certificações

**Files:**
- Create: `src/components/sections/Education.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Criar `src/components/sections/Education.tsx`**

```tsx
'use client'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { education } from '@/data/education'
import { certifications } from '@/data/certifications'

export default function Education() {
  const t = useTranslations('education')
  const tc = useTranslations('certifications')
  const locale = useLocale() as 'pt' | 'en'

  return (
    <section id="formacao" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} />
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {education.map((ed, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-surface border border-border rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-text">{ed.degree[locale]}</h3>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                  ed.status === 'ongoing'
                    ? 'text-neon-green border-neon-green/30 bg-neon-green/10'
                    : 'text-muted border-border'
                }`}>
                  {ed.status === 'ongoing' ? t('ongoing') : t('completed')}
                </span>
              </div>
              <p className="text-neon-blue font-mono text-sm">{ed.institution}</p>
              <p className="text-muted text-sm mb-4">{ed.period}</p>
              {ed.progress && (
                <div>
                  <div className="flex justify-between text-xs text-muted mb-1">
                    <span>Progresso</span>
                    <span>{ed.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${ed.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-neon-green rounded-full"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div id="certificacoes">
          <SectionTitle title={tc('title')} accent="blue" />
          <div className="space-y-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-surface border border-border rounded-lg p-5 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-text">{cert.name}</h3>
                  <p className="text-neon-blue font-mono text-sm">{cert.issuer} · {cert.date[locale]}</p>
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-neon-green border border-neon-green/30 px-3 py-1.5 rounded hover:glow-green transition-all shrink-0 ml-4"
                  >
                    {tc('viewCredential')} ↗
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Adicionar Education em `src/app/[locale]/page.tsx`**

```tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Education from '@/components/sections/Education'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <div id="contato" className="h-1" />
    </main>
  )
}
```

- [ ] **Step 3: Verificar**

```bash
npm run dev
```

Esperado: 2 cards de formação, barra de progresso animada no UCSAL, lista de certificações abaixo.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: seções Formação e Certificações"
```

---

### Task 10: Blog — rota /blog e posts em Markdown

**Files:**
- Create: `src/data/posts.ts`
- Create: `content/blog/da-infra-ao-dev.md`
- Create: `src/lib/blog.ts`
- Create: `src/app/[locale]/blog/page.tsx`
- Create: `src/app/[locale]/blog/[slug]/page.tsx`
- Create: `src/components/BlogCard.tsx`
- Create: `src/components/sections/BlogPreview.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Criar `src/lib/blog.ts`**

```ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDir = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

export interface Post extends PostMeta {
  contentHtml: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  return files
    .map(file => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const { data } = matter(raw)
      return { slug, title: data.title, date: data.date, excerpt: data.excerpt, tags: data.tags || [] }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)
  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    tags: data.tags || [],
    contentHtml: processed.toString(),
  }
}
```

- [ ] **Step 2: Criar post exemplo em `content/blog/da-infra-ao-dev.md`**

```md
---
title: "Da infraestrutura ao desenvolvimento: como a infra me tornou um dev melhor"
date: "2026-07-10"
excerpt: "Comecei na área de TI pelo suporte e infraestrutura. Hoje vejo como essa trajetória foi fundamental para entender software de ponta a ponta."
tags: ["carreira", "backend", "infraestrutura"]
---

Durante muito tempo, trabalhei nos bastidores.

Comecei minha carreira na infraestrutura de TI — suporte, redes, servidores, ambientes corporativos. Foi ali que aprendi a entender tecnologia de ponta a ponta, antes mesmo de escrever a primeira linha de código de produção.

## O que a infra ensina que o código não ensina

Quando você trabalha com infraestrutura, aprende que um sistema não termina no `git push`. Ele precisa rodar em algum lugar, ser monitorado, sobreviver a reinicializações, lidar com permissões, logs, e falhas de rede.

Essa visão mudou como eu escrevo código. Penso no ambiente de execução desde o início.

## Debug como investigação

Saber analisar logs antes de sair alterando código é uma habilidade que trouxe da infra. Debug não é chute — é investigação. Verificar serviços, analisar traces, testar uma variável por vez.

## Conclusão

Se você está começando em TI e está na infra hoje, não veja isso como um desvio. É uma base sólida para se tornar um desenvolvedor que entende onde o software realmente vive.
```

- [ ] **Step 3: Criar `src/components/BlogCard.tsx`**

```tsx
import Link from 'next/link'
import type { PostMeta } from '@/lib/blog'

interface Props {
  post: PostMeta
  locale: string
  readMoreLabel: string
}

export default function BlogCard({ post, locale, readMoreLabel }: Props) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:border-neon-green transition-all group">
      <p className="text-xs font-mono text-muted mb-2">{post.date}</p>
      <h3 className="font-semibold text-text group-hover:text-neon-green transition-colors mb-2">
        {post.title}
      </h3>
      <p className="text-text/60 text-sm leading-relaxed mb-4">{post.excerpt}</p>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {post.tags.map((tag, i) => (
            <span key={i} className="text-xs font-mono text-neon-blue">#{tag}</span>
          ))}
        </div>
        <Link
          href={`/${locale}/blog/${post.slug}`}
          className="text-xs font-mono text-neon-green hover:underline"
        >
          {readMoreLabel} →
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Criar `src/components/sections/BlogPreview.tsx`**

```tsx
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import SectionTitle from '@/components/SectionTitle'
import BlogCard from '@/components/BlogCard'
import { getAllPosts } from '@/lib/blog'

export default function BlogPreview() {
  const t = useTranslations('blog')
  const locale = useLocale()
  const posts = getAllPosts().slice(0, 3)

  if (posts.length === 0) return null

  return (
    <section id="blog" className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} accent="blue" />
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} locale={locale} readMoreLabel={t('readMore')} />
          ))}
        </div>
        <Link
          href={`/${locale}/blog`}
          className="inline-block text-sm font-mono text-neon-green border border-neon-green/30 px-4 py-2 rounded hover:glow-green transition-all"
        >
          {t('viewAll')} →
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Criar `src/app/[locale]/blog/page.tsx`**

```tsx
import { useTranslations, useLocale } from 'next-intl'
import { getAllPosts } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'

export default function BlogPage() {
  const t = useTranslations('blog')
  const locale = useLocale()
  const posts = getAllPosts()

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-text mb-2">{t('title')}</h1>
        <div className="h-0.5 w-16 bg-neon-green mb-12" />
        <div className="space-y-6">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} locale={locale} readMoreLabel={t('readMore')} />
          ))}
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 6: Criar `src/app/[locale]/blog/[slug]/page.tsx`**

```tsx
import { getPost, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export default async function PostPage({ params }: { params: { slug: string; locale: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <Link href={`/${params.locale}/blog`} className="text-sm font-mono text-neon-green hover:underline mb-8 inline-block">
          ← voltar
        </Link>
        <p className="text-xs font-mono text-muted mb-2">{post.date}</p>
        <h1 className="text-3xl font-bold text-text mb-4">{post.title}</h1>
        <div className="flex gap-2 mb-8">
          {post.tags.map((tag, i) => (
            <span key={i} className="text-xs font-mono text-neon-blue">#{tag}</span>
          ))}
        </div>
        <div
          className="prose prose-invert prose-p:text-text/80 prose-headings:text-text prose-a:text-neon-green max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </main>
  )
}
```

- [ ] **Step 7: Adicionar BlogPreview em `src/app/[locale]/page.tsx`**

```tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Education from '@/components/sections/Education'
import BlogPreview from '@/components/sections/BlogPreview'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <BlogPreview />
      <div id="contato" className="h-1" />
    </main>
  )
}
```

- [ ] **Step 8: Instalar @tailwindcss/typography para prose**

```bash
npm install @tailwindcss/typography
```

Adicionar em `tailwind.config.ts`:
```ts
plugins: [require('@tailwindcss/typography')],
```

- [ ] **Step 9: Verificar**

```bash
npm run dev
```

Esperado: preview do blog na home com 1 post. `/pt/blog` lista posts. `/pt/blog/da-infra-ao-dev` renderiza o post em Markdown.

- [ ] **Step 10: Commit**

```bash
git add .
git commit -m "feat: blog com rota separada, Markdown e preview na home"
```

---

### Task 11: Seção Contato

**Files:**
- Create: `src/components/ContactForm.tsx`
- Create: `src/components/sections/Contact.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Criar `src/components/ContactForm.tsx`**

```tsx
'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import emailjs from 'emailjs-com'

export default function ContactForm() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { from_name: form.name, from_email: form.email, message: form.message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full bg-bg border border-border rounded-lg px-4 py-3 text-text text-sm focus:outline-none focus:border-neon-green transition-colors'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        required
        type="text"
        placeholder={t('name')}
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        className={inputClass}
      />
      <input
        required
        type="email"
        placeholder={t('email')}
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        className={inputClass}
      />
      <textarea
        required
        rows={5}
        placeholder={t('message')}
        value={form.message}
        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
        className={inputClass + ' resize-none'}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 bg-neon-green text-bg font-semibold rounded-lg hover:glow-green transition-all disabled:opacity-50"
      >
        {status === 'loading' ? t('sending') : t('send')}
      </button>
      {status === 'success' && (
        <p className="text-neon-green text-sm text-center">{t('success')}</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-sm text-center">{t('error')}</p>
      )}
    </form>
  )
}
```

- [ ] **Step 2: Criar `src/components/sections/Contact.tsx`**

```tsx
'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import ContactForm from '@/components/ContactForm'

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/viniciuslagocruz', color: 'neon-blue' },
  { label: 'GitHub', href: 'https://github.com/ViniciusLgo', color: 'neon-green' },
  { label: 'Email', href: 'mailto:vinicruzlago@gmail.com', color: 'neon-green' },
  { label: 'WhatsApp', href: 'https://wa.me/5571999760418', color: 'neon-blue' },
]

export default function Contact() {
  const t = useTranslations('contact')

  return (
    <section id="contato" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-4 bg-surface border border-border rounded-lg hover:border-${s.color} transition-all group`}
              >
                <span className={`font-mono text-sm text-${s.color} group-hover:text-glow-green`}>
                  {s.label}
                </span>
                <span className="text-muted text-sm ml-auto">↗</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Adicionar Contact em `src/app/[locale]/page.tsx`**

```tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Education from '@/components/sections/Education'
import BlogPreview from '@/components/sections/BlogPreview'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <BlogPreview />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 4: Verificar**

```bash
npm run dev
```

Esperado: seção Contato com formulário à esquerda e links sociais à direita. Formulário requer configurar EmailJS (credenciais no `.env.local`) para enviar de fato.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: seção Contato com formulário EmailJS e links sociais"
```

---

### Task 12: Footer, meta tags e deploy na Vercel

**Files:**
- Create: `src/components/Footer.tsx`
- Create: `public/cv-vinicius-lago.pdf` (placeholder — substituir pelo PDF real)
- Modify: `src/app/[locale]/layout.tsx` (meta tags OG)
- Modify: `src/app/[locale]/layout.tsx` (adicionar Footer)

- [ ] **Step 1: Criar `src/components/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-neon-green font-bold">VL.</span>
        <p className="text-muted text-sm font-mono">
          © {new Date().getFullYear()} Vinicius Lago Cruz
        </p>
        <div className="flex gap-4">
          <a href="https://github.com/ViniciusLgo" target="_blank" rel="noopener noreferrer"
            className="text-muted hover:text-neon-green transition-colors text-sm font-mono">
            github
          </a>
          <a href="https://linkedin.com/in/viniciuslagocruz" target="_blank" rel="noopener noreferrer"
            className="text-muted hover:text-neon-blue transition-colors text-sm font-mono">
            linkedin
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Atualizar `src/app/[locale]/layout.tsx` com meta tags e Footer**

```tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import type { Metadata } from 'next'
import '../globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Vinicius Lago Cruz — Backend / Full Stack Developer',
  description: 'Portfólio de Vinicius Lago Cruz, Desenvolvedor Backend e Full Stack com 4+ anos de experiência em Java, Spring Boot, PHP, Laravel e Next.js.',
  openGraph: {
    title: 'Vinicius Lago Cruz — Backend / Full Stack Developer',
    description: 'Java, Spring Boot, PHP, Laravel, Next.js · 4+ anos em TI · 4 sistemas em produção',
    url: 'https://viniciuslago.vercel.app',
    siteName: 'Vinicius Lago Cruz',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <NavBar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Adicionar o PDF do CV**

Copie seu arquivo de currículo em PDF para:
```
public/cv-vinicius-lago.pdf
```

Se não tiver o PDF pronto ainda, crie um arquivo vazio temporário e substitua depois:
```bash
echo "" > public/cv-vinicius-lago.pdf
```

- [ ] **Step 4: Build final**

```bash
npm run build
```

Esperado: build sem erros. Qualquer erro de tipo deve ser corrigido antes do deploy.

- [ ] **Step 5: Deploy na Vercel**

```bash
npx vercel --prod
```

Ou acesse vercel.com, importe o repositório do GitHub e configure as variáveis de ambiente:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

- [ ] **Step 6: Commit final**

```bash
git add .
git commit -m "feat: footer, meta tags OG e portfólio completo"
```

---

## Self-Review

**Cobertura da spec:**
- ✅ Next.js 14 + TypeScript + Tailwind — Task 1
- ✅ next-intl PT/EN com toggle — Tasks 2, 3
- ✅ Hero com typewriter + terminal animado — Task 4
- ✅ Sobre com cards de impacto — Task 5
- ✅ Skills por categoria sem barras de progresso — Task 6
- ✅ Experiência com linha do tempo — Task 7
- ✅ Projetos com cards e modal — Task 8
- ✅ Formação com barra de progresso — Task 9
- ✅ Certificações — Task 9
- ✅ Blog /blog + /blog/[slug] + preview na home — Task 10
- ✅ Contato com formulário EmailJS + links sociais — Task 11
- ✅ Footer, meta tags OG, deploy Vercel — Task 12
- ✅ PDF CV em /public — Task 12

**Tipos consistentes:** `Project`, `Experience`, `Education`, `Certification`, `SkillCategory` definidos em `src/data/types.ts` e usados consistentemente em todos os componentes.

**Sem placeholders:** todos os steps têm código completo.
