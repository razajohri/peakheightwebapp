'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface ProgressHeaderProps {
  currentStep: number
  totalSteps?: number
  onBack?: () => void
  showBackButton?: boolean
}

export default function ProgressHeader({
  currentStep,
  totalSteps = 22,
  onBack,
  showBackButton = true,
}: ProgressHeaderProps) {
  const progress = (currentStep / totalSteps) * 100
  const progressValue = useMotionValue(0)

  useEffect(() => {
    animate(progressValue, progress, { duration: 0.5, ease: 'easeOut' })
  }, [progress, progressValue])

  const progressWidth = useTransform(progressValue, (value) => `${value}%`)

  return (
    <div className="relative z-20 px-4 sm:px-6 md:px-8 pt-safe-top pt-6 sm:pt-8 pb-4">
      <div className="flex items-center gap-3 sm:gap-4">
        {showBackButton && onBack && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all touch-manipulation"
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}

        <div className="flex-1">
          <p className="text-white/70 text-xs sm:text-sm">Step {currentStep} of {totalSteps}</p>
          <div className="mt-2 h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              style={{ width: progressWidth }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
