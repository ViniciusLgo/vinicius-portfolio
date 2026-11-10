'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BlogCard from '@/components/BlogCard'
import type { PostMeta } from '@/lib/blog'

interface Props {
  posts: PostMeta[]
  allTags: string[]
  locale: string
  readMoreLabel: string
}

export default function BlogFilter({ posts, allTags, locale, readMoreLabel }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const filtered = activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts

  return (
    <>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`text-xs font-mono px-3 py-1 rounded-full border transition-all ${
              !activeTag
                ? 'border-neon-green text-neon-green bg-neon-green/10'
                : 'border-border text-muted hover:border-neon-green/50'
            }`}
          >
            {locale === 'en' ? 'all' : 'todos'}
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`text-xs font-mono px-3 py-1 rounded-full border transition-all ${
                activeTag === tag
                  ? 'border-neon-blue text-neon-blue bg-neon-blue/10'
                  : 'border-border text-muted hover:border-neon-blue/50'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag ?? 'all'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {filtered.map(post => (
            <BlogCard key={post.slug} post={post} locale={locale} readMoreLabel={readMoreLabel} />
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
