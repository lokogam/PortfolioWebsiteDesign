import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { FiExternalLink, FiUser } from 'react-icons/fi'

interface PlatziCourse {
  id: number
  name: string
  nameEn: string
  teacher: string
  date: string
  category: string
  image: string
  url: string
}

const categoryColors: Record<string, string> = {
  Frontend: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  Backend: 'bg-green-500/10 text-green-500 border-green-500/20',
  DevOps: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  Cloud: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  Architecture: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  Fundamentals: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  Blockchain: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  Ruta: 'bg-[#98ca3f]/15 text-[#98ca3f] border-[#98ca3f]/30',
}

export default function Platzi({ items }: { items: PlatziCourse[] | null }) {
  const { t, i18n } = useTranslation()
  const [filter, setFilter] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set((items ?? []).map((c) => c.category)))]
  const filtered = filter === 'All' ? (items ?? []) : (items ?? []).filter((c) => c.category === filter)

  return (
    <SectionWrapper id="platzi">
      <div className="max-w-6xl mx-auto">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 cursor-pointer border ${
                filter === cat
                  ? 'bg-[#98ca3f] text-black border-[#98ca3f]'
                  : 'bg-transparent border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="glass rounded-2xl border border-[var(--border)] overflow-hidden card-hover group"
            >
              <div className="h-36 overflow-hidden relative">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${categoryColors[course.category] ?? 'bg-gray-500/10 text-gray-500'}`}>
                    {course.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[var(--foreground)] text-sm mb-2 line-clamp-2">
                  {i18n.language === 'es' ? course.name : course.nameEn}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] mb-1">
                  <FiUser size={11} />
                  <span>{course.teacher}</span>
                </div>
                <p className="text-[var(--muted-foreground)] text-xs mb-3">{course.date}</p>
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-[#98ca3f] hover:opacity-80 transition-opacity"
                >
                  <FiExternalLink size={12} />
                  {t('platzi.viewCertificate')}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
