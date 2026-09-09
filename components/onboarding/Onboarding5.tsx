'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import { OptionTitle } from './OptionCard'
import { ONBOARDING_UI } from '@/lib/constants/onboarding'

interface Onboarding5Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export default function Onboarding5({ data, updateData, onNext, onBack }: Onboarding5Props) {
  const [measurementSystem, setMeasurementSystem] = useState(data.measurementSystem || 'imperial')
  
  // Imperial
  const [feet, setFeet] = useState(data.feet || 5)
  const [inches, setInches] = useState(data.inches || 6)
  const [pounds, setPounds] = useState(data.pounds || 150)
  
  // Metric
  const [cm, setCm] = useState(data.cm || 170)
  const [kg, setKg] = useState(data.kg || 68)

  const updateHeightWeight = () => {
    if (measurementSystem === 'imperial') {
      const heightInCm = (feet * 30.48) + (inches * 2.54)
      const weightInKg = pounds * 0.453592
      updateData({
        measurementSystem,
        feet,
        inches,
        pounds,
        currentHeight: heightInCm,
        currentWeight: weightInKg
      })
    } else {
      updateData({
        measurementSystem,
        cm,
        kg,
        currentHeight: cm,
        currentWeight: kg
      })
    }
  }

  useEffect(() => {
    updateHeightWeight()
  }, [feet, inches, pounds, cm, kg, measurementSystem])

  const handleContinue = () => {
    if (measurementSystem === 'imperial') {
      if (feet === 0 && inches === 0) {
        alert('Please enter your height')
        return
      }
      if (pounds === 0) {
        alert('Please enter your weight')
        return
      }
    } else {
      if (cm === 0) {
        alert('Please enter your height')
        return
      }
      if (kg === 0) {
        alert('Please enter your weight')
        return
      }
    }
    onNext()
  }

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={5} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <OptionTitle>What is your height & weight?</OptionTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex gap-3 mb-6 max-w-md mx-auto w-full"
          >
            {(['imperial', 'metric'] as const).map((system) => (
              <button
                key={system}
                type="button"
                onClick={() => setMeasurementSystem(system)}
                className={`flex-1 py-3 rounded-xl text-center font-manrope font-medium transition-all capitalize ${
                  measurementSystem === system ? ONBOARDING_UI.chipSelected : ONBOARDING_UI.chipIdle
                }`}
              >
                {system}
              </button>
            ))}
          </motion.div>

          <div className="max-w-md mx-auto w-full space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-[#18181b] text-lg font-semibold mb-4">Height</h2>
              
              {measurementSystem === 'imperial' ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[#a1a1aa] text-sm mb-2">
                      <span>Feet</span>
                      <span className="font-playfair font-normal text-[#18181b]">{feet} ft</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="7"
                      step="1"
                      value={feet}
                      onChange={(e) => setFeet(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[#18181b] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-[#a1a1aa] text-sm mb-2">
                      <span>Inches</span>
                      <span className="font-playfair font-normal text-[#18181b]">{inches} in</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="11"
                      step="1"
                      value={inches}
                      onChange={(e) => setInches(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[#18181b] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-[#a1a1aa] text-sm mb-2">
                    <span>Centimeters</span>
                    <span className="font-playfair font-normal text-[#18181b]">{cm} cm</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="220"
                    step="1"
                    value={cm}
                    onChange={(e) => setCm(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[#18181b] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="text-[#18181b] text-lg font-semibold mb-4">Weight</h2>
              
              {measurementSystem === 'imperial' ? (
                <div>
                  <div className="flex justify-between text-[#a1a1aa] text-sm mb-2">
                    <span>Pounds</span>
                    <span className="font-playfair font-normal text-[#18181b]">{pounds} lbs</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="300"
                    step="1"
                    value={pounds}
                    onChange={(e) => setPounds(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[#18181b] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-[#a1a1aa] text-sm mb-2">
                    <span>Kilograms</span>
                    <span className="font-playfair font-normal text-[#18181b]">{kg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="150"
                    step="1"
                    value={kg}
                    onChange={(e) => setKg(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[#18181b] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>
              )}
            </motion.div>

            <p className="font-manrope text-[15px] text-[#a1a1aa] text-center pt-4">
              This will be used to create your personal plan
            </p>
          </div>
        </div>

        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={handleContinue} disabled={false} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
