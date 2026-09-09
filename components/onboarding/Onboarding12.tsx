'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import { OptionTitle } from './OptionCard'
import { ONBOARDING_UI } from '@/lib/constants/onboarding'

interface Onboarding12Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

function YesNo({
  value,
  onChange,
}: {
  value: boolean | null
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex gap-3">
      {[
        { label: 'Yes', v: true },
        { label: 'No', v: false },
      ].map((opt) => {
        const selected = value === opt.v
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => onChange(opt.v)}
            className={`flex-1 rounded-2xl py-4 font-manrope text-[15px] font-medium transition-all ${
              selected ? ONBOARDING_UI.chipSelected : ONBOARDING_UI.chipIdle
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
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
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={13} totalSteps={21} onBack={onBack} />

        <div className="flex flex-1 flex-col px-6 pt-6">
          <OptionTitle className="mb-10">Do you smoke or drink alcohol?</OptionTitle>

          <div className="mx-auto w-full max-w-md space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <p className="mb-3 font-manrope text-[15px] font-semibold text-[#18181b]">Do you smoke?</p>
              <YesNo value={smokingStatus} onChange={handleSmokingChange} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <p className="mb-3 font-manrope text-[15px] font-semibold text-[#18181b]">
                Do you drink alcohol?
              </p>
              <YesNo value={drinkingStatus} onChange={handleDrinkingChange} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="mb-4 flex gap-3 rounded-2xl border border-zinc-200 bg-white p-5"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#18181b"
                strokeWidth="1.5"
                className="mt-0.5 shrink-0 opacity-40"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <p className="font-manrope text-sm leading-relaxed text-[#a1a1aa]">{getInfoText()}</p>
            </motion.div>
          </div>
        </div>

        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={!isReadyToContinue} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
