'use client'

import { useRef, useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import type { Offering } from '@revenuecat/purchases-js'
import {
  getRevenueCat,
  initializeRevenueCat,
  getOfferings,
  presentPaywall,
  getCustomerInfo,
  checkPremiumStatus,
  openCustomerCenter,
} from '@/lib/services/revenuecat'

const NO_OFFERING_MESSAGE = 'Subscription plans aren’t available yet. Please configure an Offering with Web products in RevenueCat (Project → Web → Offerings) and set one as Current, or try again later.'
const NO_PAYWALL_MESSAGE = 'Subscription screen isn’t ready yet. In RevenueCat: go to Paywalls, create or open a paywall, and attach it to the offering "web premium".'

interface RevenueCatPaywallProps {
  /** Mount point for the paywall. If null, RevenueCat uses a full-screen overlay. */
  htmlTargetId?: string | null
  /** Called when user completes a purchase successfully. */
  onPurchaseSuccess?: () => void
  /** Called when user dismisses the paywall (back). */
  onBack?: () => void
  /** Optional fallback URL when opening "manage subscription" (e.g. support page). */
  customerCenterFallbackUrl?: string
}

/**
 * Renders the RevenueCat-hosted paywall via presentPaywall().
 * Configure your paywall in RevenueCat Dashboard (Paywalls). Uses current offering.
 */
export default function RevenueCatPaywall({
  htmlTargetId = null,
  onPurchaseSuccess,
  onBack,
  customerCenterFallbackUrl,
}: RevenueCatPaywallProps) {
  const { user } = useAuth()
  const containerRef = useRef<HTMLDivElement>(null)
  const offeringRef = useRef<Offering | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'no_offering' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id) {
      setStatus('error')
      setErrorMessage('Sign in to view subscription options.')
      return
    }

    let cancelled = false

    const run = async () => {
      setStatus('loading')
      setErrorMessage(null)
      try {
        await initializeRevenueCat(user.id)
        if (cancelled) return
        const purchases = getRevenueCat()
        if (!purchases) throw new Error('RevenueCat not available')
        const info = await getCustomerInfo()
        if (cancelled) return
        if (info && checkPremiumStatus(info)) {
          onPurchaseSuccess?.()
          return
        }
        const { currentOffering, all } = await getOfferings()
        if (cancelled) return
        if (!currentOffering) {
          setStatus('no_offering')
          setErrorMessage(NO_OFFERING_MESSAGE)
          if (process.env.NODE_ENV === 'development') {
            console.warn('[RevenueCat] No offering. In RevenueCat: Web → Offerings → create one and set as Current.')
          }
          return
        }
        if (process.env.NODE_ENV === 'development' && (!all || all.length === 0)) {
          console.warn('[RevenueCat] Offering has no packages. Add products (yearly, weekly) to the offering in RevenueCat.')
        }
        offeringRef.current = currentOffering
        setStatus('ready')
      } catch (err) {
        if (!cancelled) {
          setStatus('error')
          setErrorMessage((err as Error)?.message ?? 'Failed to load paywall.')
        }
      }
    }

    run()
    return () => { cancelled = true }
  }, [user?.id, onPurchaseSuccess])

  const handlePresentPaywall = async () => {
    if (!user?.id) return
    const target = htmlTargetId ? document.getElementById(htmlTargetId) : null
    setErrorMessage(null)
    const paywallParams = {
      htmlTarget: target ?? undefined,
      customerEmail: user.email ?? undefined,
      onBack: onBack ?? undefined,
      onVisitCustomerCenter: () => {
        openCustomerCenter(customerCenterFallbackUrl)
      },
      onPurchaseError: (err: Error) => {
        setErrorMessage(err?.message ?? 'Purchase failed.')
      },
    }
    try {
      const result = await presentPaywall({
        ...paywallParams,
        offering: offeringRef.current ?? undefined,
      })
      if (result && checkPremiumStatus(result.customerInfo)) {
        onPurchaseSuccess?.()
      }
    } catch (err) {
      const msg = (err as Error)?.message ?? ''
      const isNoOffering = /no offering|offering found/i.test(msg)
      const isNoPaywall = /doesn't have a paywall attached|no paywall attached/i.test(msg)
      if (isNoPaywall && process.env.NODE_ENV === 'development') {
        console.warn('[RevenueCat] Attach a paywall to your offering "web premium": RevenueCat Dashboard → Paywalls → edit a paywall → set it for the "web premium" offering.')
      }
      setErrorMessage(
        isNoOffering ? NO_OFFERING_MESSAGE
          : isNoPaywall ? NO_PAYWALL_MESSAGE
          : msg || 'Could not open paywall.'
      )
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-white/30 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-white/60 text-sm mt-3">Loading subscription options…</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4">
        <p className="text-red-400 text-sm">{errorMessage}</p>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mt-3 text-white/80 text-sm underline"
          >
            Go back
          </button>
        )}
      </div>
    )
  }

  if (status === 'no_offering') {
    return (
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4">
        <p className="text-amber-200 text-sm">{errorMessage}</p>
        <p className="text-white/60 text-xs mt-2">
          Need help? <a href="mailto:support@peakheight.app" className="text-amber-400 underline">Contact support</a>
        </p>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mt-4 w-full py-2.5 rounded-xl border border-white/20 text-white/80 text-sm font-medium hover:bg-white/5"
          >
            Go back
          </button>
        )}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full">
      {htmlTargetId && <div id={htmlTargetId} className="min-h-[200px]" />}
      <button
        type="button"
        onClick={handlePresentPaywall}
        className="w-full h-[54px] rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[16px] flex items-center justify-center shadow-[0_8px_30px_rgba(245,158,11,0.3)] active:scale-[0.98] transition-transform"
      >
        View subscription options
      </button>
      {errorMessage && (
        <p className="text-red-400 text-sm mt-2 text-center">{errorMessage}</p>
      )}
    </div>
  )
}
