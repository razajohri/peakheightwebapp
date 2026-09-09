'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FloatingStars from './FloatingStars'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface Onboarding10Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export default function Onboarding10({ data, updateData, onNext, onBack }: Onboarding10Props) {
  const [sleepHours, setSleepHours] = useState(data.sleepHours || 7)

  useEffect(() => {
    updateData({ sleepHours })
  }, [sleepHours])

  const getSleepFeedback = () => {
    if (sleepHours < 7) {
      return "You may not be getting enough sleep for optimal growth hormone production."
    }
    if (sleepHours >= 9) {
      return "Great! You're getting plenty of sleep for optimal growth hormone production."
    }
    return "Good! 7-9 hours is recommended for optimal growth hormone production."
  }

  return (
    <div className="min-h-screen min-h-dvh bg-[#f4f7fc] relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={12} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6"
          >
            <h1 className="text-[#18181b] text-[26px] font-bold mb-2">
              How many hours do you sleep?
            </h1>
            <p className="text-[#a1a1aa] text-base">
              This helps us optimize your growth plan
            </p>
          </motion.div>

          {/* Sleep Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center my-8"
          >
            <div className="w-60 h-40 rounded-full border border-zinc-200 bg-white flex flex-col items-center justify-center">
              <span className="text-[#18181b] text-6xl font-bold">{sleepHours}</span>
              <span className="text-zinc-400 text-base mt-1">
                {sleepHours === 1 ? 'hour per night' : 'hours per night'}
              </span>
            </div>
          </motion.div>

          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="max-w-md mx-auto w-full mb-8"
          >
            <input
              type="range"
              min="3"
              max="12"
              step="0.5"
              value={sleepHours}
              onChange={(e) => setSleepHours(Number(e.target.value))}
              className="w-full h-2 bg-zinc-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#18181b] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
            />
            <div className="flex justify-between text-zinc-400 text-sm mt-2">
              <span>3 hrs</span>
              <span>12 hrs</span>
            </div>
          </motion.div>

          {/* Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="max-w-md mx-auto w-full"
          >
            <div className="p-4 rounded-xl border border-zinc-200 bg-white">
              <p className="text-[#18181b] text-base leading-relaxed">
                {getSleepFeedback()}
              </p>
            </div>
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
