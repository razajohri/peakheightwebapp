'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

function AuthPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, signInWithEmail, signUpWithEmail, signInWithApple, signInWithGoogle, loading } = useAuth()
  
  const mode = searchParams.get('mode') || 'signup'
  const redirectTo = searchParams.get('redirect') || '/dashboard'
  const errorParam = searchParams.get('error')
  const fromOnboarding = searchParams.get('from') === 'onboarding'

  const [authMode, setAuthMode] = useState<'signup' | 'signin'>(mode as 'signup' | 'signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const [error, setError] = useState(errorParam === 'auth_failed' ? 'Authentication failed. Please try again.' : '')

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      let result
      if (authMode === 'signup') {
        result = await signUpWithEmail(email, password, name)
      } else {
        result = await signInWithEmail(email, password)
      }

      if (result.error) {
        if (result.error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password.')
        } else if (result.error.message.includes('User already registered')) {
          setError('An account with this email already exists.')
        } else {
          setError(result.error.message)
        }
      } else {
        router.push(redirectTo)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAppleSignIn = async () => {
    setError('')
    setLoadingProvider('apple')
    const result = await signInWithApple()
    if (result.error) {
      setError('Apple Sign In failed.')
      setLoadingProvider(null)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setLoadingProvider('google')
    const result = await signInWithGoogle()
    if (result.error) {
      setError('Google Sign In failed.')
      setLoadingProvider(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-amber-500 rounded-full animate-spin" />
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

        {/* Auth Form */}
        <div className="bg-[#0a0a0a]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#1f1f1f]">
          {/* Social Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleAppleSignIn}
              disabled={isLoading || loadingProvider !== null}
              className="w-full h-[52px] bg-white rounded-xl flex items-center justify-center gap-3 font-semibold text-[15px] text-black active:scale-[0.98] transition-transform disabled:opacity-50"
            >
              {loadingProvider === 'apple' ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Continue with Apple
                </>
              )}
            </button>

            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading || loadingProvider !== null}
              className="w-full h-[52px] bg-white/10 border border-white/20 rounded-xl flex items-center justify-center gap-3 font-semibold text-[15px] text-white active:scale-[0.98] transition-transform disabled:opacity-50"
            >
              {loadingProvider === 'google' ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/40 text-[12px]">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

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

            {error && (
              <p className="text-red-400 text-[13px] text-center bg-red-400/10 rounded-lg py-2 px-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading || loadingProvider !== null || !email || !password}
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
