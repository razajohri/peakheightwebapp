'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'

interface OnboardingAuthProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export default function OnboardingAuth({ data, updateData, onNext, onBack }: OnboardingAuthProps) {
  const { user, sendEmailOtp, verifyEmailOtp } = useAuth()
  const [emailStep, setEmailStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [name, setName] = useState(data?.userName || '')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [resendIn, setResendIn] = useState(0)
  const codeInputRef = useRef<HTMLInputElement>(null)
  const advancedRef = useRef(false)

  useEffect(() => {
    if (!user || advancedRef.current) return
    advancedRef.current = true
    updateData({
      userEmail: user.email,
      userName:
        user.user_metadata?.display_name ||
        user.user_metadata?.full_name ||
        user.email?.split('@')[0],
      userId: user.id,
    })
    onNext()
  }, [user, updateData, onNext])

  useEffect(() => {
    if (resendIn <= 0) return
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [resendIn])

  useEffect(() => {
    if (emailStep === 'code') codeInputRef.current?.focus()
  }, [emailStep])

  const sendCode = async () => {
    setError('')
    setInfo('')
    setIsLoading(true)
    try {
      const result = await sendEmailOtp(email, {
        name: name || undefined,
        returnTo: '/paywall',
      })
      if (result.error) {
        const msg = result.error.message || ''
        if (msg.includes('rate limit') || msg.includes('security purposes')) {
          setError('Please wait a moment before requesting another code.')
        } else {
          setError(msg || 'Could not send code. Please try again.')
        }
      } else {
        setEmailStep('code')
        setCode('')
        setResendIn(30)
        setInfo(`We sent a 6-digit code to ${email.trim().toLowerCase()}`)
        updateData({
          userEmail: email.trim().toLowerCase(),
          userName: name || email.split('@')[0],
        })
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
        updateData({
          userEmail: email.trim().toLowerCase(),
          userName: name || email.split('@')[0],
        })
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={19} totalSteps={21} onBack={onBack} />

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto w-full max-w-[400px] px-5 pb-6 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-center"
            >
              <h1 className="mb-2 font-playfair text-[28px] font-normal leading-[1.2] tracking-[-0.02em] text-[#18181b]">
                {emailStep === 'code' ? 'Enter your code' : 'Create Account'}
              </h1>
              <p className="font-manrope text-[15px] text-[#a1a1aa]">
                {emailStep === 'code'
                  ? `Check ${email.trim().toLowerCase()} for a 6-digit code`
                  : 'Enter your email and we’ll send a 6-digit code'}
              </p>
            </motion.div>

            {error ? (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 rounded-lg bg-red-400/10 px-3 py-2 text-center text-[13px] text-red-400"
              >
                {error}
              </motion.p>
            ) : null}

            {info && !error ? (
              <p className="mb-4 rounded-lg bg-zinc-50 px-3 py-2 text-center font-manrope text-[13px] text-[#52525b]">
                {info}
              </p>
            ) : null}

            {emailStep === 'email' ? (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSendCode}
                className="space-y-4"
              >
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#a1a1aa]">
                    Name <span className="font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="h-[48px] w-full rounded-xl border border-zinc-200 bg-white px-4 text-[15px] text-[#18181b] placeholder:text-zinc-300 transition-colors focus:border-[#18181b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#a1a1aa]">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="h-[48px] w-full rounded-xl border border-zinc-200 bg-white px-4 text-[15px] text-[#18181b] placeholder:text-zinc-300 transition-colors focus:border-[#18181b] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#18181b] text-[15px] font-medium text-white transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-white" />
                  ) : (
                    'Send 6-digit code'
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleVerifyCode}
                className="space-y-4"
              >
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#a1a1aa]">
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
                  className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#18181b] text-[15px] font-medium text-white transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-white" />
                  ) : (
                    'Verify & continue'
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
              </motion.form>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center text-[11px] leading-relaxed text-zinc-300"
            >
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-zinc-400 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-zinc-400 underline">
                Privacy Policy
              </a>
            </motion.p>
          </div>
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
