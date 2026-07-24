'use client'
import { useTranslations, useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Terminal from '@/components/Terminal'

const ROLES: Record<string, string[]> = {
  pt: ['Desenvolvedor Backend', 'Full Stack Dev', 'Java & PHP Developer'],
  en: ['Backend Developer', 'Full Stack Dev', 'Java & PHP Developer'],
}

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const roles = ROLES[locale] ?? ROLES.pt

  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx((roleIdx + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIdx, roles])

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-neon-blue text-sm mb-2 tracking-widest uppercase">
            {t('greeting')}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4 leading-tight">
            Vinicius Lago Cruz
          </h1>
          <div className="h-10 flex items-center mb-8">
            <span className="text-xl md:text-2xl text-neon-green font-mono text-glow-green">
              {displayed}
              <span className="animate-pulse">|</span>
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a
              href="#projetos"
              className="px-5 py-2.5 bg-neon-green text-bg font-semibold rounded hover:glow-green transition-all text-sm"
            >
              {t('viewProjects')}
            </a>
            <a
              href="/cv-vinicius-lago.pdf"
              download
              className="px-5 py-2.5 border border-neon-blue text-neon-blue rounded hover:glow-blue transition-all text-sm"
            >
              {t('downloadCV')}
            </a>
          </div>
          <div className="flex gap-5 mt-8">
            <a
              href="https://github.com/ViniciusLgo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-neon-green transition-colors text-sm font-mono"
            >
              github ↗
            </a>
            <a
              href="https://linkedin.com/in/viniciuslagocruz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-neon-blue transition-colors text-sm font-mono"
            >
              linkedin ↗
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  )
}
