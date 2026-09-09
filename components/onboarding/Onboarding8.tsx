'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import { OptionTitle } from './OptionCard'
import { ONBOARDING_UI } from '@/lib/constants/onboarding'

interface Onboarding8Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export default function Onboarding8({ data, updateData, onNext, onBack }: Onboarding8Props) {
  const [sizeSystem, setSizeSystem] = useState(data.footSizeSystem || 'us')
  const [footSize, setFootSize] = useState(data.footSize || 9)

  const getMinMaxValues = () => {
    switch (sizeSystem) {
      case 'us':
        return { min: 5, max: 15, default: 9 }
      case 'eu':
        return { min: 35, max: 50, default: 42 }
      case 'uk':
        return { min: 4, max: 14, default: 8 }
      default:
        return { min: 5, max: 15, default: 9 }
    }
  }

  const { min, max } = getMinMaxValues()

  useEffect(() => {
    updateData({ footSize, footSizeSystem: sizeSystem })
  }, [footSize, sizeSystem])

  const handleSystemChange = (system: string) => {
    setSizeSystem(system)
    setFootSize(system === 'us' ? 9 : system === 'eu' ? 42 : 8)
  }

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={10} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <OptionTitle subtitle="This helps us track your growth progress">
              What is your foot size?
            </OptionTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex gap-3 mb-10 max-w-md mx-auto w-full"
          >
            {['us', 'eu', 'uk'].map((system) => (
              <button
                key={system}
                type="button"
                onClick={() => handleSystemChange(system)}
                className={`flex-1 py-3 rounded-xl text-center font-manrope font-medium transition-all uppercase ${
                  sizeSystem === system ? ONBOARDING_UI.chipSelected : ONBOARDING_UI.chipIdle
                }`}
              >
                {system}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-center mb-10"
          >
            <p className="text-[#18181b] text-6xl font-playfair font-normal">{footSize}</p>
            <p className="font-manrope text-[15px] text-[#a1a1aa] mt-2 uppercase">{sizeSystem}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="max-w-md mx-auto w-full"
          >
            <input
              type="range"
              min={min}
              max={max}
              step="0.5"
              value={footSize}
              onChange={(e) => setFootSize(Number(e.target.value))}
              className="w-full h-2 bg-zinc-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#18181b] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
            />
            <div className="flex justify-between font-manrope text-[15px] text-[#a1a1aa] mt-2">
              <span>{min}</span>
              <span>{max}</span>
            </div>
          </motion.div>
        </div>

        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={false} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
