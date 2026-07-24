'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionTitle from '@/components/SectionTitle'

export default function About() {
  const t = useTranslations('about')
  const stats = t.raw('stats') as { value: string; label: string }[]

  return (
    <section id="sobre" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-5">
              <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-neon-green">
                <Image
                  src="/profile.jpg"
                  alt="Vinicius Lago Cruz"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-text">Vinicius Lago Cruz</p>
                <p className="text-neon-blue text-sm font-mono">Camaçari, BA · Brasil</p>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-text/80 leading-relaxed text-lg"
            >
              {t('description')}
            </motion.p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-surface border border-border rounded-lg p-5 text-center hover:border-neon-green transition-colors"
              >
                <div className="text-3xl font-bold font-mono text-neon-green text-glow-green">
                  {s.value}
                </div>
                <div className="text-sm text-muted mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
