import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Supabase admin client (uses service role key for webhooks)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ffdtcjigdccrbxjcizko.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// RevenueCat webhook authorization
const REVENUECAT_WEBHOOK_AUTH = process.env.REVENUECAT_WEBHOOK_AUTH_HEADER || ''

// Event types we care about
type RevenueCatEventType = 
  | 'INITIAL_PURCHASE'
  | 'RENEWAL'
  | 'CANCELLATION'
  | 'UNCANCELLATION'
  | 'NON_RENEWING_PURCHASE'
  | 'SUBSCRIPTION_PAUSED'
  | 'EXPIRATION'
  | 'BILLING_ISSUE'
  | 'PRODUCT_CHANGE'
  | 'TRANSFER'

interface RevenueCatEvent {
  event: {
    type: RevenueCatEventType
    app_user_id: string
    original_app_user_id: string
    product_id: string
    entitlement_id?: string
    entitlement_ids?: string[]
    period_type: 'NORMAL' | 'INTRO' | 'TRIAL'
    purchased_at_ms: number
    expiration_at_ms?: number
    store: 'APP_STORE' | 'PLAY_STORE' | 'STRIPE' | 'PROMOTIONAL' | 'AMAZON'
    environment: 'SANDBOX' | 'PRODUCTION'
    is_family_share?: boolean
    country_code?: string
    currency?: string
    price?: number
    price_in_purchased_currency?: number
    subscriber_attributes?: Record<string, { value: string; updated_at_ms: number }>
    transaction_id?: string
    original_transaction_id?: string
    aliases?: string[]
  }
  api_version: string
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook authorization
    const authHeader = request.headers.get('Authorization')
    if (REVENUECAT_WEBHOOK_AUTH && authHeader !== `Bearer ${REVENUECAT_WEBHOOK_AUTH}`) {
      console.error('Unauthorized webhook request')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse the webhook payload
    const payload: RevenueCatEvent = await request.json()
    const event = payload.event

    console.log(`RevenueCat webhook received: ${event.type}`, {
      user_id: event.app_user_id,
      product: event.product_id,
      store: event.store,
      environment: event.environment
    })

    // Create Supabase admin client
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Get the user ID (RevenueCat app_user_id should match Supabase user ID)
    const userId = event.app_user_id

    // Determine payment source based on store
    const paymentSource = getPaymentSource(event.store)

    // Handle different event types
    switch (event.type) {
      case 'INITIAL_PURCHASE':
      case 'RENEWAL':
      case 'NON_RENEWING_PURCHASE':
      case 'UNCANCELLATION':
        await handlePurchase(supabase, userId, event, paymentSource)
        break

      case 'CANCELLATION':
        await handleCancellation(supabase, userId, event)
        break

      case 'EXPIRATION':
        await handleExpiration(supabase, userId, event)
        break

      case 'BILLING_ISSUE':
        await handleBillingIssue(supabase, userId, event)
        break

      case 'PRODUCT_CHANGE':
        await handleProductChange(supabase, userId, event, paymentSource)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function getPaymentSource(store: string): string {
  switch (store) {
    case 'APP_STORE':
      return 'revenuecat'
    case 'PLAY_STORE':
      return 'revenuecat'
    case 'STRIPE':
      return 'web'
    case 'PROMOTIONAL':
      return 'promotional'
    default:
      return 'revenuecat'
  }
}

function getPlanIdFromProduct(productId: string): string {
  // Map RevenueCat product IDs to your plan IDs
  const productLower = productId.toLowerCase()
  if (productLower.includes('weekly') || productLower.includes('week')) {
    return 'weekly'
  } else if (productLower.includes('yearly') || productLower.includes('annual') || productLower.includes('year')) {
    return 'yearly'
  } else if (productLower.includes('monthly') || productLower.includes('month')) {
    return 'monthly'
  }
  return productId
}

async function handlePurchase(
  supabase: any,
  userId: string,
  event: RevenueCatEvent['event'],
  paymentSource: string
) {
  const expirationDate = event.expiration_at_ms 
    ? new Date(event.expiration_at_ms).toISOString()
    : null

  const planId = getPlanIdFromProduct(event.product_id)

  // Update or create subscription record
  const { error: subError } = await supabase
    .from('user_subscriptions')
    .upsert({
      user_id: userId,
      plan_id: planId,
      revenuecat_user_id: event.original_app_user_id || event.app_user_id,
      revenuecat_entitlement: event.entitlement_id || event.entitlement_ids?.[0],
      status: 'active',
      start_date: new Date(event.purchased_at_ms).toISOString(),
      end_date: expirationDate,
      auto_renew: event.type !== 'NON_RENEWING_PURCHASE',
      payment_source: paymentSource,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    })

  if (subError) {
    console.error('Error updating subscription:', subError)
    throw subError
  }

  // Update user premium status
  const { error: userError } = await supabase
    .from('users')
    .update({
      premium_status: true,
      premium_expires_at: expirationDate,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)

  if (userError) {
    console.error('Error updating user premium status:', userError)
    throw userError
  }

  console.log(`User ${userId} subscribed to ${planId} (${paymentSource})`)
}

async function handleCancellation(
  supabase: any,
  userId: string,
  event: RevenueCatEvent['event']
) {
  // User cancelled - subscription remains active until expiration
  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      auto_renew: false,
      status: 'cancelled',
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)

  if (error) {
    console.error('Error updating cancellation:', error)
    throw error
  }

  console.log(`User ${userId} cancelled subscription (still active until expiration)`)
}

async function handleExpiration(
  supabase: any,
  userId: string,
  event: RevenueCatEvent['event']
) {
  // Subscription has expired
  const { error: subError } = await supabase
    .from('user_subscriptions')
    .update({
      status: 'expired',
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)

  if (subError) {
    console.error('Error updating subscription expiration:', subError)
  }

  // Remove premium status
  const { error: userError } = await supabase
    .from('users')
    .update({
      premium_status: false,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)

  if (userError) {
    console.error('Error updating user premium status:', userError)
    throw userError
  }

  console.log(`User ${userId} subscription expired - premium removed`)
}

async function handleBillingIssue(
  supabase: any,
  userId: string,
  event: RevenueCatEvent['event']
) {
  // Billing issue - keep premium for grace period but flag it
  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      status: 'active', // Still active during grace period
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)

  if (error) {
    console.error('Error updating billing issue:', error)
  }

  console.log(`User ${userId} has billing issue - in grace period`)
}

async function handleProductChange(
  supabase: any,
  userId: string,
  event: RevenueCatEvent['event'],
  paymentSource: string
) {
  // User changed plan (upgrade/downgrade)
  const newPlanId = getPlanIdFromProduct(event.product_id)
  const expirationDate = event.expiration_at_ms 
    ? new Date(event.expiration_at_ms).toISOString()
    : null

  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      plan_id: newPlanId,
      end_date: expirationDate,
      payment_source: paymentSource,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)

  if (error) {
    console.error('Error updating product change:', error)
    throw error
  }

  console.log(`User ${userId} changed plan to ${newPlanId}`)
}

// Also handle GET for webhook verification
export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'RevenueCat webhook endpoint' })
}
