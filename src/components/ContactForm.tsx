'use client'
import { useTranslations } from 'next-intl'
import { useState, useRef } from 'react'
import emailjs from 'emailjs-com'
import Confetti from '@/components/Confetti'

const MAX_MSG = 1000
const MIN_FILL_TIME_MS = 3000
const RATE_LIMIT_MS = 60_000
const RATE_LIMIT_KEY = 'contact_last_submit'

export default function ContactForm() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'rate-limited'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [confetti, setConfetti] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const mountedAt = useRef(Date.now())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot: bots fill every field, humans never see this one.
    if (honeypot) {
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      return
    }

    // Time-trap: a real person takes at least a few seconds to fill the form.
    if (Date.now() - mountedAt.current < MIN_FILL_TIME_MS) {
      setStatus('error')
      return
    }

    const lastSubmit = Number(localStorage.getItem(RATE_LIMIT_KEY) ?? 0)
    if (Date.now() - lastSubmit < RATE_LIMIT_MS) {
      setStatus('rate-limited')
      return
    }

    setStatus('loading')
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { from_name: form.name, from_email: form.email, message: form.message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()))
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setConfetti(true)
      setTimeout(() => setConfetti(false), 4000)
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full bg-bg border border-border rounded-lg px-4 py-3 text-text text-sm focus:outline-none focus:border-neon-green transition-colors placeholder:text-muted'

  return (
    <>
      <Confetti active={confetti} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] w-px h-px opacity-0"
        />
        <input required type="text" placeholder={t('name')} value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} />
        <input required type="email" placeholder={t('email')} value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} />
        <div className="relative">
          <textarea required rows={5} placeholder={t('message')} value={form.message}
            maxLength={MAX_MSG}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            className={inputClass + ' resize-none pb-8'} />
          <span className={`absolute bottom-3 right-3 text-xs font-mono transition-colors ${
            form.message.length > MAX_MSG * 0.9 ? 'text-red-400' : 'text-muted/50'
          }`}>
            {form.message.length}/{MAX_MSG}
          </span>
        </div>
        <button type="submit" disabled={status === 'loading'}
          className="w-full py-3 bg-neon-green text-bg font-semibold rounded-lg hover:glow-green transition-all disabled:opacity-50 text-sm">
          {status === 'loading' ? t('sending') : t('send')}
        </button>
        {status === 'success'      && <p className="text-neon-green text-sm text-center">{t('success')}</p>}
        {status === 'error'        && <p className="text-red-400 text-sm text-center">{t('error')}</p>}
        {status === 'rate-limited' && <p className="text-red-400 text-sm text-center">{t('rateLimited')}</p>}
      </form>
    </>
  )
}
