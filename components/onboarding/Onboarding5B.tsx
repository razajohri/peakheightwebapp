'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FloatingStars from './FloatingStars'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface Onboarding5BProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export default function Onboarding5B({ data, updateData, onNext, onBack }: Onboarding5BProps) {
  const [measurementSystem, setMeasurementSystem] = useState(data.measurementSystem || 'imperial')
  
  // Imperial
  const [dreamFeet, setDreamFeet] = useState(data.dreamFeet || 6)
  const [dreamInches, setDreamInches] = useState(data.dreamInches || 0)
  
  // Metric
  const [dreamCm, setDreamCm] = useState(data.dreamCm || 183)

  const updateDreamHeight = () => {
    if (measurementSystem === 'imperial') {
      const dreamHeightInCm = (dreamFeet * 30.48) + (dreamInches * 2.54)
      updateData({
        dreamFeet,
        dreamInches,
        dreamCm: dreamHeightInCm,
        dreamHeight: dreamHeightInCm,
        targetHeight: dreamHeightInCm
      })
    } else {
      updateData({
        dreamCm,
        dreamHeight: dreamCm,
        targetHeight: dreamCm
      })
    }
  }

  useEffect(() => {
    updateDreamHeight()
  }, [dreamFeet, dreamInches, dreamCm, measurementSystem])

  const displayHeight = () => {
    if (measurementSystem === 'imperial') {
      return `${dreamFeet}'${dreamInches}"`
    }
    return `${dreamCm} cm`
  }

  return (
    <div className="min-h-screen min-h-dvh bg-[#f4f7fc] relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={6} totalSteps={21} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-[#18181b] font-playfair font-normal text-[22px] min-[390px]:text-[24px] sm:text-[28px] whitespace-nowrap tracking-tight">
              What&apos;s your Dream Height?
            </h1>
          </motion.div>

          {/* Unit Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex gap-3 mb-10 max-w-md mx-auto w-full"
          >
            <button
              onClick={() => setMeasurementSystem('imperial')}
              className={`flex-1 py-3 rounded-lg text-center font-semibold transition-all ${
                measurementSystem === 'imperial'
                  ? 'bg-[#18181b] text-white'
                  : 'bg-zinc-100 text-[#a1a1aa]'
              }`}
            >
              ft/in
            </button>
            <button
              onClick={() => setMeasurementSystem('metric')}
              className={`flex-1 py-3 rounded-lg text-center font-semibold transition-all ${
                measurementSystem === 'metric'
                  ? 'bg-[#18181b] text-white'
                  : 'bg-zinc-100 text-[#a1a1aa]'
              }`}
            >
              cm
            </button>
          </motion.div>

          {/* Height Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-center mb-10"
          >
            <p className="text-[#a1a1aa] text-base mb-2">Dream Height</p>
            <p className="text-[#18181b] text-5xl font-bold">{displayHeight()}</p>
          </motion.div>

          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full"
          >
            {measurementSystem === 'imperial' ? (
              <div className="space-y-6">
                {/* Feet Slider */}
                <div>
                  <div className="flex justify-between text-[#a1a1aa] text-sm mb-2">
                    <span>Feet</span>
                    <span>{dreamFeet} ft</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="7"
                    step="1"
                    value={dreamFeet}
                    onChange={(e) => setDreamFeet(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#18181b] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                  />
                </div>
                
                {/* Inches Slider */}
                <div>
                  <div className="flex justify-between text-[#a1a1aa] text-sm mb-2">
                    <span>Inches</span>
                    <span>{dreamInches} in</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="11"
                    step="1"
                    value={dreamInches}
                    onChange={(e) => setDreamInches(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#18181b] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-[#a1a1aa] text-sm mb-2">
                  <span>Centimeters</span>
                  <span>{dreamCm} cm</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="220"
                  step="1"
                  value={dreamCm}
                  onChange={(e) => setDreamCm(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#18181b] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                />
              </div>
            )}

            <p className="text-[#a1a1aa] text-sm text-center mt-10 mb-2">
              This will be used to create your personal plan
            </p>
          </motion.div>
        </div>

        {/* Button */}
        <div className="px-6 pt-6 pb-10 sm:pt-8">
          <OnboardingButton title="Continue" onPress={onNext} disabled={false} />
        </div>
      </div>
    </div>
  )
}
