'use client'

import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext'
import Onboarding2 from '@/components/onboarding/Onboarding2'
import OnboardingWelcome from '@/components/onboarding/OnboardingWelcome'
import OnboardingName from '@/components/onboarding/OnboardingName'
import OnboardingNameReveal from '@/components/onboarding/OnboardingNameReveal'

// 3-2-1 countdown — all inline styles, no CSS deps. Shows first so user always sees something.
function IntroCountdown({ onComplete }: { onComplete: () => void }) {
  const [n, setN] = useState(3)

  useEffect(() => {
    if (n <= 0) {
      onComplete()
      return
    }
    const t = setTimeout(() => setN(n - 1), 900)
    return () => clearTimeout(t)
  }, [n, onComplete])

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage:
          'radial-gradient(circle at 78% 16%, rgba(197, 231, 255, 0.42), transparent 24%), radial-gradient(circle at 30% 84%, rgba(161, 216, 255, 0.14), transparent 30%), linear-gradient(180deg, #f4f7fc 0%, #edf3fb 32%, #e4ecf7 58%, #dde7f4 100%)',
        backgroundColor: '#f4f7fc',
        gap: 8,
      }}
    >
      <span
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: '#18181b',
          lineHeight: 1,
        }}
      >
        {n > 0 ? n : ''}
      </span>
    </div>
  )
}

// Fallback so the slot is never empty while a step chunk loads
function StepLoading() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f7fc',
      }}
    >
      <div
        className="ph-critical-spinner"
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '2px solid #e5e7eb',
          borderTopColor: '#18181b',
        }}
      />
    </div>
  )
}

// Onboarding2 in main bundle so first step loads without separate chunk (avoids 404 blank)
// Lazy-load other steps
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
    <div className="min-h-screen bg-[#f4f7fc] flex flex-col items-center justify-center gap-4">
      <div className="w-8 h-8 border-2 border-zinc-200 border-t-[#18181b] rounded-full animate-spin" />
      <p className="text-[#a1a1aa] text-sm">Taking you to subscription…</p>
    </div>
  )
}

