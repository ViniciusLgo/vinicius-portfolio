import { getPost, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export default async function PostPage({
  params,
}: {
  params: { slug: string; locale: string }
}) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href={`/${params.locale}/blog`}
          className="text-sm font-mono text-neon-green hover:underline mb-8 inline-block"
        >
          ← {params.locale === 'pt' ? 'voltar' : 'back'}
        </Link>
        <p className="text-xs font-mono text-muted mb-2">{post.date}</p>
        <h1 className="text-3xl font-bold text-text mb-4 leading-tight">{post.title}</h1>
        <div className="flex gap-2 flex-wrap mb-8">
          {post.tags.map((tag, i) => (
            <span key={i} className="text-xs font-mono text-neon-blue">#{tag}</span>
          ))}
        </div>
        <div
          className="prose prose-invert prose-p:text-text/80 prose-headings:text-text prose-a:text-neon-green prose-code:text-neon-blue prose-strong:text-text max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </main>
  )
}
