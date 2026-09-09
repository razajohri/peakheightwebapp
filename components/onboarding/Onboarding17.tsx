'use client'

import { motion } from 'framer-motion'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import { OptionTitle } from './OptionCard'

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

function FeatureIcon({ kind }: { kind: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#18181b',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (kind) {
    case 'height':
      return (
        <svg {...common}>
          <path d="M8 4v16M16 4v16M8 4h3M16 4h-3M8 20h3M16 20h-3M11 12h2" />
        </svg>
      )
    case 'body':
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2.5" />
          <path d="M8 21v-7l-2-4h12l-2 4v7M10 10v4M14 10v4" />
        </svg>
      )
    case 'ratio':
      return (
        <svg {...common}>
          <path d="M4 19V5M4 19h16M8 15l3-4 3 2 4-6" />
        </svg>
      )
    case 'track':
      return (
        <svg {...common}>
          <path d="M4 12a8 8 0 1 0 8-8" />
          <path d="M12 4v8l4 2" />
        </svg>
      )
    case 'plan':
      return (
        <svg {...common}>
          <path d="M8 6h11M8 12h11M8 18h11M4 6h.01M4 12h.01M4 18h.01" />
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
    case 'scan':
      return (
        <svg {...common}>
          <path d="M4 7V5a1 1 0 0 1 1-1h2M20 7V5a1 1 0 0 0-1-1h-2M4 17v2a1 1 0 0 0 1 1h2M20 17v2a1 1 0 0 1-1 1h-2" />
          <path d="M8 12h8" />
        </svg>
      )
    case 'community':
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="2.5" />
          <circle cx="16" cy="9" r="2" />
          <path d="M3.5 18c.6-2.5 2.6-4 5.5-4s4.9 1.5 5.5 4M14 14c2.2.2 3.8 1.4 4.5 4" />
        </svg>
      )
    case 'ai':
      return (
        <svg {...common}>
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
          <path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14z" />
        </svg>
      )
    case 'tips':
      return (
        <svg {...common}>
          <path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 3.5 10.8V16H8.5v-2.2A6 6 0 0 1 12 3z" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <path d="M12 3l2.2 6.6H21l-5.4 3.9 2.1 6.5L12 16.8 6.3 20l2.1-6.5L3 9.6h6.8L12 3z" />
        </svg>
      )
  }
}

function FeaturePill({
  kind,
  label,
  index,
}: {
  kind: string
  label: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.08 + index * 0.04 }}
      className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-3.5 py-3"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4f7fc]">
        <FeatureIcon kind={kind} />
      </span>
      <span className="font-manrope text-[13px] font-medium leading-snug text-[#18181b]">
        {label}
      </span>
    </motion.div>
  )
}

const BASIC_FEATURES = [
  { kind: 'height', label: 'Basic height tracking' },
  { kind: 'tips', label: 'Daily tips' },
  { kind: 'track', label: 'Simple progress charts' },
  { kind: 'ratio', label: 'Growth potential estimate' },
]

const PRO_FEATURES = [
  { kind: 'plan', label: 'Science-backed growth plan' },
  { kind: 'workout', label: 'Daily mobility tasks' },
  { kind: 'ai', label: 'Nutrition coach (AI)' },
  { kind: 'body', label: 'Personalized exercises' },
  { kind: 'scan', label: 'AI-powered food scanner' },
  { kind: 'community', label: 'Member community' },
]

export default function Onboarding17({
  data,
  onBack,
  onNext,
}: Onboarding17Props) {
  const currentHeight = formatHeight(data?.currentHeight)
  const targetHeight = formatHeight(data?.targetHeight)

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={18} totalSteps={22} onBack={onBack} />

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto w-full max-w-[400px] px-5 pb-4 pt-2">
            <OptionTitle className="mb-6">What each plan includes</OptionTitle>

            {/* Height snapshot */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-6 flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3.5"
            >
              <div className="flex-1 text-center">
                <p className="mb-0.5 font-manrope text-[11px] font-medium tracking-wide text-[#a1a1aa]">
                  NOW
                </p>
                <p className="font-playfair text-[22px] font-normal text-[#18181b]">
                  {currentHeight}
                </p>
              </div>
              <div className="px-2 text-[#18181b]">→</div>
              <div className="flex-1 text-center">
                <p className="mb-0.5 font-manrope text-[11px] font-medium tracking-wide text-[#a1a1aa]">
                  GOAL
                </p>
                <p className="font-playfair text-[22px] font-normal text-[#18181b]">
                  {targetHeight}
                </p>
              </div>
            </motion.div>

            {/* BASIC */}
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-5"
            >
              <span className="mb-3 inline-flex rounded-full border border-[#18181b] bg-white px-3 py-1 font-manrope text-[11px] font-bold tracking-[0.06em] text-[#18181b]">
                BASIC
              </span>
              <h2 className="mb-3 font-manrope text-[16px] font-semibold text-[#18181b]">
                See your growth potential
              </h2>
              <div className="space-y-2.5">
                {BASIC_FEATURES.map((f, i) => (
                  <FeaturePill key={f.label} kind={f.kind} label={f.label} index={i} />
                ))}
              </div>
            </motion.section>

            {/* PRO */}
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mb-2 rounded-[22px] border border-[#d7e4f4] bg-[#eef4fb] p-4"
            >
              <span className="mb-3 inline-flex rounded-full bg-[#18181b] px-3 py-1 font-manrope text-[11px] font-bold tracking-[0.06em] text-white">
                PRO
              </span>
              <h2 className="mb-1 font-manrope text-[16px] font-semibold text-[#18181b]">
                Reach your height goal
              </h2>
              <p className="mb-3 font-manrope text-[13px] text-[#71717a]">
                Everything in Basic, plus:
              </p>
              <div className="space-y-2.5">
                {PRO_FEATURES.map((f, i) => (
                  <FeaturePill
                    key={f.label}
                    kind={f.kind}
                    label={f.label}
                    index={i + BASIC_FEATURES.length}
                  />
                ))}
              </div>
            </motion.section>
          </div>
        </div>

        <div className="px-5 pb-10 pt-2">
          <OnboardingButton
            title="Continue"
            onPress={onNext}
            showArrow
          />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
