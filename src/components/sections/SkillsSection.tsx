import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function SkillsSection() {
  const { t } = useTranslation()
  const techList = t('skills.techList', { returnObjects: true }) as string[]
  const frameworksList = t('skills.frameworksList', { returnObjects: true }) as string[]
  const toolsList = t('skills.toolsList', { returnObjects: true }) as string[]
  const architectureList = t('skills.architectureList', { returnObjects: true }) as string[]
  const softList = t('skills.softList', { returnObjects: true }) as string[]

  const categories = [
    {
      key: 'languages',
      list: techList,
      chipClass: 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800/50',
    },
    {
      key: 'frameworks',
      list: frameworksList,
      chipClass: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/50',
    },
    {
      key: 'tools',
      list: toolsList,
      chipClass: 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50',
    },
    {
      key: 'architecture',
      list: architectureList,
      chipClass: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/50',
    },
  ]

  return (
    <section className="h-full w-full flex items-center justify-center px-8">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-violet-600 dark:text-violet-400 mb-3">
            {t('nav.skills')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('skills.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map(({ key, list, chipClass }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
                {t(`skills.${key}`)}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {list.map(s => (
                  <span key={s} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${chipClass}`}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3 text-center">
            {t('skills.soft')}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {softList.map(s => (
              <span
                key={s}
                className="px-3 py-1 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-lg text-xs border border-slate-200 dark:border-slate-700/50"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
