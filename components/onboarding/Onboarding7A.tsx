'use client'

import { useState } from 'react'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import OptionCard, { OptionTitle } from './OptionCard'

interface Onboarding7AProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const triedOptions = [
  { id: 'supplements', label: 'Supplements', description: 'Vitamins, minerals, or growth formulas' },
  { id: 'exercises', label: 'Exercises', description: 'Stretching, hanging, or strength work' },
  { id: 'diet', label: 'Diet changes', description: 'Nutrition focused on growth' },
  { id: 'posture', label: 'Posture correction', description: 'Alignment and daily posture habits' },
  { id: 'nothing', label: 'Nothing yet', description: 'Starting fresh — that’s okay' },
]

export default function Onboarding7A({ data, updateData, onNext, onBack }: Onboarding7AProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(data.triedOptions || [])

  const toggleOption = (optionId: string) => {
    const newSelection = selectedOptions.includes(optionId)
      ? selectedOptions.filter((id) => id !== optionId)
      : [...selectedOptions, optionId]
    setSelectedOptions(newSelection)
    updateData({ triedOptions: newSelection })
  }

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={9} onBack={onBack} />

        <div className="flex flex-1 flex-col px-6 pt-4">
          <OptionTitle subtitle="Select all that apply" className="mb-8">
            What have you tried?
          </OptionTitle>

          <div className="mx-auto w-full max-w-md flex-1 space-y-3 overflow-y-auto pb-4">
            {triedOptions.map((option, index) => (
              <OptionCard
                key={option.id}
                index={index}
                multi
                selected={selectedOptions.includes(option.id)}
                onClick={() => toggleOption(option.id)}
                label={option.label}
                description={option.description}
              />
            ))}
          </div>
        </div>

        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={false} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
