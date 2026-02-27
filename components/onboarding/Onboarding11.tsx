'use client'

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
            className="text-center mb-4"
          >
            <h1 className="text-white text-[26px] font-bold leading-tight">
              Losing Height Potential Every Night?
            </h1>
          </motion.div>

          {/* Sleep video with overlay copy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center mb-4"
          >
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] rounded-3xl border border-white/15 overflow-hidden bg-black">
              <video
                src="/assets/sleep-video.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pt-4 pb-1 sm:px-6 sm:pt-6 sm:pb-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="inline-block mx-auto rounded-2xl bg-black/75 px-3 py-2 sm:px-5 sm:py-3">
                  <p className="text-white text-lg sm:text-xl leading-relaxed text-center">
                    <span>Sleeping 8+ hours a day</span>
                    <br />
                    <span>boosts growth hormone by up to 75%</span>
                    <br />
                    <span>and supports your overall height growth.</span>
                  </p>
                </div>
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
