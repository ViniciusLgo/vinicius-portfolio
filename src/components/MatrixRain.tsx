'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
const CHARS = 'アイウエオカキクケコサシスセソ01アイウエオカキ'

export default function MatrixRain() {
  const [active, setActive] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const seq = useRef<string[]>([])
  const raf = useRef<number>(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      seq.current = [...seq.current, e.key].slice(-KONAMI.length)
      if (seq.current.join(',') === KONAMI.join(',')) {
        seq.current = []
        setActive(v => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!active || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const cols = Math.floor(w / 20)
    const drops = Array(cols).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(10,10,15,0.05)'
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = '#00ff88'
      ctx.font = '14px JetBrains Mono, monospace'
      drops.forEach((y, i) => {
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * 20, y * 20)
        if (y * 20 > h && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
      raf.current = requestAnimationFrame(draw)
    }

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    raf.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', onResize)
    }
  }, [active])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] pointer-events-none"
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-neon-green/60 pointer-events-auto"
          >
            <button
              onClick={() => setActive(false)}
              className="hover:text-neon-green transition-colors border border-neon-green/20 px-4 py-2 rounded-full"
            >
              [ESC] fechar matrix
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
