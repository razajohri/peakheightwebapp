'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'
import { initializeRevenueCat, openCustomerCenter, isRevenueCatConfigured } from '@/lib/services/revenuecat'
import logo from '../../peakheight-logo.jpg'

interface UserProfile {
  display_name?: string
  first_name?: string
  last_name?: string
  email?: string
}

const APP_STORE_URL = 'https://apps.apple.com/us/app/peak-height/id6752793377'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.peakheight.app'

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading, signOut, isPremium } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth?redirect=/dashboard')
      return
    }

    if (user) {
      fetchUserData()
      if (isPremium && isRevenueCatConfigured()) {
        initializeRevenueCat(user.id).catch(() => {})
      }
    }
  }, [user, loading, isPremium, router])

  const fetchUserData = async () => {
    if (!user) return
    try {
      const { data } = await supabase
        .from('users')
        .select('display_name, first_name, last_name, email')
        .eq('id', user.id)
        .single()
      if (data) setProfile(data)
    } catch (e) {
      console.error('Error fetching profile:', e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

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
      <header className="px-6 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-1">
            <Image src={logo} alt="PeakHeight" width={32} height={32} className="w-full h-full object-cover rounded-lg" />
          </div>
          <span className="text-white font-bold text-lg">PeakHeight</span>
        </div>
        <button onClick={handleSignOut} className="text-white/60 hover:text-white text-sm transition-colors">
          Sign Out
        </button>
      </header>

      <div className="px-6 pb-12 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 pt-4"
        >
          <h1 className="text-white text-2xl font-bold mb-2">Welcome, {userName}!</h1>
          <p className="text-white/60">Your account is ready. Download the app to start your journey.</p>
        </motion.div>

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
          </div>
          {isPremium && isRevenueCatConfigured() && (
            <button
              type="button"
              onClick={() => openCustomerCenter('/support')}
              className="mt-4 w-full py-2.5 rounded-xl border border-white/20 text-white/80 text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Manage subscription
            </button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20 mb-6"
        >
          <h2 className="text-white font-bold text-lg mb-2 text-center">Download the App</h2>
          <p className="text-white/60 text-sm text-center mb-6">
            Continue your growth journey on your phone.
            {isPremium && ' Your premium subscription is already active.'}
          </p>
          <div className="space-y-3">
            <a
              href={APP_STORE_URL}
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
            <a
              href={PLAY_STORE_URL}
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

        <p className="text-center text-white/40 text-xs">
          Need help? <a href="mailto:support@peakheight.app" className="text-amber-400 underline">Contact Support</a>
        </p>
      </div>
    </div>
  )
}
