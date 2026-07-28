import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { FiGithub, FiExternalLink, FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Project {
  id: number
  name: string
  description: string
  descriptionEn: string
  image: string
  technologies: string[]
  github: string
  demo: string
  status: string
  statusEn: string
  date: string
}

const PAGE_SIZE = 3

const statusColors: Record<string, string> = {
  Completado: 'bg-green-500/10 text-green-500 border-green-500/20',
  Completed: 'bg-green-500/10 text-green-500 border-green-500/20',
  'En desarrollo': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'In Development': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  Activo: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  Active: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
}

export default function Projects({ items }: { items: Project[] | null }) {
  const { t, i18n } = useTranslation()
  const [page, setPage] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  const list = items ?? []
  const totalPages = Math.ceil(list.length / PAGE_SIZE)
  const paged = list.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  const goTo = (p: number) => {
    setPage(p)
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <SectionWrapper id="projects" className="bg-[var(--secondary)]/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag={t('projects.title')}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          >
            {paged.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                className="group glass rounded-2xl border border-[var(--border)] overflow-hidden card-hover"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusColors[i18n.language === 'es' ? project.status : project.statusEn] ?? 'bg-gray-500/10 text-gray-500'}`}>
                      {i18n.language === 'es' ? project.status : project.statusEn}
                    </span>
                  </div>
                  <AnimatePresence>
                    {hovered === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 backdrop-blur-sm"
                      >
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            aria-label="GitHub"
                          >
                            <FiGithub size={18} />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-blue-500/80 flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                            aria-label="Demo"
                          >
                            <FiExternalLink size={18} />
                          </a>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <FiCalendar size={11} className="text-[var(--muted-foreground)]" />
                    <span className="text-xs text-[var(--muted-foreground)]">{project.date}</span>
                  </div>
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">{project.name}</h3>
                  <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-4 line-clamp-3">
                    {i18n.language === 'es' ? project.description : project.descriptionEn}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs rounded-md bg-[var(--secondary)] text-[var(--muted-foreground)] border border-[var(--border)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer bg-transparent"
              aria-label="Anterior"
            >
              <FiChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all cursor-pointer border ${
                  i === page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-transparent border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-blue-500'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages - 1}
              className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer bg-transparent"
              aria-label="Siguiente"
            >
              <FiChevronRight size={16} />
            </button>

            <span className="text-xs text-[var(--muted-foreground)] ml-2">
              {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, list.length)} de {list.length}
            </span>
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
