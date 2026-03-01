'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext'

// Fallback so the slot is never empty while a step chunk loads (avoids white/blank page)
function StepLoading() {
  return (
    <div
      className="min-h-screen min-h-dvh flex items-center justify-center"
      style={{ backgroundColor: '#000', minHeight: '100vh' }}
    >
      <div
        className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white animate-spin"
        style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
      />
    </div>
  )
}

// Next.js requires the options argument to be an object literal at the call site
// Lazy-load each step so phones only load one step at a time (faster initial load)
const Onboarding2 = dynamic(() => import('@/components/onboarding/Onboarding2'), { ssr: false, loading: StepLoading })
const Onboarding3 = dynamic(() => import('@/components/onboarding/Onboarding3'), { ssr: false, loading: StepLoading })
const Onboarding4 = dynamic(() => import('@/components/onboarding/Onboarding4'), { ssr: false, loading: StepLoading })
const Onboarding5 = dynamic(() => import('@/components/onboarding/Onboarding5'), { ssr: false, loading: StepLoading })
const Onboarding5B = dynamic(() => import('@/components/onboarding/Onboarding5B'), { ssr: false, loading: StepLoading })
const Onboarding6 = dynamic(() => import('@/components/onboarding/Onboarding6'), { ssr: false, loading: StepLoading })
const Onboarding7 = dynamic(() => import('@/components/onboarding/Onboarding7'), { ssr: false, loading: StepLoading })
const Onboarding7A = dynamic(() => import('@/components/onboarding/Onboarding7A'), { ssr: false, loading: StepLoading })
const Onboarding8 = dynamic(() => import('@/components/onboarding/Onboarding8'), { ssr: false, loading: StepLoading })
const Onboarding9 = dynamic(() => import('@/components/onboarding/Onboarding9'), { ssr: false, loading: StepLoading })
const Onboarding10 = dynamic(() => import('@/components/onboarding/Onboarding10'), { ssr: false, loading: StepLoading })
const Onboarding11 = dynamic(() => import('@/components/onboarding/Onboarding11'), { ssr: false, loading: StepLoading })
const Onboarding12 = dynamic(() => import('@/components/onboarding/Onboarding12'), { ssr: false, loading: StepLoading })
const Onboarding13 = dynamic(() => import('@/components/onboarding/Onboarding13'), { ssr: false, loading: StepLoading })
const Onboarding13A = dynamic(() => import('@/components/onboarding/Onboarding13A'), { ssr: false, loading: StepLoading })
const Onboarding14 = dynamic(() => import('@/components/onboarding/Onboarding14'), { ssr: false, loading: StepLoading })
const Onboarding15 = dynamic(() => import('@/components/onboarding/Onboarding15'), { ssr: false, loading: StepLoading })
const Onboarding17 = dynamic(() => import('@/components/onboarding/Onboarding17'), { ssr: false, loading: StepLoading })
const OnboardingAuth = dynamic(() => import('@/components/onboarding/OnboardingAuth'), { ssr: false, loading: StepLoading })
const OnboardingComplete = dynamic(() => import('@/components/onboarding/OnboardingComplete'), { ssr: false, loading: StepLoading })

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
    case 1:
      return <Onboarding2 {...commonProps} />
    case 2:
      return <Onboarding3 {...commonProps} />
    case 3:
      return <Onboarding4 {...commonProps} />
    case 4:
      return <Onboarding5 {...commonProps} />
    case 5:
      return <Onboarding5B {...commonProps} />
    case 6:
      return <Onboarding6 {...commonProps} />
    case 7:
      return <Onboarding7 {...commonProps} />
    case 8:
      return <Onboarding7A {...commonProps} />
    case 9:
      return <Onboarding8 {...commonProps} />
    case 10:
      return <Onboarding9 {...commonProps} />
    case 11:
      return <Onboarding10 {...commonProps} />
    case 12:
      return <Onboarding11 {...commonProps} />
    case 13:
      return <Onboarding12 {...commonProps} />
    case 14:
      return <Onboarding13 {...commonProps} />
    case 15:
      return <Onboarding13A {...commonProps} />
    case 16:
      return <Onboarding14 {...commonProps} />
    case 17:
      return <Onboarding15 {...commonProps} />
    case 18:
      return <Onboarding17 {...commonProps} onAuthRequired={handleAuthRequired} />
    case 19:
      return <OnboardingAuth {...commonProps} />
    case 20:
      return <OnboardingPaywallRedirect />
    case 21:
      return <OnboardingComplete data={data} />
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
    <div
      className="min-h-screen min-h-dvh bg-black"
      style={{ minHeight: '100vh', backgroundColor: '#000' }}
    >
      <OnboardingProvider>
        <OnboardingFlow />
      </OnboardingProvider>
    </div>
  )
}
