import SectionTitle from '@/components/SectionTitle'
import { getTranslations } from 'next-intl/server'

const USERNAME = 'ViniciusLgo'
const BASE = 'https://github-readme-stats.vercel.app/api'
const STREAK = 'https://streak-stats.demolab.com'
const SUMMARY = 'https://github-profile-summary-cards.vercel.app/api/cards'
const ACTIVITY = 'https://github-readme-activity-graph.vercel.app/graph'

const statsUrl = `${BASE}?username=${USERNAME}&show_icons=true&include_all_commits=true&count_private=true&hide_border=true&bg_color=0f0f1a&title_color=00ff88&text_color=e2e8f0&icon_color=00ff88&ring_color=00d4ff`
const langsUrl = `${BASE}/top-langs/?username=${USERNAME}&layout=donut&hide_border=true&bg_color=0f0f1a&title_color=00ff88&text_color=e2e8f0&langs_count=7`
const streakUrl = `${STREAK}?user=${USERNAME}&hide_border=true&background=0f0f1a&stroke=00d4ff&ring=00ff88&fire=00ff88&currStreakNum=FFFFFF&sideNums=e2e8f0&currStreakLabel=00ff88&sideLabels=4a4a6a&dates=4a4a6a`
const activityUrl = `${ACTIVITY}?username=${USERNAME}&bg_color=0f0f1a&color=00ff88&line=00d4ff&point=FFFFFF&area=true&area_color=003322&hide_border=true`
const reposUrl = `${SUMMARY}/repos-per-language?username=${USERNAME}&theme=github_dark`
const commitsUrl = `${SUMMARY}/most-commit-language?username=${USERNAME}&theme=github_dark`

export default async function GithubStats() {
  const t = await getTranslations('github')

  return (
    <section id="github" className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} accent="green" />
        <div className="flex justify-center mb-2">
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-muted hover:text-neon-green transition-colors"
          >
            github.com/{USERNAME} ↗
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={statsUrl} alt="GitHub Stats" className="w-full rounded-lg" loading="lazy" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={langsUrl} alt="Top Languages" className="w-full rounded-lg" loading="lazy" />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={streakUrl} alt="GitHub Streak" className="w-full rounded-lg mb-4" loading="lazy" />

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={reposUrl} alt="Repos por linguagem" className="w-full rounded-lg" loading="lazy" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={commitsUrl} alt="Commits por linguagem" className="w-full rounded-lg" loading="lazy" />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={activityUrl} alt="Activity Graph" className="w-full rounded-lg" loading="lazy" />
      </div>
    </section>
  )
}
