# Portfólio Vinicius Lago Cruz — Design Spec

**Data:** 2026-07-23  
**Autor:** Vinicius Lago Cruz  
**Objetivo:** Portfólio web profissional para candidaturas a vagas de Desenvolvedor Backend / Full Stack.

---

## Stack e Arquitetura

- **Framework:** Next.js 14 + TypeScript
- **Estilização:** Tailwind CSS
- **Animações:** Framer Motion
- **i18n:** next-intl (toggle PT/EN no header)
- **Formulário de contato:** EmailJS (gratuito, sem backend)
- **Deploy:** Vercel (link permanente ex: `viniciuslago.vercel.app`)
- **CV:** PDF estático servido em `/public/cv-vinicius-lago.pdf`

### Estrutura de rotas

```
/ (SPA com âncoras)
  #hero
  #sobre
  #skills
  #experiencia
  #projetos
  #formacao
  #certificacoes
  #contato

/blog (rota separada)
/blog/[slug]
```

---

## Visual e Estética

- **Background:** `#0a0a0f` (dark profundo)
- **Neon primário:** `#00ff88` (verde neon)
- **Neon secundário:** `#00d4ff` (azul neon)
- **Tipografia hero:** monospace (ex: JetBrains Mono ou Fira Code)
- **Tipografia corpo:** Inter ou similar
- **Efeitos:** scanlines sutil, bordas com glow, cursor piscando no terminal
- **Animações:** suaves via Framer Motion — sem exageros

---

## Seções

### Hero

Split layout em duas colunas:

**Coluna esquerda — texto:**
- Saudação + nome com efeito typewriter
- Cargo rotativo: "Desenvolvedor Backend", "Full Stack Dev", "Java & PHP Developer"
- Botões: `[Ver Projetos]` (âncora) + `[Baixar CV]` (download do PDF) + toggle `[PT | EN]`

**Coluna direita — terminal animado:**
- Simula sequência de comandos sendo digitados: `whoami`, `cat skills.json`, `git log --oneline`
- Output aparece progressivamente com cursor piscando
- Estética de terminal com header de janela (três bolinhas coloridas)

---

### Sobre

- Parágrafo curto: trajetória de infra → dev, "Do requisito ao deploy. Do código ao servidor."
- Foto (opcional — pode ser adicionada depois)
- 4 cards de impacto animados:
  - 4+ anos em TI
  - 4 sistemas em produção
  - ~60 usuários ativos
  - 8º semestre Eng. Software

---

### Skills

Grade de badges agrupados por categoria, cada badge com ícone SVG da tecnologia:

| Categoria | Tecnologias |
|---|---|
| Backend | Java 17/21, Spring Boot 3, PHP 8, Laravel 12 |
| Frontend | Next.js, TypeScript, React, Tailwind CSS |
| Banco de Dados | MySQL, PostgreSQL, Supabase, MariaDB |
| Infra / DevOps | Linux, Docker, Nginx, Cloudflare, GitHub Actions, CI/CD |

Sem barras de progresso — badges simples são mais honestos e profissionais.

---

### Experiência

Linha do tempo vertical, da mais recente para a mais antiga:

1. **Coordenador de TI e Dev Full Stack — DAXCode** *(jan/2026 – atual)*
2. **Analista de Infraestrutura e Suporte — DAX Oil** *(ago/2024 – atual)*
3. **Assistente de TI — DAX Oil** *(dez/2022 – ago/2024)*
4. **Aprendiz de TI / Help Desk — DAX Oil** *(out/2021 – nov/2022)*

Cada entrada: cargo, empresa, período, localização e bullets de responsabilidades. Destaque visual (cor neon) no cargo atual.

---

### Projetos

Grid de 4 cards. DaxCode e MeuSemestreUCSAL em cards maiores (destaque).

**Cada card exibe:**
- Nome do projeto + status badge (Em produção / Open Source)
- Descrição curta (1–2 linhas)
- Badges de stack
- Links: GitHub e Demo (quando disponível)

**Ao clicar → modal com:**
- Descrição completa e contexto (número de usuários, impacto real)
- Stack detalhada
- Screenshots ou print (se disponível)
- Links GitHub e demo

**Projetos:**
| Projeto | Stack | Status |
|---|---|---|
| Plataforma DaxCode | PHP 8.4, Laravel 12, MySQL, Tailwind, Nginx | Em produção |
| MeuSemestreUCSAL | Next.js, TypeScript, Supabase, PostgreSQL | Em produção / Open Source |
| MovieFlix API | Java 17, Spring Boot 3, PostgreSQL, JWT | Open Source |
| DAX Control Center | PHP, Laravel, MySQL, Bootstrap | Em produção — uso interno |

---

### Formação

Dois cards:
- **UCSAL** — Bacharelado Engenharia de Software (jan/2023 – dez/2026) com barra de progresso (8/9 semestres ≈ 89%)
- **Faculdade Pitágoras** — Tecnólogo em Redes de Computadores (jan/2022 – jun/2024) — concluído

---

### Certificações

Lista com:
- Logo da instituição
- Nome da certificação
- Data de emissão
- Link da credencial

Inicial: Java Developer — Java10x (nov/2024)

---

### Blog

Rota `/blog` separada para melhor SEO e URLs compartilháveis.

**Na página principal** — seção com os 3 posts mais recentes em cards com título, data e link para `/blog/[slug]`.

**Estratégia de conteúdo inicial:** lista curada manual em um arquivo JSON (`/data/posts.ts`). Sem CMS externo por enquanto — você edita o JSON para adicionar posts. Posts podem ser adaptados dos artigos que você já publica no LinkedIn.

**Cada post:**
- Título
- Data
- Resumo (2–3 linhas)
- Tags
- Conteúdo em Markdown (arquivo `.md` em `/content/blog/`)

---

### Contato

**Formulário (EmailJS):**
- Campos: Nome, Email, Mensagem
- Botão de envio com estado de loading e feedback de sucesso/erro
- Sem backend — EmailJS envia direto para `vinicruzlago@gmail.com`

**Links sociais ao lado:**
- LinkedIn: linkedin.com/in/viniciuslagocruz
- GitHub: github.com/ViniciusLgo
- Email: vinicruzlago@gmail.com
- WhatsApp: (71) 99976-0418

Ícones com hover glow neon.

---

## Componentes Reutilizáveis

- `NavBar` — logo, âncoras de seção, toggle PT/EN, botão CV
- `SectionTitle` — título de seção com sublinhado neon
- `Terminal` — janela de terminal animada
- `ProjectCard` + `ProjectModal` — card e modal de projeto
- `SkillBadge` — badge de tecnologia com ícone
- `TimelineItem` — item da linha do tempo de experiência
- `BlogCard` — card de post do blog
- `ContactForm` — formulário com EmailJS

---

## Dados e Internacionalização

- Todo conteúdo textual em arquivos de tradução: `messages/pt.json` e `messages/en.json`
- Dados estruturados (projetos, skills, experiência) em `/src/data/` como arquivos TypeScript tipados
- Posts do blog em `/content/blog/` como arquivos Markdown

---

## Fora de Escopo (v1)

- CMS externo (Contentful, Sanity)
- Domínio customizado (pode ser configurado depois na Vercel)
- Dark/light mode toggle (só dark)
- Analytics (pode adicionar Vercel Analytics depois)
