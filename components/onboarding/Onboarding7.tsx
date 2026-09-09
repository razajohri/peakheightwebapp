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
          <span className="bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
            {highlight}
          </span>
          {parts[1]}
        </>
      )
    }
    return displayedText
  }

  return (
    <div className="min-h-screen min-h-dvh bg-[#f4f7fc] relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={8} totalSteps={22} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-0">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-2"
          >
            <h1 className="text-[#18181b] text-[20px] sm:text-[24px] font-bold leading-tight">
              Height isn't inherited, it's earned.
            </h1>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex items-center justify-center mb-3"
          >
            <div className="w-2/3 sm:w-3/4 max-w-xs sm:max-w-md rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-zinc-200 flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/height-diagram.webp"
                alt="How posture, load, sleep, and nutrition affect height potential"
                width={384}
                height={684}
                className="w-full h-auto object-contain"
                priority={false}
              />
            </div>
          </motion.div>

          {/* Description with typing effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="relative pl-3 border-l-2 border-[#18181b]/80 mb-5"
          >
            <p className="text-zinc-600 text-sm leading-relaxed">
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