function OnboardingFlow() {
  const router = useRouter()
  const { currentStep, data, updateData, nextStep, prevStep } = useOnboarding()
  const [countdownDone, setCountdownDone] = useState(false)
  const [welcomeDone, setWelcomeDone] = useState(false)
  const [preStep, setPreStep] = useState<'name' | 'reveal' | 'done'>('name')

  const handleAuthRequired = (authMode: 'signup' | 'signin' = 'signup') => {
    router.push(`/auth?mode=${authMode}&from=onboarding&redirect=/paywall`)
  }

  // Resume mid-flow skips intro gates; step 1 can return via back
  useEffect(() => {
    if (currentStep > 1) {
      setWelcomeDone(true)
      setPreStep('done')
      try {
        sessionStorage.setItem('ph_welcome_done', '1')
        sessionStorage.setItem('ph_name_done', '1')
      } catch {
        /* ignore */
      }
      return
    }
    try {
      if (sessionStorage.getItem('ph_welcome_done') === '1') setWelcomeDone(true)
      if (sessionStorage.getItem('ph_name_done') === '1') setPreStep('done')
    } catch {
      /* ignore */
    }
  }, [currentStep])

  const finishWelcome = useCallback(() => {
    try {
      sessionStorage.setItem('ph_welcome_done', '1')
    } catch {
      /* ignore */
    }
    setWelcomeDone(true)
  }, [])

  const backToWelcome = useCallback(() => {
    try {
      sessionStorage.removeItem('ph_welcome_done')
    } catch {
      /* ignore */
    }
    setWelcomeDone(false)
  }, [])

  const finishNameReveal = useCallback(() => {
    try {
      sessionStorage.setItem('ph_name_done', '1')
    } catch {
      /* ignore */
    }
    setPreStep('done')
  }, [])

  const backToName = useCallback(() => {
    try {
      sessionStorage.removeItem('ph_name_done')
    } catch {
      /* ignore */
    }
    setPreStep('name')
  }, [])

  // Prefetch next step's chunk so it loads faster when user taps Continue
  useEffect(() => {
    if (currentStep >= 21) return
    const prefetch: Record<number, () => Promise<unknown>> = {
      1: () => import('@/components/onboarding/Onboarding3'),
      2: () => import('@/components/onboarding/Onboarding3'),
      3: () => import('@/components/onboarding/Onboarding4'),
      4: () => import('@/components/onboarding/Onboarding5'),
      5: () => import('@/components/onboarding/Onboarding5B'),
      6: () => import('@/components/onboarding/Onboarding6'),
      7: () => import('@/components/onboarding/Onboarding7'),
      8: () => import('@/components/onboarding/Onboarding7A'),
      9: () => import('@/components/onboarding/Onboarding8'),
      10: () => import('@/components/onboarding/Onboarding9'),
      11: () => import('@/components/onboarding/Onboarding10'),
      12: () => import('@/components/onboarding/Onboarding12'),
      13: () => import('@/components/onboarding/Onboarding13'),
      14: () => import('@/components/onboarding/Onboarding13A'),
      15: () => import('@/components/onboarding/Onboarding14'),
      16: () => import('@/components/onboarding/Onboarding15'),
      17: () => import('@/components/onboarding/Onboarding17'),
      18: () => import('@/components/onboarding/OnboardingAuth'),
      19: () => import('@/components/onboarding/OnboardingComplete'),
    }
    prefetch[currentStep]?.()
  }, [currentStep])

  // 3-2-1 countdown first — ensures user always sees something (works without CSS)
  const onCountdownComplete = useCallback(() => setCountdownDone(true), [])
  if (!countdownDone) {
    return <IntroCountdown onComplete={onCountdownComplete} />
  }

  if (!welcomeDone) {
    return <OnboardingWelcome onNext={finishWelcome} />
  }

  if (preStep === 'name') {
    return (
      <OnboardingName
        data={data}
        updateData={updateData}
        onNext={() => setPreStep('reveal')}
        onBack={backToWelcome}
      />
    )
  }

  if (preStep === 'reveal') {
    return (
      <OnboardingNameReveal
        name={data.userName || ''}
        onNext={finishNameReveal}
        onBack={backToName}
      />
    )
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
      return (
        <Onboarding2
          {...commonProps}
          onBack={backToName}
        />
      )
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
      return <Onboarding12 {...commonProps} />
    case 13:
      return <Onboarding13 {...commonProps} />
    case 14:
      return <Onboarding13A {...commonProps} />
    case 15:
      return <Onboarding14 {...commonProps} />
    case 16:
      return <Onboarding15 {...commonProps} />
    case 17:
      return <Onboarding17 {...commonProps} onAuthRequired={handleAuthRequired} />
    case 18:
      return <OnboardingAuth {...commonProps} />
    case 19:
      return <OnboardingPaywallRedirect />
    case 20:
      return <OnboardingComplete data={data} />
    case 21:
      return <OnboardingComplete data={data} />
    default:
      return (
        <div className="min-h-screen bg-[#f4f7fc] flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-[#18181b] text-2xl sm:text-3xl mb-4">Step {currentStep}</h1>
            <p className="text-[#a1a1aa] mb-8 text-sm sm:text-base">Coming soon...</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-[#18181b] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Back
              </button>
              {currentStep < 21 && (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-[#18181b] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
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
      className="min-h-screen min-h-dvh"
      style={{
        minHeight: '100vh',
        backgroundImage:
          'radial-gradient(circle at 78% 16%, rgba(197, 231, 255, 0.42), transparent 24%), linear-gradient(180deg, #f4f7fc 0%, #edf3fb 32%, #e4ecf7 58%, #dde7f4 100%)',
        backgroundColor: '#f4f7fc',
      }}
    >
      <OnboardingProvider>
        <OnboardingFlow />
      </OnboardingProvider>
    </div>
  )
}
