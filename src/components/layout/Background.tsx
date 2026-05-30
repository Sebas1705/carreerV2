import { motion } from 'framer-motion'

const blobs = [
  {
    className: 'top-[-15%] left-[-8%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px]',
    color: 'bg-violet-500/[0.07] dark:bg-violet-500/[0.09]',
    animate: { x: [0, 45, -25, 0], y: [0, -35, 50, 0] },
    duration: 28,
    delay: 0,
  },
  {
    className: 'bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px]',
    color: 'bg-indigo-500/[0.06] dark:bg-indigo-500/[0.08]',
    animate: { x: [0, -60, 30, 0], y: [0, 45, -30, 0] },
    duration: 34,
    delay: 6,
  },
  {
    className: 'top-[25%] right-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px]',
    color: 'bg-purple-500/[0.05] dark:bg-purple-500/[0.07]',
    animate: { x: [0, 35, -45, 0], y: [0, -55, 25, 0] },
    duration: 40,
    delay: 12,
  },
]

export default function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden>
      {/* Subtle grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.055) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Dark mode grid — slightly stronger lines */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.09) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Animated gradient blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: blob.delay,
          }}
          className={`absolute rounded-full blur-[90px] ${blob.className} ${blob.color}`}
        />
      ))}

      {/* Radial vignette — fades edges for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(255,255,255,0.6) 100%)',
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(3,7,18,0.7) 100%)',
        }}
      />
    </div>
  )
}
