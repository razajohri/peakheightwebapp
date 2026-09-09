'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import type { Package } from '@revenuecat/purchases-js'
import {
  initializeRevenueCat,
  getOfferings,
  purchasePackage,
  getCustomerInfo,
  checkPremiumStatus,
  formatPrice,
  restorePurchases,
} from '@/lib/services/revenuecat'
import { ONBOARDING_COLORS } from '@/lib/constants/onboarding'
import ProgressHeader from '@/components/onboarding/ProgressHeader'

interface PeakHeightPaywallProps {
  onPurchaseSuccess?: () => void
  onBack?: () => void
}

type PlanKey = 'monthly' | 'weekly' | 'yearly'

function priceAmount(pkg: Package | null): number | null {
  if (!pkg) return null
  const product =
    pkg.webBillingProduct ||
    (pkg as unknown as { rcBillingProduct?: { price?: { amountMicros?: number; amount?: number; formattedPrice?: string }; currentPrice?: { amountMicros?: number; amount?: number; formattedPrice?: string } } }).rcBillingProduct
  if (!product) return null
  const price =
    (product as { price?: { amountMicros?: number; amount?: number; formattedPrice?: string } }).price ??
    (product as { currentPrice?: { amountMicros?: number; amount?: number; formattedPrice?: string } }).currentPrice
  if (!price) return null
  if (typeof price.amountMicros === 'number' && price.amountMicros > 0) {
    return price.amountMicros / 1_000_000
  }
  if (typeof price.amount === 'number') return price.amount / 100
  const formatted = price.formattedPrice
  if (formatted) {
    const n = Number(String(formatted).replace(/[^0-9.]/g, ''))
    return Number.isFinite(n) ? n : null
  }
  return null
}

function billedCopy(key: PlanKey) {
  if (key === 'yearly') return 'Billed yearly'
  if (key === 'weekly') return 'Billed weekly'
  return 'Billed monthly'
}

function planPitch(key: PlanKey) {
  if (key === 'yearly') return 'Best value · full year of PeakHeight Pro'
  if (key === 'weekly') return 'Flexible start · cancel anytime'
  return 'Your height plan + how to grow taller'
}

