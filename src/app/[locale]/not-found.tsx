'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-8xl font-bold text-neon-green text-glow-green mb-4"
        >
          404
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border rounded-lg p-6 mb-8 text-left font-mono text-sm"
        >
          <p className="text-muted mb-1">$ <span className="text-neon-blue">cd</span> pagina-secreta</p>
          <p className="text-red-400 mb-1">bash: pagina-secreta: Arquivo ou diretório não encontrado</p>
          <p className="text-muted mb-1">$ <span className="text-neon-blue">ls</span></p>
          <p className="text-neon-green">sobre/  skills/  experiencia/  projetos/  blog/  contato/</p>
          <p className="text-muted mt-2">$ <span className="animate-pulse">▋</span></p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/pt"
            className="inline-block px-6 py-3 bg-neon-green text-bg font-semibold rounded hover:glow-green transition-all font-mono text-sm"
          >
            ← voltar para home
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
