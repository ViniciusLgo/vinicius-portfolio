'use client'
import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  href?: string
  download?: boolean
  onClick?: () => void
  strength?: number
}

export default function MagneticButton({ children, className, href, download, onClick, strength = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 200, damping: 18 })
  const y = useSpring(0, { stiffness: 200, damping: 18 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const inner = (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      {href ? (
        <a href={href} download={download} className={className}>{children}</a>
      ) : (
        <button onClick={onClick} className={className}>{children}</button>
      )}
    </motion.div>
  )
  return inner
}
