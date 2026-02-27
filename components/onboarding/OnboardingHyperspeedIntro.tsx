'use client'

import type { OnboardingData } from '@/lib/onboarding/types'
import WarpDriveShader from '@/components/ui/warp-drive-shader'

interface OnboardingHyperspeedIntroProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
  onBack?: () => void
}

/**
 * Step 1: Warp drive shader intro instead of video.
 *
 * Full-screen WebGL background + simple overlay and Continue button.
 */
export default function OnboardingHyperspeedIntro({
  onNext,
}: OnboardingHyperspeedIntroProps) {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <WarpDriveShader />
      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-white text-[30px] font-extrabold mb-3 tracking-tight">
          Height isn&apos;t just inherited,
        </h1>
        <p className="text-white/80 text-[18px] mb-6">
          it&apos;s earned through daily habits.
        </p>
        <button
          type="button"
          onClick={onNext}
          className="w-full max-w-xs h-[52px] rounded-2xl bg-white text-black font-semibold text-[15px] active:scale-[0.98] transition-transform"
        >
          Start my quiz
        </button>
      </div>
    </div>
  )
}
