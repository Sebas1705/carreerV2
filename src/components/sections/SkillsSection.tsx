import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function SkillsSection() {
  const { t } = useTranslation()
  const techList = t('skills.techList', { returnObjects: true }) as string[]
  const toolsList = t('skills.toolsList', { returnObjects: true }) as string[]
  const softList = t('skills.softList', { returnObjects: true }) as string[]

  return (
    <section className="h-full w-full flex items-center justify-center px-8">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-violet-600 dark:text-violet-400 mb-3">
            {t('nav.skills')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('skills.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-4">
              {t('skills.languages')}
            </p>
            <div className="flex flex-wrap gap-2">
              {techList.map(s => (
                <span
                  key={s}
                  className="px-3 py-1.5 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 rounded-lg text-sm font-medium border border-violet-100 dark:border-violet-800/50"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-4">
              {t('skills.tools')}
            </p>
            <div className="flex flex-wrap gap-2">
              {toolsList.map(s => (
                <span
                  key={s}
                  className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700/50"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-4">
              {t('skills.soft')}
            </p>
            <div className="flex flex-wrap gap-2">
              {softList.map(s => (
                <span
                  key={s}
                  className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-lg text-sm border border-slate-200 dark:border-slate-700/50"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
