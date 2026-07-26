import { getPost, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import ReadingProgress from '@/components/ReadingProgress'
import ShareButtons from '@/components/ShareButtons'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — Vinicius Lago Cruz`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.date },
  }
}

export default async function PostPage({ params }: { params: { slug: string; locale: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen pt-24 pb-16">
      <ReadingProgress />
      <div className="max-w-3xl mx-auto px-6">
        <Link href={`/${params.locale}/blog`}
          className="text-sm font-mono text-neon-green hover:underline mb-8 inline-flex items-center gap-1">
          ← voltar
        </Link>

        <div className="mt-8 mb-2 flex items-center gap-3 text-xs font-mono text-muted">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime} de leitura</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-text mb-4 leading-tight">{post.title}</h1>

        <div className="flex gap-2 flex-wrap mb-10">
          {post.tags.map((tag, i) => (
            <span key={i} className="text-xs font-mono text-neon-blue border border-neon-blue/30 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <div
          className="prose prose-invert prose-p:text-text/80 prose-headings:text-text prose-a:text-neon-green prose-strong:text-text prose-blockquote:border-l-neon-green prose-blockquote:text-text/70 prose-code:text-neon-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <ShareButtons title={post.title} slug={post.slug} />
      </div>
    </main>
  )
}
