import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { FiBookOpen } from 'react-icons/fi'

interface EducationItem {
  id: number
  institution: string
  degree: string
  degreeEn: string
  period: string
  periodEn?: string
  description: string
  descriptionEn: string
}

export default function Education({ items }: { items: EducationItem[] | null }) {
  const { t, i18n } = useTranslation()

  return (
    <SectionWrapper id="education">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          tag={t('education.title')}
          title={t('education.title')}
          subtitle={t('education.subtitle')}
        />
        <div className="space-y-6">
          {(items ?? []).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 border border-[var(--border)] card-hover flex gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                <FiBookOpen className="text-violet-500" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">
                  {i18n.language === 'es' ? item.degree : item.degreeEn}
                </h3>
                <p className="text-violet-400 text-sm font-medium">{item.institution}</p>
                <p className="text-[var(--muted-foreground)] text-xs mb-2">
                  {i18n.language === 'es' ? item.period : item.periodEn ?? item.period}
                </p>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                  {i18n.language === 'es' ? item.description : item.descriptionEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
