'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

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
  const { user, sendEmailOtp, verifyEmailOtp, loading, signOut } = useAuth()

  const redirectParam = searchParams.get('redirect')
  const errorParam = searchParams.get('error')
  const fromOnboarding = searchParams.get('from') === 'onboarding'
  const redirectTo = redirectParam || (fromOnboarding ? '/paywall' : '/dashboard')

  const [emailStep, setEmailStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(
    errorParam === 'auth_failed' ? 'Authentication failed. Please try again.' : ''
  )
  const [info, setInfo] = useState('')
  const [justCompletedAuth, setJustCompletedAuth] = useState(false)
  const [forceShowForm, setForceShowForm] = useState(false)
  const [resendIn, setResendIn] = useState(0)
  const codeInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setForceShowForm(true), 2500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (resendIn <= 0) return
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [resendIn])

  useEffect(() => {
    if (emailStep === 'code') {
      codeInputRef.current?.focus()
    }
  }, [emailStep])

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

  const sendCode = async () => {
    setError('')
    setInfo('')
    setIsLoading(true)
    try {
      const result = await sendEmailOtp(email, { name: name || undefined, returnTo: redirectTo })
      if (result.error) {
        const msg = result.error.message || ''
        if (msg.includes('rate limit') || msg.includes('security purposes')) {
          setError('Please wait a moment before requesting another code.')
        } else if (msg.includes('Failed to fetch')) {
          setError('Unable to reach the server. Check your connection and try again.')
        } else {
          setError(msg || 'Could not send code. Please try again.')
        }
      } else {
        setEmailStep('code')
        setCode('')
        setResendIn(30)
        setInfo(`We sent a 6-digit code to ${email.trim().toLowerCase()}`)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendCode()
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const result = await verifyEmailOtp(email, code, name || undefined)
      if (result.error) {
        const msg = result.error.message || ''
        if (msg.toLowerCase().includes('invalid') || msg.toLowerCase().includes('expired')) {
          setError('Invalid or expired code. Try again or resend.')
        } else {
          setError(msg || 'Could not verify code. Please try again.')
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
          {emailStep === 'code' ? 'Enter your code' : 'Sign up for PeakHeight'}
        </h1>
        <p className="mt-2 font-manrope text-[14px] text-[#a1a1aa]">
          {emailStep === 'code'
            ? `Check ${email.trim().toLowerCase()} for a 6-digit code`
            : 'Enter your email and we’ll send a 6-digit code'}
        </p>
      </div>

      {error ? (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-center font-manrope text-[13px] text-red-600">
          {error}
        </p>
      ) : null}

      {info && !error ? (
        <p className="mb-4 rounded-lg bg-zinc-50 px-3 py-2 text-center font-manrope text-[13px] text-[#52525b]">
          {info}
        </p>
      ) : null}

      {emailStep === 'email' ? (
        <form onSubmit={handleSendCode} className="space-y-3">
          <div>
            <label className="mb-1.5 block font-manrope text-[12px] font-medium text-[#a1a1aa]">
              Name <span className="font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="h-[48px] w-full rounded-xl border border-zinc-200 bg-white px-4 font-manrope text-[15px] text-[#18181b] placeholder:text-zinc-300 focus:border-[#18181b] focus:outline-none"
            />
          </div>

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
              autoComplete="email"
              className="h-[48px] w-full rounded-xl border border-zinc-200 bg-white px-4 font-manrope text-[15px] text-[#18181b] placeholder:text-zinc-300 focus:border-[#18181b] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#18181b] font-manrope text-[15px] font-medium text-white active:scale-[0.98] disabled:opacity-45"
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-500 border-t-white" />
            ) : (
              'Send 6-digit code →'
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-3">
          <div>
            <label className="mb-1.5 block font-manrope text-[12px] font-medium text-[#a1a1aa]">
              6-digit code
            </label>
            <input
              ref={codeInputRef}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]*"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              required
              className="h-[56px] w-full rounded-xl border border-zinc-200 bg-white px-4 text-center font-manrope text-[28px] font-semibold tracking-[0.35em] text-[#18181b] placeholder:tracking-[0.35em] placeholder:text-zinc-300 focus:border-[#18181b] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#18181b] font-manrope text-[15px] font-medium text-white active:scale-[0.98] disabled:opacity-45"
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-500 border-t-white" />
            ) : (
              'Verify & continue →'
            )}
          </button>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => {
                setEmailStep('email')
                setCode('')
                setError('')
                setInfo('')
              }}
              className="font-manrope text-[13px] text-[#a1a1aa] underline"
            >
              Change email
            </button>
            <button
              type="button"
              disabled={isLoading || resendIn > 0}
              onClick={() => sendCode()}
              className="font-manrope text-[13px] font-medium text-[#18181b] disabled:text-[#a1a1aa]"
            >
              {resendIn > 0 ? `Resend in ${resendIn}s` : 'Resend code'}
            </button>
          </div>
        </form>
      )}

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
