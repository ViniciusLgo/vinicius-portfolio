'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const COMMANDS = [
  { label: 'Sobre mim',    icon: '👤', action: '#sobre' },
  { label: 'Skills',       icon: '⚡', action: '#skills' },
  { label: 'Experiência',  icon: '💼', action: '#experiencia' },
  { label: 'Projetos',     icon: '🚀', action: '#projetos' },
  { label: 'Formação',     icon: '🎓', action: '#formacao' },
  { label: 'Blog',         icon: '✍️', action: '/pt/blog' },
  { label: 'Contato',      icon: '📬', action: '#contato' },
  { label: 'Baixar CV',    icon: '📄', action: '/cv-vinicius-lago.pdf' },
  { label: 'GitHub',       icon: '🐙', action: 'https://github.com/ViniciusLgo' },
  { label: 'LinkedIn',     icon: '🔗', action: 'https://linkedin.com/in/viniciuslagocruz' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [idx, setIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(v => !v)
        setQuery('')
        setIdx(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  const execute = (action: string) => {
    setOpen(false)
    if (action.startsWith('http')) {
      window.open(action, '_blank')
    } else if (action.startsWith('/cv')) {
      const a = document.createElement('a')
      a.href = action; a.download = ''; a.click()
    } else if (action.startsWith('/')) {
      router.push(action)
    } else {
      const el = document.querySelector(action)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(i + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setIdx(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && filtered[idx]) execute(filtered[idx].action)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9990] bg-bg/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-surface border border-neon-green/30 rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <span className="text-neon-green text-sm">⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setIdx(0) }}
                onKeyDown={onKeyDown}
                placeholder="Buscar seção ou ação..."
                className="flex-1 bg-transparent text-text text-sm outline-none placeholder:text-muted font-mono"
              />
              <kbd className="text-xs text-muted font-mono border border-border px-1.5 py-0.5 rounded">ESC</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <p className="text-muted text-sm font-mono px-4 py-6 text-center">nenhum resultado</p>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.label}
                  onClick={() => execute(cmd.action)}
                  onMouseEnter={() => setIdx(i)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                    i === idx ? 'bg-neon-green/10 text-neon-green' : 'text-text/70 hover:bg-surface/80'
                  }`}
                >
                  <span>{cmd.icon}</span>
                  <span className="font-mono">{cmd.label}</span>
                </button>
              ))}
            </div>
            <div className="border-t border-border px-4 py-2 flex gap-4 text-xs text-muted font-mono">
              <span>↑↓ navegar</span>
              <span>↵ executar</span>
              <span>ctrl+k abrir/fechar</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
