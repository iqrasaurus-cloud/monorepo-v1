import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 })
  const [variant, setVariant] = useState<'default' | 'hover' | 'view'>('default')
  const [visible, setVisible] = useState(false)
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setFine(mq.matches)
    if (!mq.matches) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = (e.target as HTMLElement).closest('[data-cursor], a, button')
      if (target) {
        setVariant(target.getAttribute('data-cursor') === 'view' ? 'view' : 'hover')
      } else {
        setVariant('default')
      }
    }
    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  if (!fine) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[300]"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ece9e4] mix-blend-difference"
        animate={{
          width: variant === 'view' ? 96 : variant === 'hover' ? 56 : 14,
          height: variant === 'view' ? 96 : variant === 'hover' ? 56 : 14,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {variant === 'view' && (
          <span className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-black">
            View
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}
