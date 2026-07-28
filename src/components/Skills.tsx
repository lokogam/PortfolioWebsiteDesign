import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import SectionWrapper, { SectionHeader } from './SectionWrapper'
import {
  SiPhp, SiLaravel, SiJavascript, SiTypescript, SiReact, SiVuedotjs,
  SiNodedotjs, SiNestjs, SiMysql, SiPostgresql, SiMongodb, SiDocker,
  SiGit, SiLinux, SiRedis
} from 'react-icons/si'
import { FaJava, FaAws } from 'react-icons/fa'
import { useState } from 'react'

const TECH_ICONS: Record<string, React.ReactNode> = {
  PHP: <SiPhp className="text-indigo-400" />,
  Laravel: <SiLaravel className="text-red-500" />,
  Java: <FaJava className="text-orange-500" />,
  JavaScript: <SiJavascript className="text-yellow-400" />,
  TypeScript: <SiTypescript className="text-blue-400" />,
  React: <SiReact className="text-cyan-400" />,
  'Vue.js': <SiVuedotjs className="text-green-400" />,
  'Node.js': <SiNodedotjs className="text-green-500" />,
  NestJS: <SiNestjs className="text-red-400" />,
  MySQL: <SiMysql className="text-blue-500" />,
  PostgreSQL: <SiPostgresql className="text-blue-400" />,
  MongoDB: <SiMongodb className="text-green-500" />,
  Redis: <SiRedis className="text-red-500" />,
  Docker: <SiDocker className="text-blue-400" />,
  AWS: <FaAws className="text-orange-400" />,
  Git: <SiGit className="text-orange-500" />,
  Linux: <SiLinux className="text-yellow-400" />,
}

interface Skill {
  name: string
  level: number
}

interface SkillsData {
  backend: Skill[]
  frontend: Skill[]
  databases: Skill[]
  cloud: Skill[]
  devops: Skill[]
  tools: Skill[]
}

function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{TECH_ICONS[name] ?? null}</span>
          <span className="text-sm font-medium text-[var(--foreground)]">{name}</span>
        </div>
        <span className="text-xs text-[var(--muted-foreground)] font-mono">{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: delay * 0.1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function Skills({ skills }: { skills: SkillsData | null }) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<keyof SkillsData>('backend')

  const tabs: { key: keyof SkillsData; label: string }[] = [
    { key: 'backend', label: t('skills.backend') },
    { key: 'frontend', label: t('skills.frontend') },
    { key: 'databases', label: t('skills.databases') },
    { key: 'cloud', label: t('skills.cloud') },
    { key: 'devops', label: t('skills.devops') },
    { key: 'tools', label: t('skills.tools') },
  ]

  const activeSkills = skills?.[activeTab] ?? []

  return (
    <SectionWrapper id="skills">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          tag={t('skills.title')}
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
        />

        {/* Tech icon cloud */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {Object.entries(TECH_ICONS).map(([name, icon]) => (
            <motion.div
              key={name}
              whileHover={{ scale: 1.2, y: -4 }}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--card)] cursor-default min-w-[64px]"
              title={name}
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-[10px] text-[var(--muted-foreground)] font-medium">{name}</span>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 cursor-pointer border ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-transparent border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skill bars */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {activeSkills.map((skill, i) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i} />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
