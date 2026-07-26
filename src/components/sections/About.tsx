'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionTitle from '@/components/SectionTitle'
import AnimatedCounter from '@/components/AnimatedCounter'

export default function About() {
  const t = useTranslations('about')
  const stats = t.raw('stats') as { value: string; label: string }[]

  return (
    <section id="sobre" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} />
        <div className="grid md:grid-cols-2 gap-16 items-start">

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-6"
            >
              <div className="relative w-24 h-24 shrink-0 rounded-full overflow-hidden border-2 border-neon-green photo-pulse">
                <Image src="/profile.jpg" alt="Vinicius Lago Cruz" fill className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-text text-xl">Vinicius Lago Cruz</p>
                <p className="text-neon-blue text-sm font-mono mt-1">Backend / Full Stack Developer</p>
                <p className="text-muted text-xs font-mono mt-1">📍 Camaçari, BA · Brasil</p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-text/75 leading-relaxed text-base"
            >
              {t('description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {['Java', 'Spring Boot', 'PHP', 'Laravel', 'Next.js', 'Linux'].map(t => (
                <span key={t} className="text-xs font-mono bg-surface border border-border px-3 py-1 rounded-full text-muted hover:border-neon-green hover:text-neon-green transition-colors cursor-default">
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.04 }}
                className="bg-surface border border-border rounded-xl p-6 text-center hover:border-neon-green transition-colors neon-border-spin noise-card"
              >
                <div className="text-3xl font-bold font-mono text-neon-green text-glow-green mb-1">
                  <AnimatedCounter value={s.value} />
                </div>
                <div className="text-sm text-muted leading-tight">{s.label}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
