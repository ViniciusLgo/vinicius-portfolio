'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props { title: string; accent?: 'green' | 'blue' }

export default function SectionTitle({ title, accent = 'green' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const color = accent === 'green' ? 'bg-neon-green' : 'bg-neon-blue'
  const glow  = accent === 'green' ? 'rgba(0,255,136,0.08)' : 'rgba(0,212,255,0.08)'

  return (
    <div ref={ref} className="relative mb-12">
      {/* Spotlight ao entrar na tela */}
      <motion.div
        className="absolute -inset-6 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        style={{ background: `radial-gradient(ellipse at 0% 50%, ${glow}, transparent 70%)` }}
      />
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-text relative"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: 64 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`h-0.5 mt-2 ${color}`}
      />
    </div>
  )
}
