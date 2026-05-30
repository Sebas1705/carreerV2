import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useTheme } from './hooks/useTheme'
import { useSection } from './hooks/useSection'
import NavDots from './components/layout/NavDots'
import Controls from './components/layout/Controls'
import Background from './components/layout/Background'
import SectionDecor from './components/layout/SectionDecor'
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

// ── Arrow icons ───────────────────────────────────────────────────────────────
const ChevronUp = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 15l-6-6-6 6" />
  </svg>
)
const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
)

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const { theme, toggle: toggleTheme } = useTheme()
  const { current, direction, navigate, next, prev } = useSection()
  const { i18n, t } = useTranslation()

  const toggleLang = () => i18n.changeLanguage(i18n.language.startsWith('es') ? 'en' : 'es')
  const CurrentSection = SECTIONS[current]
  const isFirst = current === 0
  const isLast  = current === SECTIONS.length - 1

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Background />
      <Controls theme={theme} onToggleTheme={toggleTheme} onToggleLang={toggleLang} lang={i18n.language} />
      <NavDots total={SECTIONS.length} current={current} onNavigate={navigate} sectionKeys={SECTION_KEYS} />

      {/* ── Section content ── */}
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
          {/* Section-specific decorations */}
          <SectionDecor sectionKey={SECTION_KEYS[current]} />
          <CurrentSection onNext={next} onPrev={prev} />
        </motion.div>
      </AnimatePresence>

      {/* ── Left navigation pill ── */}
      <div className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-0">
        {/* Pill container — always rendered, buttons disabled at edges */}
        <div className="flex flex-col rounded-2xl border border-slate-200/90 dark:border-slate-700/70 bg-white/75 dark:bg-slate-900/75 backdrop-blur-md shadow-md overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
          <button
            onClick={prev}
            disabled={isFirst}
            aria-label={t('nav.prev', 'Previous section')}
            className="w-9 h-9 flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed text-slate-500 dark:text-slate-400 enabled:hover:text-violet-600 dark:enabled:hover:text-violet-400 enabled:hover:bg-violet-50 dark:enabled:hover:bg-violet-950/30"
          >
            <ChevronUp />
          </button>
          <button
            onClick={next}
            disabled={isLast}
            aria-label={t('nav.next', 'Next section')}
            className="w-9 h-9 flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed text-slate-500 dark:text-slate-400 enabled:hover:text-violet-600 dark:enabled:hover:text-violet-400 enabled:hover:bg-violet-50 dark:enabled:hover:bg-violet-950/30"
          >
            <ChevronDown />
          </button>
        </div>

        {/* Current section label — rotated below pill */}
        <motion.p
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {t(`nav.${SECTION_KEYS[current]}`)}
        </motion.p>
      </div>
    </div>
  )
}
