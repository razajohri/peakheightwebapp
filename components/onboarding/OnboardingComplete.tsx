'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { saveOnboardingData } from '@/lib/services/user'

const SAVE_TIMEOUT_MS = 10_000

interface OnboardingCompleteProps {
  data: any
}

export default function OnboardingComplete({ data }: OnboardingCompleteProps) {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [showConfetti, setShowConfetti] = useState(true)
  const [isSaving, setIsSaving] = useState(true)
  const [saveError, setSaveError] = useState('')
  const [notSignedIn, setNotSignedIn] = useState(false)
  const saveDone = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Save onboarding data to Supabase
  useEffect(() => {
    if (saveDone.current) return

    const saveData = async () => {
      // Wait for auth to finish loading
      if (authLoading) {
        return
      }

      if (!user?.id) {
        saveDone.current = true
        setNotSignedIn(true)
        setIsSaving(false)
        return
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('[Onboarding] User linked:', { userId: user.id, email: user.email })
      }

      try {
        const timeoutPromise = new Promise<{ success: false; error: string }>((resolve) => {
          setTimeout(() => resolve({ success: false, error: 'Save is taking longer than usual. You can go to Dashboard.' }), SAVE_TIMEOUT_MS)
        })
        const savePromise = saveOnboardingData(user.id, data)
        const result = await Promise.race([savePromise, timeoutPromise])

        if (!result.success) {
          setSaveError(result.error || 'Failed to save data')
        } else if (process.env.NODE_ENV === 'development') {
          console.log('[Onboarding] Save success – data is in Supabase')
        }

        localStorage.removeItem('onboardingData')
        localStorage.removeItem('onboardingStep')
      } catch (error) {
        console.error('Error saving onboarding data:', error)
        setSaveError('Failed to save your data')
      } finally {
        saveDone.current = true
        setIsSaving(false)
      }
    }

    saveData()
  }, [authLoading, user?.id, data])

  const goToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] flex flex-col"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                top: -20, 
                left: `${Math.random() * 100}%`,
                rotate: 0,
                opacity: 1
              }}
              animate={{ 
                top: '110%',
                rotate: Math.random() * 360,
                opacity: 0
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'linear'
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                background: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'][Math.floor(Math.random() * 5)]
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-[0_8px_30px_rgba(34,197,94,0.4)]"
        >
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white text-[28px] font-bold text-center mb-3"
        >
          You're All Set!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-[15px] text-center max-w-[300px] mb-8"
        >
          {authLoading
            ? 'Checking sign-in...'
            : isSaving
              ? 'Saving your personalized plan...'
              : notSignedIn
                ? "You're not signed in, so your plan wasn't saved to your account."
                : 'Your personalized growth plan is ready. Download the app to get started!'}
        </motion.p>

        {/* Saving indicator */}
        {(authLoading || isSaving) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <div className="w-6 h-6 border-2 border-white/30 border-t-amber-500 rounded-full animate-spin" />
          </motion.div>
        )}

        {/* Not signed in – show Sign in button */}
        {notSignedIn && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[320px] flex flex-col gap-3 mb-4"
          >
            <p className="text-white/50 text-[13px] text-center">
              Sign in to save your plan to your account and use it on the app.
            </p>
            <button
              type="button"
              onClick={() => router.push('/auth')}
              className="w-full h-[54px] rounded-2xl bg-white text-black font-bold text-[16px] active:scale-[0.98] transition-transform"
            >
              Sign in
            </button>
          </motion.div>
        )}

        {/* Error message */}
        {saveError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-amber-300 text-sm mb-4 text-center max-w-[300px]"
          >
            {saveError}
          </motion.p>
        )}

        {/* Go to Dashboard Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={goToDashboard}
          disabled={authLoading || isSaving}
          className="w-full max-w-[320px] h-[54px] rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[16px] flex items-center justify-center shadow-[0_8px_30px_rgba(245,158,11,0.3)] active:scale-[0.98] transition-transform disabled:opacity-50 mb-6"
        >
          {authLoading ? 'Please wait...' : isSaving ? 'Please wait...' : 'Go to Dashboard'}
        </motion.button>

        {/* App Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-[320px] bg-white/5 border border-white/10 rounded-2xl p-5"
        >
          <p className="text-white/40 text-[11px] font-semibold tracking-wider text-center mb-4">
            OR DOWNLOAD THE APP NOW
          </p>

          <div className="space-y-3">
            {/* App Store */}
            <a
              href="https://apps.apple.com/us/app/peak-height/id6752793377"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white rounded-xl p-3 active:scale-[0.98] transition-transform"
            >
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-black/50 text-[11px]">Download on the</p>
                <p className="text-black font-bold text-[16px]">App Store</p>
              </div>
              <svg className="w-5 h-5 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Google Play */}
            <a
              href="https://play.google.com/store/apps/details?id=com.peakheight.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-xl p-3 active:scale-[0.98] transition-transform"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white/50 text-[11px]">Get it on</p>
                <p className="text-white font-bold text-[16px]">Google Play</p>
              </div>
              <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Login Reminder */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/40 text-[12px] text-center mt-6 max-w-[280px]"
        >
          Sign in with {user?.email || 'the same account'} in the app to access your personalized plan
        </motion.p>
      </div>
    </div>
  )
}
