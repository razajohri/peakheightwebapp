'use client'

import { motion } from 'framer-motion'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import { OptionTitle } from './OptionCard'

interface Onboarding13AProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

function formatHeight(heightInCm: number | undefined) {
  if (!heightInCm || heightInCm === 0) return '—'
  const totalInches = heightInCm / 2.54
  const feet = Math.floor(totalInches / 12)
  const inches = Math.round(totalInches % 12)
  return `${feet}'${inches}"`
}

export default function Onboarding13A({ data, updateData, onNext, onBack }: Onboarding13AProps) {
  const targetHeightValue =
    data?.targetHeight ?? data?.dreamHeight ?? data?.dreamCm ?? undefined
  const targetHeightFormatted = targetHeightValue
    ? formatHeight(targetHeightValue)
    : 'Not set'
  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={15} totalSteps={21} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-[#f4f7fc] border border-zinc-200 p-6 shadow-[0_0_30px_rgba(0,255,198,0.15)]"
          >
            <OptionTitle className="mb-6">How tall will you actually grow?</OptionTitle>

            <div className="relative h-48 mb-6">
              <svg width="100%" height="100%" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet">
                <text x="10" y="25" fill="#9CA3AF" fontSize="11">6&apos;2&quot;</text>
                <text x="10" y="55" fill="#9CA3AF" fontSize="11">6&apos;0&quot;</text>
                <text x="10" y="90" fill="#9CA3AF" fontSize="11">5&apos;10&quot;</text>
                <text x="10" y="125" fill="#9CA3AF" fontSize="11">5&apos;8&quot;</text>
                <text x="10" y="160" fill="#9CA3AF" fontSize="11">5&apos;6&quot;</text>
                
                <path d="M40 160 L300 160" stroke="#1f1f1f" strokeWidth="1" />
                <path d="M40 110 L300 110" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M40 60 L300 60" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />

                <motion.path
                  d="M40 150 Q140 120 200 118 T300 128"
                  stroke="url(#badGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />

                <motion.path
                  d="M40 150 Q140 70 200 40 T300 25"
                  stroke="url(#goodGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />

                <line x1="280" y1="25" x2="280" y2="128" stroke="#18181b" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="290" y="80" fill="#18181b" fontSize="14" fontWeight="bold">+4&quot;</text>

                <defs>
                  <linearGradient id="badGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF2D55" />
                    <stop offset="100%" stopColor="#FF8A00" />
                  </linearGradient>
                  <linearGradient id="goodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#18181b" />
                    <stop offset="100%" stopColor="#00A0FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex justify-between px-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF2D55]" />
                <span className="text-[#18181b] text-sm">Without optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#18181b]" />
                <span className="text-[#18181b] text-sm">With Peak Habits</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6"
          >
            <div className="flex justify-around mb-5">
              <div className="text-center">
                <p className="text-[#18181b] text-2xl font-playfair font-normal">4.8</p>
                <p className="font-manrope text-[15px] text-[#a1a1aa]">Average Rating</p>
              </div>
              <div className="text-center">
                <p className="text-[#18181b] text-2xl font-playfair font-normal">{targetHeightFormatted}</p>
                <p className="font-manrope text-[15px] text-[#a1a1aa]">Your target height</p>
              </div>
            </div>
            
            <p className="text-[#18181b] text-center text-base leading-relaxed mb-2">
              See how dialing in your daily habits can move you closer to your true height potential.
            </p>
          </motion.div>
        </div>

        <div
          className="px-6 pt-6"
          style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
        >
          <OnboardingButton title="Continue" onPress={onNext} disabled={false} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
