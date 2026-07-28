import { useTranslation } from 'react-i18next'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface Profile {
  name: string
  about: string
  aboutEn: string
  location: string
  email: string
  phone: string
  avatar: string
}

export default function About({ profile }: { profile: Profile | null }) {
  const { t, i18n } = useTranslation()

  const aboutText = i18n.language === 'es' ? profile?.about : profile?.aboutEn

  return (
    <SectionWrapper id="about" className="bg-[var(--secondary)]/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag={t('about.title')}
          title={t('about.title')}
          subtitle={t('about.subtitle')}
        />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden">
                <img
                  src={profile?.avatar ?? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format'}
                  alt={profile?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-blue-500/30 pointer-events-none" />
              <div className="absolute -top-3 -left-3 w-24 h-24 rounded-xl bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-blue-500">5+</span>
                <span className="text-xs text-[var(--muted-foreground)] text-center leading-tight">Años exp.</span>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[var(--muted-foreground)] text-base leading-relaxed mb-8">
              {aboutText}
            </p>
            <div className="space-y-3">
              {[
                { icon: FiMapPin, label: profile?.location ?? 'Colombia' },
                { icon: FiMail, label: profile?.email ?? 'duvan@example.com' },
                { icon: FiPhone, label: profile?.phone ?? '+57 300 000 0000' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-[var(--muted-foreground)] text-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Icon size={14} className="text-blue-500" />
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
