import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'

interface NavbarProps {
  dark: boolean
  toggleTheme: () => void
}

const navLinks = [
  'about', 'skills', 'experience', 'projects', 'certificates', 'credly', 'achievements', 'contact'
] as const

export default function Navbar({ dark, toggleTheme }: NavbarProps) {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navLinks.map((id) => document.getElementById(id))
      const current = sections.find((s) => {
        if (!s) return false
        const rect = s.getBoundingClientRect()
        return rect.top <= 92 && rect.bottom >= 92
      })
      if (current) setActive(current.id)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    const element = document.querySelector<HTMLElement>(`#${id}`)
    if (!element) return
    const offset = 72
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset
    requestAnimationFrame(() => {
      window.scrollTo({ top, behavior: 'smooth' })
    })
    setActive(id)
  }

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-xl border-b border-[var(--border)] ${
        scrolled
          ? 'glass shadow-lg shadow-black/5 bg-[var(--background)]/90'
          : 'bg-[var(--background)]/80'
      }`}
    >
      <div className="relative max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-8 h-16 flex items-center justify-between gap-2 overflow-hidden">
        {/* Logo */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          className="font-bold text-xl tracking-tight gradient-text cursor-pointer bg-transparent border-none flex-shrink-0"
        >
          {'<DG />'}
        </motion.button>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1 min-w-0">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link}
              onClick={() => scrollTo(link)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 cursor-pointer bg-transparent border-none font-medium whitespace-nowrap ${
                active === link
                  ? 'text-blue-500 bg-blue-500/10'
                  : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]'
              }`}
            >
              {t(`nav.${link}`)}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-shrink-0">
          <button
            onClick={toggleLang}
            className="px-2 py-1 text-[10px] sm:text-xs font-semibold rounded-lg border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-blue-500 transition-all duration-200 cursor-pointer bg-transparent uppercase tracking-wider"
          >
            {i18n.language === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-blue-500 transition-all duration-200 cursor-pointer bg-transparent"
            aria-label="Toggle theme"
          >
            {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center cursor-pointer bg-transparent text-[var(--foreground)]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={16} /> : <FiMenu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden glass border-t border-[var(--border)] px-4 pb-4 pt-2"
          >
            {navLinks.map((link) => (
              <button
                type="button"
                key={link}
                onClick={() => scrollTo(link)}
                className="block w-full text-left px-3 py-2.5 text-sm rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors duration-200 cursor-pointer bg-transparent border-none"
              >
                {t(`nav.${link}`)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
