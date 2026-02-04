'use client'

import { motion } from 'framer-motion'
import FloatingStars from './FloatingStars'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface Onboarding13Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const facts = [
  "90% Women prefer tall man.",
  "Overlooked for leadership roles.",
  "Rejected before conversation starts.",
  "Mocked by friends casually.",
  "Paid less for same work.",
]

export default function Onboarding13({ data, updateData, onNext, onBack }: Onboarding13Props) {
  return (
    <div className="min-h-screen min-h-dvh bg-black relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={15} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-4">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <h1 className="text-white text-[28px] font-extrabold">
              The reality of being short
            </h1>
          </motion.div>

          {/* Facts */}
          <div className="space-y-3 max-w-md mx-auto w-full">
            {facts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="w-7 h-7 rounded-full bg-red-800 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(220,38,38,0.5)]">
                  <span className="text-white font-bold text-sm">!</span>
                </div>
                <p className="text-white/90 text-base">{fact}</p>
              </motion.div>
            ))}
          </div>

          {/* Founder Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="text-center mt-6"
          >
            <p className="text-white/50 text-sm italic">
              "We built this app because we faced the same issues growing up."
            </p>
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
