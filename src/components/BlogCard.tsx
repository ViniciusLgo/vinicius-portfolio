import Link from 'next/link'
import type { PostMeta } from '@/lib/blog'

interface Props {
  post: PostMeta
  locale: string
  readMoreLabel: string
}

export default function BlogCard({ post, locale, readMoreLabel }: Props) {
  const readLabel = locale === 'pt' ? 'leitura' : 'read'
  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:border-neon-green transition-all group neon-border-spin">
      <div className="flex items-center gap-3 mb-2">
        <p className="text-xs font-mono text-muted">{post.date}</p>
        <span className="text-xs font-mono text-muted/50">·</span>
        <p className="text-xs font-mono text-muted">{post.readingTime} {readLabel}</p>
      </div>
      <h3 className="font-semibold text-text group-hover:text-neon-green transition-colors mb-2 leading-snug">
        {post.title}
      </h3>
      <p className="text-text/60 text-sm leading-relaxed mb-4">{post.excerpt}</p>
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2 flex-wrap">
          {post.tags.map((tag, i) => (
            <span key={i} className="text-xs font-mono text-neon-blue">#{tag}</span>
          ))}
        </div>
        <Link
          href={`/${locale}/blog/${post.slug}`}
          className="text-xs font-mono text-neon-green hover:underline shrink-0"
        >
          {readMoreLabel} →
        </Link>
      </div>
    </div>
  )
}
