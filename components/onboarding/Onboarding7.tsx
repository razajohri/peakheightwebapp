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

        <div className="flex-1 flex flex-col px-6 pt-0">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <h1 className="text-white text-[24px] sm:text-[28px] font-bold leading-tight">
              Height isn't just inherited,
            </h1>
            <div className="inline-block bg-white/10 px-3 py-1 rounded-lg border border-white/20 mt-2">
              <span className="text-white text-[24px] sm:text-[28px] font-bold">it's earned.</span>
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex items-center justify-center mb-4"
          >
            <div className="w-4/5 sm:w-full max-w-sm sm:max-w-md rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/height-diagram.png"
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
