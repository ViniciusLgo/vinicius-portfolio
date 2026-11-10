'use client'
import { useTranslations, useLocale } from 'next-intl'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { track } from '@vercel/analytics'

export default function NavBar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const cvHref = locale === 'en' ? '/cv-vinicius-lago-en.pdf' : '/cv-vinicius-lago.pdf'
  const pathWithoutLocale = pathname.replace(/^\/(pt|en)/, '') || '/'
  const otherLocale = locale === 'en' ? 'pt' : 'en'
  const otherLocaleHref = `/${otherLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#sobre', label: t('about') },
    { href: '#skills', label: 'Skills' },
    { href: '#experiencia', label: t('experience') },
    { href: '#projetos', label: t('projects') },
    { href: '#formacao', label: t('education') },
    { href: '#contato', label: t('contact') },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-bg/90 backdrop-blur border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="font-mono text-neon-green font-bold text-lg text-glow-green hover:scale-110 transition-transform">
          VL<span className="text-neon-blue">.</span>
        </a>

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
          <a
            href={otherLocaleHref}
            className="text-xs font-mono text-muted border border-border px-2 py-1 rounded hover:border-neon-green hover:text-neon-green transition-all uppercase"
            title={otherLocale === 'en' ? 'Switch to English' : 'Mudar para Português'}
          >
            {otherLocale}
          </a>
          <kbd className="hidden lg:inline-flex items-center gap-1 text-xs text-muted border border-border px-2 py-1 rounded font-mono hover:border-neon-blue hover:text-neon-blue transition-all cursor-pointer"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }))}
            title="Abrir command palette">
            ctrl+k
          </kbd>
          <a
            href={cvHref}
            download
            onClick={() => track('cv_download', { locale, source: 'navbar' })}
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
            href={cvHref}
            download
            onClick={() => { setMenuOpen(false); track('cv_download', { locale, source: 'navbar_mobile' }) }}
            className="block text-sm text-neon-green font-mono"
          >
            {t('downloadCV')}
          </a>
          <a
            href={otherLocaleHref}
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-muted font-mono uppercase"
          >
            {otherLocale === 'en' ? 'English' : 'Português'}
          </a>
        </div>
      )}
    </nav>
  )
}
