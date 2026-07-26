'use client'
import { motion } from 'framer-motion'

const TECHS = [
  { name: 'Java',       color: '#f89820', x: '8%',  y: '20%', delay: 0 },
  { name: 'Spring',     color: '#6db33f', x: '80%', y: '15%', delay: 0.5 },
  { name: 'Laravel',    color: '#ff2d20', x: '90%', y: '60%', delay: 1 },
  { name: 'Next.js',    color: '#e2e8f0', x: '5%',  y: '70%', delay: 1.5 },
  { name: 'PHP',        color: '#8892be', x: '75%', y: '80%', delay: 0.8 },
  { name: 'Docker',     color: '#2496ed', x: '15%', y: '85%', delay: 1.2 },
  { name: 'MySQL',      color: '#00758f', x: '85%', y: '40%', delay: 0.3 },
  { name: 'Linux',      color: '#fcc624', x: '3%',  y: '45%', delay: 1.8 },
]

export default function FloatingTechIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {TECHS.map((tech, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:flex"
          style={{ left: tech.x, top: tech.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: tech.delay + 0.8, duration: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3 + i * 0.4, ease: 'easeInOut', delay: i * 0.3 }}
            className="text-xs font-mono px-2 py-1 rounded border"
            style={{ color: tech.color, borderColor: `${tech.color}30`, background: `${tech.color}08` }}
          >
            {tech.name}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
