import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Job {
  role: string
  company: string
  companyUrl: string
  period: string
  type: string
  desc: string
  projects: string[]
  achievements: string[]
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <motion.svg
    animate={{ rotate: open ? 180 : 0 }}
    transition={{ duration: 0.2 }}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <path d="M6 9l6 6 6-6" />
  </motion.svg>
)

export default function ExperienceSection() {
  const { t } = useTranslation()
  const jobs = t('experience.jobs', { returnObjects: true }) as Job[]
  const [expanded, setExpanded] = useState<number | null>(null)

  const toggle = (i: number) => setExpanded(prev => (prev === i ? null : i))

  return (
    <section className="h-full w-full flex items-center justify-center px-8">
      <div className="max-w-3xl w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-violet-600 dark:text-violet-400 mb-3">
            {t('nav.experience')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('experience.title')}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-3 bottom-3 w-px bg-linear-to-b from-violet-500 via-violet-400 to-transparent" />

          <div className="space-y-5">
            {jobs.map((job, i) => {
              const isOpen = expanded === i
              const hasAchievements = job.achievements?.length > 0

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6.5 top-5 w-5 h-5 rounded-full bg-violet-600 dark:bg-violet-400 border-4 border-white dark:border-slate-950 shadow-sm" />

                  <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-200">

                    {/* Card header — always visible */}
                    <div className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{job.role}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <a
                              href={job.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-violet-600 dark:text-violet-400 font-medium hover:underline"
                              onClick={e => e.stopPropagation()}
                            >
                              {job.company}
                            </a>
                            <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                              {job.type}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full whitespace-nowrap">
                          {job.period}
                        </span>
                      </div>

                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{job.desc}</p>

                      {/* Project tags */}
                      <div className="flex flex-wrap gap-2">
                        {job.projects.map(p => (
                          <span
                            key={p}
                            className="text-xs px-2.5 py-1 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-800/50"
                          >
                            {p}
                          </span>
                        ))}
                      </div>

                      {/* Toggle button */}
                      {hasAchievements && (
                        <button
                          onClick={() => toggle(i)}
                          className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer"
                        >
                          <ChevronIcon open={isOpen} />
                          {isOpen
                            ? t('experience.hide_achievements')
                            : t('experience.see_achievements')}
                        </button>
                      )}
                    </div>

                    {/* Achievements — animated collapse */}
                    <AnimatePresence initial={false}>
                      {isOpen && hasAchievements && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-slate-100 dark:border-slate-800 px-5 pb-5 pt-4">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
                              {t('experience.achievements_label')}
                            </p>
                            <ul className="space-y-2">
                              {job.achievements.map((ach, j) => (
                                <motion.li
                                  key={j}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: j * 0.06, duration: 0.2 }}
                                  className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                                >
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 dark:bg-violet-500 shrink-0" />
                                  {ach}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
