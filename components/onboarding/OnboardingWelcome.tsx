'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface OnboardingWelcomeProps {
  onNext: () => void
}

export default function OnboardingWelcome({ onNext }: OnboardingWelcomeProps) {
  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={1} totalSteps={21} showBackButton={false} segments={9} />

        <div className="relative flex flex-1 flex-col items-center justify-center px-8 pb-4">
          {/* Soft cool mist behind the mark */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[42%] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90"
            style={{
              background:
                'radial-gradient(circle, rgba(196,214,236,0.55) 0%, rgba(237,243,251,0.35) 42%, rgba(255,255,255,0) 70%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div
              className="mb-8 flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-[18px] bg-[#18181b]"
              style={{
                boxShadow:
                  '0 18px 40px -12px rgba(24,24,27,0.35), 0 0 0 1px rgba(24,24,27,0.06)',
              }}
            >
              <Image
                src="/peakheight-logo.jpg"
                alt="PeakHeight"
                width={72}
                height={72}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <h1 className="max-w-[320px] font-playfair text-[34px] font-normal leading-[1.15] tracking-[-0.03em] text-[#18181b] sm:text-[36px]">
                Welcome to
                <br />
                PeakHeight.
              </h1>

              <p className="mt-4 max-w-[280px] font-manrope text-[14px] font-normal leading-relaxed tracking-[0.01em] text-[#a1a1aa]">
                The best software for improving your height.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
          <OnboardingButton title="Continue" onPress={onNext} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
