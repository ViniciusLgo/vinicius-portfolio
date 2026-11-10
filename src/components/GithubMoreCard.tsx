'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function GithubMoreCard() {
  const t = useTranslations('projects')

  return (
    <motion.a
      href="https://github.com/ViniciusLgo"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-lg border border-border bg-surface px-8 py-8 overflow-hidden transition-colors duration-300 hover:border-neon-green/50"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle at 15% 50%, rgba(0,255,136,0.08) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 flex items-center gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-neon-green transition-colors duration-300 group-hover:border-neon-green/60 group-hover:glow-green">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.5 0 12.3c0 5.44 3.44 10.05 8.21 11.68.6.11.82-.27.82-.6 0-.29-.01-1.07-.02-2.1-3.34.75-4.04-1.65-4.04-1.65-.55-1.42-1.33-1.81-1.33-1.81-1.09-.77.08-.75.08-.75 1.2.09 1.84 1.27 1.84 1.27 1.07 1.87 2.81 1.33 3.49 1.02.11-.79.42-1.33.76-1.64-2.67-.31-5.47-1.37-5.47-6.1 0-1.35.47-2.45 1.24-3.31-.13-.31-.54-1.57.12-3.28 0 0 1.01-.33 3.3 1.27.96-.27 1.98-.41 3-.41 1.02 0 2.04.14 3 .41 2.29-1.6 3.3-1.27 3.3-1.27.66 1.71.25 2.97.12 3.28.77.86 1.24 1.96 1.24 3.31 0 4.74-2.81 5.79-5.49 6.09.43.38.81 1.13.81 2.29 0 1.65-.02 2.98-.02 3.39 0 .33.21.72.83.6C20.57 22.34 24 17.74 24 12.3 24 5.5 18.63 0 12 0Z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-text group-hover:text-neon-green transition-colors">
            {t('moreTitle')}
          </h3>
          <p className="text-text/60 text-sm mt-1 max-w-md leading-relaxed">
            {t('moreSubtitle')}
          </p>
        </div>
      </div>

      <span className="relative z-10 shrink-0 inline-flex items-center gap-2 text-sm font-mono text-neon-green border border-neon-green/40 rounded px-4 py-2 transition-all duration-300 group-hover:bg-neon-green group-hover:text-bg">
        {t('moreCta')}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </motion.a>
  )
}
