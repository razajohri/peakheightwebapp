'use client'

import { useEffect, useRef, useState } from 'react'
import type { OnboardingData } from '@/lib/onboarding/types'

const INTRO_VIDEO_PATH = '/assets/hyperspeed.webm'
const MAX_INTRO_DURATION_MS = 8000

interface OnboardingHyperspeedIntroProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
  onBack?: () => void
}

/**
 * Step 1: Fullscreen hyperspeed intro video.
 *
 * - Tries to autoplay. If the browser blocks it, shows a “Tap to start” button.
 * - Always shows a gradient background so it never appears as a blank screen.
 * - Advances when the video ends, or after a safety timeout.
 */
export default function OnboardingHyperspeedIntro({
  onNext,
}: OnboardingHyperspeedIntroProps) {
  const advancedRef = useRef(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [showTapOverlay, setShowTapOverlay] = useState(false)
  const [hasError, setHasError] = useState(false)

  const goNext = () => {
    if (advancedRef.current) return
    advancedRef.current = true
    onNext()
  }

  const tryPlay = async () => {
    const video = videoRef.current
    if (!video) return
    try {
      await video.play()
      setShowTapOverlay(false)
    } catch {
      // Autoplay blocked – ask for a tap
      setShowTapOverlay(true)
    }
  }

  useEffect(() => {
    // Attempt autoplay on mount
    void tryPlay()

    // Safety timeout: if nothing has advanced by then, move on
    const timeout = setTimeout(() => {
      if (!advancedRef.current) {
        goNext()
      }
    }, MAX_INTRO_DURATION_MS)

    return () => clearTimeout(timeout)
  }, [])

  const handleTapToStart = () => {
    setShowTapOverlay(false)
    void tryPlay()
  }

  return (
    <div className="fixed inset-0 min-h-screen min-h-dvh bg-black flex items-center justify-center overflow-hidden">
      {/* Gradient background so it never looks blank */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#060818] to-[#020203]" />

      {/* Video layer */}
      {!hasError && (
        <video
          ref={videoRef}
          src={INTRO_VIDEO_PATH}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={goNext}
          onError={() => {
            setHasError(true)
            setShowTapOverlay(false)
          }}
        />
      )}

      {/* Tap overlay when autoplay is blocked */}
      {showTapOverlay && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <button
            type="button"
            onClick={handleTapToStart}
            className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm shadow-lg"
          >
            Tap to start
          </button>
        </div>
      )}

      {/* Error / fallback state if video really cannot play */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-amber-400 animate-spin mx-auto mb-4" />
            <p className="text-white text-sm font-medium mb-3">
              Preparing your experience…
            </p>
            <button
              type="button"
              onClick={goNext}
              className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Soft vignette on top */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/80" />
    </div>
  )
}
