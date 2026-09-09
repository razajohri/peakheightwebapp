'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingStarsProps {
  starCount?: number
}

/** Soft zinc mist dots — FaceIQ light atmosphere (not white stars on black) */
export default function FloatingStars({ starCount = 12 }: FloatingStarsProps) {
  const [stars, setStars] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      delay: number
      duration: number
    }>
  >([])

  useEffect(() => {
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 5,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
    }))
    setStars(newStars)
  }, [starCount])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-zinc-400/40"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.15, 0.45, 0.12, 0.35],
            scale: [1, 1.35, 0.9, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
