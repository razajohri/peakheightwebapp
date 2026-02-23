'use client'

import {
  Purchases,
  type Package,
  type CustomerInfo,
  type Offering,
  type Offerings,
  type PresentPaywallParams,
  type PaywallPurchaseResult,
} from '@revenuecat/purchases-js'

export type { Package, CustomerInfo, Offering, Offerings, PaywallPurchaseResult }

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const REVENUECAT_API_KEY = process.env.NEXT_PUBLIC_REVENUECAT_API_KEY || ''

/** Entitlement identifier configured in RevenueCat Dashboard (PeakHeight Web) */
export const ENTITLEMENT_ID = 'PeakHeight Web'

/** Offering identifier in RevenueCat (Web Billing) */
export const OFFERING_ID = 'web premium'

/** Package identifiers in your "web premium" offering */
export const PACKAGE_ID_MONTHLY = 'monthly'
export const PACKAGE_ID_YEARLY = 'yearly'
export const PACKAGE_ID_WEEKLY = 'weekly'

let purchasesInstance: Purchases | null = null

// ---------------------------------------------------------------------------
// Initialization
// ---------------------------------------------------------------------------

/**
 * Initialize RevenueCat SDK for web. Call after user is authenticated.
 * Uses Supabase user id as app_user_id so subscriptions sync across devices.
 */
export async function initializeRevenueCat(appUserId: string): Promise<Purchases> {
  if (purchasesInstance) {
    return purchasesInstance
  }

  if (!REVENUECAT_API_KEY) {
    throw new Error('RevenueCat API key is not configured. Set NEXT_PUBLIC_REVENUECAT_API_KEY in .env.local')
  }

  try {
    purchasesInstance = Purchases.configure(REVENUECAT_API_KEY, appUserId)
    if (process.env.NODE_ENV === 'development') {
      console.log('[RevenueCat] Initialized for user:', appUserId)
    }
    return purchasesInstance
  } catch (error) {
    console.error('[RevenueCat] Failed to initialize:', error)
    throw error
  }
}

/**
 * Get the current Purchases instance (null if not initialized).
 */
export function getRevenueCat(): Purchases | null {
  return purchasesInstance
}

/**
 * Check if SDK is configured (API key present). Does not require init.
 */
export function isRevenueCatConfigured(): boolean {
  return Boolean(REVENUECAT_API_KEY)
}

// ---------------------------------------------------------------------------
// Offerings & products (Monthly, Yearly)
// ---------------------------------------------------------------------------

export interface OfferingsResult {
  monthly: Package | null
  yearly: Package | null
  /** For backward compatibility */
  weekly: Package | null
  all: Package[]
  currentOffering: Offering | null
}

/**
 * Pick the Web offering from offerings.all by identifier.
 * Does NOT use offerings.current so the app can keep that for iOS/mobile default.
 */
function getWebOffering(offerings: Offerings): Offering | null {
  const all = offerings.all || {}
  const keys = Object.keys(all)
  if (keys.length === 0) return null
  return (
    all[OFFERING_ID] ??
    all['web_premium'] ??
    keys.map((k) => all[k]).find((o) => o?.identifier?.toLowerCase().includes('web')) ??
    all[keys[0]]
  )
}

/**
 * Fetch offerings and map packages.
 * Uses only the Web offering by id ("web premium"), not SDK current (reserved for mobile).
 * Package identifiers: yearly, weekly (and optionally monthly).
 */
export async function getOfferings(): Promise<OfferingsResult> {
  const purchases = getRevenueCat()
  if (!purchases) {
    throw new Error('RevenueCat not initialized. Call initializeRevenueCat(userId) first.')
  }

  try {
    const offerings: Offerings = await purchases.getOfferings()
    const current = getWebOffering(offerings)

    if (process.env.NODE_ENV === 'development' && offerings.all) {
      const keys = Object.keys(offerings.all)
      console.log('[RevenueCat] Offerings from dashboard:', keys, 'using web offering:', current?.identifier ?? null)
    }

    if (!current) {
      console.warn('[RevenueCat] No web offering found. In RevenueCat: Web → Offerings → create an offering with identifier "web premium" (or name containing "web").')
      return {
        monthly: null,
        yearly: null,
        weekly: null,
        all: [],
        currentOffering: null,
      }
    }

    const all = current.availablePackages || []
    const byId = (id: string) => all.find((p) => p.identifier?.toLowerCase() === id.toLowerCase()) ?? null

    if (process.env.NODE_ENV === 'development' && all.length > 0) {
      console.log('[RevenueCat] Packages in offering:', all.map((p) => p.identifier))
    }

    return {
      monthly: byId(PACKAGE_ID_MONTHLY) ?? current.monthly ?? null,
      yearly: byId(PACKAGE_ID_YEARLY) ?? current.annual ?? null,
      weekly: byId(PACKAGE_ID_WEEKLY) ?? current.weekly ?? null,
      all,
      currentOffering: current,
    }
  } catch (error) {
    console.error('[RevenueCat] getOfferings failed:', error)
    throw error
  }
}

