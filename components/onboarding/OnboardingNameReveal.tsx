'use client'

import { useEffect } from 'react'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import { EncryptedText } from '@/components/ui/encrypted-text'

interface OnboardingNameRevealProps {
  name: string
  onNext: () => void
  onBack: () => void
}

export default function OnboardingNameReveal({ name, onNext, onBack }: OnboardingNameRevealProps) {
  const first = name.trim().split(/\s+/)[0] || 'there'
  const line = `Nice to meet you, ${first}.`

  // Auto-advance shortly after the decrypt finishes
  useEffect(() => {
    const revealMs = Math.max(1200, line.length * 45 + 900)
    const t = setTimeout(onNext, revealMs)
    return () => clearTimeout(t)
  }, [line, onNext])

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={1} totalSteps={21} onBack={onBack} showBackButton />

        <div className="flex flex-1 flex-col items-center justify-center px-8 pb-16">
          <p className="max-w-md text-center font-playfair text-[30px] font-medium leading-[1.25] tracking-[-0.02em] text-[#18181b] sm:text-[34px]">
            <EncryptedText
              text={line}
              revealDelayMs={45}
              flipDelayMs={40}
              encryptedClassName="text-[#a1a1aa]"
              revealedClassName="text-[#18181b]"
            />
          </p>
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
