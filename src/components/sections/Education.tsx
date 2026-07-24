'use client'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { education } from '@/data/education'
import { certifications } from '@/data/certifications'

export default function Education() {
  const t = useTranslations('education')
  const tc = useTranslations('certifications')
  const locale = useLocale() as 'pt' | 'en'

  return (
    <section id="formacao" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} />
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {education.map((ed, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-surface border border-border rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-2 gap-2">
                <h3 className="font-semibold text-text">{ed.degree[locale]}</h3>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border shrink-0 ${
                  ed.status === 'ongoing'
                    ? 'text-neon-green border-neon-green/30 bg-neon-green/10'
                    : 'text-muted border-border'
                }`}>
                  {ed.status === 'ongoing' ? t('ongoing') : t('completed')}
                </span>
              </div>
              <p className="text-neon-blue font-mono text-sm">{ed.institution}</p>
              <p className="text-muted text-sm mb-4">{ed.period}</p>
              {ed.progress !== undefined && (
                <div>
                  <div className="flex justify-between text-xs text-muted mb-1.5">
                    <span>{locale === 'pt' ? 'Progresso' : 'Progress'}</span>
                    <span>{ed.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${ed.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-neon-green rounded-full"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div id="certificacoes">
          <SectionTitle title={tc('title')} accent="blue" />
          <div className="space-y-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-surface border border-border rounded-lg p-5 flex items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold text-text">{cert.name}</h3>
                  <p className="text-neon-blue font-mono text-sm">{cert.issuer} · {cert.date[locale]}</p>
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-neon-green border border-neon-green/30 px-3 py-1.5 rounded hover:glow-green transition-all shrink-0"
                  >
                    {tc('viewCredential')} ↗
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
