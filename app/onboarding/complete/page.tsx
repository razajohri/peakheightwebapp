'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import FloatingStars from '@/components/onboarding/FloatingStars'

export default function OnboardingComplete() {
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Load onboarding data from localStorage
    const savedData = localStorage.getItem('onboardingData')
    if (savedData) {
      console.log('Onboarding data:', JSON.parse(savedData))
    }
    
    // Animate content in
    setTimeout(() => setShowContent(true), 300)
  }, [])

  const handleContinue = () => {
    // Clear onboarding data
    localStorage.removeItem('onboardingData')
    localStorage.removeItem('onboardingStep')
    localStorage.removeItem('pendingOnboardingData')
    
    // Redirect to home/onboarding (user can sign up from there)
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <FloatingStars />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={showContent ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={showContent ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            className="mb-6 sm:mb-8 flex justify-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-green-500/50">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-black"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 leading-tight"
          >
            Welcome to PeakHeight!
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-400 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 leading-relaxed"
          >
            Your personalized growth journey starts now.
            <br />
            Complete your account setup to unlock your custom plan.
          </motion.p>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8 sm:mb-12 space-y-3 sm:space-y-4"
          >
            {[
              'Personalized exercise routines',
              'Nutrition tracking & food scanner',
              'Sleep optimization tips',
              'Progress tracking & analytics',
              'AI-powered growth coach',
              'Community support & Tribe',
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={showContent ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                className="flex items-center justify-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <button
              onClick={handleContinue}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white text-black rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 active:scale-95 transition-all shadow-2xl shadow-white/20"
            >
              Continue to Sign Up
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
