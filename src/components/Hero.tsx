import { useEffect, useState } from 'react'
import { motion, type Variants, type Transition } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiGithub, FiLinkedin, FiDownload, FiMail, FiChevronDown, FiAward } from 'react-icons/fi'
import { SiPlatzi } from 'react-icons/si'

interface Profile {
  name: string
  title: string
  titleVariants: string[]
  description: string
  descriptionEn: string
  github: string
  linkedin: string
  email: string
  avatar: string
  cv: string
  whatsapp: string
  platzi?: string
  credly?: string
}

interface HeroProps {
  profile: Profile | null
}

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!words.length) return
    const current = words[wordIdx % words.length]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause)
        } else {
          setCharIdx((c) => c + 1)
        }
      } else {
        setDisplayed(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setWordIdx((w) => w + 1)
          setCharIdx(0)
        } else {
          setCharIdx((c) => c - 1)
        }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return displayed
}

// Subtle particle background
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.3 + 0.1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-500"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37, 99, 235, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] dark:bg-blue-500/15" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-600/10 blur-[100px] dark:bg-violet-500/10" />
    </div>
  )
}

export default function Hero({ profile }: HeroProps) {
  const { t, i18n } = useTranslation()
  const typed = useTypewriter(profile?.titleVariants ?? ['Full Stack Developer'])

  const itemTransition: Transition = { duration: 0.6, ease: 'easeOut' as const }
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } as Transition,
    },
  }
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: itemTransition },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--background)]"
    >
      <Particles />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
      >
        {/* Avatar */}
        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-blue-500/30 ring-offset-4 ring-offset-[var(--background)]">
              <img
                src={profile?.avatar ?? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format'}
                alt={profile?.name ?? 'Developer'}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-[var(--background)] flex items-center justify-center">
              <span className="w-2.5 h-2.5 bg-white rounded-full" />
            </span>
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-[var(--muted-foreground)] text-sm tracking-widest uppercase mb-3 font-medium"
        >
          {t('hero.greeting')}
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[var(--foreground)] mb-4"
        >
          {profile?.name ?? 'Duvan Andrés Gambos'}
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-500 mb-6 h-10 flex items-center justify-center"
        >
          <span>{typed}</span>
          <span className="ml-1 w-0.5 h-8 bg-blue-500 animate-pulse inline-block" />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-[var(--muted-foreground)] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {i18n.language === 'es' ? profile?.description : profile?.descriptionEn}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <motion.a
            href={profile?.cv ?? '#'}
            download
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-blue-500/25"
          >
            <FiDownload size={16} />
            {t('hero.downloadCV')}
          </motion.a>
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:border-blue-500 hover:text-blue-500 transition-all duration-200 bg-transparent cursor-pointer"
          >
            <FiMail size={16} />
            {t('hero.contact')}
          </motion.button>
          <motion.a
            href={profile?.github ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all duration-200"
            aria-label="GitHub"
          >
            <FiGithub size={18} />
          </motion.a>
          <motion.a
            href={profile?.linkedin ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-blue-500 hover:border-blue-500 transition-all duration-200"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={18} />
          </motion.a>
          {profile?.platzi && (
            <motion.a
              href={profile.platzi}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[#98ca3f] hover:border-[#98ca3f] transition-all duration-200"
              aria-label="Platzi"
            >
              <SiPlatzi size={18} />
            </motion.a>
          )}
          {profile?.credly && (
            <motion.a
              href={profile.credly}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-orange-400 hover:border-orange-400 transition-all duration-200"
              aria-label="Credly"
            >
              <FiAward size={18} />
            </motion.a>
          )}
        </motion.div>

        {/* Tech pills */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {['React', 'Node.js', 'Laravel', 'TypeScript', 'Docker', 'AWS'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full border border-[var(--border)] text-[var(--muted-foreground)] bg-[var(--secondary)] font-medium"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--muted-foreground)] cursor-pointer bg-transparent border-none"
      >
        <span className="text-xs tracking-widest uppercase">{t('hero.scrollDown')}</span>
        <FiChevronDown size={16} />
      </motion.button>
    </section>
  )
}
