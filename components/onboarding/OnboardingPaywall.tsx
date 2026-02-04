'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import logo from '../../peakheight-logo.jpg'
import { useAuth } from '@/contexts/AuthContext'
import { 
  initializeRevenueCat, 
  getOfferings, 
  purchasePackage, 
  formatPrice, 
  getBillingPeriod,
  type Package 
} from '@/lib/services/revenuecat'

interface OnboardingPaywallProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

type PlanType = 'weekly' | 'yearly'

// Fallback plans if RevenueCat not configured
const fallbackPlans = [
  {
    id: 'weekly' as PlanType,
    name: 'Weekly',
    price: '$4.99',
    period: '/week',
    priceValue: 4.99,
    popular: false,
  },
  {
    id: 'yearly' as PlanType,
    name: 'Yearly',
    price: '$49.99',
    period: '/year',
    priceValue: 49.99,
    popular: true,
    savings: 'Save 80%',
  },
]

const features = [
  'Personalized growth plan',
  '200+ science-backed exercises',
  'Custom nutrition guide',
  'Sleep optimization tips',
  'Progress tracking & analytics',
  'Expert support',
]

export default function OnboardingPaywall({ data, updateData, onNext, onBack }: OnboardingPaywallProps) {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingOfferings, setIsLoadingOfferings] = useState(true)
  const [error, setError] = useState('')
  
  // RevenueCat packages
  const [weeklyPackage, setWeeklyPackage] = useState<Package | null>(null)
  const [yearlyPackage, setYearlyPackage] = useState<Package | null>(null)
  const [useRealPayments, setUseRealPayments] = useState(false)

  // Initialize RevenueCat and fetch offerings
  useEffect(() => {
    const initRC = async () => {
      if (!user?.id) {
        setIsLoadingOfferings(false)
        return
      }

      try {
        await initializeRevenueCat(user.id)
        const offerings = await getOfferings()
        
        setWeeklyPackage(offerings.weekly)
        setYearlyPackage(offerings.yearly)
        setUseRealPayments(offerings.weekly !== null || offerings.yearly !== null)
        
        console.log('RevenueCat offerings loaded:', offerings)
      } catch (error) {
        console.error('Failed to initialize RevenueCat:', error)
        // Fall back to simulated payments if RC fails
        setUseRealPayments(false)
      } finally {
        setIsLoadingOfferings(false)
      }
    }

    initRC()
  }, [user?.id])

  // Get display plans (either from RevenueCat or fallback)
  const plans = useRealPayments ? [
    {
      id: 'weekly' as PlanType,
      name: 'Weekly',
      price: weeklyPackage ? formatPrice(weeklyPackage) : '$4.99',
      period: weeklyPackage ? getBillingPeriod(weeklyPackage) : '/week',
      priceValue: 4.99,
      popular: false,
      package: weeklyPackage,
    },
    {
      id: 'yearly' as PlanType,
      name: 'Yearly',
      price: yearlyPackage ? formatPrice(yearlyPackage) : '$49.99',
      period: yearlyPackage ? getBillingPeriod(yearlyPackage) : '/year',
      priceValue: 49.99,
      popular: true,
      savings: 'Save 80%',
      package: yearlyPackage,
    },
  ] : fallbackPlans

  const handleSubscribe = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const selectedPackage = selectedPlan === 'weekly' ? weeklyPackage : yearlyPackage

      if (useRealPayments && selectedPackage) {
        // Real RevenueCat purchase
        const result = await purchasePackage(selectedPackage)
        
        if (result.success) {
          updateData({ 
            subscription: selectedPlan,
            subscriptionDate: new Date().toISOString(),
            isPremium: true
          })
          onNext()
        } else {
          // User cancelled or purchase failed
          setError('Purchase was cancelled or failed. Please try again.')
        }
      } else {
        // Fallback: Simulated payment (for development/testing)
        console.warn('Using simulated payment - RevenueCat not configured')
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        updateData({ 
          subscription: selectedPlan,
          subscriptionDate: new Date().toISOString(),
          isPremium: true
        })
        
        onNext()
      }
    } catch (err: any) {
      console.error('Payment failed:', err)
      setError(err.message || 'Payment failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const selectedPlanData = plans.find(p => p.id === selectedPlan)

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] flex flex-col"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="max-w-[400px] mx-auto w-full px-5 pt-6 pb-4">
          
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onBack}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60"
            style={{ top: 'calc(env(safe-area-inset-top) + 16px)' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_8px_30px_rgba(245,158,11,0.3)] p-2">
              <Image
                src={logo}
                alt="PeakHeight"
                width={56}
                height={56}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <h1 className="text-white text-[24px] font-bold mb-2">
              Unlock Full Access
            </h1>
            <p className="text-white/60 text-[14px]">
              Start your transformation today
            </p>
          </motion.div>

          {/* Plan Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3 mb-6"
          >
            {isLoadingOfferings ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-white/30 border-t-amber-500 rounded-full animate-spin" />
              </div>
            ) : (
              plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all relative ${
                    selectedPlan === plan.id
                      ? 'bg-amber-500/10 border-amber-500'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPlan === plan.id
                          ? 'border-amber-500 bg-amber-500'
                          : 'border-white/30'
                      }`}>
                        {selectedPlan === plan.id && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-white font-semibold text-[15px]">{plan.name}</p>
                        {'savings' in plan && plan.savings && (
                          <p className="text-green-400 text-[11px] font-medium">{plan.savings}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-bold text-[18px]">{plan.price}</span>
                      <span className="text-white/50 text-[13px]">{plan.period}</span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 rounded-2xl p-4 mb-6"
          >
            <p className="text-white/40 text-[11px] font-semibold tracking-wider mb-3">WHAT'S INCLUDED</p>
            <div className="space-y-2.5">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/80 text-[13px]">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-400/10 border border-red-400/30 rounded-xl p-3 mb-4"
            >
              <p className="text-red-400 text-[13px] text-center">{error}</p>
            </motion.div>
          )}

          {/* Guarantee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-white/50 text-[12px]">30-day money-back guarantee</span>
          </motion.div>

          {/* Dev mode indicator */}
          {!useRealPayments && !isLoadingOfferings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 mb-2"
            >
              <span className="text-amber-400/60 text-[10px] bg-amber-400/10 px-2 py-1 rounded-full">
                Development Mode
              </span>
            </motion.div>
          )}

        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div 
        className="flex-shrink-0 px-5 pt-3 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}
      >
        <div className="max-w-[400px] mx-auto w-full">
          {/* Subscribe Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleSubscribe}
            disabled={isLoading || isLoadingOfferings}
            className="w-full h-[54px] rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[16px] flex items-center justify-center shadow-[0_8px_30px_rgba(245,158,11,0.3)] active:scale-[0.98] transition-transform disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              `Subscribe for ${selectedPlanData?.price}${selectedPlanData?.period}`
            )}
          </motion.button>

          {/* Terms */}
          <p className="text-white/30 text-[10px] text-center mt-3 leading-relaxed">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
            <br />
            Subscription auto-renews. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  )
}
