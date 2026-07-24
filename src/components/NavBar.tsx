'use client'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function NavBar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleLocale = () => {
    const next = locale === 'pt' ? 'en' : 'pt'
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/') || '/')
  }

  const links = [
    { href: '#sobre', label: t('about') },
    { href: '#skills', label: 'Skills' },
    { href: '#experiencia', label: t('experience') },
    { href: '#projetos', label: t('projects') },
    { href: '#formacao', label: t('education') },
    { href: '#github', label: 'GitHub' },
    { href: '#contato', label: t('contact') },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-bg/90 backdrop-blur border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-mono text-neon-green font-bold text-lg text-glow-green">
          VL<span className="text-neon-blue">.</span>
        </span>

        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted hover:text-neon-green transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLocale}
            className="font-mono text-xs border border-border px-2 py-1 rounded hover:border-neon-green hover:text-neon-green transition-all"
          >
            {locale === 'pt' ? 'EN' : 'PT'}
          </button>
          <a
            href="/cv-vinicius-lago.pdf"
            download
            className="hidden md:inline-block text-xs bg-neon-green text-bg font-semibold px-3 py-1.5 rounded hover:glow-green transition-all"
          >
            {t('downloadCV')}
          </a>
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden text-muted hover:text-neon-green transition-colors"
            aria-label="Menu"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/></>
                : <><line x1="3" y1="6" x2="17" y2="6"/><line x1="3" y1="12" x2="17" y2="12"/><line x1="3" y1="18" x2="17" y2="18"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-bg/95 backdrop-blur border-b border-border px-6 py-4 space-y-3">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-muted hover:text-neon-green transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/cv-vinicius-lago.pdf"
            download
            className="block text-sm text-neon-green font-mono"
          >
            {t('downloadCV')}
          </a>
        </div>
      )}
    </nav>
  )
}
