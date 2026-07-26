'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  value: string
}

function parseValue(v: string): { num: number; prefix: string; suffix: string } {
  const match = v.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return { num: 0, prefix: '', suffix: v }
  return { num: parseFloat(match[2]), prefix: match[1], suffix: match[3] }
}

export default function AnimatedCounter({ value }: Props) {
  const { num, prefix, suffix } = parseValue(value)
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current || num === 0) return
    started.current = true
    const duration = 1200
    const steps = 40
    const increment = num / steps
    let step = 0
    const interval = setInterval(() => {
      step++
      setCurrent(Math.min(increment * step, num))
      if (step >= steps) clearInterval(interval)
    }, duration / steps)
    return () => clearInterval(interval)
  }, [inView, num])

  const display = num > 0 ? Math.round(current) : 0

  return (
    <span ref={ref}>
      {prefix}{num > 0 ? display : ''}{suffix}
    </span>
  )
}
