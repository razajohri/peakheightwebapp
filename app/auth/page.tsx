'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

function AuthPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, signInWithEmail, signUpWithEmail, loading } = useAuth()
  
  const mode = searchParams.get('mode') || 'signup'
  const redirectTo = searchParams.get('redirect') || '/dashboard'
  const errorParam = searchParams.get('error')
  const fromOnboarding = searchParams.get('from') === 'onboarding'

  const [authMode, setAuthMode] = useState<'signup' | 'signin'>(mode as 'signup' | 'signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(errorParam === 'auth_failed' ? 'Authentication failed. Please try again.' : '')
  const [justCompletedAuth, setJustCompletedAuth] = useState(false)

  // When already logged in: from onboarding we show "Continue to subscription"; otherwise redirect
  useEffect(() => {
    if (!loading && user && !fromOnboarding) {
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo, fromOnboarding])

  // New user just completed signup/signin → redirect immediately (no "already signed in" screen)
  useEffect(() => {
    if (!user || !redirectTo || !justCompletedAuth) return
    setJustCompletedAuth(false)
    router.replace(redirectTo)
  }, [user, redirectTo, justCompletedAuth, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (authMode === 'signup' && password !== confirmPassword) {
        setError('Passwords do not match.')
        setIsLoading(false)
        return
      }
      let result
      if (authMode === 'signup') {
        result = await signUpWithEmail(email, password, name)
      } else {
        result = await signInWithEmail(email, password)
      }

      if (result.error) {
        const msg = result.error.message || ''
        if (msg.includes('Invalid login credentials')) {
          setError('Invalid email or password.')
        } else if (msg.includes('User already registered')) {
          setError('An account with this email already exists.')
        } else if (msg.includes('Failed to fetch')) {
          setError(
            'Unable to reach the server. Check your internet connection (and any ad‑blockers or VPN), then try again.'
          )
        } else {
          setError(msg || 'Something went wrong. Please try again.')
        }
      } else {
        setJustCompletedAuth(true)
        router.push(redirectTo)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-amber-500 rounded-full animate-spin" />
      </div>
    )
  }

  // Already logged in: from onboarding show "Continue" so user sees auth step; else redirect
  if (user) {
    // New user just completed auth → redirect immediately (no intermediate screen)
    if (fromOnboarding && justCompletedAuth) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <p className="text-white/60 text-sm">Taking you to subscription…</p>
        </div>
      )
    }
    if (fromOnboarding) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
          <p className="text-white text-lg font-semibold text-center mb-2">You're already signed in</p>
          <p className="text-white/60 text-sm text-center mb-6">Continue to choose your subscription plan.</p>
          <button
            type="button"
            onClick={() => router.push(redirectTo)}
            className="w-full max-w-md h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold"
          >
            Continue to subscription
          </button>
        </div>
      )
    }
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-white/30 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-white/60 text-sm">Redirecting…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] flex flex-col items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl font-bold mb-2">
            {authMode === 'signup' ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-400">
            {fromOnboarding
              ? 'Create your account to continue'
              : authMode === 'signup'
              ? 'Get started with PeakHeight'
              : 'Sign in to continue your journey'}
          </p>
        </div>

        {/* Auth Form - email/password only */}
        <div className="bg-[#0a0a0a]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#1f1f1f]">
          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="text-white/60 text-[12px] font-medium mb-1.5 block">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full h-[48px] bg-white/5 border border-white/10 rounded-xl px-4 text-white text-[15px] placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="text-white/60 text-[12px] font-medium mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full h-[48px] bg-white/5 border border-white/10 rounded-xl px-4 text-white text-[15px] placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="text-white/60 text-[12px] font-medium mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full h-[48px] bg-white/5 border border-white/10 rounded-xl px-4 text-white text-[15px] placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            {authMode === 'signup' && (
              <div>
                <label className="text-white/60 text-[12px] font-medium mb-1.5 block">Repeat password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  required
                  minLength={6}
                  className="w-full h-[48px] bg-white/5 border border-white/10 rounded-xl px-4 text-white text-[15px] placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
            )}

            {error && (
              <p className="text-red-400 text-[13px] text-center bg-red-400/10 rounded-lg py-2 px-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={
                isLoading ||
                !email ||
                !password ||
                (authMode === 'signup' && !confirmPassword)
              }
              className="w-full h-[52px] rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[15px] flex items-center justify-center shadow-[0_8px_30px_rgba(245,158,11,0.3)] active:scale-[0.98] transition-transform disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                authMode === 'signup' ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <p className="text-center mt-6 text-[14px]">
            <span className="text-white/50">
              {authMode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
            </span>
            {' '}
            <button
              onClick={() => {
                setAuthMode(authMode === 'signup' ? 'signin' : 'signup')
                setError('')
              }}
              className="text-amber-400 font-semibold"
            >
              {authMode === 'signup' ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Terms */}
        <p className="text-center mt-6 text-[11px] text-white/30 leading-relaxed">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-white/50 underline">Terms of Service</a>
          {' '}and{' '}
          <a href="/privacy" className="text-white/50 underline">Privacy Policy</a>
        </p>
      </motion.div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-amber-500 rounded-full animate-spin" />
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  )
}
