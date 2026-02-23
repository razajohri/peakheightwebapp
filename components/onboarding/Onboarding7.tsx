'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FloatingStars from './FloatingStars'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface Onboarding7Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export default function Onboarding7({ data, updateData, onNext, onBack }: Onboarding7Props) {
  const fullText = "The right daily routine can unlock hidden growth potential."
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.substring(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 20)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, fullText])

  const renderText = () => {
    const highlight = 'hidden growth potential'
    if (displayedText.includes(highlight)) {
      const parts = displayedText.split(highlight)
      return (
        <>
          {parts[0]}
          <span className="bg-white/10 px-2 py-0.5 rounded border border-white/20">
            {highlight}
          </span>
          {parts[1]}
        </>
      )
    }
    return displayedText
  }

  return (
    <div className="min-h-screen min-h-dvh bg-black relative overflow-hidden">
      <FloatingStars />
      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={8} totalSteps={22} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-4">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-white text-[28px] font-bold leading-tight">
              Height isn't just inherited,
            </h1>
            <div className="inline-block bg-white/10 px-3 py-1 rounded-lg border border-white/20 mt-2">
              <span className="text-white text-[28px] font-bold">it's earned.</span>
            </div>
          </motion.div>

          {/* Video/Animation Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex items-center justify-center mb-6"
          >
            <div className="w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              {/* DNA Animation Placeholder */}
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="animate-pulse">
                <path
                  d="M60 20C60 20 80 50 100 50C120 50 140 20 140 20"
                  stroke="white"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                />
                <path
                  d="M60 50C60 50 80 80 100 80C120 80 140 50 140 50"
                  stroke="white"
                  strokeWidth="2"
                  strokeOpacity="0.4"
                />
                <path
                  d="M60 80C60 80 80 110 100 110C120 110 140 80 140 80"
                  stroke="white"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                />
                <path
                  d="M60 110C60 110 80 140 100 140C120 140 140 110 140 110"
                  stroke="white"
                  strokeWidth="2"
                  strokeOpacity="0.4"
                />
                <path
                  d="M60 140C60 140 80 170 100 170C120 170 140 140 140 140"
                  stroke="white"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                />
                <circle cx="60" cy="20" r="6" fill="white" fillOpacity="0.8" />
                <circle cx="140" cy="20" r="6" fill="white" fillOpacity="0.8" />
                <circle cx="100" cy="50" r="6" fill="white" fillOpacity="0.6" />
                <circle cx="60" cy="80" r="6" fill="white" fillOpacity="0.8" />
                <circle cx="140" cy="80" r="6" fill="white" fillOpacity="0.8" />
                <circle cx="100" cy="110" r="6" fill="white" fillOpacity="0.6" />
                <circle cx="60" cy="140" r="6" fill="white" fillOpacity="0.8" />
                <circle cx="140" cy="140" r="6" fill="white" fillOpacity="0.8" />
                <circle cx="100" cy="170" r="6" fill="white" fillOpacity="0.6" />
              </svg>
            </div>
          </motion.div>

          {/* Description with typing effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="relative pl-4 border-l-2 border-white/80 mb-8"
          >
            <p className="text-white/80 text-lg leading-relaxed">
              {renderText()}
              {currentIndex < fullText.length && (
                <span className="animate-pulse">|</span>
              )}
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
