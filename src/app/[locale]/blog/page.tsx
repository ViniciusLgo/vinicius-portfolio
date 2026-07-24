import { getTranslations, getLocale } from 'next-intl/server'
import { getAllPosts } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'

export default async function BlogPage() {
  const t = await getTranslations('blog')
  const locale = await getLocale()
  const posts = getAllPosts()

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-text mb-2">{t('title')}</h1>
        <div className="h-0.5 w-16 bg-neon-green mb-12" />
        <div className="space-y-6">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} locale={locale} readMoreLabel={t('readMore')} />
          ))}
        </div>
      </div>
    </main>
  )
}
