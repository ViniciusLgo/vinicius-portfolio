# Skills revamp + seções para recrutadores — Design

Data: 2026-07-25

## Contexto

A seção Skills tinha um bug de layout no CSS Grid (coluna `auto` com filho
`flex-wrap` sendo dimensionada como se o conteúdo não quebrasse linha), já
corrigido em `Skills.tsx`/`SkillRadar.tsx` numa sessão anterior. A partir daí,
o usuário pediu uma rodada de melhorias para tornar o portfólio mais
convincente para recrutadores técnicos.

Levantamento do estado atual mostrou que boa parte do que foi sugerido
(timeline de experiência, stat cards, CTA de currículo, destaque de blog) já
existe no projeto. O escopo real deste design cobre apenas o que falta.

## Decisões (via brainstorming com companheiro visual)

1. **Skills**: radar + barras de progresso finas no mesmo card (opção A),
   substituindo as pills de %. Sem stat cards aqui — evita duplicar com os
   já existentes em `About.tsx`.
2. **Prova social**: nova seção dedicada `SocialProof`, entre Projetos e
   Educação (opção A).
3. **Now**: faixa discreta no Hero, abaixo dos CTAs (opção A).
4. **Selo de performance**: pills estáticas no Footer, com números reais de
   Lighthouse medidos no build de produção local (não estimados).
5. **Case studies**: os 2 projetos featured (`daxcode`, `meusemestre`) ganham
   estrutura explícita Problema → Decisão → Resultado.

## Componentes

### 1. `SkillRadar.tsx` — barras de progresso

- Remove a lista de pills (`<div className="flex flex-wrap ...">` no final).
- Adiciona, abaixo do SVG, uma lista de barras finas (uma por eixo), cada uma
  com label, barra preenchida por `ax.value`% e o número à direita —
  reaproveitando o array `AXES` já existente (não duplica dados).
- Hover num eixo do radar destaca a barra correspondente (reaproveita o
  estado `hovered` já existente) e vice-versa (hover na barra destaca o
  ponto do radar).
- `Skills.tsx`: nenhuma mudança estrutural além da já aplicada (card com
  borda, coluna de largura fixa).

### 2. `SocialProof.tsx` (novo) — Open Source & Certificações

Nova seção, registrada em `page.tsx` entre `<Projects />` e `<Education />`.

- **Contribution graph real**: `<img src="https://ghchart.rshah.org/00ff88/ViniciusLgo.svg" />`
  dentro de um card com fundo escuro (o SVG do ghchart tem fundo
  transparente, cor da célula customizável via parâmetro de cor na URL).
  Sem chamada de API própria, sem token, sem dado inventado — a imagem é
  gerada e cacheada pelo serviço a partir do GitHub público.
- Link abaixo do gráfico: "ver perfil completo no GitHub ↗" apontando para
  `https://github.com/ViniciusLgo`.
- **Certificações**: lista renderizada a partir de
  `src/data/certifications.ts` (já existe, 1 item). Cada linha mostra nome,
  emissor, data e link de credencial (se houver `credentialUrl`).
- Sem stat boxes com números fabricados (ex: "6 repositórios") — apenas o
  gráfico real e a lista de certificações.
- i18n: título e labels via `messages/pt.json` / `en.json`, chave `socialProof`.

### 3. `Hero.tsx` — faixa "Now"

- Novo bloco abaixo do grupo de botões CTA (`viewProjects`/`downloadCV`),
  antes dos links github/linkedin:
  `<span class="pulse-dot" /> now: {t('now')}`
- Texto real (não placeholder): "aprofundando em Spring Boot e arquitetura
  de APIs" (PT) / "deepening Spring Boot and API architecture skills" (EN).
- Chave nova em `messages/{pt,en}.json` → `hero.now`.
- Estilo: ponto verde com animação de pulso (reaproveita padrão de "current"
  já usado em `TimelineItem`, se existir; senão, animação Tailwind simples
  `animate-pulse`).

### 4. `Footer.tsx` — selo de performance

- Pills adicionais na linha do footer (entre o copyright e os links sociais,
  ou numa segunda linha em telas pequenas): Performance, Acessibilidade,
  Boas Práticas, SEO.
- Números reais medidos via Lighthouse contra o build de produção local
  nesta sessão: **Performance 84 · Acessibilidade 96 · Boas Práticas 100 ·
  SEO 92**.
- Comentário inline no componente (`{/* Lighthouse medido em 2026-07-25 —
  reavaliar após mudanças relevantes de UI/imagens */}`) para deixar claro
  que os números não são ao vivo e precisam ser atualizados manualmente
  quando o site mudar de forma significativa.

### 5. `data/types.ts` + `data/projects.ts` + `ProjectModal.tsx` — case studies

- `Project` ganha campo opcional:
  ```ts
  caseStudy?: {
    problem: { pt: string; en: string }
    decision: { pt: string; en: string }
    result: { pt: string; en: string }
  }
  ```
- Preenchido apenas para `daxcode` e `meusemestre` (os dois `featured`).
  `fullDesc` continua existindo como resumo curto usado no `ProjectCard`;
  `caseStudy` é o conteúdo expandido do modal.
- `ProjectModal.tsx`: se `project.caseStudy` existir, renderiza 3
  subseções com headers (`Problema`, `Decisão técnica`, `Resultado` /
  `Problem`, `Technical decision`, `Result`, via `t()`) no lugar do
  parágrafo único de `fullDesc`. Caso contrário (demais projetos), mantém o
  comportamento atual (parágrafo de `fullDesc`). Isso evita quebrar os
  projetos não-featured.

## Dados / conteúdo a escrever

- Texto dos 3 blocos de case study para `daxcode` e `meusemestre` (PT/EN) —
  baseado no conteúdo já existente em `fullDesc`/`impact`, reestruturado.
- Chaves i18n novas: `hero.now`, `socialProof.title`, `socialProof.viewGithub`,
  `socialProof.certifications`, `projects.problem`, `projects.decision`,
  `projects.result`.

## Testes / verificação

- `tsc --noEmit` para validar tipos (campo novo opcional não quebra os
  projetos existentes).
- Rodar `npm run dev` e verificar visualmente: Skills (barras + hover
  cruzado), SocialProof (imagem do ghchart carrega, certificações
  aparecem), Hero (faixa now visível, sem quebrar layout dos CTAs),
  Footer (pills não quebram o layout em mobile), ProjectModal (case study
  aparece só nos 2 featured, outros seguem como antes).
- Conferir em PT e EN (troca de locale).

## Fora de escopo

- Atualizar Lighthouse automaticamente (CI) — números são estáticos por ora.
- Buscar contagem real de repositórios/contribuições via GitHub API — usamos
  apenas a imagem pública do ghchart.
- Adicionar mais certificações (dado real, não gerado).
