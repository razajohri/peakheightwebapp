'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import { OptionTitle } from './OptionCard'

interface OnboardingWhereYouCouldBeProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

/**
 * Before/after images:
 * public/assets/results-{1,2,3}-before.jpg
 * public/assets/results-{1,2,3}-after.jpg
 */
const RESULTS = [
  {
    id: '1',
    caption: 'Consistent habits · 4 months',
    before: '/assets/results-1-before.jpg',
    after: '/assets/results-1-after.jpg',
  },
  {
    id: '2',
    caption: 'Training + sleep · 6 months',
    before: '/assets/results-2-before.jpg',
    after: '/assets/results-2-after.jpg',
  },
  {
    id: '3',
    caption: 'Full PeakHeight plan · 8 months',
    before: '/assets/results-3-before.jpg',
    after: '/assets/results-3-after.jpg',
  },
]

function ResultImage({
  src,
  alt,
  badge,
  badgeTone,
}: {
  src: string
  alt: string
  badge: string
  badgeTone: 'before' | 'after'
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="relative aspect-[3/4] flex-1 overflow-hidden bg-zinc-100">
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 420px) 45vw, 180px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-3 text-center">
          <span className="font-manrope text-[11px] font-medium text-[#a1a1aa]">{badge}</span>
          <span className="font-manrope text-[10px] text-[#c4c4c8]">Add image soon</span>
        </div>
      )}
      <span
        className={`absolute left-2 top-2 rounded-md px-2 py-0.5 font-manrope text-[10px] font-bold tracking-[0.04em] ${
          badgeTone === 'before'
            ? 'bg-emerald-500 text-white'
            : 'bg-white text-[#18181b]'
        }`}
      >
        {badge}
      </span>
    </div>
  )
}

export default function OnboardingWhereYouCouldBe({
  onNext,
  onBack,
}: OnboardingWhereYouCouldBeProps) {
  const [index, setIndex] = useState(0)
  const current = RESULTS[index]

  const goPrev = () => setIndex((i) => (i - 1 + RESULTS.length) % RESULTS.length)
  const goNext = () => setIndex((i) => (i + 1) % RESULTS.length)

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={18} totalSteps={22} onBack={onBack} />

        <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-4">
          <OptionTitle
            subtitle="Before and after, from people who used PeakHeight."
            className="mb-6"
          >
            Where you could be.
          </OptionTitle>

          <div className="mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="relative flex">
                    <ResultImage
                      src={current.before}
                      alt="Before"
                      badge="BEFORE"
                      badgeTone="before"
                    />
                    <div className="w-px bg-zinc-200" />
                    <ResultImage
                      src={current.after}
                      alt="After"
                      badge="AFTER"
                      badgeTone="after"
                    />

                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Previous result"
                      className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#18181b] shadow-sm"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Next result"
                      className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#18181b] shadow-sm"
                    >
                      ›
                    </button>
                  </div>

                  <div className="flex items-center justify-between px-4 py-3">
                    <p className="font-manrope text-[13px] text-[#52525b]">{current.caption}</p>
                    <div className="flex items-center gap-1.5">
                      {RESULTS.map((r, i) => (
                        <button
                          key={r.id}
                          type="button"
                          aria-label={`Go to result ${i + 1}`}
                          onClick={() => setIndex(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === index ? 'w-4 bg-[#18181b]' : 'w-1.5 bg-zinc-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="px-6 pb-10 pt-4">
          <p className="mb-3 text-center font-manrope text-[11px] font-medium tracking-[0.08em] text-[#a1a1aa]">
            CANCEL ANY TIME
          </p>
          <OnboardingButton title="See your plans" onPress={onNext} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
