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
