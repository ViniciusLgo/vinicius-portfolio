'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import SkillBadge from '@/components/SkillBadge'
import SkillRadar from '@/components/SkillRadar'
import { skillCategories } from '@/data/skills'

export default function Skills() {
  const t = useTranslations('skills')

  return (
    <section id="skills" className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} accent="blue" />

        <div className="grid lg:grid-cols-[1fr_340px] gap-12 items-start">
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
                  {cat.name.pt}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s, j) => (
                    <SkillBadge key={j} name={s.name} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block w-full rounded-2xl border border-border bg-surface/50 p-6"
          >
            <p className="text-xs font-mono text-muted text-center mb-4 uppercase tracking-widest">
              radar · passe o mouse
            </p>
            <SkillRadar />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
