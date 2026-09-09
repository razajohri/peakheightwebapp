'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import { OptionTitle } from './OptionCard'

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
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={3} totalSteps={21} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <OptionTitle subtitle="Choose your date of birth">How old are you?</OptionTitle>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="max-w-md mx-auto w-full"
            >
              <input
                type="date"
                value={getInputValue()}
                onChange={handleDateChange}
                max={new Date().toISOString().split('T')[0]}
                min="1920-01-01"
                aria-label="Date of birth"
                className="w-full p-4 rounded-xl bg-white border border-zinc-200 text-[#18181b] text-lg appearance-none cursor-pointer [color-scheme:light]"
              />

              {isUnder18() && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-zinc-400 text-sm text-center mt-4"
                >
                  Parent/guardian consent required for users under 18
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>

        <div
          className="px-6 pt-4"
          style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
        >
          <OnboardingButton title="Continue" onPress={onNext} disabled={false} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
