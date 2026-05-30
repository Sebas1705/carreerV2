import { useState, useEffect, useCallback, useRef } from 'react'

const SECTION_COUNT = 7

export function useSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const locked = useRef(false)

  const navigate = useCallback(
    (index: number) => {
      if (locked.current || index === current) return
      locked.current = true
      setTimeout(() => { locked.current = false }, 700)
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current],
  )

  const next = useCallback(() => navigate(Math.min(current + 1, SECTION_COUNT - 1)), [current, navigate])
  const prev = useCallback(() => navigate(Math.max(current - 1, 0)), [current, navigate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30) return
      e.deltaY > 0 ? next() : prev()
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [next, prev])

  useEffect(() => {
    let startX = 0
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX }
    const onTouchEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX
      if (Math.abs(diff) > 60) diff > 0 ? next() : prev()
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [next, prev])

  return { current, direction, navigate, next, prev }
}
