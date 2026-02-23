'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { OnboardingData } from '@/lib/onboarding/types'

const INTRO_VIDEO_PATH = '/assets/hyperspeed.webm'
const VIDEO_DURATION_MS = 5000
const EXIT_ANIMATION_MS = 700
const FALLBACK_DURATION_MS = 8000

interface OnboardingHyperspeedIntroProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
  onBack?: () => void
}

/**
 * Step 1: 5s hyperspeed video, then exit animation (warp into next), then advance.
 * Next page animates in as if arriving from the hyperspeed.
 */
export default function OnboardingHyperspeedIntro({
  onNext,
}: OnboardingHyperspeedIntroProps) {
  const advanced = useRef(false)
  const [exiting, setExiting] = useState(false)

  const goNext = () => {
    if (advanced.current) return
    advanced.current = true
    setExiting(true)
    setTimeout(() => onNext(), EXIT_ANIMATION_MS)
  }

  useEffect(() => {
    const t = setTimeout(goNext, VIDEO_DURATION_MS)
    return () => clearTimeout(t)
  }, [onNext])

  return (
    <div className="fixed inset-0 min-h-screen min-h-dvh bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {!exiting ? (
          <motion.div
            key="intro"
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={false}
            exit={{
              scale: 1.5,
              opacity: 0,
              filter: 'blur(24px)',
              transition: { duration: EXIT_ANIMATION_MS / 1000, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <video
              src={INTRO_VIDEO_PATH}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onEnded={goNext}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
