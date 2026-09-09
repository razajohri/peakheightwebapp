'use client'

import { useState } from 'react'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import OptionCard, { OptionTitle } from './OptionCard'

interface Onboarding9Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const frequencies = [
  { id: '0-2', label: '0–2 times a week', description: 'Light activity or just getting started' },
  { id: '3-4', label: '3–4 times a week', description: 'Consistent training habit' },
  { id: '5-7', label: '5–7 times a week', description: 'High training volume' },
]

export default function Onboarding9({ data, updateData, onNext, onBack }: Onboarding9Props) {
  const [selectedFrequency, setSelectedFrequency] = useState(data.workoutFrequency || null)

  const handleSelect = (id: string) => {
    setSelectedFrequency(id)
    updateData({ workoutFrequency: id })
  }

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={11} totalSteps={21} onBack={onBack} />

        <div className="flex flex-1 flex-col px-6 pt-4">
          <OptionTitle className="mb-10">How often do you work out?</OptionTitle>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-3 pb-6">
            {frequencies.map((freq, index) => (
              <OptionCard
                key={freq.id}
                index={index}
                selected={selectedFrequency === freq.id}
                onClick={() => handleSelect(freq.id)}
                label={freq.label}
                description={freq.description}
              />
            ))}

            <p className="mt-6 text-center font-manrope text-[15px] text-[#a1a1aa]">
              This will be used to calibrate your custom plan.
            </p>
          </div>
        </div>

        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={!selectedFrequency} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
