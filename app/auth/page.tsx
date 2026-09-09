'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

function GoogleIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex min-h-screen min-h-dvh flex-col items-center justify-center px-6 py-12"
      style={{
        background:
          'radial-gradient(ellipse 70% 50% at 50% 38%, rgba(196,214,236,0.35) 0%, rgba(255,255,255,0.9) 55%, #ffffff 100%)',
        paddingBottom: 'max(3rem, calc(env(safe-area-inset-bottom) + 7rem))',
      }}
    >
      <div className="w-full max-w-[360px]">{children}</div>
    </div>
  )
}

function AuthPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, signInWithEmail, signUpWithEmail, signInWithApple, signInWithGoogle, loading, signOut } =
    useAuth()

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
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'apple' | null>(null)
  const [showEmail, setShowEmail] = useState(false)
  const [preferApple, setPreferApple] = useState(false)
  const [error, setError] = useState(
    errorParam === 'auth_failed' ? 'Authentication failed. Please try again.' : ''
  )
  const [justCompletedAuth, setJustCompletedAuth] = useState(false)
  // Don't blank the screen forever if session check hangs
  const [forceShowForm, setForceShowForm] = useState(false)

  useEffect(() => {
    setPreferApple(/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent))
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setForceShowForm(true), 2500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!loading && user && !fromOnboarding && !justCompletedAuth) {
      const t = setTimeout(() => router.replace(redirectTo), 400)
      return () => clearTimeout(t)
    }
  }, [user, loading, router, redirectTo, fromOnboarding, justCompletedAuth])

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
      const result =
        authMode === 'signup'
          ? await signUpWithEmail(email, password, name)
          : await signInWithEmail(email, password)

      if (result.error) {
        const msg = result.error.message || ''
        if (msg.includes('Invalid login credentials')) {
          setError('Invalid email or password.')
        } else if (msg.includes('User already registered')) {
          setError('An account with this email already exists.')
        } else if (msg.includes('Failed to fetch')) {
          setError('Unable to reach the server. Check your connection and try again.')
        } else {
          setError(msg || 'Something went wrong. Please try again.')
        }
      } else {
        setJustCompletedAuth(true)
        router.push(redirectTo)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setLoadingProvider('google')
    try {
      const result = await signInWithGoogle(redirectTo)
      if (result.error) {
        setError(result.error.message || 'Google Sign In failed. Please try again.')
        setLoadingProvider(null)
      }
    } catch {
      setError('Google Sign In failed. Please try again.')
      setLoadingProvider(null)
    }
  }

  const handleApple = async () => {
    setError('')
    setLoadingProvider('apple')
    try {
      const result = await signInWithApple(redirectTo)
      if (result.error) {
        setError(result.error.message || 'Apple Sign In failed. Please try again.')
        setLoadingProvider(null)
      }
    } catch {
      setError('Apple Sign In failed. Please try again.')
      setLoadingProvider(null)
    }
  }

  const busy = isLoading || loadingProvider !== null
  const showBootSpinner = loading && !forceShowForm && !user

  if (showBootSpinner) {
    return (
      <AuthShell>
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-[#18181b]" />
          <p className="font-manrope text-sm text-[#a1a1aa]">Loading…</p>
        </div>
      </AuthShell>
    )
  }

  if (user) {
    if (fromOnboarding) {
      return (
        <AuthShell>
          <div className="text-center">
            <p className="mb-2 font-manrope text-lg font-semibold text-[#18181b]">
              You&apos;re already signed in
            </p>
            <p className="mb-6 font-manrope text-sm text-[#a1a1aa]">
              Continue to choose your subscription plan.
            </p>
            <button
              type="button"
              onClick={() => router.push(redirectTo)}
              className="h-12 w-full rounded-full bg-[#18181b] font-manrope font-medium text-white"
            >
              Continue to subscription →
            </button>
            <button
              type="button"
              onClick={() => signOut()}
              className="mt-4 font-manrope text-[13px] text-[#a1a1aa] underline"
            >
              Use a different account
            </button>
          </div>
        </AuthShell>
      )
    }

    return (
      <AuthShell>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-[#18181b]" />
          <p className="font-manrope text-sm text-[#a1a1aa]">Signed in — redirecting…</p>
          <button
            type="button"
            onClick={() => router.push(redirectTo)}
            className="mt-2 font-manrope text-sm font-medium text-[#18181b] underline"
          >
            Continue now
          </button>
        </div>
      </AuthShell>
    )
  }

  const providers = preferApple ? (['apple', 'google'] as const) : (['google', 'apple'] as const)

  return (
    <AuthShell>
      <div className="mb-8 flex flex-col items-center text-center">
        <div
          className="mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-[16px] bg-[#18181b]"
          style={{ boxShadow: '0 16px 36px -14px rgba(24,24,27,0.35)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/peakheight-logo.jpg"
            alt="PeakHeight"
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="font-manrope text-[26px] font-bold tracking-tight text-[#18181b]">
          {authMode === 'signup' ? 'Sign up for PeakHeight' : 'Sign in to PeakHeight'}
        </h1>
        <p className="mt-2 font-manrope text-[14px] text-[#a1a1aa]">
          Continue with Google or Apple
        </p>
      </div>

      <div className="space-y-3">
        {providers.map((provider) => (
          <button
            key={provider}
            type="button"
            onClick={provider === 'google' ? handleGoogle : handleApple}
            disabled={busy}
            className="flex h-[52px] w-full items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white font-manrope text-[15px] font-semibold text-[#18181b] transition-colors hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.99] disabled:opacity-50"
          >
            {loadingProvider === provider ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-[#18181b]" />
            ) : (
              <>
                {provider === 'google' ? <GoogleIcon /> : <AppleIcon />}
                Continue with {provider === 'google' ? 'Google' : 'Apple'}
              </>
            )}
          </button>
        ))}
      </div>

      {error ? (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-center font-manrope text-[13px] text-red-600">
          {error}
        </p>
      ) : null}

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-zinc-200" />
        <span className="font-manrope text-[12px] text-[#a1a1aa]">or</span>
        <div className="h-px flex-1 bg-zinc-200" />
      </div>

      {!showEmail ? (
        <button
          type="button"
          onClick={() => setShowEmail(true)}
          className="w-full py-2 font-manrope text-[14px] font-medium text-[#18181b] underline-offset-2 hover:underline"
        >
          Continue with email
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {authMode === 'signup' ? (
            <div>
              <label className="mb-1.5 block font-manrope text-[12px] font-medium text-[#a1a1aa]">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-[48px] w-full rounded-xl border border-zinc-200 bg-white px-4 font-manrope text-[15px] text-[#18181b] placeholder:text-zinc-300 focus:border-[#18181b] focus:outline-none"
              />
            </div>
          ) : null}

          <div>
            <label className="mb-1.5 block font-manrope text-[12px] font-medium text-[#a1a1aa]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="h-[48px] w-full rounded-xl border border-zinc-200 bg-white px-4 font-manrope text-[15px] text-[#18181b] placeholder:text-zinc-300 focus:border-[#18181b] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-manrope text-[12px] font-medium text-[#a1a1aa]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="h-[48px] w-full rounded-xl border border-zinc-200 bg-white px-4 font-manrope text-[15px] text-[#18181b] placeholder:text-zinc-300 focus:border-[#18181b] focus:outline-none"
            />
          </div>

          {authMode === 'signup' ? (
            <div>
              <label className="mb-1.5 block font-manrope text-[12px] font-medium text-[#a1a1aa]">
                Repeat password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                required
                minLength={6}
                className="h-[48px] w-full rounded-xl border border-zinc-200 bg-white px-4 font-manrope text-[15px] text-[#18181b] placeholder:text-zinc-300 focus:border-[#18181b] focus:outline-none"
              />
            </div>
          ) : null}

          <button
            type="submit"
            disabled={busy || !email || !password || (authMode === 'signup' && !confirmPassword)}
            className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#18181b] font-manrope text-[15px] font-medium text-white active:scale-[0.98] disabled:opacity-45"
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-500 border-t-white" />
            ) : authMode === 'signup' ? (
              'Create Account →'
            ) : (
              'Sign In →'
            )}
          </button>
        </form>
      )}

      <p className="mt-6 text-center font-manrope text-[14px]">
        <span className="text-[#a1a1aa]">
          {authMode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
        </span>{' '}
        <button
          type="button"
          onClick={() => {
            setAuthMode(authMode === 'signup' ? 'signin' : 'signup')
            setError('')
          }}
          className="font-semibold text-[#18181b] underline"
        >
          {authMode === 'signup' ? 'Sign In' : 'Sign Up'}
        </button>
      </p>

      <p className="mt-8 text-center font-manrope text-[11px] leading-relaxed text-[#a1a1aa]">
        By signing in, you confirm you are 18 or older and agree to our{' '}
        <Link href="/terms" className="underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </AuthShell>
  )
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center bg-white"
          style={{ minHeight: '100dvh' }}
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-[#18181b]" />
        </div>
      }
    >
      <AuthPageContent />
    </Suspense>
  )
}
