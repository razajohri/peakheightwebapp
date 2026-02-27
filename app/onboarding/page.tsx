'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext'

// Lazy-load each step so phones only load one step at a time (faster initial load)
const Onboarding2 = dynamic(() => import('@/components/onboarding/Onboarding2'), { ssr: false })
const Onboarding3 = dynamic(() => import('@/components/onboarding/Onboarding3'), { ssr: false })
const Onboarding4 = dynamic(() => import('@/components/onboarding/Onboarding4'), { ssr: false })
const Onboarding5 = dynamic(() => import('@/components/onboarding/Onboarding5'), { ssr: false })
const Onboarding5B = dynamic(() => import('@/components/onboarding/Onboarding5B'), { ssr: false })
const Onboarding6 = dynamic(() => import('@/components/onboarding/Onboarding6'), { ssr: false })
const Onboarding7 = dynamic(() => import('@/components/onboarding/Onboarding7'), { ssr: false })
const Onboarding7A = dynamic(() => import('@/components/onboarding/Onboarding7A'), { ssr: false })
const Onboarding8 = dynamic(() => import('@/components/onboarding/Onboarding8'), { ssr: false })
const Onboarding9 = dynamic(() => import('@/components/onboarding/Onboarding9'), { ssr: false })
const Onboarding10 = dynamic(() => import('@/components/onboarding/Onboarding10'), { ssr: false })
const Onboarding11 = dynamic(() => import('@/components/onboarding/Onboarding11'), { ssr: false })
const Onboarding12 = dynamic(() => import('@/components/onboarding/Onboarding12'), { ssr: false })
const Onboarding13 = dynamic(() => import('@/components/onboarding/Onboarding13'), { ssr: false })
const Onboarding13A = dynamic(() => import('@/components/onboarding/Onboarding13A'), { ssr: false })
const Onboarding14 = dynamic(() => import('@/components/onboarding/Onboarding14'), { ssr: false })
const Onboarding15 = dynamic(() => import('@/components/onboarding/Onboarding15'), { ssr: false })
const Onboarding17 = dynamic(() => import('@/components/onboarding/Onboarding17'), { ssr: false })
const OnboardingAuth = dynamic(() => import('@/components/onboarding/OnboardingAuth'), { ssr: false })
const OnboardingComplete = dynamic(() => import('@/components/onboarding/OnboardingComplete'), { ssr: false })

function OnboardingPaywallRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/paywall')
  }, [router])
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <div className="w-8 h-8 border-2 border-white/30 border-t-amber-500 rounded-full animate-spin" />
      <p className="text-white/60 text-sm">Taking you to subscription…</p>
    </div>
  )
}

function OnboardingFlow() {
  const router = useRouter()
  const { currentStep, data, updateData, nextStep, prevStep } = useOnboarding()

  const handleAuthRequired = (authMode: 'signup' | 'signin' = 'signup') => {
    router.push(`/auth?mode=${authMode}&from=onboarding&redirect=/paywall`)
  }

  // Render current onboarding step
  const commonProps = {
    data,
    updateData,
    onNext: nextStep,
    onBack: prevStep,
  }

  switch (currentStep) {
    case 1: // legacy saved step; treat as step 2
    case 2:
      return <Onboarding2 {...commonProps} />
    case 3:
      return <Onboarding3 {...commonProps} />
    case 4:
      return <Onboarding4 {...commonProps} />
    case 5:
      return <Onboarding5 {...commonProps} />
    case 6:
      return <Onboarding5B {...commonProps} />
    case 7:
      return <Onboarding6 {...commonProps} />
    case 8:
      return <Onboarding7 {...commonProps} />
    case 9:
      return <Onboarding7A {...commonProps} />
    case 10:
      return <Onboarding8 {...commonProps} />
    case 11:
      return <Onboarding9 {...commonProps} />
    case 12:
      return <Onboarding10 {...commonProps} />
    case 13:
      return <Onboarding11 {...commonProps} />
    case 14:
      return <Onboarding12 {...commonProps} />
    case 15:
      return <Onboarding13 {...commonProps} />
    case 16:
      return <Onboarding13A {...commonProps} />
    case 17:
      return <Onboarding14 {...commonProps} />
    case 18:
      return <Onboarding15 {...commonProps} />
    case 19:
      return <Onboarding17 {...commonProps} onAuthRequired={handleAuthRequired} />
    case 20:
      return <OnboardingAuth {...commonProps} />
    case 21:
      return <OnboardingPaywallRedirect />
    case 22:
      return <OnboardingComplete data={data} />
    default:
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-white text-2xl sm:text-3xl mb-4">Step {currentStep}</h1>
            <p className="text-gray-400 mb-8 text-sm sm:text-base">Coming soon...</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
              {currentStep < 22 && (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )
  }
}

export default function OnboardingPage() {
  return (
    <div className="min-h-screen min-h-dvh bg-black">
      <OnboardingProvider>
        <OnboardingFlow />
      </OnboardingProvider>
    </div>
  )
}
