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
        targetHeight: dreamHeightInCm
      })
    } else {
      updateData({
        dreamCm,
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
    <div className="min-h-screen min-h-dvh bg-black relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={6} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-white text-[28px] font-bold">
              What's your Dream Height?
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
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              ft/in
            </button>
            <button
              onClick={() => setMeasurementSystem('metric')}
              className={`flex-1 py-3 rounded-lg text-center font-semibold transition-all ${
                measurementSystem === 'metric'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white/60'
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
            <p className="text-white/60 text-base mb-2">Dream Height</p>
            <p className="text-white text-5xl font-bold">{displayHeight()}</p>
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
                  <div className="flex justify-between text-white/60 text-sm mb-2">
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
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                  />
                </div>
                
                {/* Inches Slider */}
                <div>
                  <div className="flex justify-between text-white/60 text-sm mb-2">
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
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-white/60 text-sm mb-2">
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
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                />
              </div>
            )}

            <p className="text-white/50 text-sm text-center mt-8">
              This will be used to create your personal plan
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
