'use client'

import { motion } from 'framer-motion'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
interface Onboarding17Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
  onAuthRequired: (mode?: 'signup' | 'signin') => void
}

function formatHeight(heightInCm: number | undefined) {
  if (!heightInCm || heightInCm === 0) return '—'
  const totalInches = heightInCm / 2.54
  const feet = Math.floor(totalInches / 12)
  const inches = Math.round(totalInches % 12)
  return `${feet}'${inches}"`
}

function BenefitIcon({ kind }: { kind: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#18181b',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (kind) {
    case 'plan':
      return (
        <svg {...common}>
          <path d="M4 19V5a1 1 0 0 1 1-1h10l5 5v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
          <path d="M14 4v5h5M8 13h8M8 17h5" />
        </svg>
      )
    case 'workout':
      return (
        <svg {...common}>
          <path d="M6.5 6.5h11M6.5 17.5h11M4 10v4M20 10v4M6.5 10v4M17.5 10v4M12 6.5v11" />
        </svg>
      )
    case 'food':
      return (
        <svg {...common}>
          <path d="M12 22c4 0 7-2.5 7-7V9H5v6c0 4.5 3 7 7 7Z" />
          <path d="M8 9V5M12 9V3M16 9V6" />
        </svg>
      )
    case 'sleep':
      return (
        <svg {...common}>
          <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5Z" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <path d="M4 19V5M4 19h16M8 15l3-4 3 2 4-6" />
        </svg>
      )
  }
}

const benefits: { kind: string; title: string; desc: string }[] = [
  { kind: 'plan', title: 'Personalized Growth Plan', desc: 'Tailored to your body & goals' },
  { kind: 'workout', title: '200+ Growth Exercises', desc: 'Science-backed stretches & workouts' },
  { kind: 'food', title: 'Nutrition Guide', desc: 'Foods that maximize growth' },
  { kind: 'sleep', title: 'Sleep Optimization', desc: 'Boost growth hormone naturally' },
  { kind: 'chart', title: 'Progress Tracking', desc: 'See your gains over time' },
]

export default function Onboarding17({
  data,
  onBack,
  onAuthRequired,
}: Onboarding17Props) {
  const currentHeight = formatHeight(data?.currentHeight)
  const targetHeight = formatHeight(data?.targetHeight)

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={18} totalSteps={21} onBack={onBack} />

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto w-full max-w-[400px] px-5 pb-4 pt-2">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex justify-center"
            >
              <span className="rounded-full border border-zinc-200 bg-white px-4 py-1.5 font-manrope text-[12px] font-medium text-[#18181b]">
                Your Report is Ready
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-2 text-center font-playfair text-[28px] font-normal leading-[1.2] tracking-[-0.02em] text-[#18181b]"
            >
              Unlock Your Growth Potential
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-center font-manrope text-[14px] leading-relaxed text-[#a1a1aa]"
            >
              Based on your answers, we&apos;ve created a personalized plan just for you
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="mb-5 rounded-2xl border border-zinc-200 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center">
                  <p className="mb-1 font-manrope text-[11px] font-medium tracking-wide text-[#a1a1aa]">
                    NOW
                  </p>
                  <p className="font-playfair text-[26px] font-normal text-[#18181b]">{currentHeight}</p>
                </div>
                <div className="flex items-center gap-2 px-3 text-[#18181b]">
                  <div className="h-[2px] w-6 bg-zinc-200" />
                  <span className="text-[16px]">→</span>
                  <div className="h-[2px] w-6 bg-[#18181b]" />
                </div>
                <div className="flex-1 text-center">
                  <p className="mb-1 font-manrope text-[11px] font-medium tracking-wide text-[#a1a1aa]">
                    GOAL
                  </p>
                  <p className="font-playfair text-[26px] font-normal text-[#18181b]">{targetHeight}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-5"
            >
              <p className="mb-3 font-manrope text-[11px] font-semibold tracking-[0.08em] text-[#a1a1aa]">
                WHAT YOU&apos;LL GET
              </p>
              <div className="space-y-2.5">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 + index * 0.04 }}
                    className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3.5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4f7fc]">
                      <BenefitIcon kind={benefit.kind} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-manrope text-[14px] font-semibold text-[#18181b]">
                        {benefit.title}
                      </p>
                      <p className="font-manrope text-[12px] text-[#a1a1aa]">{benefit.desc}</p>
                    </div>
                    <svg
                      className="h-5 w-5 shrink-0 text-[#18181b]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="px-5 pb-10">
          <OnboardingButton
            title="Unlock My Custom Report"
            onPress={() => onAuthRequired('signup')}
            showArrow
          />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
