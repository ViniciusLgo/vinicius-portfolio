'use client'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import SectionTitle from '@/components/SectionTitle'
import ProjectCard from '@/components/ProjectCard'
import ProjectModal from '@/components/ProjectModal'
import { projects } from '@/data/projects'
import type { Project } from '@/data/types'

export default function Projects() {
  const t = useTranslations('projects')
  const locale = useLocale() as 'pt' | 'en'
  const [selected, setSelected] = useState<Project | null>(null)

  const featured = projects.filter(p => p.featured)
  const others = projects.filter(p => !p.featured)

  return (
    <section id="projetos" className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} accent="blue" />
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map(p => (
            <ProjectCard key={p.id} project={p} locale={locale} onClick={() => setSelected(p)} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {others.map(p => (
            <ProjectCard key={p.id} project={p} locale={locale} onClick={() => setSelected(p)} />
          ))}
        </div>
      </div>
      <ProjectModal project={selected} locale={locale} onClose={() => setSelected(null)} />
    </section>
  )
}
