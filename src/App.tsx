import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SiWhatsapp } from 'react-icons/si'
import { FiArrowUp } from 'react-icons/fi'

import './i18n'
import { useTheme } from './hooks/useTheme'
import { useData } from './hooks/useData'

import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Credly from './components/Credly'
import LinkedInSection from './components/LinkedInSection'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { dark, toggle } = useTheme()
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackTop, setShowBackTop] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const { data: profile } = useData<any>('/data/profile.json')
  const { data: experience } = useData<any[]>('/data/experience.json')
  const { data: education } = useData<any[]>('/data/education.json')
  const { data: projects } = useData<any[]>('/data/projects.json')
  const { data: skills } = useData<any>('/data/skills.json')
  const { data: certificates } = useData<any[]>('/data/certificates.json')
  const { data: credly } = useData<any[]>('/data/credly.json')

  // Loader
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(t)
  }, [])

  // Scroll progress + back to top
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0)
      setShowBackTop(scrolled > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Custom cursor (desktop only)
  useEffect(() => {
    if (window.innerWidth < 768) return
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 10}px`
        cursorRef.current.style.top = `${e.clientY - 10}px`
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 3}px`
        dotRef.current.style.top = `${e.clientY - 3}px`
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <Loader show={loading} />

      {/* Scroll progress bar */}
      <div
        id="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Custom cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={dotRef} className="custom-cursor-dot hidden md:block" />

      {/* WhatsApp floating button */}
      <AnimatePresence>
        {!loading && (
          <motion.a
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, type: 'spring' }}
            href={`https://wa.me/${profile?.whatsapp ?? '573156334898'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
            aria-label="WhatsApp"
          >
            <SiWhatsapp size={26} />
          </motion.a>
        )}
      </AnimatePresence>

      {/* Back to top */}
      <AnimatePresence>
        {showBackTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="back-to-top"
            aria-label="Back to top"
          >
            <FiArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
          <Navbar dark={dark} toggleTheme={toggle} />
          <main>
            <Hero profile={profile} />
            <About profile={profile} />
            <Skills skills={skills} />
            <Experience items={experience} />
            <Education items={education} />
            <Projects items={projects} />
            <Certificates items={certificates} />
            <Credly items={credly} />
            <LinkedInSection profile={profile} />
            <Achievements stats={profile?.stats} />
            <Contact profile={profile} />
          </main>
          <Footer profile={profile} />
        </div>
      )}
    </>
  )
}
