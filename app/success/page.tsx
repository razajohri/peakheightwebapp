'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

const APP_STORE_URL = 'https://apps.apple.com/us/app/peak-height/id6752793377'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.peakheight.app'

export default function SuccessPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth?redirect=/success')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-white/30 border-t-amber-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="p-4 flex items-center justify-end border-b border-white/10">
        <Link
          href="/dashboard"
          className="text-white/60 text-sm hover:text-white"
        >
          Dashboard
        </Link>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-white text-2xl font-bold text-center mb-2">
          Payment successful
        </h1>
        <p className="text-white/60 text-sm text-center mb-8 max-w-sm">
          Your subscription is active. You can now log in on your phone with the same account and enjoy premium.
        </p>

        <div className="w-full max-w-sm space-y-3">
          <p className="text-white font-semibold text-sm text-center mb-4">
            Download the app
          </p>
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

        <p className="text-white/40 text-xs text-center mt-8">
          Need help? <a href="mailto:support@peakheight.app" className="text-amber-400 underline">Contact Support</a>
        </p>
      </div>
    </div>
  )
}
