# Como criar um post no Blog

## Estrutura simples

Crie um arquivo `.md` em `content/blog/` com o nome no formato `meu-post.md`.

## Template

Copie e cole isso no início do arquivo (o frontmatter):

```
---
title: "Título do post aqui"
date: "2026-07-24"
excerpt: "Resumo curto que aparece nos cards — 1 ou 2 frases."
tags: ["tag1", "tag2", "carreira"]
---

Conteúdo do post aqui em Markdown.

## Subtítulo

Parágrafo normal...

- Item de lista
- Outro item

**Negrito**, *itálico*, `código inline`.
```

## Dicas

- O `slug` da URL é o nome do arquivo sem `.md`
  - `content/blog/meu-post.md` → `/pt/blog/meu-post`
- A data no formato `YYYY-MM-DD` define a ordem dos posts (mais recente aparece primeiro)
- Tags úteis: `carreira`, `backend`, `frontend`, `java`, `laravel`, `infraestrutura`, `aprendizado`
- Os 3 posts mais recentes aparecem automaticamente na home

## Posts existentes

| Arquivo | Título |
|---|---|
| `da-infra-ao-dev.md` | Da infraestrutura ao desenvolvimento |
| `como-a-infra-me-tornou-dev.md` | Como a INFRA me tornou um DEV++ |
| `debug-e-investigacao.md` | Debug não é chute. É investigação. |
| `ansiedade-de-aprender-tudo.md` | A ansiedade de querer aprender tudo |
