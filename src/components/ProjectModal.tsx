'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import type { Project } from '@/data/types'

interface Props {
  project: Project | null
  locale: 'pt' | 'en'
  onClose: () => void
}

export default function ProjectModal({ project, locale, onClose }: Props) {
  const t = useTranslations('projects')

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-bg/80 backdrop-blur flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
            className="bg-surface border border-border rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text">{project.title}</h2>
                <span className="text-xs font-mono text-neon-blue mt-1 inline-block">
                  {project.statusLabel[locale]}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-muted hover:text-neon-green transition-colors text-xl ml-4 shrink-0"
                aria-label={t('close')}
              >
                ✕
              </button>
            </div>

            <p className="text-text/80 leading-relaxed mb-6">
              {project.fullDesc[locale]}
            </p>

            {project.impact && (
              <div className="bg-bg border border-neon-green/20 rounded-lg p-4 mb-6">
                <p className="text-neon-green text-sm font-mono">
                  ⚡ {project.impact[locale]}
                </p>
              </div>
            )}

            <div className="mb-6">
              <h4 className="text-xs font-mono text-muted uppercase tracking-widest mb-3">Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s, i) => (
                  <span key={i} className="text-sm font-mono bg-bg border border-border px-3 py-1 rounded text-text/70">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-neon-green text-neon-green text-sm rounded hover:glow-green transition-all"
                >
                  {t('viewGithub')} ↗
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neon-blue text-bg text-sm font-semibold rounded hover:glow-blue transition-all"
                >
                  {t('viewDemo')} ↗
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
