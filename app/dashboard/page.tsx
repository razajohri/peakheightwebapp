'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'
import logo from '../../peakheight-logo.jpg'

interface UserProfile {
  display_name?: string
  first_name?: string
  last_name?: string
  email?: string
  premium_status?: boolean
  premium_expires_at?: string
  current_height?: number
  target_height?: number
  onboarding_completed?: boolean
  created_at?: string
  motivation?: string
  workout_frequency?: string
  sleep_hours?: number
}

interface Subscription {
  id?: string
  plan_id?: string
  status?: string
  start_date?: string
  end_date?: string
  auto_renew?: boolean
  payment_source?: string
  created_at?: string
  updated_at?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading, signOut, isPremium } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth?redirect=/dashboard')
      return
    }

    if (user) {
      fetchUserData()
    }
  }, [user, loading, router])

  const fetchUserData = async () => {
    if (!user) return

    try {
      // Fetch user profile
      const { data: profileData } = await supabase
        .from('users')
        .select('display_name, first_name, last_name, email, premium_status, premium_expires_at, current_height, target_height, onboarding_completed, created_at, motivation, workout_frequency, sleep_hours')
        .eq('id', user.id)
        .single()

      if (profileData) {
        setProfile(profileData)
      }

      // Fetch subscription (get most recent if multiple)
      const { data: subData } = await supabase
        .from('user_subscriptions')
        .select('id, plan_id, status, start_date, end_date, auto_renew, payment_source, created_at, updated_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (subData) {
        setSubscription(subData)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPlanName = (planId?: string) => {
    switch (planId) {
      case 'weekly': return 'Weekly'
      case 'yearly': return 'Yearly'
      case 'monthly': return 'Monthly'
      default: return planId || 'Premium'
    }
  }

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active': return { label: 'Active', className: 'bg-green-500/20 text-green-400' }
      case 'trial': return { label: 'Trial', className: 'bg-blue-500/20 text-blue-400' }
      case 'cancelled': return { label: 'Cancelled', className: 'bg-amber-500/20 text-amber-400' }
      case 'expired': return { label: 'Expired', className: 'bg-red-500/20 text-red-400' }
      default: return { label: status || 'Unknown', className: 'bg-white/10 text-white/60' }
    }
  }

  const getPaymentSourceLabel = (source?: string) => {
    switch (source) {
      case 'web': return 'Credit Card (Web)'
      case 'revenuecat': return 'App Store / Google Play'
      case 'stripe': return 'Credit Card'
      default: return '—'
    }
  }

  const formatHeight = (cm?: number) => {
    if (cm == null) return '—'
    const feet = Math.floor(cm / 30.48)
    const inches = Math.round((cm % 30.48) / 2.54)
    return `${feet}'${inches}" (${cm} cm)`
  }

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : null

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-amber-500 rounded-full animate-spin" />
      </div>
    )
  }

  const userName = profile?.first_name || profile?.display_name || user?.email?.split('@')[0] || 'there'

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A]">
      {/* Header */}
      <header className="px-6 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-1">
            <Image
              src={logo}
              alt="PeakHeight"
              width={32}
              height={32}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <span className="text-white font-bold text-lg">PeakHeight</span>
        </div>
        <button
          onClick={handleSignOut}
          className="text-white/60 hover:text-white text-sm transition-colors"
        >
          Sign Out
        </button>
      </header>

      <div className="px-6 pb-12 max-w-lg mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 pt-4"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_8px_30px_rgba(34,197,94,0.3)]">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-white text-2xl font-bold mb-2">
            Welcome, {userName}!
          </h1>
          <p className="text-white/60">
            Your account is ready. Download the app to start your journey.
          </p>
        </motion.div>

        {/* Account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-6"
        >
          <h2 className="text-white font-semibold mb-4">Account</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Name</span>
              <span className="text-white">
                {profile?.first_name && profile?.last_name
                  ? `${profile.first_name} ${profile.last_name}`
                  : profile?.display_name || '—'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Email</span>
              <span className="text-white truncate max-w-[180px]" title={user?.email}>
                {user?.email || profile?.email || '—'}
              </span>
            </div>
            {memberSince && (
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Member since</span>
                <span className="text-white">{memberSince}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Subscription Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">Subscription</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isPremium || profile?.premium_status
                ? 'bg-green-500/20 text-green-400'
                : subscription
                  ? getStatusBadge(subscription.status).className
                  : 'bg-white/10 text-white/60'
            }`}>
              {isPremium || profile?.premium_status
                ? 'Active'
                : subscription
                  ? getStatusBadge(subscription.status).label
                  : 'No subscription'}
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Plan</span>
              <span className="text-white">{getPlanName(subscription?.plan_id) || '—'}</span>
            </div>
            {subscription?.start_date && (
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Started</span>
                <span className="text-white">{formatDate(subscription.start_date)}</span>
              </div>
            )}
            {subscription?.end_date && (
              <div className="flex justify-between text-sm">
                <span className="text-white/50">
                  {subscription?.auto_renew ? 'Renews' : 'Expires'}
                </span>
                <span className="text-white">{formatDate(subscription.end_date)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Auto-renew</span>
              <span className="text-white">
                {subscription?.auto_renew != null
                  ? subscription.auto_renew ? 'On' : 'Off'
                  : '—'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Payment method</span>
              <span className="text-white">{getPaymentSourceLabel(subscription?.payment_source)}</span>
            </div>
          </div>
          <p className="text-white/40 text-xs mt-4">
            To cancel or change your plan, use the same method you used to subscribe (app or web).
          </p>
        </motion.div>

        {/* Your Plan Summary (onboarding data) */}
        {(profile?.current_height != null || profile?.target_height != null || profile?.motivation || profile?.workout_frequency != null) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-6"
          >
            <h2 className="text-white font-semibold mb-4">Your Plan Summary</h2>
            <div className="space-y-3">
              {profile?.current_height != null && (
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Current height</span>
                  <span className="text-white">{formatHeight(profile.current_height)}</span>
                </div>
              )}
              {profile?.target_height != null && (
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Target height</span>
                  <span className="text-white">{formatHeight(profile.target_height)}</span>
                </div>
              )}
              {profile?.workout_frequency && (
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Workout frequency</span>
                  <span className="text-white capitalize">{profile.workout_frequency}</span>
                </div>
              )}
              {profile?.sleep_hours != null && (
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Sleep (hours/night)</span>
                  <span className="text-white">{profile.sleep_hours}</span>
                </div>
              )}
              {profile?.motivation && (
                <div className="pt-2">
                  <span className="text-white/50 text-sm block mb-1">Motivation</span>
                  <p className="text-white text-sm">{profile.motivation}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Download App Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20 mb-6"
        >
          <h2 className="text-white font-bold text-lg mb-2 text-center">
            Download the App
          </h2>
          <p className="text-white/60 text-sm text-center mb-6">
            Continue your growth journey on your phone. Your premium subscription is already active!
          </p>

          <div className="space-y-3">
            {/* iOS App Store */}
            <a
              href="https://apps.apple.com/us/app/peak-height/id6752793377"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-14 bg-black rounded-xl flex items-center justify-center gap-3 border border-white/20 hover:border-white/40 transition-colors"
            >
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <p className="text-white/60 text-[10px] leading-tight">Download on the</p>
                <p className="text-white font-semibold text-sm leading-tight">App Store</p>
              </div>
            </a>

            {/* Google Play */}
            <a
              href="https://play.google.com/store/apps/details?id=com.peakheight.app" // Replace with actual Play Store link
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-14 bg-black rounded-xl flex items-center justify-center gap-3 border border-white/20 hover:border-white/40 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92z"/>
                <path fill="#FBBC05" d="M16.296 8.496L5.157.678A.996.996 0 0 0 3.61 1.814l8.63 8.632z"/>
                <path fill="#4285F4" d="M20.827 10.227l-3.778-2.156-4.807 4.81 4.807 4.809 3.778-2.157c.679-.387 1.108-1.107 1.108-1.903s-.429-1.516-1.108-1.903z"/>
                <path fill="#34A853" d="M3.609 22.186a.996.996 0 0 0 1.548 1.136l11.139-7.818-4.054-4.054z"/>
              </svg>
              <div className="text-left">
                <p className="text-white/60 text-[10px] leading-tight">Get it on</p>
                <p className="text-white font-semibold text-sm leading-tight">Google Play</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10"
        >
          <h2 className="text-white font-semibold mb-4">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <p className="text-white text-sm font-medium">Download the app</p>
                <p className="text-white/50 text-xs">Available on iOS and Android</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <p className="text-white text-sm font-medium">Sign in with the same account</p>
                <p className="text-white/50 text-xs">Use {user?.email}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <p className="text-white text-sm font-medium">Start your 120-day journey</p>
                <p className="text-white/50 text-xs">Your premium is already active!</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-white/40 text-xs mt-8"
        >
          Need help? <a href="mailto:support@peakheight.app" className="text-amber-400 underline">Contact Support</a>
        </motion.p>
      </div>
    </div>
  )
}
