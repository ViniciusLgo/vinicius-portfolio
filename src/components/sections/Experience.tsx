'use client'
import { useTranslations, useLocale } from 'next-intl'
import SectionTitle from '@/components/SectionTitle'
import TimelineItem from '@/components/TimelineItem'
import { experiences } from '@/data/experience'

export default function Experience() {
  const t = useTranslations('experience')
  const locale = useLocale() as 'pt' | 'en'

  return (
    <section id="experiencia" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} />
        <div className="max-w-3xl">
          {experiences.map((exp, i) => (
            <TimelineItem
              key={i}
              item={exp}
              locale={locale}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
