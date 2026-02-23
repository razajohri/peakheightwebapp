'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import RevenueCatPaywall from '@/components/paywall/RevenueCatPaywall'
import {
  initializeRevenueCat,
  getCustomerInfo,
  checkPremiumStatus,
  isRevenueCatConfigured,
} from '@/lib/services/revenuecat'
import { saveOnboardingData } from '@/lib/services/user'
import type { OnboardingData } from '@/lib/onboarding/types'

export default function PaywallPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [status, setStatus] = useState<'loading' | 'paywall' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const onboardingSaveAttempted = useRef(false)

  // Save onboarding data from localStorage to DB when user lands from onboarding+auth (same as mobile)
  useEffect(() => {
    if (!user?.id || onboardingSaveAttempted.current) return
    const raw = typeof window !== 'undefined' ? localStorage.getItem('onboardingData') : null
    if (!raw) return
    onboardingSaveAttempted.current = true
    try {
      const data = JSON.parse(raw) as OnboardingData
      if (data && typeof data === 'object') {
        saveOnboardingData(user.id, data).then((result) => {
          if (result.success && typeof window !== 'undefined') {
            localStorage.removeItem('onboardingData')
            localStorage.removeItem('onboardingStep')
            if (process.env.NODE_ENV === 'development') {
              console.log('[Paywall] Onboarding data saved to Supabase (user)', user.id)
            }
          }
        })
      }
    } catch {
      onboardingSaveAttempted.current = false
    }
  }, [user?.id])

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace('/auth?redirect=/paywall&from=onboarding')
      return
    }

    let cancelled = false

    const run = async () => {
      if (!isRevenueCatConfigured()) {
        setErrorMessage('Payments not configured.')
        setStatus('error')
        return
      }
      try {
        await initializeRevenueCat(user.id)
        if (cancelled) return
        const info = await getCustomerInfo()
        if (cancelled) return
        if (info && checkPremiumStatus(info)) {
          router.replace('/success')
          return
        }
        setStatus('paywall')
      } catch (err) {
        if (!cancelled) {
          setStatus('error')
          setErrorMessage((err as Error)?.message ?? 'Something went wrong.')
        }
      }
    }

    run()
    return () => { cancelled = true }
  }, [user, loading, router])

  const handlePurchaseSuccess = () => {
    router.replace('/success')
  }

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
        <div className="w-10 h-10 border-2 border-white/30 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-white/60 text-sm mt-4">Loading subscription options…</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
        <p className="text-red-400 text-center mb-6">{errorMessage}</p>
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-xl bg-white text-black font-semibold"
        >
          Go to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="p-4 flex items-center justify-between border-b border-white/10">
        <Link href="/" className="text-white font-semibold">
          Peak Height
        </Link>
        <Link
          href="/dashboard"
          className="text-white/60 text-sm hover:text-white"
        >
          Skip for now
        </Link>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-white text-xl font-bold text-center mb-2">
          Unlock your growth plan
        </h1>
        <p className="text-white/60 text-sm text-center mb-8 max-w-sm">
          Subscribe to get your custom report and use the app on your phone with the same account.
        </p>
        <div className="w-full max-w-md">
          <RevenueCatPaywall
            onPurchaseSuccess={handlePurchaseSuccess}
            onBack={() => router.push('/dashboard')}
          />
        </div>
      </div>
    </div>
  )
}
