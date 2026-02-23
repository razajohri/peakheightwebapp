'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { OnboardingData } from '@/lib/onboarding/types'

const INTRO_VIDEO_PATH = '/assets/hyperspeed.webm'
const VIDEO_DURATION_MS = 5000
const EXIT_ANIMATION_MS = 700

interface OnboardingHyperspeedIntroProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
  onBack?: () => void
}

/**
 * Step 1: Hyperspeed video (or gradient fallback), then exit animation, then advance.
 * Put your video at public/assets/hyperspeed.webm for the full effect.
 */
export default function OnboardingHyperspeedIntro({
  onNext,
}: OnboardingHyperspeedIntroProps) {
  const advanced = useRef(false)
  const [exiting, setExiting] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

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
            {!videoFailed ? (
              <video
                src={INTRO_VIDEO_PATH}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={goNext}
                onError={() => setVideoFailed(true)}
              />
            ) : null}
            {/* Fallback when video missing or fails: gradient + logo text */}
            <div
              className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] ${videoFailed ? '' : 'opacity-0 pointer-events-none'}`}
              aria-hidden={!videoFailed}
            >
              <motion.div
                animate={{ opacity: videoFailed ? 1 : 0 }}
                className="text-center"
              >
                <h1 className="text-white text-3xl font-bold tracking-tight">
                  Peak Height
                </h1>
                <p className="text-amber-400/80 text-sm mt-2">Unlock your potential</p>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
