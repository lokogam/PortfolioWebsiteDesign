import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  id: string
  children: React.ReactNode
  className?: string
}

export default function SectionWrapper({ id, children, className = '' }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`py-20 md:py-28 px-4 ${className}`}
    >
      {children}
    </motion.section>
  )
}

export function SectionHeader({ tag, title, subtitle }: { tag?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-14">
      {tag && <div className="section-tag mx-auto w-fit">{tag}</div>}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--muted-foreground)] text-base sm:text-lg max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
