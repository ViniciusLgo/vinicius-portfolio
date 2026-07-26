'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SnakeGame from '@/components/SnakeGame'

const eggs = [
  { icon: '🟩', name: 'Matrix Rain',    how: '↑ ↑ ↓ ↓ ← → ← → B A',       desc: 'Chuva de caracteres estilo Matrix' },
  { icon: '👾', name: 'Palavra secreta', how: 'Digite "hack" em qualquer lugar', desc: 'Mensagem secreta aparece na tela' },
  { icon: '✨', name: 'Click Burst',     how: 'Clique em qualquer lugar',        desc: 'Explosão de partículas neon' },
  { icon: '🔮', name: 'Cards 3D',        how: 'Passe o mouse nos cards de projeto', desc: 'Inclinação 3D com spotlight interno' },
  { icon: '🐍', name: 'Snake',           how: 'Botão abaixo →',                  desc: 'Mini jogo Snake clássico' },
  { icon: '⌨️', name: 'Command Palette', how: 'Ctrl + K',                        desc: 'Navegação rápida por teclado' },
]

export default function EasterEggsPanel() {
  const [open, setOpen] = useState(false)
  const [snake, setSnake] = useState(false)

  return (
    <>
      <SnakeGame open={snake} onClose={() => setSnake(false)} />

      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 left-8 z-50 w-10 h-10 bg-surface border border-neon-blue/40 rounded-full flex items-center justify-center text-neon-blue text-sm font-mono hover:border-neon-blue hover:glow-blue transition-all"
        title="Easter eggs"
      >
        ?
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} className="fixed inset-0 z-[998]" />
            <motion.div
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-20 left-8 z-[999] w-80 bg-surface border border-neon-blue/30 rounded-xl p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-xs text-neon-blue uppercase tracking-widest">{'// easter eggs'}</p>
                <button onClick={() => setOpen(false)} className="text-muted hover:text-text transition-colors text-xs">✕</button>
              </div>
              <div className="space-y-3">
                {eggs.map((egg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }} className="flex gap-3 items-start">
                    <span className="text-base shrink-0 mt-0.5">{egg.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-text text-sm font-semibold">{egg.name}</p>
                      <p className="text-neon-green text-xs font-mono mt-0.5 truncate">{egg.how}</p>
                      <p className="text-muted text-xs mt-0.5">{egg.desc}</p>
                    </div>
                    {egg.name === 'Snake' && (
                      <button onClick={() => { setOpen(false); setSnake(true) }}
                        className="shrink-0 text-xs font-mono border border-neon-green/40 text-neon-green px-2 py-1 rounded hover:glow-green transition-all">
                        jogar
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
              <p className="text-muted/40 text-xs font-mono mt-4 text-center">{'bom achado 👾'}</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
