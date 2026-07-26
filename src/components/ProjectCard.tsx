'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { Project } from '@/data/types'

interface Props {
  project: Project
  locale: 'pt' | 'en'
  onClick: () => void
}

export default function ProjectCard({ project, locale, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 25 })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 25 })
  const glowX = useSpring(useTransform(rawX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 20 })
  const glowY = useSpring(useTransform(rawY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 20 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rawX.set(px - 0.5)
    rawY.set(py - 0.5)
    ref.current.style.setProperty('--holo-x', `${px * 100}%`)
    ref.current.style.setProperty('--holo-y', `${py * 100}%`)
    ref.current.style.setProperty('--holo-hue', `${Math.round(px * 360)}`)
  }
  const onMouseLeave = () => { rawX.set(0); rawY.set(0) }

  return (
    /* perspective fica no pai para o 3D funcionar */
    <div style={{ perspective: '900px' }} className="w-full">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className="relative bg-surface border border-border rounded-lg p-6 cursor-pointer group neon-border-spin noise-card holo-card transition-colors duration-300 will-change-transform"
      >
        {/* Spotlight interno seguindo o mouse */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0,255,136,0.07) 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3 gap-2">
            <h3 className="font-semibold text-text group-hover:text-neon-green transition-colors">
              {project.title}
            </h3>
            <span className={`text-xs font-mono border px-2 py-0.5 rounded shrink-0 whitespace-nowrap ${
              project.status === 'production' || project.status === 'production-internal'
                ? 'text-neon-green border-neon-green/40'
                : 'text-neon-blue border-neon-blue/30'
            }`}>
              {project.statusLabel[locale]}
            </span>
          </div>
          <p className="text-text/60 text-sm mb-4 leading-relaxed">
            {project.shortDesc[locale]}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((s, i) => (
              <span key={i} className="text-xs font-mono bg-bg border border-border px-2 py-0.5 rounded text-muted group-hover:border-neon-green/30 transition-colors">
                {s}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="text-xs font-mono text-muted self-center">+{project.stack.length - 4}</span>
            )}
          </div>
          <div className="mt-4 text-xs font-mono text-neon-green/0 group-hover:text-neon-green/60 transition-colors duration-300">
            clique para detalhes →
          </div>
        </div>
      </motion.div>
    </div>
  )
}
