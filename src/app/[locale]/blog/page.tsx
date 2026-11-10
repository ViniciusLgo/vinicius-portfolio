import { getTranslations, getLocale } from 'next-intl/server'
import { getAllPosts, getAllTags } from '@/lib/blog'
import BlogFilter from '@/components/BlogFilter'

export default async function BlogPage() {
  const t = await getTranslations('blog')
  const locale = await getLocale()
  const posts = getAllPosts(locale)
  const allTags = getAllTags(locale)

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-text mb-2 glitch" data-text={t('title')}>
          {t('title')}
        </h1>
        <div className="h-0.5 w-16 bg-neon-green mb-4" />
        <p className="text-muted font-mono text-sm mb-10">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
        <BlogFilter
          posts={posts}
          allTags={allTags}
          locale={locale}
          readMoreLabel={t('readMore')}
        />
      </div>
    </main>
  )
}
