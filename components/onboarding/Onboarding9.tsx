'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FloatingStars from './FloatingStars'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface Onboarding9Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const frequencies = [
  { id: '0-2', label: '0-2 times a week', dots: 1 },
  { id: '3-4', label: '3-4 times a week', dots: 3 },
  { id: '5-7', label: '5-7 times a week', dots: 6 },
]

function DotIcon({ count, selected }: { count: number; selected: boolean }) {
  if (count === 1) {
    return (
      <div className="w-3 h-3 rounded-full bg-white" />
    )
  }
  if (count === 3) {
    return (
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>
    </div>
  )
}

export default function Onboarding9({ data, updateData, onNext, onBack }: Onboarding9Props) {
  const [selectedFrequency, setSelectedFrequency] = useState(data.workoutFrequency || null)

  const handleSelect = (id: string) => {
    setSelectedFrequency(id)
    updateData({ workoutFrequency: id })
  }

  return (
    <div className="min-h-screen min-h-dvh bg-black relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={11} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-4">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-white text-[28px] font-bold">
              How often do you work out?
            </h1>
          </motion.div>

          {/* Options */}
          <div className="flex-1 flex flex-col justify-center pb-8">
            <div className="space-y-4 max-w-md mx-auto w-full">
              {frequencies.map((freq, index) => {
                const isSelected = selectedFrequency === freq.id
                return (
                  <motion.button
                    key={freq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => handleSelect(freq.id)}
                    className={`w-full flex items-center gap-4 rounded-2xl border p-5 transition-all duration-200 ${
                      isSelected
                        ? 'border-white bg-white/10'
                        : 'border-white/15 bg-white/5 hover:border-white/25'
                    }`}
                  >
                    <div className="w-12 h-12 flex items-center justify-center">
                      <DotIcon count={freq.dots} selected={isSelected} />
                    </div>
                    <span className={`text-lg font-medium ${isSelected ? 'text-white' : 'text-white/70'}`}>
                      {freq.label}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            <p className="text-white/60 text-base text-center mt-8">
              This will be used to calibrate your custom plan.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={!selectedFrequency} />
        </div>
      </div>
    </div>
  )
}
