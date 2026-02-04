'use client'

import { motion } from 'framer-motion'
import FloatingStars from './FloatingStars'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface Onboarding11Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export default function Onboarding11({ data, updateData, onNext, onBack }: Onboarding11Props) {
  return (
    <div className="min-h-screen min-h-dvh bg-black relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={13} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-4">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6"
          >
            <h1 className="text-white text-[26px] font-bold leading-tight">
              Losing Height Potential Every Night?
            </h1>
          </motion.div>

          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-48 h-80 rounded-2xl border-2 border-white bg-gradient-to-b from-white/10 to-white/5 flex items-center justify-center">
              <div className="text-center">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" className="mx-auto mb-2 opacity-40">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <p className="text-white/40 text-sm">Sleep Stats</p>
              </div>
            </div>
            <div className="w-32 h-64 rounded-2xl bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center">
              <div className="text-center">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" className="mx-auto opacity-30">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center px-4 mb-8"
          >
            <p className="text-white/60 text-sm leading-relaxed">
              Sleeping 8+ hours a day boosts growth hormone production by up to 75%, directly impacting height potential and testosterone level.
            </p>
          </motion.div>
        </div>

        {/* Button */}
        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={false} />
        </div>
      </div>
    </div>
  )
}
