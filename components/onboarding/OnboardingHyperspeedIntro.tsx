'use client'

import type { OnboardingData } from '@/lib/onboarding/types'

interface OnboardingHyperspeedIntroProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
  onBack?: () => void
}

/**
 * Step 1: simple full-screen gradient intro instead of video/three.js.
 */
export default function OnboardingHyperspeedIntro({
  onNext,
}: OnboardingHyperspeedIntroProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black via-slate-900 to-black flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-sm">
        <p className="text-amber-400/80 text-xs font-semibold tracking-[0.25em] mb-3">
          HYPERFOCUS
        </p>
        <h1 className="text-white text-[30px] font-extrabold mb-3 tracking-tight">
          Height isn&apos;t just inherited,
        </h1>
        <p className="text-white/80 text-[16px] mb-8">
          it&apos;s earned through your daily habits. Let&apos;s map out yours.
        </p>
        <button
          type="button"
          onClick={onNext}
          className="w-full h-[52px] rounded-2xl bg-white text-black font-semibold text-[15px] active:scale-[0.98] transition-transform"
        >
          Start my quiz
        </button>
      </div>
    </div>
  )
}
