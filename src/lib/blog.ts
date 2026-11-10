import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'
import hljs from 'highlight.js'

const postsDir = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  readingTime: string
}

export interface Post extends PostMeta {
  contentHtml: string
}

function resolvePostFile(slug: string, locale: string): string | null {
  const localizedPath = path.join(postsDir, `${slug}.${locale}.md`)
  if (locale !== 'pt' && fs.existsSync(localizedPath)) return localizedPath
  const defaultPath = path.join(postsDir, `${slug}.md`)
  if (fs.existsSync(defaultPath)) return defaultPath
  return null
}

export function getAllPosts(locale = 'pt'): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []
  const slugs = fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md') && !f.includes('.en.'))
    .map(f => f.replace(/\.md$/, ''))

  return slugs
    .map(slug => {
      const filePath = resolvePostFile(slug, locale)!
      const raw = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(raw)
      const rt = readingTime(content)
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        tags: (data.tags as string[]) || [],
        readingTime: `${Math.ceil(rt.minutes)} min`,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllTags(locale = 'pt'): string[] {
  const posts = getAllPosts(locale)
  const set = new Set<string>()
  posts.forEach(p => p.tags.forEach(t => set.add(t)))
  return Array.from(set).sort()
}

export async function getPost(slug: string, locale = 'pt'): Promise<Post | null> {
  const filePath = resolvePostFile(slug, locale)
  if (!filePath) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  const processed = await remark().use(html, { sanitize: false }).process(content)
  let contentHtml = processed.toString()

  // Syntax highlight code blocks
  contentHtml = contentHtml.replace(
    /<pre><code(?: class="language-(\w+)")?>([\s\S]*?)<\/code><\/pre>/g,
    (_, lang, code) => {
      const decoded = code
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>').replace(/&quot;/g, '"')
      const highlighted = lang && hljs.getLanguage(lang)
        ? hljs.highlight(decoded, { language: lang }).value
        : hljs.highlightAuto(decoded).value
      return `<pre><code class="hljs language-${lang || 'plaintext'}">${highlighted}</code></pre>`
    }
  )

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    tags: (data.tags as string[]) || [],
    readingTime: `${Math.ceil(rt.minutes)} min`,
    contentHtml,
  }
}
