'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FloatingStars from './FloatingStars'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface Onboarding3Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export default function Onboarding3({ data, updateData, onNext, onBack }: Onboarding3Props) {
  const parseInitialDate = () => {
    if (data.dateOfBirth) {
      return new Date(data.dateOfBirth)
    }
    return new Date(2000, 0, 1)
  }

  const [date, setDate] = useState(parseInitialDate())

  const formatDate = (d: Date) => {
    const month = d.getMonth() + 1
    const day = d.getDate()
    const year = d.getFullYear()
    return `${month}/${day}/${year}`
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value)
    if (!isNaN(newDate.getTime())) {
      setDate(newDate)
      updateData({ dateOfBirth: newDate.toISOString() })
    }
  }

  const getInputValue = () => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const isUnder18 = () => {
    const today = new Date()
    const age = today.getFullYear() - date.getFullYear()
    const monthDiff = today.getMonth() - date.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      return age - 1 < 18
    }
    return age < 18
  }

  return (
    <div className="min-h-screen min-h-dvh bg-black relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={3} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-white text-[28px] font-bold mb-2">
              How old are you?
            </h1>
            <p className="text-white/60 text-base">
              Choose your date of birth
            </p>
          </motion.div>

          {/* Date Picker */}
          <div className="flex-1 flex flex-col justify-center pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="max-w-md mx-auto w-full"
            >
              <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-5">
                {/* Calendar Icon */}
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>

                {/* Date Display & Input */}
                <div className="flex-1">
                  <p className="text-white/60 text-sm mb-1">Date of Birth</p>
                  <p className="text-white text-xl font-medium">{formatDate(date)}</p>
                </div>
              </div>

              {/* Hidden date input that opens native picker */}
              <input
                type="date"
                value={getInputValue()}
                onChange={handleDateChange}
                max={new Date().toISOString().split('T')[0]}
                min="1920-01-01"
                className="w-full mt-4 p-4 rounded-xl bg-white/5 border border-white/15 text-white text-lg appearance-none cursor-pointer [color-scheme:dark]"
              />

              {isUnder18() && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/50 text-sm text-center mt-4"
                >
                  Parent/guardian consent required for users under 18
                </motion.p>
              )}
            </motion.div>
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
