'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TARGET = 'hack'

export default function SecretWord() {
  const [typed, setTyped] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const next = (typed + e.key.toLowerCase()).slice(-TARGET.length)
      setTyped(next)
      if (next === TARGET) {
        setShow(true)
        setTyped('')
        setTimeout(() => setShow(false), 3500)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [typed])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] bg-surface border border-neon-green rounded-xl px-6 py-4 font-mono text-sm text-neon-green shadow-lg whitespace-nowrap"
          style={{ textShadow: '0 0 10px rgba(0,255,136,0.5)' }}
        >
          🎯 acesso concedido, hacker identificado 👾
        </motion.div>
      )}
    </AnimatePresence>
  )
}
