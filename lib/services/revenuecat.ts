'use client'

import { Purchases, type Package, type CustomerInfo } from '@revenuecat/purchases-js'

export type { Package, CustomerInfo }

// RevenueCat configuration
const REVENUECAT_API_KEY = process.env.NEXT_PUBLIC_REVENUECAT_API_KEY || ''

let purchasesInstance: Purchases | null = null

/**
 * Initialize RevenueCat SDK for web
 * Must be called after user authentication
 */
export async function initializeRevenueCat(userId: string): Promise<Purchases> {
  if (purchasesInstance) {
    return purchasesInstance
  }

  if (!REVENUECAT_API_KEY) {
    throw new Error('RevenueCat API key is not configured')
  }

  try {
    purchasesInstance = Purchases.configure(REVENUECAT_API_KEY, userId)
    console.log('RevenueCat initialized for user:', userId)
    return purchasesInstance
  } catch (error) {
    console.error('Failed to initialize RevenueCat:', error)
    throw error
  }
}

/**
 * Get the RevenueCat instance
 */
export function getRevenueCat(): Purchases | null {
  return purchasesInstance
}

/**
 * Get current offerings (available subscription plans)
 */
export async function getOfferings(): Promise<{ 
  weekly: Package | null
  yearly: Package | null 
  all: Package[]
}> {
  const purchases = getRevenueCat()
  if (!purchases) {
    throw new Error('RevenueCat not initialized. Call initializeRevenueCat first.')
  }

  try {
    const offerings = await purchases.getOfferings()
    
    // Get the default offering
    const currentOffering = offerings.current
    
    if (!currentOffering) {
      console.warn('No current offering available')
      return { weekly: null, yearly: null, all: [] }
    }

    // Find weekly and yearly packages
    const weekly = currentOffering.weekly || 
      currentOffering.availablePackages.find(p => 
        p.identifier.toLowerCase().includes('weekly') || 
        p.identifier.toLowerCase().includes('week')
      ) || null

    const yearly = currentOffering.annual || 
      currentOffering.availablePackages.find(p => 
        p.identifier.toLowerCase().includes('yearly') || 
        p.identifier.toLowerCase().includes('annual') ||
        p.identifier.toLowerCase().includes('year')
      ) || null

    return {
      weekly,
      yearly,
      all: currentOffering.availablePackages
    }
  } catch (error) {
    console.error('Failed to get offerings:', error)
    throw error
  }
}

/**
 * Purchase a package
 */
export async function purchasePackage(pkg: Package): Promise<{ 
  customerInfo: CustomerInfo
  success: boolean 
}> {
  const purchases = getRevenueCat()
  if (!purchases) {
    throw new Error('RevenueCat not initialized')
  }

  try {
    const { customerInfo } = await purchases.purchase({ rcPackage: pkg })
    
    // Check if purchase was successful
    const isPremium = checkPremiumStatus(customerInfo)
    
    return { 
      customerInfo, 
      success: isPremium 
    }
  } catch (error: any) {
    // Handle user cancellation
    if (error.userCancelled) {
      console.log('User cancelled purchase')
      return { customerInfo: error.customerInfo, success: false }
    }
    
    console.error('Purchase failed:', error)
    throw error
  }
}

/**
 * Get customer info (subscription status)
 */
export async function getCustomerInfo(): Promise<CustomerInfo | null> {
  const purchases = getRevenueCat()
  if (!purchases) {
    return null
  }

  try {
    const customerInfo = await purchases.getCustomerInfo()
    return customerInfo
  } catch (error) {
    console.error('Failed to get customer info:', error)
    return null
  }
}

/**
 * Check if user has premium access
 */
export function checkPremiumStatus(customerInfo: CustomerInfo): boolean {
  // Check for any active entitlement
  // Adjust 'premium' or 'pro' based on your RevenueCat entitlement identifier
  const premiumEntitlements = ['premium', 'pro', 'Premium', 'Pro']
  
  for (const entitlement of premiumEntitlements) {
    if (customerInfo.entitlements.active[entitlement]) {
      return true
    }
  }

  // Also check if there are any active entitlements at all
  return Object.keys(customerInfo.entitlements.active).length > 0
}

/**
 * Get subscription expiration date
 */
export function getExpirationDate(customerInfo: CustomerInfo): Date | null {
  const activeEntitlements = Object.values(customerInfo.entitlements.active)
  
  if (activeEntitlements.length === 0) {
    return null
  }

  // Get the latest expiration date
  let latestExpiration: Date | null = null
  
  for (const entitlement of activeEntitlements) {
    if (entitlement.expirationDate) {
      const expDate = new Date(entitlement.expirationDate)
      if (!latestExpiration || expDate > latestExpiration) {
        latestExpiration = expDate
      }
    }
  }

  return latestExpiration
}

/**
 * Restore purchases
 */
export async function restorePurchases(): Promise<CustomerInfo | null> {
  const purchases = getRevenueCat()
  if (!purchases) {
    throw new Error('RevenueCat not initialized')
  }

  try {
    const customerInfo = await (purchases as unknown as { restorePurchases: () => Promise<CustomerInfo> }).restorePurchases()
    return customerInfo
  } catch (error) {
    console.error('Failed to restore purchases:', error)
    throw error
  }
}

/**
 * Log out current user (reset RevenueCat state)
 */
export async function logOutRevenueCat(): Promise<void> {
  if (purchasesInstance) {
    try {
      await (purchasesInstance as unknown as { logOut: () => Promise<void> }).logOut()
    } catch (error) {
      console.error('Failed to log out from RevenueCat:', error)
    }
    purchasesInstance = null
  }
}

/**
 * Format price for display
 */
export function formatPrice(pkg: Package): string {
  const product = pkg.rcBillingProduct
  if (!product) {
    return ''
  }

  // Format price with currency
  const price = product.currentPrice
  return price?.formattedPrice || `$${price?.amount || 0}`
}

/**
 * Get billing period text
 */
export function getBillingPeriod(pkg: Package): string {
  const product = pkg.rcBillingProduct
  if (!product?.normalPeriodDuration) {
    return ''
  }

  const duration = product.normalPeriodDuration
  
  if (duration.includes('P1W') || duration.includes('P7D')) {
    return '/week'
  } else if (duration.includes('P1M') || duration.includes('P30D')) {
    return '/month'
  } else if (duration.includes('P1Y') || duration.includes('P365D')) {
    return '/year'
  }
  
  return ''
}
