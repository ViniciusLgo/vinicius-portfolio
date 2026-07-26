'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import ContactForm from '@/components/ContactForm'
import { showToast } from '@/components/Toast'

const socials = [
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/viniciuslagocruz', icon: '🔗' },
  { label: 'GitHub',    href: 'https://github.com/ViniciusLgo',           icon: '🐙' },
  { label: 'WhatsApp',  href: 'https://wa.me/5571999760418',               icon: '💬' },
]

const EMAIL = 'vinicruzlago@gmail.com'

export default function Contact() {
  const t = useTranslations('contact')

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL)
    showToast('E-mail copiado! 📋')
  }

  return (
    <section id="contato" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <p className="text-muted text-sm mb-5 leading-relaxed">
              Aberto a oportunidades de Backend e Full Stack. Respondo em até 24h.
            </p>

            <button onClick={copyEmail}
              className="w-full flex items-center justify-between p-4 bg-surface border border-border rounded-lg hover:border-neon-green group transition-all noise-card"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">📧</span>
                <div className="text-left">
                  <p className="font-mono text-sm text-neon-green">{EMAIL}</p>
                  <p className="text-xs text-muted mt-0.5">clique para copiar</p>
                </div>
              </div>
              <span className="text-muted group-hover:text-neon-green transition-colors">📋</span>
            </button>

            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-surface border border-border rounded-lg hover:border-neon-green group transition-all noise-card"
              >
                <span className="text-lg">{s.icon}</span>
                <span className="font-mono text-sm text-text/80 group-hover:text-neon-green transition-colors flex-1">
                  {s.label}
                </span>
                <span className="text-muted group-hover:text-neon-green transition-colors text-sm">↗</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
