'use client'
import { motion } from 'framer-motion'
import type { Project } from '@/data/types'

interface Props {
  project: Project
  locale: 'pt' | 'en'
  onClick: () => void
}

export default function ProjectCard({ project, locale, onClick }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-surface border border-border rounded-lg p-6 cursor-pointer hover:border-neon-green transition-all group"
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <h3 className="font-semibold text-text group-hover:text-neon-green transition-colors">
          {project.title}
        </h3>
        <span className="text-xs font-mono text-neon-blue border border-neon-blue/30 px-2 py-0.5 rounded shrink-0 whitespace-nowrap">
          {project.statusLabel[locale]}
        </span>
      </div>
      <p className="text-text/60 text-sm mb-4 leading-relaxed">
        {project.shortDesc[locale]}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((s, i) => (
          <span key={i} className="text-xs font-mono bg-bg border border-border px-2 py-0.5 rounded text-muted">
            {s}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="text-xs font-mono text-muted self-center">+{project.stack.length - 4}</span>
        )}
      </div>
    </motion.div>
  )
}
