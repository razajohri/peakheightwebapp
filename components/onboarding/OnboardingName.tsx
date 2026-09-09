'use client'

import { useState } from 'react'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import { OptionTitle } from './OptionCard'

interface OnboardingNameProps {
  data: { userName?: string }
  updateData: (data: { userName: string }) => void
  onNext: () => void
  onBack: () => void
}

export default function OnboardingName({ data, updateData, onNext, onBack }: OnboardingNameProps) {
  const [name, setName] = useState(data.userName || '')

  const trimmed = name.trim()
  const canContinue = trimmed.length >= 2

  const handleContinue = () => {
    if (!canContinue) return
    updateData({ userName: trimmed })
    onNext()
  }

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={1} totalSteps={21} onBack={onBack} />

        <div className="flex flex-1 flex-col px-6 pt-8">
          <OptionTitle subtitle="We’ll use this to personalize your plan." className="mb-10">
            What&apos;s your name?
          </OptionTitle>

          <div className="mx-auto w-full max-w-md">
            <label className="mb-2 block font-manrope text-[12px] font-medium text-[#a1a1aa]">
              First name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleContinue()
              }}
              placeholder="Your name"
              autoFocus
              autoComplete="given-name"
              maxLength={40}
              className="h-[56px] w-full rounded-2xl border border-zinc-200 bg-white px-4 font-manrope text-[17px] text-[#18181b] placeholder:text-zinc-300 focus:border-[#18181b] focus:outline-none"
            />
          </div>
        </div>

        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={handleContinue} disabled={!canContinue} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
