'use client'
import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const top = el.scrollTop || document.body.scrollTop
      const height = el.scrollHeight - el.clientHeight
      setPct(height > 0 ? (top / height) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-border">
      <div
        className="h-full bg-gradient-to-r from-neon-blue to-neon-green transition-[width] duration-75"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
