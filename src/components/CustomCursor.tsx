'use client'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Sem mouse real (touch), o cursor customizado ficaria travado em (0,0)
    setEnabled(window.matchMedia('(pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      dotRef.current?.classList.add('scale-[2.5]', 'bg-neon-blue')
      ringRef.current?.classList.add('scale-150', 'border-neon-blue')
    }
    const onLeave = () => {
      dotRef.current?.classList.remove('scale-[2.5]', 'bg-neon-blue')
      ringRef.current?.classList.remove('scale-150', 'border-neon-blue')
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    raf.current = requestAnimationFrame(animate)

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      observer.disconnect()
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-neon-green z-[9999] pointer-events-none transition-transform duration-75"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neon-green/50 z-[9999] pointer-events-none transition-[border-color,transform] duration-200"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
