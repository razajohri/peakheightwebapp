'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FloatingStars from './FloatingStars'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface Onboarding2Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const genderOptions = [
  { id: 'female', label: 'Female', icon: 'female' },
  { id: 'male', label: 'Male', icon: 'male' },
  { id: 'other', label: 'Other', icon: 'person' },
]

function GenderIcon({ variant, selected }: { variant: string; selected: boolean }) {
  const color = selected ? 'white' : 'rgba(255,255,255,0.6)'
  
  switch (variant) {
    case 'female':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="5" />
          <path d="M12 13v8" />
          <path d="M9 18h6" />
        </svg>
      )
    case 'male':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="14" r="5" />
          <path d="M19 5l-5.4 5.4" />
          <path d="M15 5h4v4" />
        </svg>
      )
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21a8 8 0 1 0-16 0" />
        </svg>
      )
  }
}

export default function Onboarding2({ data, updateData, onNext, onBack }: Onboarding2Props) {
  const [selectedGender, setSelectedGender] = useState(data.gender || null)

  const handleSelect = (id: string) => {
    setSelectedGender(id)
    updateData({ gender: id })
  }

  return (
    <div className="min-h-screen min-h-dvh bg-black relative overflow-hidden">
      <FloatingStars />

      <motion.div
        className="relative z-10 min-h-screen min-h-dvh flex flex-col"
        initial={{ opacity: 0, scale: 0.88, filter: 'blur(14px)' }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        <ProgressHeader currentStep={2} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-white text-[28px] font-bold mb-2">
              Choose your Gender
            </h1>
            <p className="text-white/60 text-base">
              This will be used to calibrate your custom plan.
            </p>
          </motion.div>

          {/* Options */}
          <div className="flex-1 flex flex-col justify-center pb-8">
            <div className="space-y-3 max-w-md mx-auto w-full">
              {genderOptions.map((option, index) => {
                const isSelected = selectedGender === option.id
                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => handleSelect(option.id)}
                    className={`w-full flex items-center justify-between rounded-2xl border p-4 transition-all duration-200 ${
                      isSelected
                        ? 'border-white/50 bg-white/10'
                        : 'border-white/15 bg-white/5 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <GenderIcon variant={option.icon} selected={isSelected} />
                      <span className={`text-lg font-medium ${isSelected ? 'text-white' : 'text-white/70'}`}>
                        {option.label}
                      </span>
                    </div>
                    
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
          <OnboardingButton title="Continue" onPress={onNext} disabled={!selectedGender} />
        </div>
      </motion.div>
    </div>
  )
}