// ---------------------------------------------------------------------------
// Entitlement checking (PeakHeight Web)
// ---------------------------------------------------------------------------

/**
 * Check if customer has access to the given entitlement (default: PeakHeight Web).
 */
export function checkEntitlement(
  customerInfo: CustomerInfo,
  entitlementIdentifier: string = ENTITLEMENT_ID
): boolean {
  if (!customerInfo?.entitlements?.active) {
    return false
  }
  const active = customerInfo.entitlements.active as unknown as Record<string, { expirationDate?: string }>
  return Boolean(active[entitlementIdentifier])
}

/**
 * Legacy alias: check premium status (any active entitlement).
 */
export function checkPremiumStatus(customerInfo: CustomerInfo): boolean {
  if (!customerInfo?.entitlements?.active) {
    return false
  }
  // Prefer PeakHeight Web entitlement
  if (checkEntitlement(customerInfo, ENTITLEMENT_ID)) {
    return true
  }
  return Object.keys(customerInfo.entitlements.active).length > 0
}

/**
 * Get expiration date for an entitlement (e.g. PeakHeight Web).
 */
export function getExpirationDate(
  customerInfo: CustomerInfo,
  entitlementIdentifier: string = ENTITLEMENT_ID
): Date | null {
  const active = customerInfo?.entitlements?.active as unknown as Record<string, { expirationDate?: string }> | undefined
  if (!active?.[entitlementIdentifier]?.expirationDate) {
    return null
  }
  return new Date(active[entitlementIdentifier].expirationDate)
}

// ---------------------------------------------------------------------------
// Customer info
// ---------------------------------------------------------------------------

/**
 * Get current customer info (subscription status, entitlements, management URL).
 */
export async function getCustomerInfo(): Promise<CustomerInfo | null> {
  const purchases = getRevenueCat()
  if (!purchases) {
    return null
  }

  try {
    return await purchases.getCustomerInfo()
  } catch (error) {
    console.error('[RevenueCat] getCustomerInfo failed:', error)
    return null
  }
}

/**
 * Get management URL for the customer (Stripe portal, App Store, etc.). Null if no active subscription.
 */
export function getManagementURL(customerInfo: CustomerInfo | null): string | null {
  return customerInfo?.managementURL ?? null
}

// ---------------------------------------------------------------------------
// Purchase & restore
// ---------------------------------------------------------------------------

export interface PurchaseResult {
  customerInfo: CustomerInfo
  success: boolean
}

/**
 * Purchase a package (monthly or yearly). Handles user cancellation gracefully.
 */
export async function purchasePackage(pkg: Package): Promise<PurchaseResult> {
  const purchases = getRevenueCat()
  if (!purchases) {
    throw new Error('RevenueCat not initialized')
  }

  try {
    const { customerInfo } = await purchases.purchase({ rcPackage: pkg })
    const success = checkPremiumStatus(customerInfo)
    return { customerInfo, success }
  } catch (error: unknown) {
    const err = error as { userCancelled?: boolean; customerInfo?: CustomerInfo }
    if (err?.userCancelled) {
      return {
        customerInfo: err.customerInfo ?? (await getCustomerInfo()) ?? ({} as CustomerInfo),
        success: false,
      }
    }
    console.error('[RevenueCat] Purchase failed:', error)
    throw error
  }
}

/**
 * Restore / refresh subscription state (web: refetch customer info from RevenueCat).
 */
export async function restorePurchases(): Promise<CustomerInfo | null> {
  const purchases = getRevenueCat()
  if (!purchases) {
    throw new Error('RevenueCat not initialized')
  }
  try {
    return await purchases.getCustomerInfo()
  } catch (error) {
    console.error('[RevenueCat] restorePurchases (getCustomerInfo) failed:', error)
    throw error
  }
}

// ---------------------------------------------------------------------------
// RevenueCat Paywall (presentPaywall)
// ---------------------------------------------------------------------------

/**
 * Present the RevenueCat-hosted paywall (remotely configured in RevenueCat Dashboard).
 * Renders into optional htmlTarget, or full-screen overlay if not provided.
 * Use customerEmail to skip email step when user is logged in.
 */
