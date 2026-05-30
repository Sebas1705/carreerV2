import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SKILLS, type Skill, type SkillCategory } from '../../data/skills'

// ── Tab definitions ───────────────────────────────────────────────────────────
type Tab = 'languages' | 'frameworks' | 'tools' | 'databases' | 'architecture' | 'other'

const TABS: Tab[] = ['languages', 'frameworks', 'tools', 'databases', 'architecture', 'other']

const TAB_CATEGORIES: Record<Tab, SkillCategory[]> = {
  languages:    ['languages'],
  frameworks:   ['frameworks'],
  tools:        ['tools'],
  databases:    ['databases', 'cloud'],
  architecture: ['architecture', 'methodologies'],
  other:        ['ides', 'os', 'ai'],
}

// Skill chip color per tab
const TAB_CHIP: Record<Tab, { top: string; more: string }> = {
  languages:    { top: 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-800/50', more: 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-500 border-slate-100 dark:border-slate-800/30' },
  frameworks:   { top: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800/50', more: 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-500 border-slate-100 dark:border-slate-800/30' },
  tools:        { top: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700', more: 'bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800/30' },
  databases:    { top: 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border-sky-100 dark:border-sky-800/50', more: 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-500 border-slate-100 dark:border-slate-800/30' },
  architecture: { top: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800/50', more: 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-500 border-slate-100 dark:border-slate-800/30' },
  other:        { top: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800/50', more: 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-500 border-slate-100 dark:border-slate-800/30' },
}

// Soft skill icons (same order as softList in i18n)
const SOFT_ICONS = ['🤝', '💬', '🧩', '🔄', '🚀', '⏰', '🤔', '📚', '🔍', '💡', '❤️', '💪']

// ── Skill chip ────────────────────────────────────────────────────────────────
function SkillChip({ skill, chipClass }: { skill: Skill; chipClass: string }) {
  const [imgOk, setImgOk] = useState(true)

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[11px] font-medium select-none ${chipClass}`}
    >
      {skill.iconUrl && imgOk ? (
        <img
          src={skill.iconUrl}
          alt={skill.name}
          className="w-3.5 h-3.5 object-contain shrink-0"
          onError={() => setImgOk(false)}
        />
      ) : (
        <span className="w-3.5 h-3.5 rounded-sm bg-current/10 text-[8px] flex items-center justify-center font-bold shrink-0">
          {skill.name.charAt(0)}
        </span>
      )}
      {skill.name}
      {/* level dots */}
      <span className="flex gap-0.5 ml-0.5">
        {[1, 2, 3, 4].map(i => (
          <span
            key={i}
            className={`w-1 h-1 rounded-full ${i <= skill.level ? 'bg-current opacity-80' : 'bg-current opacity-15'}`}
          />
        ))}
      </span>
    </span>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function SkillsSection() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<Tab>('languages')
  const [showAll, setShowAll] = useState(false)

  const softList = t('skills.softList', { returnObjects: true }) as string[]

  const filtered = SKILLS.filter(s => TAB_CATEGORIES[activeTab].includes(s.category))
  const topSkills  = filtered.filter(s => s.level >= 3)
  const moreSkills = filtered.filter(s => s.level  < 3)
  const { top: topClass, more: moreClass } = TAB_CHIP[activeTab]

  const switchTab = (tab: Tab) => {
    setActiveTab(tab)
    setShowAll(false)
  }

  return (
    <section className="h-full w-full flex items-center justify-center px-6 overflow-hidden">
      <div className="max-w-5xl w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-violet-600 dark:text-violet-400 mb-2">
            {t('nav.skills')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('skills.title')}
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="flex flex-wrap gap-1.5 justify-center mb-5"
        >
          {TABS.map(tab => {
            const count = SKILLS.filter(s => TAB_CATEGORIES[tab].includes(s.category)).length
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {t(`skills.tab_${tab}`)}
                <span className={`ml-1.5 text-[10px] px-1 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* Skill chips */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="mb-4"
          >
            {/* Top skills (level ≥ 3) */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {topSkills.map((skill, i) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.025, duration: 0.2 }}
                >
                  <SkillChip skill={skill} chipClass={topClass} />
                </motion.div>
              ))}
            </div>

            {/* More skills (level < 3) — collapsible */}
            {moreSkills.length > 0 && (
              <>
                <AnimatePresence initial={false}>
                  {showAll && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-1.5 mb-2 pt-1">
                        {moreSkills.map((skill, i) => (
                          <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.02, duration: 0.18 }}
                          >
                            <SkillChip skill={skill} chipClass={moreClass} />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => setShowAll(v => !v)}
                  className="text-[11px] font-medium text-violet-500 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <motion.span
                    animate={{ rotate: showAll ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▾
                  </motion.span>
                  {showAll
                    ? t('skills.show_less')
                    : t('skills.show_more', { count: moreSkills.length })}
                </button>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Soft skills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-2 text-center">
            {t('skills.soft')}
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {softList.map((name, i) => (
              <span
                key={name}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800/50"
              >
                <span>{SOFT_ICONS[i] ?? '•'}</span>
                {name}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
