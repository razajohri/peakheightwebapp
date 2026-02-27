'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingStars from './FloatingStars'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface Onboarding6Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export default function Onboarding6({ data, updateData, onNext, onBack }: Onboarding6Props) {
  const [measurementSystem, setMeasurementSystem] = useState(data.parentMeasurementSystem || 'imperial')
  const [showInfoModal, setShowInfoModal] = useState(true)
  
  // Imperial
  const [fatherFeet, setFatherFeet] = useState(data.fatherFeet || 5)
  const [fatherInches, setFatherInches] = useState(data.fatherInches || 10)
  const [motherFeet, setMotherFeet] = useState(data.motherFeet || 5)
  const [motherInches, setMotherInches] = useState(data.motherInches || 4)
  
  // Metric
  const [fatherCm, setFatherCm] = useState(data.fatherCm || 178)
  const [motherCm, setMotherCm] = useState(data.motherCm || 163)

  const updateParentHeights = () => {
    if (measurementSystem === 'imperial') {
      const fatherHeightInCm = (fatherFeet * 30.48) + (fatherInches * 2.54)
      const motherHeightInCm = (motherFeet * 30.48) + (motherInches * 2.54)
      updateData({
        fatherFeet,
        fatherInches,
        motherFeet,
        motherInches,
        parentHeightFather: fatherHeightInCm,
        parentHeightMother: motherHeightInCm,
        parentMeasurementSystem: measurementSystem
      })
    } else {
      updateData({
        fatherCm,
        motherCm,
        parentHeightFather: fatherCm,
        parentHeightMother: motherCm,
        parentMeasurementSystem: measurementSystem
      })
    }
  }

  useEffect(() => {
    updateParentHeights()
  }, [fatherFeet, fatherInches, motherFeet, motherInches, fatherCm, motherCm, measurementSystem])

  const handleSkip = () => {
    updateData({
      parentHeightFather: null,
      parentHeightMother: null,
      fatherFeet: null,
      fatherInches: null,
      motherFeet: null,
      motherInches: null,
      fatherCm: null,
      motherCm: null
    })
    onNext()
  }

  return (
    <div className="min-h-screen min-h-dvh bg-black relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={7} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-4 overflow-y-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-4"
          >
            <h1 className="text-white text-[24px] font-bold">
              How tall are your parents?
            </h1>
          </motion.div>

          {/* Unit Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex rounded-xl border border-white/15 overflow-hidden mb-6 max-w-md mx-auto w-full"
          >
            <button
              onClick={() => setMeasurementSystem('imperial')}
              className={`flex-1 py-3 text-center font-medium transition-all ${
                measurementSystem === 'imperial'
                  ? 'bg-white/10 text-white'
                  : 'text-white/60'
              }`}
            >
              Imperial
            </button>
            <button
              onClick={() => setMeasurementSystem('metric')}
              className={`flex-1 py-3 text-center font-medium transition-all ${
                measurementSystem === 'metric'
                  ? 'bg-white/10 text-white'
                  : 'text-white/60'
              }`}
            >
              Metric
            </button>
          </motion.div>

          <div className="max-w-md mx-auto w-full space-y-6">
            {/* Father's Height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-white text-lg font-bold mb-4">Father's height</h2>
              
              {measurementSystem === 'imperial' ? (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-white/60 text-sm mb-2">
                      <span>Feet</span>
                      <span>{fatherFeet} ft</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="7"
                      step="1"
                      value={fatherFeet}
                      onChange={(e) => setFatherFeet(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-white/60 text-sm mb-2">
                      <span>Inches</span>
                      <span>{fatherInches} in</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="11"
                      step="1"
                      value={fatherInches}
                      onChange={(e) => setFatherInches(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-white/60 text-sm mb-2">
                    <span>Centimeters</span>
                    <span>{fatherCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="220"
                    step="1"
                    value={fatherCm}
                    onChange={(e) => setFatherCm(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>
              )}
            </motion.div>

            {/* Mother's Height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="text-white text-lg font-bold mb-4">Mother's height</h2>
              
              {measurementSystem === 'imperial' ? (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-white/60 text-sm mb-2">
                      <span>Feet</span>
                      <span>{motherFeet} ft</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="6"
                      step="1"
                      value={motherFeet}
                      onChange={(e) => setMotherFeet(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-white/60 text-sm mb-2">
                      <span>Inches</span>
                      <span>{motherInches} in</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="11"
                      step="1"
                      value={motherInches}
                      onChange={(e) => setMotherInches(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-white/60 text-sm mb-2">
                    <span>Centimeters</span>
                    <span>{motherCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="190"
                    step="1"
                    value={motherCm}
                    onChange={(e) => setMotherCm(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>
              )}
            </motion.div>

            {/* Skip Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              onClick={handleSkip}
              className="text-white/50 text-base py-2 mx-auto block"
            >
              I don't know
            </motion.button>
          </div>
        </div>

        {/* Button */}
        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={false} />
        </div>
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
            onClick={() => setShowInfoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-gradient-to-br from-white to-gray-100 rounded-3xl p-8 max-w-sm w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              
              <h3 className="text-black text-2xl font-bold mb-4">
                Why we ask about your parents height?
              </h3>
              
              <p className="text-gray-600 text-base mb-8">
                Telling us your parents' height helps us understand your genetic potential and create a more accurate growth plan tailored specifically to you.
              </p>
              
              <button
                onClick={() => setShowInfoModal(false)}
                className="w-full bg-black text-white font-semibold py-4 rounded-xl"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
