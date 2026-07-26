'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ToastItem { id: number; message: string; type?: 'success' | 'info' }

let toastId = 0
const listeners: ((t: ToastItem) => void)[] = []

export function showToast(message: string, type: 'success' | 'info' = 'success') {
  listeners.forEach(fn => fn({ id: toastId++, message, type }))
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    const fn = (t: ToastItem) => {
      setToasts(prev => [...prev, t])
      setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 3000)
    }
    listeners.push(fn)
    return () => { const i = listeners.indexOf(fn); if (i > -1) listeners.splice(i, 1) }
  }, [])

  return (
    <div className="fixed top-20 right-6 z-[9995] space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className={`px-4 py-3 rounded-lg border font-mono text-sm shadow-lg ${
              t.type === 'info'
                ? 'bg-surface border-neon-blue text-neon-blue'
                : 'bg-surface border-neon-green text-neon-green'
            }`}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
