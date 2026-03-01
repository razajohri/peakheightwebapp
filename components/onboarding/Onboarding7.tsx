 'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
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

        <div className="flex-1 flex flex-col min-h-0 px-6 pt-0">
          {/* Title - slightly smaller */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-2 sm:mb-3 shrink-0"
          >
            <h1 className="text-white text-[20px] sm:text-[24px] font-bold leading-tight">
              Height isn't just inherited,
            </h1>
            <div className="inline-block bg-white/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg border border-white/20 mt-1 sm:mt-2">
              <span className="text-white text-[20px] sm:text-[24px] font-bold">it's earned.</span>
            </div>
          </motion.div>

          {/* Illustration - capped height so button stays in view */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex min-h-0 flex-1 items-center justify-center mb-2 sm:mb-3"
          >
            <div className="w-4/5 sm:w-full max-w-[280px] sm:max-w-sm h-[32vh] sm:h-[36vh] max-h-[220px] sm:max-h-[280px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/height-diagram.png"
                alt="How posture, load, sleep, and nutrition affect height potential"
                width={384}
                height={684}
                className="h-full w-auto object-contain object-center"
                priority={false}
              />
            </div>
          </motion.div>

          {/* Description - smaller text, less margin */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="relative pl-3 sm:pl-4 border-l-2 border-white/80 mb-4 sm:mb-6 shrink-0"
          >
            <p className="text-white/80 text-base sm:text-lg leading-snug">
              {renderText()}
              {currentIndex < fullText.length && (
                <span className="animate-pulse">|</span>
              )}
            </p>
          </motion.div>
        </div>

        {/* Button - stays in view */}
        <div className="px-6 pb-6 sm:pb-10 shrink-0">
          <OnboardingButton title="Continue" onPress={onNext} disabled={false} />
        </div>
      </div>
    </div>
  )
}
