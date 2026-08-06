import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi'
import { SiWhatsapp } from 'react-icons/si'

interface Profile {
  github: string
  linkedin: string
  email: string
  whatsapp: string
}

export default function Contact({ profile }: { profile: Profile | null }) {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitState, setSubmitState] = useState<'success' | 'error' | null>(null)
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSubmitState(null)

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS config missing. Check VITE_EMAILJS_* variables at build time.')
      setSubmitState('error')
      setLoading(false)
      return
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        { ...form, subject: 'Portfolio contact' },
        publicKey,
      )

      setSent(true)
      setSubmitState('success')
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('EmailJS send error:', error)
      setSubmitState('error')
    } finally {
      setLoading(false)
    }
  }

  const socials = [
    { icon: FiLinkedin, href: profile?.linkedin, label: 'LinkedIn', color: 'hover:text-[#0077b5] hover:border-[#0077b5]' },
    { icon: FiGithub, href: profile?.github, label: 'GitHub', color: 'hover:text-[var(--foreground)] hover:border-[var(--foreground)]' },
    { icon: FiMail, href: `mailto:${profile?.email}`, label: 'Email', color: 'hover:text-red-500 hover:border-red-500' },
    { icon: SiWhatsapp, href: `https://wa.me/${profile?.whatsapp}`, label: 'WhatsApp', color: 'hover:text-green-500 hover:border-green-500' },
  ]

  return (
    <SectionWrapper id="contact" className="bg-[var(--secondary)]/30">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          tag={t('contact.title')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />
        <div className="grid md:grid-cols-2 gap-12">
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              {t('contact.subtitle')}. {t('contact.platforms')}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-4 rounded-xl border border-[var(--border)] text-[var(--muted-foreground)] transition-all duration-200 ${color}`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl border border-green-500/20 p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 mx-auto mb-4 flex items-center justify-center">
                  <FiSend className="text-green-500" size={28} />
                </div>
                <p className="text-green-500 font-semibold">{t('contact.success')}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitState && (
                  <div
                    role="alert"
                    aria-live="polite"
                    className={`rounded-xl border p-4 text-sm font-medium ${
                      submitState === 'success'
                        ? 'border-green-500/30 bg-green-500/10 text-green-500'
                        : 'border-red-500/30 bg-red-500/10 text-red-500'
                    }`}
                  >
                    {submitState === 'success'
                      ? t('contact.success')
                      : 'No se pudo enviar el mensaje. Revisa tu conexión e inténtalo de nuevo.'}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t('contact.namePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t('contact.emailPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    {t('contact.message')}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer border-none shadow-lg shadow-blue-500/25"
                >
                  <FiSend size={16} />
                  {loading ? t('contact.sending') : t('contact.send')}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
