import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { FiExternalLink, FiAward, FiX, FiCalendar, FiChevronRight } from 'react-icons/fi'

interface Certificate {
  id: number
  name: string
  nameEn: string
  institution: string
  institutionKey: string
  date: string
  image: string
  url: string
}

// Institution brand colors
const institutionStyle: Record<string, { color: string; bg: string; border: string }> = {
  AWS:        { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  Udemy:      { color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
  Platzi:     { color: 'text-[#98ca3f]',  bg: 'bg-[#98ca3f]/10',  border: 'border-[#98ca3f]/30' },
  Cisco:      { color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/30' },
  Coursera:   { color: 'text-sky-400',    bg: 'bg-sky-500/10',    border: 'border-sky-500/30' },
  LinkedIn:   { color: 'text-[#0a66c2]',  bg: 'bg-[#0a66c2]/10',  border: 'border-[#0a66c2]/30' },
  Microsoft:  { color: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/30' },
  MinCiencias:{ color: 'text-fuchsia-400',bg: 'bg-fuchsia-500/10',border: 'border-fuchsia-500/30' },
  UNAD:       { color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30' },
  SENA:       { color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/30' },
  Google:     { color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/30' },
  Laravel:    { color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/30' },
  DEFAULT:    { color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/30' },
}

function getStyle(key: string) {
  return institutionStyle[key] ?? institutionStyle.DEFAULT
}

export default function Certificates({ items }: { items: Certificate[] | null }) {
  const { t, i18n } = useTranslation()
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  const list = items ?? []

  // Group by institution
  const groups: Record<string, Certificate[]> = {}
  for (const cert of list) {
    const key = cert.institutionKey ?? cert.institution
    if (!groups[key]) groups[key] = []
    groups[key].push(cert)
  }

  const groupEntries = Object.entries(groups)
  const activeGroup = openGroup ? groups[openGroup] ?? [] : []

  return (
    <SectionWrapper id="certificates">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          tag={t('certificates.title')}
          title={t('certificates.title')}
          subtitle={t('certificates.subtitle')}
        />

        {/* Institution cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {groupEntries.map(([key, certs], i) => {
            const style = getStyle(key)
            return (
              <motion.button
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setOpenGroup(key)}
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border ${style.border} ${style.bg} cursor-pointer transition-all duration-200 hover:shadow-lg group`}
              >
                <div className={`w-12 h-12 rounded-xl ${style.bg} border ${style.border} flex items-center justify-center`}>
                  <FiAward className={style.color} size={22} />
                </div>
                <div className="text-center">
                  <p className={`font-bold text-sm ${style.color}`}>{key}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                    {certs.length} {certs.length === 1 ? 'cert.' : 'certs.'}
                  </p>
                </div>
                <FiChevronRight size={14} className={`${style.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Modal: certificate list for institution */}
      <AnimatePresence>
        {openGroup && (
          <>
            <motion.div
              key="cert-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenGroup(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              key="cert-modal"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="fixed z-50 inset-0 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="pointer-events-auto w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl flex flex-col"
                style={{ maxHeight: '80vh' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${getStyle(openGroup).bg} border ${getStyle(openGroup).border} flex items-center justify-center`}>
                      <FiAward className={getStyle(openGroup).color} size={17} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--foreground)] text-base leading-tight">{openGroup}</h3>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {activeGroup.length} certificado{activeGroup.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpenGroup(null)}
                    className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all cursor-pointer bg-transparent"
                    aria-label="Cerrar"
                  >
                    <FiX size={15} />
                  </button>
                </div>

                {/* Scrollable list */}
                <div className="overflow-y-auto flex-1 p-4 space-y-3">
                  {activeGroup.map((cert, i) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.06 }}
                      className="flex gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-blue-500/40 transition-colors group"
                    >
                      {/* Thumbnail */}
                      <div className="h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--secondary)]">
                        <img
                          src={cert.image}
                          alt={cert.name}
                          className="h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[var(--foreground)] text-sm leading-tight mb-1 line-clamp-2">
                          {i18n.language === 'es' ? cert.name : cert.nameEn}
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                            <FiCalendar size={10} />
                            {cert.date}
                          </span>
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1 text-xs font-medium ${getStyle(openGroup).color} opacity-70 hover:opacity-100 transition-opacity`}
                          >
                            <FiExternalLink size={11} />
                            {t('certificates.viewCertificate')}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
