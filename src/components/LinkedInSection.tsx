import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { FiLinkedin, FiExternalLink, FiBookOpen, FiAward, FiFileText } from 'react-icons/fi'

interface Profile {
  linkedin: string
  name: string
}

export default function LinkedInSection({ profile }: { profile: Profile | null }) {
  const { t } = useTranslation()

  const items = [
    {
      icon: FiBookOpen,
      label: t('linkedinSection.courses'),
      count: '12+',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      description: 'React, Node.js, AWS, Docker, TypeScript, NestJS, Vue.js...',
    },
    {
      icon: FiAward,
      label: t('linkedinSection.certifications'),
      count: '8+',
      color: 'text-violet-500',
      bg: 'bg-violet-500/10',
      description: 'AWS Cloud Practitioner, Docker, GitHub Foundations, Linux...',
    },
    {
      icon: FiFileText,
      label: t('linkedinSection.licenses'),
      count: '5+',
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
      description: 'Licencias profesionales y membresías activas.',
    },
  ]

  return (
    <SectionWrapper id="linkedin" className="bg-[var(--secondary)]/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          tag="LinkedIn"
          title={t('linkedinSection.title')}
          subtitle={t('linkedinSection.subtitle')}
        />
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass rounded-2xl border border-[var(--border)] p-6 text-center card-hover"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.bg} mx-auto mb-4 flex items-center justify-center`}>
                <item.icon className={item.color} size={24} />
              </div>
              <div className={`text-3xl font-bold ${item.color} mb-1`}>{item.count}</div>
              <div className="font-semibold text-[var(--foreground)] text-sm mb-2">{item.label}</div>
              <p className="text-[var(--muted-foreground)] text-xs leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <motion.a
            href={profile?.linkedin ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0077b5] hover:bg-[#006399] text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-blue-500/20"
          >
            <FiLinkedin size={18} />
            {t('linkedinSection.viewProfile')}
            <FiExternalLink size={14} />
          </motion.a>
        </div>
      </div>
    </SectionWrapper>
  )
}
