'use client'

import { useState } from 'react'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import OptionCard, { OptionTitle } from './OptionCard'

interface Onboarding2Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const genderOptions = [
  { id: 'female', label: 'Female', description: 'Personalized for female growth patterns' },
  { id: 'male', label: 'Male', description: 'Personalized for male growth patterns' },
  { id: 'other', label: 'Other', description: 'We’ll tailor guidance to your goals' },
]

export default function Onboarding2({ data, updateData, onNext, onBack }: Onboarding2Props) {
  const [selectedGender, setSelectedGender] = useState(data.gender || null)

  const handleSelect = (id: string) => {
    setSelectedGender(id)
    updateData({ gender: id })
  }

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={2} totalSteps={21} onBack={onBack} />

        <div className="flex flex-1 flex-col px-6 pt-6">
          <OptionTitle subtitle="This will be used to calibrate your custom plan." className="mb-10">
            Choose your Gender
          </OptionTitle>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-3 pb-8">
            {genderOptions.map((option, index) => (
              <OptionCard
                key={option.id}
                index={index}
                selected={selectedGender === option.id}
                onClick={() => handleSelect(option.id)}
                label={option.label}
                description={option.description}
              />
            ))}
          </div>
        </div>

        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={!selectedGender} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
