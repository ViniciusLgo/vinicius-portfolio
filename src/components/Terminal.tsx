'use client'
import { useEffect, useState, useRef, useCallback } from 'react'

const lines = [
  { cmd: '$ whoami', out: 'vinicius-lago-cruz' },
  { cmd: '$ cat role.txt', out: 'Backend / Full Stack Developer' },
  { cmd: '$ cat stack.json', out: '{ "backend": ["Java", "Spring", "PHP", "Laravel"],\n  "frontend": ["Next.js", "TypeScript", "React"],\n  "infra": ["Linux", "Docker", "Nginx"] }' },
  { cmd: '$ git log --oneline -3', out: '✓ 4 sistemas em produção\n✓ ~60 usuários ativos\n✓ 4+ anos em TI' },
]

function useTypeSound() {
  const ctx = useRef<AudioContext | null>(null)

  const beep = useCallback(() => {
    try {
      if (!ctx.current) ctx.current = new AudioContext()
      const ac = ctx.current
      const osc = ac.createOscillator()
      const gain = ac.createGain()
      osc.connect(gain)
      gain.connect(ac.destination)
      osc.frequency.setValueAtTime(880 + Math.random() * 220, ac.currentTime)
      osc.type = 'square'
      gain.gain.setValueAtTime(0.04, ac.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.04)
      osc.start(ac.currentTime)
      osc.stop(ac.currentTime + 0.04)
    } catch { /* sem suporte */ }
  }, [])

  return beep
}

export default function Terminal() {
  const [completedLines, setCompletedLines] = useState<typeof lines>([])
  const [currentLineIdx, setCurrentLineIdx] = useState(0)
  const [typedCmd, setTypedCmd] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const beep = useTypeSound()

  useEffect(() => {
    if (currentLineIdx >= lines.length) return
    const line = lines[currentLineIdx]
    let charIdx = 0
    setTypedCmd('')
    setShowOutput(false)

    const typeInterval = setInterval(() => {
      charIdx++
      setTypedCmd(line.cmd.slice(0, charIdx))
      if (soundEnabled) beep()
      if (charIdx >= line.cmd.length) {
        clearInterval(typeInterval)
        setTimeout(() => {
          setShowOutput(true)
          setTimeout(() => {
            setCompletedLines(prev => [...prev, line])
            setCurrentLineIdx(idx => idx + 1)
          }, 700)
        }, 250)
      }
    }, 45)

    return () => clearInterval(typeInterval)
  }, [currentLineIdx, soundEnabled, beep])

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden font-mono text-sm noise-card">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-bg">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-muted text-xs flex-1">vinicius@portfolio:~</span>
        <button
          onClick={() => setSoundEnabled(v => !v)}
          title={soundEnabled ? 'Desligar som' : 'Ligar som'}
          className={`text-xs transition-colors ${soundEnabled ? 'text-neon-green' : 'text-muted/40 hover:text-muted'}`}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>
      <div className="p-4 space-y-3 min-h-[240px]">
        {completedLines.map((l, i) => (
          <div key={i}>
            <div className="text-neon-green">{l.cmd}</div>
            <div className="text-text/70 whitespace-pre mt-0.5">{l.out}</div>
          </div>
        ))}
        {currentLineIdx < lines.length && (
          <div>
            <div>
              <span className="text-neon-green">{typedCmd}</span>
              <span className="animate-pulse text-neon-green ml-0.5">▋</span>
            </div>
            {showOutput && (
              <div className="text-text/70 whitespace-pre mt-0.5">
                {lines[currentLineIdx].out}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
