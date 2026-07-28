# Portfólio — Vinicius Lago Cruz

![Views](https://komarev.com/ghpvc/?username=ViniciusLgo&repo=vinicius-portfolio&label=Visualizações&color=00ff9d&style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

Portfólio pessoal desenvolvido com **Next.js 14**, com estética *dark tech* em neon verde/azul. Reúne apresentação, projetos, formação, certificações, blog técnico e contato.

🔗 **Deploy:** [_adicione aqui o link do Vercel quando publicar_](https://viniciusportifolio.vercel.app/pt)

## ✨ Funcionalidades

- 🌐 Internacionalização (PT/EN) com `next-intl`
- 📝 Blog técnico com posts em Markdown (`content/blog/`)
- 📬 Formulário de contato integrado com EmailJS
- 🎨 Animações com Framer Motion (aurora, partículas, cursor customizado, matrix rain, etc.)
- 🗺️ Sitemap automático (`next-sitemap`)
- 🖼️ Open Graph image dinâmica
- 🐍 Easter eggs (Snake game, command palette, secret word)

## 🛠️ Stack

- [Next.js 14](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [next-intl](https://next-intl-docs.vercel.app)

## 🚀 Como rodar localmente

```bash
# instalar dependências
npm install

# copiar variáveis de ambiente
cp .env.local.example .env.local

# rodar em modo desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura

```
src/
  app/[locale]/     # rotas (home, blog, etc.)
  components/       # componentes reutilizáveis
  lib/               # utilitários (leitura de posts, etc.)
content/blog/        # posts do blog em Markdown
messages/             # traduções (pt.json / en.json)
```

Veja [BLOG.md](./BLOG.md) para instruções de como criar um novo post.

## 📦 Build para produção

```bash
npm run build
npm run start
```

## 📄 Licença

Este projeto está sob a licença MIT.

---

Feito por [Vinicius Lago Cruz](https://github.com/ViniciusLgo)
