'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import { OptionTitle } from './OptionCard'
import { ONBOARDING_UI } from '@/lib/constants/onboarding'

interface Onboarding6Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const sliderClass =
  'w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#18181b] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md'

function SliderField({
  label,
  valueLabel,
  min,
  max,
  value,
  onChange,
}: {
  label: string
  valueLabel: string
  min: number
  max: number
  value: number
  onChange: (n: number) => void
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#52525b]">{label}</span>
        <span className="text-sm font-semibold text-[#18181b] tabular-nums">{valueLabel}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={sliderClass}
      />
    </div>
  )
}

export default function Onboarding6({ data, updateData, onNext, onBack }: Onboarding6Props) {
  const [measurementSystem, setMeasurementSystem] = useState(data.parentMeasurementSystem || 'imperial')
  const [showInfoModal, setShowInfoModal] = useState(true)

  const [fatherFeet, setFatherFeet] = useState(data.fatherFeet || 5)
  const [fatherInches, setFatherInches] = useState(data.fatherInches || 10)
  const [motherFeet, setMotherFeet] = useState(data.motherFeet || 5)
  const [motherInches, setMotherInches] = useState(data.motherInches || 4)

  const [fatherCm, setFatherCm] = useState(data.fatherCm || 178)
  const [motherCm, setMotherCm] = useState(data.motherCm || 163)

  const updateParentHeights = () => {
    if (measurementSystem === 'imperial') {
      const fatherHeightInCm = fatherFeet * 30.48 + fatherInches * 2.54
      const motherHeightInCm = motherFeet * 30.48 + motherInches * 2.54
      updateData({
        fatherFeet,
        fatherInches,
        motherFeet,
        motherInches,
        parentHeightFather: fatherHeightInCm,
        parentHeightMother: motherHeightInCm,
        parentMeasurementSystem: measurementSystem,
      })
    } else {
      updateData({
        fatherCm,
        motherCm,
        parentHeightFather: fatherCm,
        parentHeightMother: motherCm,
        parentMeasurementSystem: measurementSystem,
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
      motherCm: null,
    })
    onNext()
  }

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={7} totalSteps={21} onBack={onBack} />

        <div className="flex-1 flex flex-col px-5 sm:px-6 pt-2 pb-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-6"
          >
            <OptionTitle>How tall are your parents?</OptionTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="flex gap-3 mb-8 max-w-md mx-auto w-full"
          >
            {(['imperial', 'metric'] as const).map((system) => (
              <button
                key={system}
                type="button"
                onClick={() => setMeasurementSystem(system)}
                className={`flex-1 py-2.5 rounded-full text-center text-sm font-manrope font-medium transition-all capitalize ${
                  measurementSystem === system ? ONBOARDING_UI.chipSelected : ONBOARDING_UI.chipIdle
                }`}
              >
                {system}
              </button>
            ))}
          </motion.div>

          <div className="max-w-md mx-auto w-full flex flex-col gap-5">
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-[#18181b] text-base font-semibold mb-5">Father&apos;s height</h2>
              {measurementSystem === 'imperial' ? (
                <div className="space-y-6">
                  <SliderField
                    label="Feet"
                    valueLabel={`${fatherFeet} ft`}
                    min={4}
                    max={7}
                    value={fatherFeet}
                    onChange={setFatherFeet}
                  />
                  <SliderField
                    label="Inches"
                    valueLabel={`${fatherInches} in`}
                    min={0}
                    max={11}
                    value={fatherInches}
                    onChange={setFatherInches}
                  />
                </div>
              ) : (
                <SliderField
                  label="Centimeters"
                  valueLabel={`${fatherCm} cm`}
                  min={150}
                  max={220}
                  value={fatherCm}
                  onChange={setFatherCm}
                />
              )}
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-[#18181b] text-base font-semibold mb-5">Mother&apos;s height</h2>
              {measurementSystem === 'imperial' ? (
                <div className="space-y-6">
                  <SliderField
                    label="Feet"
                    valueLabel={`${motherFeet} ft`}
                    min={4}
                    max={6}
                    value={motherFeet}
                    onChange={setMotherFeet}
                  />
                  <SliderField
                    label="Inches"
                    valueLabel={`${motherInches} in`}
                    min={0}
                    max={11}
                    value={motherInches}
                    onChange={setMotherInches}
                  />
                </div>
              ) : (
                <SliderField
                  label="Centimeters"
                  valueLabel={`${motherCm} cm`}
                  min={140}
                  max={190}
                  value={motherCm}
                  onChange={setMotherCm}
                />
              )}
            </motion.section>

            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              onClick={handleSkip}
              className="text-[#71717a] text-sm font-medium py-3 mx-auto block hover:text-[#18181b] transition-colors"
            >
              I don&apos;t know
            </motion.button>
          </div>
        </div>

        <div className="px-5 sm:px-6 pt-4 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={false} />
        </div>
      </OnboardingMotionColumn>

      <AnimatePresence>
        {showInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#18181b]/70 p-6"
            onClick={() => setShowInfoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center border border-zinc-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 rounded-full bg-[#f4f7fc] flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#18181b" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>

              <h3 className="text-[#18181b] font-playfair text-2xl font-normal mb-4">
                Why we ask about your parents&apos; height
              </h3>

              <p className="text-[#71717a] text-base mb-8 leading-relaxed">
                Telling us your parents&apos; height helps us understand your genetic potential and create a more
                accurate growth plan tailored specifically to you.
              </p>

              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="w-full bg-[#18181b] text-white font-medium py-4 rounded-full"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </OnboardingShell>
  )
}
