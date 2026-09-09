'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import { OptionTitle } from './OptionCard'

interface Onboarding7Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export default function Onboarding7({ data, updateData, onNext, onBack }: Onboarding7Props) {
  const fullText = 'The right daily routine can unlock hidden growth potential.'
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
          <span className="bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200 whitespace-nowrap">
            {highlight}
          </span>
          {parts[1]}
        </>
      )
    }
    return displayedText
  }

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={8} totalSteps={21} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-1 pb-2 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-4"
          >
            <OptionTitle>Height isn&apos;t inherited, it&apos;s earned.</OptionTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex justify-center mb-5"
          >
            <div className="w-[72%] max-w-[280px] rounded-2xl bg-white border border-zinc-200 overflow-hidden shadow-sm">
              <Image
                src="/assets/height-diagram.webp"
                alt="How posture, load, sleep, and nutrition affect height potential"
                width={384}
                height={684}
                sizes="(max-width: 768px) 72vw, 280px"
                className="w-full h-auto object-contain"
                priority
                loading="eager"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="relative pl-3 border-l-2 border-[#18181b]/80 mb-4"
          >
            <p className="font-manrope text-[15px] text-[#a1a1aa] leading-relaxed">
              {renderText()}
              {currentIndex < fullText.length && <span className="animate-pulse">|</span>}
            </p>
          </motion.div>
        </div>

        <div
          className="px-6 pt-2"
          style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          <OnboardingButton title="Continue" onPress={onNext} disabled={false} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
