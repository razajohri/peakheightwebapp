'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FloatingStars from './FloatingStars'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface Onboarding4Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const ethnicities = [
  'Asian',
  'Black/African',
  'Caucasian/White',
  'Hispanic/Latino',
  'Mixed/Other',
  'Prefer not to say'
]

export default function Onboarding4({ data, updateData, onNext, onBack }: Onboarding4Props) {
  const [selectedEthnicity, setSelectedEthnicity] = useState(data.ethnicity || null)

  const handleSelect = (ethnicity: string) => {
    setSelectedEthnicity(ethnicity)
    updateData({ ethnicity })
  }

  return (
    <div className="min-h-screen min-h-dvh bg-black relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={4} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-white text-[28px] font-bold mb-2">
              What is your ethnicity?
            </h1>
            <p className="text-white/60 text-base">
              This helps us personalize your growth plan
            </p>
          </motion.div>

          {/* Options */}
          <div className="flex-1 overflow-y-auto pb-4">
            <div className="space-y-3 max-w-md mx-auto w-full">
              {ethnicities.map((ethnicity, index) => {
                const isSelected = selectedEthnicity === ethnicity
                return (
                  <motion.button
                    key={ethnicity}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => handleSelect(ethnicity)}
                    className={`w-full flex items-center justify-between rounded-2xl border p-4 transition-all duration-200 ${
                      isSelected
                        ? 'border-white/50 bg-white/10'
                        : 'border-white/15 bg-white/5 hover:border-white/25'
                    }`}
                  >
                    <span className={`text-lg font-medium ${isSelected ? 'text-white' : 'text-white/70'}`}>
                      {ethnicity}
                    </span>
                    
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" fill="white" />
                          <path d="M8 12l3 3 5-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={!selectedEthnicity} />
        </div>
      </div>
    </div>
  )
}
