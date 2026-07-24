'use client'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import ContactForm from '@/components/ContactForm'

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/viniciuslagocruz', accent: 'neon-blue' },
  { label: 'GitHub', href: 'https://github.com/ViniciusLgo', accent: 'neon-green' },
  { label: 'Email', href: 'mailto:vinicruzlago@gmail.com', accent: 'neon-green' },
  { label: 'WhatsApp', href: 'https://wa.me/5571999760418', accent: 'neon-blue' },
] as const

export default function Contact() {
  const t = useTranslations('contact')

  return (
    <section id="contato" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title={t('title')} />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ContactForm />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-4 bg-surface border border-border rounded-lg hover:border-${s.accent} transition-all group`}
              >
                <span className={`font-mono text-sm text-${s.accent}`}>{s.label}</span>
                <span className="text-muted text-sm">↗</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
