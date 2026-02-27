'use client'

import { useEffect, useRef } from 'react'
import type { OnboardingData } from '@/lib/onboarding/types'

const INTRO_VIDEO_PATH = '/assets/hyperspeed.webm'
const FALLBACK_DURATION_MS = 12000

interface OnboardingHyperspeedIntroProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
  onBack?: () => void
}

/**
 * Step 1: full-screen hyperspeed intro video.
 *
 * - Autoplays muted with no visible controls.
 * - Advances automatically when the video ends, or after a fallback timeout.
 * - Tapping the screen will try to start playback if autoplay was blocked.
 */
export default function OnboardingHyperspeedIntro({
  onNext,
}: OnboardingHyperspeedIntroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    // Try to autoplay silently
    vid.play().catch(() => {
      // If autoplay is blocked, user can tap to start
    })

    // Fallback: advance even if ended doesn't fire (e.g. codec issue)
    const timer = setTimeout(() => {
      onNext()
    }, FALLBACK_DURATION_MS)

    return () => clearTimeout(timer)
  }, [onNext])

  const handleTap = () => {
    const vid = videoRef.current
    if (!vid) {
      return
    }
    if (vid.paused) {
      vid.play().catch(() => {})
    }
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      <video
        ref={videoRef}
        src={INTRO_VIDEO_PATH}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        controls={false}
        onEnded={onNext}
        onClick={handleTap}
      />
      {/* Soft vignette only, no button */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/70" />
    </div>
  )
}
