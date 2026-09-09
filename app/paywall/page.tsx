'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'
import PeakHeightPaywall from '@/components/paywall/PeakHeightPaywall'
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
  const redirectedToAuth = useRef(false)

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

    let cancelled = false

    const resolveUserId = async (): Promise<string | null> => {
      if (user?.id) return user.id

      // Context can lag behind verifyOtp — read session from Supabase storage
      for (let attempt = 0; attempt < 8; attempt++) {
        if (cancelled) return null
        const { data } = await supabase.auth.getSession()
        if (data.session?.user?.id) return data.session.user.id
        await new Promise((r) => setTimeout(r, 250))
      }
      return null
    }

    const loadPaywall = async () => {
      const userId = await resolveUserId()
      if (cancelled) return

      if (!userId) {
        if (!redirectedToAuth.current) {
          redirectedToAuth.current = true
          router.replace('/auth?redirect=/paywall&from=onboarding')
        }
        return
      }

      if (!isRevenueCatConfigured()) {
        setErrorMessage(
          'Subscription options aren’t available on this site yet. If you’re the site owner, add NEXT_PUBLIC_REVENUECAT_API_KEY in Netlify (or your host) and redeploy.'
        )
        setStatus('error')
        return
      }

      try {
        await initializeRevenueCat(userId)
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

    loadPaywall()
    return () => {
      cancelled = true
    }
  }, [user, loading, router])

  const handlePurchaseSuccess = () => {
    router.replace('/success')
  }

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-[#f4f7fc] flex flex-col items-center justify-center px-6">
        <div className="w-10 h-10 border-2 border-zinc-200 border-t-[#18181b] rounded-full animate-spin" />
        <p className="text-[#a1a1aa] text-sm mt-4">Loading subscription options…</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-[#f4f7fc] flex flex-col items-center justify-center px-6">
        <p className="text-[#18181b] text-center mb-2 max-w-md font-medium">
          Subscription isn’t available on this site yet.
        </p>
        <p className="text-[#a1a1aa] text-center text-sm mb-6 max-w-md">
          {errorMessage}
        </p>
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-full bg-[#18181b] text-white font-medium"
        >
          Go to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <PeakHeightPaywall
      onPurchaseSuccess={handlePurchaseSuccess}
      onBack={() => router.push('/dashboard')}
    />
  )
}