export async function presentPaywall(params: {
  htmlTarget?: HTMLElement | null
  customerEmail?: string | null
  offering?: Offering | null
  onBack?: () => void
  onVisitCustomerCenter?: () => void
  onPurchaseError?: (error: Error) => void
}): Promise<PaywallPurchaseResult> {
  const purchases = getRevenueCat()
  if (!purchases) {
    throw new Error('RevenueCat not initialized')
  }

  const paywallParams: PresentPaywallParams = {
    htmlTarget: params.htmlTarget ?? undefined,
    customerEmail: params.customerEmail ?? undefined,
    offering: params.offering ?? undefined,
    onBack: params.onBack,
    onVisitCustomerCenter: params.onVisitCustomerCenter,
    onPurchaseError: params.onPurchaseError,
  }

  try {
    const result = await purchases.presentPaywall(paywallParams)
    return result
  } catch (error) {
    console.error('[RevenueCat] presentPaywall failed:', error)
    throw error
  }
}

// ---------------------------------------------------------------------------
// Customer Center (web: use management URL; native Customer Center not on web)
// ---------------------------------------------------------------------------

/**
 * Open subscription management. On web, opens RevenueCat's management URL (Stripe portal)
 * if customer has an active web subscription. Pass a fallback URL for no subscription.
 */
export async function openCustomerCenter(fallbackUrl?: string): Promise<void> {
  const info = await getCustomerInfo()
  const url = getManagementURL(info) || fallbackUrl
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  } else if (fallbackUrl) {
    window.open(fallbackUrl, '_blank', 'noopener,noreferrer')
  } else {
    console.warn('[RevenueCat] No management URL and no fallback provided')
  }
}

// ---------------------------------------------------------------------------
// Logout (clear SDK state when user signs out)
// ---------------------------------------------------------------------------

export async function logOutRevenueCat(): Promise<void> {
  purchasesInstance = null
}

// ---------------------------------------------------------------------------
// Display helpers
// ---------------------------------------------------------------------------

export function formatPrice(pkg: Package): string {
  const product = pkg.webBillingProduct || (pkg as unknown as { rcBillingProduct?: { price?: PriceLike; currentPrice?: PriceLike } }).rcBillingProduct
  if (!product) return ''
  const price = (product as { price?: PriceLike }).price ?? (product as { currentPrice?: PriceLike }).currentPrice
  if (!price) return ''
  const formatted = (price as PriceLike).formattedPrice
  if (formatted && String(formatted).trim()) return String(formatted)
  const amountMicros = (price as PriceLike).amountMicros
  if (typeof amountMicros === 'number' && amountMicros > 0) return `$${(amountMicros / 1_000_000).toFixed(2)}`
  const amountCents = (price as PriceLike).amount
  if (typeof amountCents === 'number') return `$${(amountCents / 100).toFixed(2)}`
  return ''
}
type PriceLike = { formattedPrice?: string; amount?: number; amountMicros?: number }

export function getBillingPeriod(pkg: Package): string {
  const product = pkg.webBillingProduct || (pkg as unknown as { rcBillingProduct?: { normalPeriodDuration?: string; period?: { unit?: string } } }).rcBillingProduct
  if (!product) return ''
  const duration = (product as { normalPeriodDuration?: string }).normalPeriodDuration ?? ''
  if (duration.includes('P1W') || duration.includes('P7D')) return '/week'
  if (duration.includes('P1M') || duration.includes('P30D')) return '/month'
  if (duration.includes('P1Y') || duration.includes('P365D')) return '/year'
  const period = (product as { period?: { unit?: string } }).period
  if (period?.unit === 'DAY' && duration.includes('7')) return '/week'
  if (period?.unit === 'MONTH') return '/month'
  if (period?.unit === 'YEAR') return '/year'
  return ''
}

/** RevenueCat Web Purchase Link (from dashboard). When set, paywall can show "Subscribe via link". */
export function getWebPurchaseLink(): string {
  return process.env.NEXT_PUBLIC_REVENUECAT_WEB_PURCHASE_LINK || ''
}

/** Get display name for a package (from RevenueCat product title, or fallback). */
export function getPackageDisplayName(pkg: Package, fallback: string): string {
  const product = pkg.webBillingProduct || (pkg as unknown as { rcBillingProduct?: { title?: string; displayName?: string } }).rcBillingProduct
  const title = (product as { title?: string })?.title ?? (product as { displayName?: string })?.displayName
  return (title && String(title).trim()) ? String(title) : fallback
}
