import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Badge {
  id: number
  name: string
  institution: string
  date: string
  image: string
  url: string
}

const VISIBLE = 4 // cards visible on desktop (fewer on mobile via CSS)

export default function Credly({ items }: { items: Badge[] | null }) {
  const { t } = useTranslation()
  const list = items ?? []
  const [index, setIndex] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(0)

  // Number of valid start positions in the track
  const maxIndex = Math.max(0, list.length - VISIBLE)

  const prev = () => {
    if (maxIndex === 0) return
    setIndex((i) => (i === 0 ? maxIndex : i - 1))
  }

  const next = () => {
    if (maxIndex === 0) return
    setIndex((i) => (i >= maxIndex ? 0 : i + 1))
  }

  // Touch/mouse drag support
  const onDragStart = (x: number) => { dragStart.current = x; setDragging(true) }
  const onDragEnd = (x: number) => {
    const delta = dragStart.current - x
    if (delta > 50) next()
    else if (delta < -50) prev()
    setDragging(false)
  }

  if (!list.length) return null

  return (
    <SectionWrapper id="credly" className="bg-[var(--secondary)]/30">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          tag="Credly"
          title={t('credly.title')}
          subtitle={t('credly.subtitle')}
        />

        <div className="relative">
          {/* Prev button */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-blue-500 transition-all cursor-pointer shadow-md"
            aria-label="Anterior"
          >
            <FiChevronLeft size={16} />
          </button>

          {/* Track */}
          <div
            className="overflow-hidden mx-6"
            onMouseDown={(e) => onDragStart(e.clientX)}
            onMouseUp={(e) => onDragEnd(e.clientX)}
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
          >
            <motion.div
              className="flex gap-4"
              animate={{ x: `calc(-${index} * (100% / ${VISIBLE} + 16px / ${VISIBLE}))` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ cursor: dragging ? 'grabbing' : 'grab' }}
            >
              {list.map((badge) => (
                <div
                  key={badge.id}
                  className="flex-shrink-0 h-full"
                  style={{ width: `calc((100% - ${(VISIBLE - 1) * 16}px) / ${VISIBLE})` }}
                >
                  <motion.a
                    href={badge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -6 }}
                    className="glass rounded-2xl border border-[var(--border)] p-5 h-[250px] flex flex-col items-center text-center gap-3 group block select-none"
                    draggable={false}
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-blue-500/20 group-hover:ring-blue-500/60 transition-all duration-300">
                      <img
                        src={badge.image}
                        alt={badge.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                    <div className="min-h-[64px]">
                      <p className="font-semibold text-[var(--foreground)] text-xs leading-tight mb-0.5 line-clamp-2">
                        {badge.name}
                      </p>
                      <p className="text-blue-500 text-xs">{badge.institution}</p>
                      <p className="text-[var(--muted-foreground)] text-xs">{badge.date}</p>
                    </div>
                    <span className="mt-auto flex items-center gap-1 text-xs text-[var(--muted-foreground)] group-hover:text-blue-500 transition-colors">
                      <FiExternalLink size={11} />
                      {t('credly.viewBadge')}
                    </span>
                  </motion.a>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Next button */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--card)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-blue-500 transition-all cursor-pointer shadow-md"
            aria-label="Siguiente"
          >
            <FiChevronRight size={16} />
          </button>
        </div>

        {/* Dots */}
        {list.length > VISIBLE && (
          <div className="flex justify-center gap-1.5 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`rounded-full transition-all duration-200 cursor-pointer border-none ${
                  i === index
                    ? 'w-6 h-2 bg-blue-500'
                    : 'w-2 h-2 bg-[var(--border)]'
                }`}
                aria-label={`Ir a ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
