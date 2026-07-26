'use client'
import { useEffect, useState } from 'react'

interface Spark {
  id: number
  x: number
  y: number
  color: string
}

export default function ClickBurst() {
  const [sparks, setSparks] = useState<Spark[]>([])

  useEffect(() => {
    let id = 0
    const onClick = (e: MouseEvent) => {
      const color = Math.random() > 0.5 ? '#00ff88' : '#00d4ff'
      const spark: Spark = { id: id++, x: e.clientX, y: e.clientY, color }
      setSparks(prev => [...prev, spark])
      setTimeout(() => setSparks(prev => prev.filter(s => s.id !== spark.id)), 700)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      {sparks.map(spark => (
        <div key={spark.id} style={{ position: 'absolute', left: spark.x, top: spark.y }}>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * 360
            const dist = 28 + Math.random() * 20
            const dx = Math.cos((angle * Math.PI) / 180) * dist
            const dy = Math.sin((angle * Math.PI) / 180) * dist
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: spark.color,
                  boxShadow: `0 0 6px ${spark.color}`,
                  animation: `spark-fly-${i} 0.6s ease-out forwards`,
                  '--dx': `${dx}px`,
                  '--dy': `${dy}px`,
                } as React.CSSProperties}
              />
            )
          })}
        </div>
      ))}
      <style>{`
        @keyframes spark-fly-0 { to { transform: translate(var(--dx), var(--dy)); opacity: 0; } }
        @keyframes spark-fly-1 { to { transform: translate(var(--dx), var(--dy)); opacity: 0; } }
        @keyframes spark-fly-2 { to { transform: translate(var(--dx), var(--dy)); opacity: 0; } }
        @keyframes spark-fly-3 { to { transform: translate(var(--dx), var(--dy)); opacity: 0; } }
        @keyframes spark-fly-4 { to { transform: translate(var(--dx), var(--dy)); opacity: 0; } }
        @keyframes spark-fly-5 { to { transform: translate(var(--dx), var(--dy)); opacity: 0; } }
        @keyframes spark-fly-6 { to { transform: translate(var(--dx), var(--dy)); opacity: 0; } }
        @keyframes spark-fly-7 { to { transform: translate(var(--dx), var(--dy)); opacity: 0; } }
      `}</style>
    </div>
  )
}
