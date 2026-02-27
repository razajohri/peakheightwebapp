'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { OnboardingData } from '@/lib/onboarding/types'

interface OnboardingContextType {
  currentStep: number
  data: OnboardingData
  updateData: (newData: Partial<OnboardingData>) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  // Start at step 2 by default (skip intro screen)
  const [currentStep, setCurrentStep] = useState(2)
  const [data, setData] = useState<OnboardingData>({})

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('onboardingData')
    const savedStep = localStorage.getItem('onboardingStep')
    if (savedData) {
      try {
        setData(JSON.parse(savedData))
      } catch (error) {
        console.error('Failed to load saved onboarding data:', error)
      }
    }
    if (savedStep) {
      try {
        const step = parseInt(savedStep, 10)
        // If old data saved step 1 (intro), bump to 2
        setCurrentStep(step === 1 ? 2 : step)
      } catch (error) {
        console.error('Failed to load saved step:', error)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('onboardingData', JSON.stringify(data))
  }, [data])

  // Save step to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('onboardingStep', currentStep.toString())
  }, [currentStep])

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }))
  }

  const nextStep = () => {
    if (currentStep < 22) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 22) {
      setCurrentStep(step)
    }
  }

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        data,
        updateData,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}
