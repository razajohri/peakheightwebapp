'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import FloatingStars from './FloatingStars'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface Onboarding11Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export default function Onboarding11({ data, updateData, onNext, onBack }: Onboarding11Props) {
  return (
    <div className="min-h-screen min-h-dvh bg-black relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={13} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-2">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-2"
          >
            <h1 className="text-white text-[20px] sm:text-[24px] font-bold leading-tight">
              Losing Height Potential Every Night?
            </h1>
          </motion.div>

          {/* Sleep illustration with overlay copy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center mb-4"
          >
            <div className="relative w-11/12 max-w-xs sm:max-w-md rounded-3xl border border-white/15 overflow-hidden bg-black">
              <Image
                src="/assets/sleep.png"
                alt="Sleeping deeply to support growth"
                width={480}
                height={720}
                className="w-full h-auto object-cover"
                priority={false}
              />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 px-3 pt-2 pb-1.5 sm:px-5 sm:pt-3 sm:pb-2.5 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
                <p className="text-white text-xs sm:text-sm leading-relaxed text-center">
                  Sleeping 8+ hours a night boosts growth hormone and helps protect your height potential.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Button */}
        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={false} />
        </div>
      </div>
    </div>
  )
}
