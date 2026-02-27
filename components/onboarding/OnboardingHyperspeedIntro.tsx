'use client'

import { useEffect, useRef, useState } from 'react'
import type { OnboardingData } from '@/lib/onboarding/types'

const INTRO_VIDEO_PATH = '/assets/hyperspeed.webm'
const MAX_INTRO_DURATION_MS = 6000

interface OnboardingHyperspeedIntroProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
  onBack?: () => void
}

/**
 * Step 1: Fullscreen hyperspeed intro video.
 * - Autoplays and advances when finished or after a safety timeout.
 * - Falls back to a simple loading gradient if the video can't play.
 */
export default function OnboardingHyperspeedIntro({
  onNext,
}: OnboardingHyperspeedIntroProps) {
  const advancedRef = useRef(false)
  const [videoError, setVideoError] = useState(false)

  const goNext = () => {
    if (advancedRef.current) return
    advancedRef.current = true
    onNext()
  }

  useEffect(() => {
    const timeout = setTimeout(goNext, MAX_INTRO_DURATION_MS)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="fixed inset-0 min-h-screen min-h-dvh bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {!videoError && (
          <video
            src={INTRO_VIDEO_PATH}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={goNext}
            onError={() => setVideoError(true)}
          />
        )}
        {videoError && (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#050505] via-[#101020] to-[#050505]">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-amber-400 animate-spin mx-auto mb-4" />
              <p className="text-white text-sm font-medium">
                Loading your experience…
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Soft overlay to keep text and edges looking good on all phones */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/70" />
    </div>
  )
}
