'use client'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import SkillBadge from '@/components/SkillBadge'
import { skillCategories } from '@/data/skills'

export default function Skills() {
  const t = useTranslations('skills')
  const locale = useLocale() as 'pt' | 'en'

  return (
    <section id="skills" className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} accent="blue" />
        <div className="space-y-10">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <h3 className="text-xs font-mono text-neon-blue mb-4 uppercase tracking-widest">
                {cat.name[locale]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s, j) => (
                  <SkillBadge key={j} name={s.name} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
