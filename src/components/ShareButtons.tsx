'use client'
import { showToast } from '@/components/Toast'

interface Props { title: string; slug: string }

export default function ShareButtons({ title, slug }: Props) {
  const url = `https://viniciuslago.vercel.app/pt/blog/${slug}`

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    showToast('Link copiado! 🔗', 'info')
  }

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title, url })
    } else {
      await copyLink()
    }
  }

  return (
    <div className="flex gap-3 mt-12 pt-8 border-t border-border">
      <button
        onClick={share}
        className="flex items-center gap-2 text-xs font-mono border border-border text-muted px-4 py-2 rounded-lg hover:border-neon-green hover:text-neon-green transition-all"
      >
        ↗ compartilhar
      </button>
      <button
        onClick={copyLink}
        className="flex items-center gap-2 text-xs font-mono border border-border text-muted px-4 py-2 rounded-lg hover:border-neon-blue hover:text-neon-blue transition-all"
      >
        🔗 copiar link
      </button>
    </div>
  )
}
