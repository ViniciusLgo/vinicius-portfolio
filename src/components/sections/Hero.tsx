'use client'
import { useTranslations, useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Terminal from '@/components/Terminal'
import ParticlesBackground from '@/components/ParticlesBackground'
import MagneticButton from '@/components/MagneticButton'
import FloatingTechIcons from '@/components/FloatingTechIcons'

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

  const { scrollY } = useScroll()
  const textY   = useTransform(scrollY, [0, 600], [0, -80])
  const termY   = useTransform(scrollY, [0, 600], [0, -40])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

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
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden scanlines">
      <ParticlesBackground />
      <FloatingTechIcons />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-16">
        <motion.div style={{ y: textY, opacity }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-neon-blue text-sm mb-3 tracking-widest uppercase"
          >
            {t('greeting')}
          </motion.p>

          <h1
            className="glitch text-4xl md:text-5xl font-bold text-text mb-4 leading-tight"
            data-text="Vinicius Lago Cruz"
          >
            Vinicius Lago Cruz
          </h1>

          <div className="h-10 flex items-center mb-8">
            <span className="text-xl md:text-2xl text-neon-green font-mono shimmer-neon">
              {displayed}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3 flex-wrap"
          >
            <MagneticButton
              href="#projetos"
              className="px-5 py-2.5 bg-neon-green text-bg font-semibold rounded hover:glow-green transition-all text-sm inline-block"
            >
              {t('viewProjects')}
            </MagneticButton>
            <MagneticButton
              href="/cv-vinicius-lago.pdf"
              download
              className="px-5 py-2.5 border border-neon-blue text-neon-blue rounded hover:glow-blue transition-all text-sm inline-block"
            >
              {t('downloadCV')}
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-5 mt-8"
          >
            <a href="https://github.com/ViniciusLgo" target="_blank" rel="noopener noreferrer"
              className="text-muted hover:text-neon-green transition-colors text-sm font-mono">
              github ↗
            </a>
            <a href="https://linkedin.com/in/viniciuslagocruz" target="_blank" rel="noopener noreferrer"
              className="text-muted hover:text-neon-blue transition-colors text-sm font-mono">
              linkedin ↗
            </a>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: termY, opacity }}>
          <Terminal />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-xs font-mono text-muted/60">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-neon-green/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
