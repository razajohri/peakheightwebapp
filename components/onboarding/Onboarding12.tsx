'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FloatingStars from './FloatingStars'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface Onboarding12Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export default function Onboarding12({ data, updateData, onNext, onBack }: Onboarding12Props) {
  const [smokingStatus, setSmokingStatus] = useState<boolean | null>(data.smokingStatus ?? null)
  const [drinkingStatus, setDrinkingStatus] = useState<boolean | null>(data.drinkingStatus ?? null)

  const isReadyToContinue = smokingStatus !== null && drinkingStatus !== null

  const handleSmokingChange = (value: boolean) => {
    setSmokingStatus(value)
    updateData({ smokingStatus: value })
  }

  const handleDrinkingChange = (value: boolean) => {
    setDrinkingStatus(value)
    updateData({ drinkingStatus: value })
  }

  const getInfoText = () => {
    if (smokingStatus === true || drinkingStatus === true) {
      return "Research shows that smoking and alcohol consumption can negatively impact growth hormone production and bone development. We'll help you create a plan that addresses these factors."
    }
    return "Understanding your lifestyle habits helps us create a personalized growth plan tailored to your needs."
  }

  return (
    <div className="min-h-screen min-h-dvh bg-black relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={14} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <h1 className="text-white text-[26px] font-bold">
              Do you smoke or drink alcohol?
            </h1>
          </motion.div>

          <div className="max-w-md mx-auto w-full space-y-8">
            {/* Smoking Question */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M18 12H2v4h16v-4zM22 12v4M22 10c0-1.5-1-3-3-3V4" />
                </svg>
                <span className="text-white font-semibold text-lg">Do you smoke?</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleSmokingChange(true)}
                  className={`flex-1 py-4 rounded-xl border font-medium transition-all ${
                    smokingStatus === true
                      ? 'border-white bg-white/10 text-white'
                      : 'border-white/15 bg-white/5 text-white/70'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleSmokingChange(false)}
                  className={`flex-1 py-4 rounded-xl border font-medium transition-all ${
                    smokingStatus === false
                      ? 'border-white bg-white/10 text-white'
                      : 'border-white/15 bg-white/5 text-white/70'
                  }`}
                >
                  No
                </button>
              </div>
            </motion.div>

            {/* Drinking Question */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M8 22h8M12 11v11M7 2h10l-3 9H10L7 2z" />
                </svg>
                <span className="text-white font-semibold text-lg">Do you drink alcohol?</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDrinkingChange(true)}
                  className={`flex-1 py-4 rounded-xl border font-medium transition-all ${
                    drinkingStatus === true
                      ? 'border-white bg-white/10 text-white'
                      : 'border-white/15 bg-white/5 text-white/70'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleDrinkingChange(false)}
                  className={`flex-1 py-4 rounded-xl border font-medium transition-all ${
                    drinkingStatus === false
                      ? 'border-white bg-white/10 text-white'
                      : 'border-white/15 bg-white/5 text-white/70'
                  }`}
                >
                  No
                </button>
              </div>
            </motion.div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex gap-3 p-5 rounded-2xl bg-white/5 border border-white/10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="flex-shrink-0 opacity-50 mt-0.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <p className="text-white/70 text-sm leading-relaxed">
                {getInfoText()}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Button */}
        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={!isReadyToContinue} />
        </div>
      </div>
    </div>
  )
}