export default function PeakHeightPaywall({
  onPurchaseSuccess,
  onBack,
}: PeakHeightPaywallProps) {
  const { user } = useAuth()
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [packages, setPackages] = useState<{
    yearly: Package | null
    monthly: Package | null
    weekly: Package | null
  }>({ yearly: null, monthly: null, weekly: null })
  const [selected, setSelected] = useState<PlanKey>('monthly')
  const [purchasing, setPurchasing] = useState(false)
  const [restoring, setRestoring] = useState(false)
  const [showPromo, setShowPromo] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [showCompare, setShowCompare] = useState(false)

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

        const info = await getCustomerInfo()
        if (cancelled) return
        if (info && checkPremiumStatus(info)) {
          onPurchaseSuccess?.()
          return
        }

        const offerings = await getOfferings()
        if (cancelled) return

        if (!offerings.yearly && !offerings.monthly && !offerings.weekly) {
          setStatus('error')
          setErrorMessage(
            'Subscription plans aren’t available yet. Add products to the “web premium” offering in RevenueCat.'
          )
          return
        }

        setPackages({
          yearly: offerings.yearly,
          monthly: offerings.monthly,
          weekly: offerings.weekly,
        })

        if (offerings.monthly) setSelected('monthly')
        else if (offerings.yearly) setSelected('yearly')
        else setSelected('weekly')

        setStatus('ready')
      } catch (err) {
        if (!cancelled) {
          setStatus('error')
          setErrorMessage((err as Error)?.message ?? 'Failed to load plans.')
        }
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [user?.id, onPurchaseSuccess])

  const tabs = useMemo(() => {
    const monthlyAmt = priceAmount(packages.monthly)
    const yearlyAmt = priceAmount(packages.yearly)
    const weeklyAmt = priceAmount(packages.weekly)

    const yearlyDiscount =
      monthlyAmt && yearlyAmt && monthlyAmt > 0
        ? Math.max(0, Math.round((1 - yearlyAmt / (monthlyAmt * 12)) * 100))
        : null

    const weeklyVsMonthly =
      monthlyAmt && weeklyAmt && monthlyAmt > 0
        ? Math.round((1 - (weeklyAmt * 4.33) / monthlyAmt) * 100)
        : null

    const items: { key: PlanKey; label: string; discount?: string; pkg: Package }[] = []
    if (packages.monthly) {
      items.push({ key: 'monthly', label: 'Monthly', pkg: packages.monthly })
    }
    if (packages.weekly) {
      items.push({
        key: 'weekly',
        label: 'Weekly',
        discount:
          weeklyVsMonthly != null && weeklyVsMonthly > 0
            ? undefined
            : undefined,
        pkg: packages.weekly,
      })
    }
    if (packages.yearly) {
      items.push({
        key: 'yearly',
        label: 'Yearly',
        discount: yearlyDiscount && yearlyDiscount > 0 ? `-${yearlyDiscount}%` : '-Best',
        pkg: packages.yearly,
      })
    }
    return items
  }, [packages])

  const selectedPkg = packages[selected]
  const displayPrice = selectedPkg ? formatPrice(selectedPkg) : '—'
  const periodSuffix =
    selected === 'yearly' ? '/yr' : selected === 'weekly' ? '/wk' : '/mo'

  const handlePurchase = async () => {
    if (!selectedPkg || purchasing) return
    setPurchasing(true)
    setErrorMessage(null)
    try {
      // Promo codes for web billing are typically applied in Stripe Checkout / RC dashboard.
      if (promoCode.trim() && typeof window !== 'undefined') {
        sessionStorage.setItem('ph_promo_code', promoCode.trim())
      }
      const result = await purchasePackage(selectedPkg)
      if (result.success) {
        onPurchaseSuccess?.()
      }
    } catch (err) {
      setErrorMessage((err as Error)?.message ?? 'Purchase failed. Please try again.')
    } finally {
      setPurchasing(false)
    }
  }

  const handleRestore = async () => {
    setRestoring(true)
    setErrorMessage(null)
    try {
      const info = await restorePurchases()
      if (info && checkPremiumStatus(info)) {
        onPurchaseSuccess?.()
      } else {
        setErrorMessage('No active subscription found for this account.')
      }
    } catch (err) {
      setErrorMessage((err as Error)?.message ?? 'Could not restore purchases.')
    } finally {
      setRestoring(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-[#18181b]" />
        <p className="mt-4 font-manrope text-sm text-[#a1a1aa]">Loading plans…</p>
      </div>
    )
  }

  if (status === 'error' && tabs.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col items-center justify-center px-6 text-center">
        <p className="mb-2 font-manrope text-base font-semibold text-[#18181b]">
          Subscription isn’t ready
        </p>
        <p className="mb-6 font-manrope text-sm text-[#a1a1aa]">{errorMessage}</p>
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="h-12 rounded-full bg-[#18181b] px-6 font-manrope text-sm font-medium text-white"
          >
            Go back
          </button>
        ) : null}
      </div>
    )
  }

  return (
    <div
      className="relative min-h-screen min-h-dvh overflow-hidden"
      style={{
        backgroundImage: `${ONBOARDING_COLORS.AURORA}, ${ONBOARDING_COLORS.WASH}`,
        backgroundColor: '#f4f7fc',
      }}
    >
      <div className="relative z-10 mx-auto flex min-h-screen min-h-dvh w-full max-w-[420px] flex-col">
        <ProgressHeader
          currentStep={21}
          totalSteps={22}
          segments={6}
          onBack={onBack}
          showBackButton={Boolean(onBack)}
        />

        <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <h1 className="mb-6 text-center font-playfair text-[32px] font-normal leading-[1.15] tracking-[-0.03em] text-[#18181b]">
            Start Your Transformation
          </h1>

          {/* Period toggle */}
          <div className="mb-4 rounded-full bg-zinc-100 p-1">
            <div
              className="grid gap-1"
              style={{ gridTemplateColumns: `repeat(${Math.max(tabs.length, 1)}, minmax(0, 1fr))` }}
            >
              {tabs.map((tab) => {
                const active = selected === tab.key
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setSelected(tab.key)}
                    className={`rounded-full px-2 py-2.5 text-center font-manrope text-[12px] font-semibold transition-all sm:text-[13px] ${
                      active
                        ? 'bg-white text-[#18181b] shadow-sm'
                        : 'text-[#71717a] hover:text-[#18181b]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.discount ? (
                      <span className="ml-1 text-[#0d9488]">{tab.discount}</span>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowPromo((v) => !v)}
            className="mb-5 inline-flex items-center justify-center gap-1.5 self-center font-manrope text-[13px] text-[#71717a]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M20.6 12.6 12.6 20.6a2 2 0 0 1-2.8 0L3.4 14.2a2 2 0 0 1 0-2.8L11.4 3.4a2 2 0 0 1 1.4-.6H19a2 2 0 0 1 2 2v6.2a2 2 0 0 1-.6 1.4Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx="16.5" cy="7.5" r="1.2" fill="currentColor" />
            </svg>
            Have a promo code?
          </button>

          {showPromo ? (
            <div className="mb-5 flex gap-2">
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                className="h-11 flex-1 rounded-full border border-zinc-200 bg-white px-4 font-manrope text-[14px] text-[#18181b] outline-none focus:border-[#18181b]"
              />
              <button
                type="button"
                onClick={() => setShowPromo(false)}
                className="h-11 rounded-full bg-zinc-900 px-4 font-manrope text-[13px] font-medium text-white"
              >
                Apply
              </button>
            </div>
          ) : null}

          {/* Dark PRO card */}
          <div className="relative overflow-hidden rounded-[28px] bg-[#18181b] px-5 pb-5 pt-5 text-white shadow-[0_20px_50px_-24px_rgba(24,24,27,0.65)]">
            <div className="mb-5 flex items-start justify-between gap-3">
              <span className="font-manrope text-[11px] font-bold tracking-[0.12em] text-white/90">
                PRO
              </span>
              <span className="rounded-full bg-zinc-200 px-2.5 py-1 font-manrope text-[10px] font-bold tracking-[0.04em] text-[#18181b]">
                RESULTS 3X FASTER
              </span>
            </div>

            <p className="font-playfair text-[40px] font-normal leading-none tracking-[-0.03em] text-white">
              {displayPrice}
              <span className="font-manrope text-[18px] font-medium tracking-normal text-white/80">
                {periodSuffix}
              </span>
            </p>

            <p className="mt-4 font-manrope text-[15px] font-medium text-white">
              {planPitch(selected)}
            </p>

            <div className="mt-3 flex items-center gap-2 font-manrope text-[13px] text-white/55">
              <span>{billedCopy(selected)}</span>
              <span>·</span>
              <button
                type="button"
                onClick={() => setShowCompare((v) => !v)}
                className="underline underline-offset-2 hover:text-white"
              >
                Compare plans
              </button>
            </div>

            {showCompare ? (
              <div className="mt-4 space-y-2 rounded-2xl bg-white/5 p-3 font-manrope text-[12px] text-white/75">
                <p>
                  <span className="font-semibold text-white">Basic:</span> height tracking, daily
                  tips, simple progress charts
                </p>
                <p>
                  <span className="font-semibold text-white">Pro:</span> science-backed growth
                  plan, daily mobility, AI nutrition coach, personalized exercises, food scanner,
                  member community
                </p>
              </div>
            ) : null}

            {errorMessage ? (
              <p className="mt-4 rounded-xl bg-red-500/15 px-3 py-2 text-center font-manrope text-[12px] text-red-200">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="button"
              onClick={handlePurchase}
              disabled={!selectedPkg || purchasing}
              className="mt-5 flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-white font-manrope text-[15px] font-semibold text-[#18181b] transition-transform active:scale-[0.99] disabled:opacity-50"
            >
              {purchasing ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-[#18181b]" />
              ) : (
                <>
                  Subscribe
                  <span aria-hidden>→</span>
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={handleRestore}
            disabled={restoring || purchasing}
            className="mt-4 py-2 font-manrope text-[13px] text-[#a1a1aa] underline-offset-2 hover:underline disabled:opacity-50"
          >
            {restoring ? 'Checking…' : 'Restore purchases'}
          </button>

          <p className="mt-auto pt-6 text-center font-manrope text-[11px] leading-relaxed text-[#a1a1aa]">
            Recurring billing. Cancel anytime.{' '}
            <Link href="/terms" className="underline">
              Terms
            </Link>{' '}
            ·{' '}
            <Link href="/privacy" className="underline">
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
