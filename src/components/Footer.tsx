import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi'

interface Profile {
  name: string
  github: string
  linkedin: string
  email: string
}

export default function Footer({ profile }: { profile: Profile | null }) {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--card)] py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        <motion.button
          onClick={scrollTop}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-blue-500 hover:border-blue-500 transition-all cursor-pointer bg-transparent"
          aria-label={t('footer.backToTop')}
        >
          <FiArrowUp size={16} />
        </motion.button>

        <span className="font-bold text-xl gradient-text">{'<DG />'}</span>

        <div className="flex items-center gap-4">
          {[
            { icon: FiGithub, href: profile?.github, label: 'GitHub' },
            { icon: FiLinkedin, href: profile?.linkedin, label: 'LinkedIn' },
            { icon: FiMail, href: `mailto:${profile?.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-blue-500 hover:border-blue-500 transition-all"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <p className="text-[var(--muted-foreground)] text-sm flex items-center gap-1.5 flex-wrap justify-center text-center">
          © {year} {profile?.name ?? 'Duvan Andrés Gambos'}. {t('footer.rights')}
          <span className="flex items-center gap-1">
            {t('footer.madeWith')} <FiHeart className="text-red-500 inline" size={12} />
          </span>
        </p>
      </div>
    </footer>
  )
}
