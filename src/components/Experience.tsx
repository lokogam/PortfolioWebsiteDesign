import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { FiBriefcase, FiX, FiCalendar } from 'react-icons/fi'

interface ExperienceItem {
  id: number
  company: string
  role: string
  roleEn: string
  period: string
  periodEn: string
  description: string
  descriptionEn: string
  technologies: string[]
}

export default function Experience({ items }: { items: ExperienceItem[] | null }) {
  const { t, i18n } = useTranslation()
  const [selected, setSelected] = useState<ExperienceItem | null>(null)
  const list = items ?? []

  return (
    <SectionWrapper id="experience" className="bg-[var(--secondary)]/30">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          tag={t('experience.title')}
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-violet-500 to-cyan-500" />

          <div className="space-y-6">
            {list.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-[18px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--background)] border-2 border-blue-500 z-10" />

                {/* Clickable tag */}
                <motion.button
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelected(item)}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-blue-500 hover:bg-blue-500/5 transition-all duration-200 cursor-pointer w-full text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <FiBriefcase className="text-blue-500" size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[var(--foreground)] text-sm leading-tight truncate">
                      {i18n.language === 'es' ? item.role : item.roleEn}
                    </p>
                    <p className="text-blue-500 text-xs font-medium truncate">{item.company}</p>
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)] flex-shrink-0 hidden sm:block">
                    {i18n.language === 'es' ? item.period : item.periodEn}
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal popup */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="exp-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              key="exp-modal"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="fixed z-50 inset-0 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="pointer-events-auto w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl p-6 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all cursor-pointer bg-transparent"
                  aria-label="Cerrar"
                >
                  <FiX size={15} />
                </button>

                <div className="flex items-start gap-4 mb-5 pr-8">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <FiBriefcase className="text-blue-500" size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--foreground)] leading-tight">
                      {i18n.language === 'es' ? selected.role : selected.roleEn}
                    </h3>
                    <p className="text-blue-500 font-semibold text-sm mt-0.5">{selected.company}</p>
                    <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)] mt-1">
                      <FiCalendar size={11} />
                      {i18n.language === 'es' ? selected.period : selected.periodEn}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-[var(--border)] mb-5" />

                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-5">
                  {i18n.language === 'es' ? selected.description : selected.descriptionEn}
                </p>

                <div>
                  <p className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider mb-2.5">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-lg bg-blue-500/10 text-blue-500 font-medium border border-blue-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
