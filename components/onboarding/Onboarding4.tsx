'use client'

import { useState } from 'react'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import OptionCard, { OptionTitle } from './OptionCard'

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
  'Prefer not to say',
]

export default function Onboarding4({ data, updateData, onNext, onBack }: Onboarding4Props) {
  const [selectedEthnicity, setSelectedEthnicity] = useState(data.ethnicity || null)

  const handleSelect = (ethnicity: string) => {
    setSelectedEthnicity(ethnicity)
    updateData({ ethnicity })
  }

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={4} onBack={onBack} />

        <div className="flex flex-1 flex-col px-6 pt-6">
          <OptionTitle subtitle="This helps us personalize your growth plan" className="mb-8">
            What is your ethnicity?
          </OptionTitle>

          <div className="mx-auto w-full max-w-md flex-1 space-y-3 overflow-y-auto pb-4">
            {ethnicities.map((ethnicity, index) => (
              <OptionCard
                key={ethnicity}
                index={index}
                selected={selectedEthnicity === ethnicity}
                onClick={() => handleSelect(ethnicity)}
                label={ethnicity}
              />
            ))}
          </div>
        </div>

        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={!selectedEthnicity} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
