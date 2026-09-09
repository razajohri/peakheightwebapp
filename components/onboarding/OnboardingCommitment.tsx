'use client'

import { useState } from 'react'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import OptionCard, { OptionTitle } from './OptionCard'

interface OnboardingCommitmentProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const COMMITMENT_OPTIONS = [
  {
    id: 'habits',
    label: 'Habits only',
    description: 'Sleep, posture, nutrition, daily mobility',
  },
  {
    id: 'training',
    label: 'Structured training',
    description: 'Hanging, stretches, strength & mobility work',
  },
  {
    id: 'full_system',
    label: 'Full PeakHeight system',
    description: 'Habits, training, tracking, and daily reminders',
  },
  {
    id: 'maximum',
    label: 'Maximum commitment',
    description: 'Everything above with coaching-level consistency',
  },
]

export default function OnboardingCommitment({
  data,
  updateData,
  onNext,
  onBack,
}: OnboardingCommitmentProps) {
  const [selected, setSelected] = useState<string | null>(data.commitmentLevel || null)

  const handleSelect = (id: string) => {
    setSelected(id)
    updateData({ commitmentLevel: id })
  }

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={13} totalSteps={22} onBack={onBack} />

        <div className="flex flex-1 flex-col px-6 pt-6">
          <OptionTitle className="mb-8">How far are you willing to go?</OptionTitle>

          <div className="mx-auto w-full max-w-md flex-1 space-y-3 overflow-y-auto pb-4">
            {COMMITMENT_OPTIONS.map((option, index) => (
              <OptionCard
                key={option.id}
                index={index}
                selected={selected === option.id}
                onClick={() => handleSelect(option.id)}
                label={option.label}
                description={option.description}
              />
            ))}
          </div>
        </div>

        <div className="px-6 pb-10 pt-4">
          <OnboardingButton title="Continue" onPress={onNext} disabled={!selected} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
