'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const AXES = [
  { label: 'Back-end',    value: 92 },
  { label: 'Front-end',   value: 78 },
  { label: 'Banco de Dados', value: 82 },
  { label: 'Infra/DevOps', value: 88 },
  { label: 'Cloud/Deploy', value: 80 },
]

const SIZE = 260
const CX = SIZE / 2
const CY = SIZE / 2
const R = 100
const LEVELS = 4

function polar(angle: number, r: number) {
  const rad = (angle - 90) * (Math.PI / 180)
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }
}

export default function SkillRadar() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState<number | null>(null)

  const angleStep = 360 / AXES.length

  const gridPolygons = Array.from({ length: LEVELS }, (_, lvl) => {
    const r = R * ((lvl + 1) / LEVELS)
    return AXES.map((_, i) => {
      const pt = polar(i * angleStep, r)
      return `${pt.x},${pt.y}`
    }).join(' ')
  })

  const dataPoints = AXES.map((ax, i) => {
    const r = R * (ax.value / 100)
    return polar(i * angleStep, r)
  })
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        ref={ref}
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="overflow-visible"
      >
        {/* Grid rings */}
        {gridPolygons.map((pts, lvl) => (
          <polygon key={lvl} points={pts} fill="none" stroke="rgba(0,212,255,0.12)" strokeWidth="1" />
        ))}

        {/* Axis lines */}
        {AXES.map((_, i) => {
          const outer = polar(i * angleStep, R)
          return <line key={i} x1={CX} y1={CY} x2={outer.x} y2={outer.y} stroke="rgba(0,212,255,0.15)" strokeWidth="1" />
        })}

        {/* Data fill */}
        <motion.path
          d={dataPath}
          fill="rgba(0,255,136,0.12)"
          stroke="#00ff88"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Data points + hover */}
        {dataPoints.map((pt, i) => (
          <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <circle cx={pt.x} cy={pt.y} r={12} fill="transparent" />
            <motion.circle
              cx={pt.x} cy={pt.y}
              r={hovered === i ? 6 : 4}
              fill={hovered === i ? '#00d4ff' : '#00ff88'}
              style={{ filter: 'drop-shadow(0 0 4px #00ff88)' }}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.08 }}
            />
            {hovered === i && (
              <text x={pt.x} y={pt.y - 12} textAnchor="middle" fill="#00d4ff" fontSize="10" fontFamily="monospace">
                {AXES[i].value}%
              </text>
            )}
          </g>
        ))}

        {/* Labels */}
        {AXES.map((ax, i) => {
          const outer = polar(i * angleStep, R + 22)
          return (
            <text
              key={i}
              x={outer.x}
              y={outer.y + 4}
              textAnchor="middle"
              fill={hovered === i ? '#00d4ff' : 'rgba(226,232,240,0.7)'}
              fontSize="9"
              fontFamily="monospace"
            >
              {ax.label}
            </text>
          )
        })}
      </svg>

      <div className="flex flex-wrap justify-center gap-3">
        {AXES.map((ax, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`text-xs font-mono px-3 py-1 rounded-full border transition-all cursor-default ${
              hovered === i
                ? 'border-neon-blue text-neon-blue bg-neon-blue/10'
                : 'border-border text-muted'
            }`}
          >
            {ax.label} · {ax.value}%
          </div>
        ))}
      </div>
    </div>
  )
}
