'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingStarsProps {
  starCount?: number
}

export default function FloatingStars({ starCount = 15 }: FloatingStarsProps) {
  const [stars, setStars] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    // Initialize stars with random positions
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 8, // 4-12px stars
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2, // 2-4 seconds
    }))
    setStars(newStars)
  }, [starCount])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.1, 0.4],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg width={star.size} height={star.size} viewBox="0 0 24 24" className="text-white">
            <polygon
              points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"
              fill="currentColor"
              opacity={0.8}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
