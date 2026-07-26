'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  '> initializing portfolio...',
  '> loading modules: [java] [php] [next.js]',
  '> connecting to production...',
  '> all systems operational ✓',
]

export default function LoadingScreen() {
  const [lines, setLines] = useState<string[]>([])
  const [done, setDone] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const shown = sessionStorage.getItem('loaded')
    if (shown) { setDone(true); return }

    let i = 0
    const next = () => {
      if (i >= LINES.length) {
        setTimeout(() => {
          setDone(true)
          sessionStorage.setItem('loaded', '1')
        }, 400)
        return
      }
      setLines(prev => [...prev, LINES[i]])
      i++
      setTimeout(next, 420)
    }
    setTimeout(next, 200)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9998] bg-bg flex items-center justify-center"
        >
          <div className="font-mono text-sm w-80">
            <p className="text-neon-green text-glow-green mb-4 text-base font-bold">VL_portfolio</p>
            <div className="space-y-2">
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={line.includes('✓') ? 'text-neon-green' : 'text-muted'}
                >
                  {line}
                </motion.p>
              ))}
              {lines.length < LINES.length && (
                <span className="text-neon-green animate-pulse">▋</span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
