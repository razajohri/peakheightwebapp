'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import { OptionTitle } from './OptionCard'

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
    image: '/testimonial-mark.webp',
    text: 'The daily reminders are a game changer. Makes it so much easier to stay consistent with exercise.',
  },
  {
    id: 'mo',
    name: 'Mo Daiyoub',
    handle: '@baby_mo',
    image: '/testimonial-mo.webp',
    text: "Didn't think an app could motivate me like this.",
  },
  {
    id: 'seva',
    name: 'Seva Jaenen',
    handle: '@s.jaenen04',
    image: '/testimonial-seva.webp',
    text: 'Really impressed with how smooth the app is.',
  },
]

export default function Onboarding14({ data, updateData, onNext, onBack }: Onboarding14Props) {
  const [showRatingModal, setShowRatingModal] = useState(true)
  const [selectedRating, setSelectedRating] = useState(0)

  const handleSubmitRating = () => {
    setShowRatingModal(false)
  }

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={16} totalSteps={21} onBack={onBack} />
        <div className="flex-1 flex flex-col px-6 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <OptionTitle subtitle="This helps us bring you more of what you love">
              Leave a Rating
            </OptionTitle>
          </motion.div>

          <div className="space-y-4 pb-2">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-3xl bg-white border border-zinc-200 p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-100 flex items-center justify-center shrink-0">
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={40}
                        height={40}
                        sizes="40px"
                        className="w-full h-full object-cover"
                        loading="eager"
                        priority={index === 0}
                      />
                    </div>
                    <div>
                      <p className="text-[#18181b] font-semibold text-sm">{review.name}</p>
                      <p className="text-zinc-400 text-sm">{review.handle}</p>
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
                <p className="text-zinc-600 text-base italic">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div
          className="px-6 pt-6"
          style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
        >
          <OnboardingButton title="Continue" onPress={onNext} disabled={false} />
        </div>
      </OnboardingMotionColumn>

      <AnimatePresence>
        {showRatingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#18181b]/40 p-6"
            onClick={() => setShowRatingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#f4f7fc] rounded-2xl border border-zinc-200 p-6 w-full max-w-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-[#18181b] text-lg font-semibold text-center mb-6">
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
                  className="flex-1 py-3 text-zinc-400 text-sm"
                >
                  Later
                </button>
                <button
                  onClick={handleSubmitRating}
                  disabled={selectedRating === 0}
                  className={`flex-1 py-3 rounded-xl font-medium ${
                    selectedRating > 0
                      ? 'bg-[#18181b] text-white'
                      : 'bg-white/20 text-zinc-400'
                  }`}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </OnboardingShell>
  )
}
