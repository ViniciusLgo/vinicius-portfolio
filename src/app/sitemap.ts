import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE = 'https://viniciuslago.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const locales = ['pt', 'en']

  const staticRoutes = locales.flatMap(locale => [
    { url: `${BASE}/${locale}`, lastModified: new Date(), priority: 1 },
    { url: `${BASE}/${locale}/blog`, lastModified: new Date(), priority: 0.8 },
  ])

  const blogRoutes = locales.flatMap(locale =>
    posts.map(post => ({
      url: `${BASE}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      priority: 0.6,
    }))
  )

  return [...staticRoutes, ...blogRoutes]
}
