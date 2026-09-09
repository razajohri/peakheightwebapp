'use client'

import { motion } from 'framer-motion'

interface ProgressHeaderProps {
  currentStep: number
  totalSteps?: number
  onBack?: () => void
  showBackButton?: boolean
  /** Visual segment count (FaceIQ-style thin bars) */
  segments?: number
}

export default function ProgressHeader({
  currentStep,
  totalSteps = 21,
  onBack,
  showBackButton = true,
  segments = 9,
}: ProgressHeaderProps) {
  const filled = Math.max(
    1,
    Math.min(segments, Math.round((currentStep / totalSteps) * segments) || 1)
  )
  const showBack = Boolean(showBackButton && onBack)

  return (
    <header
      className="relative z-20 w-full shrink-0"
      style={{
        paddingTop: 'max(12px, env(safe-area-inset-top, 0px))',
      }}
    >
      <div className="relative flex h-11 items-center px-5 sm:px-6">
        {showBack ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={onBack}
            className="absolute left-3 z-10 flex h-10 w-10 items-center justify-center rounded-full text-[#18181b]/55 hover:bg-zinc-100/70 hover:text-[#18181b] touch-manipulation sm:left-4"
            aria-label="Go back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        ) : null}

        {/* Full-bleed FaceIQ segments — back sits over left padding, not a spacer column */}
        <div
          className={`flex w-full items-center gap-[4px] sm:gap-[5px] ${showBack ? 'pl-9' : ''}`}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Step ${currentStep} of ${totalSteps}`}
        >
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className={`h-[2.5px] flex-1 rounded-full transition-colors duration-300 ${
                i < filled ? 'bg-[#18181b]' : 'bg-[#e4e4e7]'
              }`}
            />
          ))}
        </div>
      </div>
    </header>
  )
}
