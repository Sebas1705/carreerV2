import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useTheme } from './hooks/useTheme'
import { useSection } from './hooks/useSection'
import NavDots from './components/layout/NavDots'
import Controls from './components/layout/Controls'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection from './components/sections/SkillsSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsSection from './components/sections/ProjectsSection'
import EducationSection from './components/sections/EducationSection'
import ContactSection from './components/sections/ContactSection'

const SECTIONS = [
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
  EducationSection,
  ContactSection,
]

const SECTION_KEYS = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact']

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '55%' : '-55%', opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-55%' : '55%', opacity: 0, scale: 0.96 }),
}

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme()
  const { current, direction, navigate, next, prev } = useSection()
  const { i18n } = useTranslation()

  const toggleLang = () => i18n.changeLanguage(i18n.language.startsWith('es') ? 'en' : 'es')
  const CurrentSection = SECTIONS[current]

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Controls theme={theme} onToggleTheme={toggleTheme} onToggleLang={toggleLang} lang={i18n.language} />
      <NavDots total={SECTIONS.length} current={current} onNavigate={navigate} sectionKeys={SECTION_KEYS} />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 350, damping: 32 },
            opacity: { duration: 0.22 },
            scale: { duration: 0.22 },
          }}
          className="absolute inset-0"
        >
          <CurrentSection onNext={next} onPrev={prev} />
        </motion.div>
      </AnimatePresence>

      {current > 0 && (
        <button
          onClick={prev}
          aria-label="Previous section"
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm items-center justify-center text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400 transition-all duration-200 cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      {current < SECTIONS.length - 1 && (
        <button
          onClick={next}
          aria-label="Next section"
          className="fixed left-4 bottom-8 z-50 hidden md:flex w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm items-center justify-center text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400 transition-all duration-200 cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  )
}
