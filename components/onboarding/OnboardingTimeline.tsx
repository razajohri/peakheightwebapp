'use client'

import { useState } from 'react'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import OptionCard, { OptionTitle } from './OptionCard'

interface OnboardingTimelineProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const TIMELINE_OPTIONS = [
  { id: '3_months', label: '3 months' },
  { id: '6_12_months', label: '6–12 months' },
  { id: '1_2_years', label: '1–2 years' },
  { id: 'no_deadline', label: 'No deadline' },
]

export default function OnboardingTimeline({
  data,
  updateData,
  onNext,
  onBack,
}: OnboardingTimelineProps) {
  const [selected, setSelected] = useState<string | null>(data.resultsTimeline || null)

  const handleSelect = (id: string) => {
    setSelected(id)
    updateData({ resultsTimeline: id })
  }

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={13} totalSteps={22} onBack={onBack} />

        <div className="flex flex-1 flex-col px-6 pt-6">
          <OptionTitle className="mb-8">When do you want results?</OptionTitle>

          <div className="mx-auto w-full max-w-md flex-1 space-y-3 overflow-y-auto pb-4">
            {TIMELINE_OPTIONS.map((option, index) => (
              <OptionCard
                key={option.id}
                index={index}
                selected={selected === option.id}
                onClick={() => handleSelect(option.id)}
                label={option.label}
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
