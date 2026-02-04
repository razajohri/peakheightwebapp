'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FloatingStars from './FloatingStars'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface Onboarding7AProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const triedOptions = [
  { id: 'supplements', label: 'Supplements', icon: 'medical' },
  { id: 'exercises', label: 'Exercises', icon: 'barbell' },
  { id: 'diet', label: 'Diet changes', icon: 'restaurant' },
  { id: 'posture', label: 'Posture correction', icon: 'fitness' },
  { id: 'nothing', label: 'Nothing yet', icon: 'close' },
]

function OptionIcon({ variant }: { variant: string }) {
  switch (variant) {
    case 'medical':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      )
    case 'barbell':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.5 6.5h11" />
          <path d="M6.5 17.5h11" />
          <path d="M4 10v4" />
          <path d="M20 10v4" />
          <path d="M6.5 10v4" />
          <path d="M17.5 10v4" />
          <path d="M12 6.5v11" />
        </svg>
      )
    case 'restaurant':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
        </svg>
      )
    case 'fitness':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="3" />
          <path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3" />
        </svg>
      )
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      )
  }
}

export default function Onboarding7A({ data, updateData, onNext, onBack }: Onboarding7AProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(data.triedOptions || [])

  const toggleOption = (optionId: string) => {
    const newSelection = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId]
    setSelectedOptions(newSelection)
    updateData({ triedOptions: newSelection })
  }

  return (
    <div className="min-h-screen min-h-dvh bg-black relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={9} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-4">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-white text-[28px] font-bold mb-2">
              What have you tried?
            </h1>
            <p className="text-white/60 text-base">
              Select all that apply
            </p>
          </motion.div>

          {/* Options */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-3 max-w-md mx-auto w-full">
              {triedOptions.map((option, index) => {
                const isSelected = selectedOptions.includes(option.id)
                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => toggleOption(option.id)}
                    className={`w-full flex items-center justify-between rounded-2xl border p-4 transition-all duration-200 ${
                      isSelected
                        ? 'border-white/50 bg-white/10'
                        : 'border-white/15 bg-white/5 hover:border-white/25'
                    }`}
                  >
                    <span className={`text-lg font-medium ${isSelected ? 'text-white' : 'text-white/70'}`}>
                      {option.label}
                    </span>
                    
                    <div className={`${isSelected ? 'text-white' : 'text-white/50'}`}>
                      {isSelected ? (
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
                      ) : (
                        <OptionIcon variant={option.icon} />
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={false} />
        </div>
      </div>
    </div>
  )
}
