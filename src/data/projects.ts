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
