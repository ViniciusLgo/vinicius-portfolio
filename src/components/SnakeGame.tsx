'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CELL = 16
const COLS = 20
const ROWS = 16

type Dir = 'U' | 'D' | 'L' | 'R'
type Pt  = { x: number; y: number }

function rnd() { return { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) } }

export default function SnakeGame({ open, onClose }: { open: boolean; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const state = useRef({ snake: [{ x: 10, y: 8 }] as Pt[], dir: 'R' as Dir, food: rnd(), score: 0, alive: true })
  const raf = useRef<number>(0)
  const lastTime = useRef(0)
  const [score, setScore] = useState(0)
  const [dead, setDead] = useState(false)

  const reset = useCallback(() => {
    state.current = { snake: [{ x: 10, y: 8 }], dir: 'R', food: rnd(), score: 0, alive: true }
    setScore(0); setDead(false)
  }, [])

  useEffect(() => {
    if (!open) return
    reset()
    const onKey = (e: KeyboardEvent) => {
      const { dir } = state.current
      if (e.key === 'ArrowUp'    && dir !== 'D') state.current.dir = 'U'
      if (e.key === 'ArrowDown'  && dir !== 'U') state.current.dir = 'D'
      if (e.key === 'ArrowLeft'  && dir !== 'R') state.current.dir = 'L'
      if (e.key === 'ArrowRight' && dir !== 'L') state.current.dir = 'R'
      if (e.key === 'Escape') onClose()
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); cancelAnimationFrame(raf.current) }
  }, [open, onClose, reset])

  useEffect(() => {
    if (!open || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!

    const tick = (now: number) => {
      raf.current = requestAnimationFrame(tick)
      if (now - lastTime.current < 120) return
      lastTime.current = now
      const s = state.current
      if (!s.alive) return

      const head = { ...s.snake[0] }
      if (s.dir === 'U') head.y--
      if (s.dir === 'D') head.y++
      if (s.dir === 'L') head.x--
      if (s.dir === 'R') head.x++

      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
          s.snake.some(p => p.x === head.x && p.y === head.y)) {
        s.alive = false; setDead(true); return
      }

      s.snake.unshift(head)
      if (head.x === s.food.x && head.y === s.food.y) {
        s.food = rnd(); s.score++; setScore(s.score)
      } else {
        s.snake.pop()
      }

      ctx.fillStyle = '#0a0a0f'
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL)

      ctx.strokeStyle = 'rgba(0,255,136,0.05)'
      ctx.lineWidth = 0.5
      for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, ROWS * CELL); ctx.stroke() }
      for (let y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(COLS * CELL, y * CELL); ctx.stroke() }

      s.snake.forEach((p, i) => {
        ctx.fillStyle = i === 0 ? '#00ff88' : `rgba(0,255,136,${0.8 - i * 0.03})`
        ctx.shadowColor = '#00ff88'
        ctx.shadowBlur = i === 0 ? 8 : 0
        ctx.fillRect(p.x * CELL + 1, p.y * CELL + 1, CELL - 2, CELL - 2)
      })
      ctx.shadowBlur = 0
      ctx.fillStyle = '#00d4ff'
      ctx.shadowColor = '#00d4ff'; ctx.shadowBlur = 8
      ctx.fillRect(s.food.x * CELL + 2, s.food.y * CELL + 2, CELL - 4, CELL - 4)
      ctx.shadowBlur = 0
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9989] bg-bg/80 backdrop-blur flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-surface border border-neon-green/40 rounded-xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-bg">
              <span className="font-mono text-xs text-neon-green">snake.exe · pontos: {score}</span>
              <button onClick={onClose} className="text-muted hover:text-neon-green text-xs transition-colors">✕</button>
            </div>
            <div className="relative">
              <canvas ref={canvasRef} width={COLS * CELL} height={ROWS * CELL} />
              {dead && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/80 gap-3">
                  <p className="font-mono text-neon-green text-lg">game over</p>
                  <p className="font-mono text-muted text-sm">pontos: {score}</p>
                  <button onClick={reset} className="font-mono text-xs border border-neon-green text-neon-green px-4 py-1.5 rounded hover:glow-green transition-all">
                    jogar de novo
                  </button>
                </div>
              )}
            </div>
            <div className="px-4 py-2 border-t border-border bg-bg">
              <p className="font-mono text-xs text-muted text-center">← → ↑ ↓ mover · ESC fechar</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
