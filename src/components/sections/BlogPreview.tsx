import { getTranslations, getLocale } from 'next-intl/server'
import Link from 'next/link'
import SectionTitle from '@/components/SectionTitle'
import BlogCard from '@/components/BlogCard'
import { getAllPosts } from '@/lib/blog'

export default async function BlogPreview() {
  const t = await getTranslations('blog')
  const locale = await getLocale()
  const posts = getAllPosts().slice(0, 3)

  if (posts.length === 0) return null

  return (
    <section id="blog" className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} accent="blue" />
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} locale={locale} readMoreLabel={t('readMore')} />
          ))}
        </div>
        <Link
          href={`/${locale}/blog`}
          className="inline-block text-sm font-mono text-neon-green border border-neon-green/30 px-4 py-2 rounded hover:glow-green transition-all"
        >
          {t('viewAll')} →
        </Link>
      </div>
    </section>
  )
}
