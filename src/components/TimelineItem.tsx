'use client'
import { motion } from 'framer-motion'
import type { Experience } from '@/data/types'

interface Props {
  item: Experience
  locale: 'pt' | 'en'
  index: number
  isLast: boolean
}

export default function TimelineItem({ item, locale, index, isLast }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 ${
        item.current ? 'border-neon-green bg-neon-green/20' : 'border-muted bg-bg'
      }`} />
      {!isLast && (
        <div className="absolute left-[5px] top-4 bottom-0 w-px bg-border" />
      )}
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <h3 className={`font-semibold text-lg leading-tight ${item.current ? 'text-neon-green' : 'text-text'}`}>
          {item.role[locale]}
        </h3>
        {item.current && (
          <span className="text-xs font-mono bg-neon-green/10 text-neon-green border border-neon-green/30 px-2 py-0.5 rounded">
            {locale === 'pt' ? 'atual' : 'current'}
          </span>
        )}
      </div>
      <p className="text-neon-blue font-mono text-sm">{item.company} · {item.location}</p>
      <p className="text-muted text-sm mb-3">{item.period[locale]}</p>
      <ul className="space-y-1.5">
        {item.bullets[locale].map((b, i) => (
          <li key={i} className="text-text/70 text-sm flex gap-2">
            <span className="text-neon-green mt-0.5 shrink-0">›</span>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
