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
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          tag={t('experience.title')}
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
        />

        <div className="relative">
          {/* Center vertical line — hidden on mobile, shown md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-violet-500 to-cyan-500" />

          {/* Mobile: left-side line */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-violet-500 to-cyan-500" />

          <div className="space-y-8">
            {list.map((item, i) => {
              const isLeft = i % 2 === 0

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="relative flex items-center md:justify-center"
                >
                  {/* ── DESKTOP layout ── */}
                  {/* Left side card */}
                  <div className={`hidden md:flex w-[calc(50%-28px)] ${isLeft ? 'justify-end' : 'invisible'}`}>
                    {isLeft && (
                      <TimelineTag item={item} isLeft onClick={() => setSelected(item)} i18n_lang={i18n.language} />
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--background)] border-2 border-blue-500 z-10 flex-shrink-0" />

                  {/* Right side card */}
                  <div className={`hidden md:flex w-[calc(50%-28px)] ${!isLeft ? 'justify-start' : 'invisible'}`}>
                    {!isLeft && (
                      <TimelineTag item={item} isLeft={false} onClick={() => setSelected(item)} i18n_lang={i18n.language} />
                    )}
                  </div>

                  {/* ── MOBILE layout ── */}
                  <div className="flex md:hidden items-center w-full pl-12">
                    {/* Dot */}
                    <div className="absolute left-[14px] w-4 h-4 rounded-full bg-[var(--background)] border-2 border-blue-500 z-10" />
                    <TimelineTag item={item} isLeft onClick={() => setSelected(item)} i18n_lang={i18n.language} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Popup modal ── */}
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

/* ── Reusable tag card ── */
function TimelineTag({
  item,
  isLeft,
  onClick,
  i18n_lang,
}: {
  item: ExperienceItem
  isLeft: boolean
  onClick: () => void
  i18n_lang: string
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, x: isLeft ? -4 : 4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-blue-500 hover:bg-blue-500/5 transition-all duration-200 cursor-pointer group w-full max-w-xs ${
        isLeft ? 'text-right flex-row-reverse' : 'text-left'
      }`}
    >
      <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
        <FiBriefcase className="text-blue-500" size={15} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[var(--foreground)] text-sm leading-tight truncate">
          {i18n_lang === 'es' ? item.role : item.roleEn}
        </p>
        <p className="text-blue-500 text-xs font-medium truncate">{item.company}</p>
        <p className="text-[var(--muted-foreground)] text-xs">{i18n_lang === 'es' ? item.period : item.periodEn}</p>
      </div>
    </motion.button>
  )
}
