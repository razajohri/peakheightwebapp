'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingStars from './FloatingStars'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface Onboarding14Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const reviews = [
  {
    id: 'mark',
    name: 'Mark Michael',
    handle: '@michaelmark',
    text: 'The daily reminders are a game changer. Makes it so much easier to stay consistent with exercise.',
  },
  {
    id: 'mo',
    name: 'Mo Daiyoub',
    handle: '@baby_mo',
    text: "Didn't think an app could motivate me like this.",
  },
  {
    id: 'seva',
    name: 'Seva Jaenen',
    handle: '@s.jaenen04',
    text: 'Really impressed with how smooth the app is.',
  },
]

export default function Onboarding14({ data, updateData, onNext, onBack }: Onboarding14Props) {
  const [showRatingModal, setShowRatingModal] = useState(true)
  const [selectedRating, setSelectedRating] = useState(0)

  const handleSubmitRating = () => {
    setShowRatingModal(false)
    // In a real app, you'd handle the rating submission here
  }

  return (
    <div className="min-h-screen min-h-dvh bg-black relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={17} totalSteps={22} onBack={onBack} />
        <div className="flex-1 flex flex-col px-6 pt-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-white text-[30px] font-extrabold mb-2">
              Leave a Rating
            </h1>
            <p className="text-white/60 text-base">
              This helps us bring you more of what you love
            </p>
          </motion.div>

          {/* Reviews */}
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-3xl bg-[#050505] border border-white/10 p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{review.name}</p>
                      <p className="text-white/50 text-sm">{review.handle}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} width="13" height="13" viewBox="0 0 24 24" fill="#FFD700">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-white/80 text-base italic">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={false} />
        </div>
      </div>

      {/* Rating Modal */}
      <AnimatePresence>
        {showRatingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
            onClick={() => setShowRatingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black rounded-2xl border border-white/15 p-6 w-full max-w-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white text-lg font-semibold text-center mb-6">
                How would you rate PeakHeight?
              </h3>
              
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    className="p-1"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill={rating <= selectedRating ? '#FFD700' : 'none'}
                      stroke={rating <= selectedRating ? '#FFD700' : '#AAAAAA'}
                      strokeWidth="1.5"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="flex-1 py-3 text-white/50 text-sm"
                >
                  Later
                </button>
                <button
                  onClick={handleSubmitRating}
                  disabled={selectedRating === 0}
                  className={`flex-1 py-3 rounded-xl font-medium ${
                    selectedRating > 0
                      ? 'bg-white text-black'
                      : 'bg-white/20 text-white/50'
                  }`}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
