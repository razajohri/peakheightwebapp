'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingStars from './FloatingStars'
import OnboardingButton from './OnboardingButton'

interface Onboarding15Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const steps = [
  'Calculating growth potential...',
  'Analyzing your profile...',
  'Creating custom plan...',
  'Setting up tracking...',
]

const recommendations = [
  'Daily exercises',
  'Nutrition tracking',
  'Sleep optimization',
  'Posture correction',
  'Progress tracking',
]

const completionPoints = [
  'Current height',
  'Genetic potential',
  'Sleep patterns',
  'Exercise consistency',
  'Lifestyle habits',
  'Personal goals',
]

export default function Onboarding15({ data, updateData, onNext, onBack }: Onboarding15Props) {
  const [progress, setProgress] = useState(0)
  const [analyzing, setAnalyzing] = useState(true)
  const [currentStep, setCurrentStep] = useState(steps[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + 1.2, 100)
        const stepIndex = Math.floor((newProgress / 100) * steps.length)
        if (stepIndex < steps.length) {
          setCurrentStep(steps[stepIndex])
        }
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => setAnalyzing(false), 500)
        }
        return newProgress
      })
    }, 60)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen min-h-dvh bg-black relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <div className="flex-1 flex flex-col px-6 pt-10">
          <AnimatePresence mode="wait">
            {analyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col"
              >
                {/* Percentage */}
                <motion.p
                  className="text-white text-7xl font-bold text-center mb-4"
                  style={{ letterSpacing: '-2px' }}
                >
                  {Math.round(progress)}%
                </motion.p>

                {/* Title */}
                <p className="text-white text-2xl font-semibold text-center mb-8 leading-relaxed">
                  We're setting everything<br />up for you
                </p>

                {/* Progress Bar */}
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#95E1D3]"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Current Step */}
                <p className="text-white/50 text-center mb-10">
                  {currentStep}
                </p>

                {/* Recommendation Card */}
                <div className="bg-gray-100 rounded-2xl p-5 mt-auto mb-6">
                  <p className="text-gray-800 font-bold text-lg mb-4">
                    Daily recommendation for
                  </p>
                  <div className="space-y-3">
                    {recommendations.map((item, index) => {
                      const isComplete = progress > ((index + 1) / recommendations.length) * 100
                      return (
                        <div key={item} className="flex items-center justify-between">
                          <span className="text-gray-800">{item}</span>
                          {isComplete && (
                            <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12l5 5L20 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="complete"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center"
              >
                {/* Success Badge */}
                <div className="w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.5)]">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0D1F12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-white text-4xl font-black text-center mb-6">
                  Analysis Complete!
                </h1>

                {/* Completion Card */}
                <div className="w-full bg-[#050505] border border-white/10 rounded-2xl p-5">
                  {completionPoints.map((point, index) => (
                    <motion.div
                      key={point}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 mb-3 last:mb-0"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#7CFFAF] flex items-center justify-center shadow-[0_0_10px_rgba(124,255,175,0.5)]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D1F12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      </div>
                      <span className="text-white">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Button */}
        <div className="px-6 pb-10">
          <OnboardingButton 
            title={analyzing ? 'Continue' : 'See my report'} 
            onPress={onNext} 
            disabled={analyzing} 
          />
        </div>
      </div>
    </div>
  )
}
