import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import { FiBriefcase, FiCode, FiAward, FiCpu } from 'react-icons/fi'

interface Stats {
  experience: number
  projects: number
  certificates: number
  technologies: number
}

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(target / 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 20)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function Achievements({ stats }: { stats: Stats | null }) {
  const { t } = useTranslation()

  const cards = [
    { icon: FiBriefcase, label: t('achievements.experience'), value: stats?.experience ?? 5, suffix: '+', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { icon: FiCode, label: t('achievements.projects'), value: stats?.projects ?? 30, suffix: '+', color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { icon: FiAward, label: t('achievements.certificates'), value: stats?.certificates ?? 25, suffix: '+', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { icon: FiCpu, label: t('achievements.technologies'), value: stats?.technologies ?? 17, suffix: '+', color: 'text-green-500', bg: 'bg-green-500/10' },
  ]

  return (
    <SectionWrapper id="achievements">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          tag={t('achievements.title')}
          title={t('achievements.title')}
          subtitle={t('achievements.subtitle')}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass rounded-2xl border border-[var(--border)] p-6 text-center card-hover"
            >
              <div className={`w-12 h-12 rounded-xl ${card.bg} mx-auto mb-4 flex items-center justify-center`}>
                <card.icon className={card.color} size={22} />
              </div>
              <div className={`text-3xl sm:text-4xl font-bold ${card.color} mb-2`}>
                <Counter target={card.value} suffix={card.suffix} />
              </div>
              <p className="text-[var(--muted-foreground)] text-xs leading-tight">{card.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
