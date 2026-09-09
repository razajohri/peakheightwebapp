'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import {
  fetchDashboardData,
  getFriendlyName,
  type DashboardProfile,
  type DashboardProgress,
} from '@/lib/dashboard/data'
import { loadTodayBundle, type DailyTaskBundle } from '@/lib/dashboard/dailyTasks'
import { fetchHeightHistory, type HeightMeasurement } from '@/lib/dashboard/height'
import { initializeRevenueCat, isRevenueCatConfigured } from '@/lib/services/revenuecat'
import logo from '../../peakheight-logo.jpg'
import { MeTab } from './MeTab'
import { TodayTab } from './TodayTab'
import { LearnTab } from './LearnTab'
import { AccountTab } from './AccountTab'

type TabId = 'me' | 'today' | 'learn' | 'account'

const TABS: { id: TabId; label: string }[] = [
  { id: 'me', label: 'Me' },
  { id: 'today', label: 'Today' },
  { id: 'learn', label: 'Learn' },
  { id: 'account', label: 'Account' },
]

export default function DashboardApp() {
  const router = useRouter()
  const { user, loading, signOut, isPremium } = useAuth()
  const [tab, setTab] = useState<TabId>('me')
  const [profile, setProfile] = useState<DashboardProfile | null>(null)
  const [progress, setProgress] = useState<DashboardProgress | null>(null)
  const [bundle, setBundle] = useState<DailyTaskBundle | null>(null)
  const [history, setHistory] = useState<HeightMeasurement[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth?redirect=/dashboard')
      return
    }
    if (!user) return

    let cancelled = false
    ;(async () => {
      try {
        const [dash, today, heightRows] = await Promise.all([
          fetchDashboardData(user.id),
          loadTodayBundle(user.id),
          fetchHeightHistory(user.id),
        ])
        if (cancelled) return
        setProfile(dash.profile)
        setProgress(
          today.progress
            ? {
                current_day: today.progress.current_day,
                current_streak: today.progress.current_streak,
                longest_streak: today.progress.longest_streak,
              }
            : dash.progress
        )
        setBundle(today.bundle)
        setHistory(heightRows)
        if (isPremium && isRevenueCatConfigured()) {
          initializeRevenueCat(user.id).catch(() => {})
        }
      } finally {
        if (!cancelled) setReady(true)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [user, loading, isPremium, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (loading || !ready || !user) {
    return (
      <div
        className="flex min-h-screen min-h-dvh items-center justify-center"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(196,214,236,0.35) 0%, rgba(255,255,255,0.95) 55%, #ffffff 100%)',
        }}
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-[#18181b]" />
      </div>
    )
  }

  const name = getFriendlyName(profile, user)
  const premium =
    isPremium ||
    !!(
      profile?.premium_status &&
      (!profile.premium_expires_at || new Date(profile.premium_expires_at) > new Date())
    )

  return (
    <div
      className="relative min-h-screen min-h-dvh overflow-x-hidden pb-24"
      style={{
        background:
          'radial-gradient(ellipse 70% 50% at 50% 22%, rgba(196,214,236,0.4) 0%, rgba(255,255,255,0.92) 52%, #ffffff 100%)',
      }}
    >
      <header className="mx-auto flex w-full max-w-lg items-center justify-between px-5 pb-2 pt-5">
        <Link href="/dashboard" className="flex items-center gap-2.5" onClick={() => setTab('me')}>
          <div className="h-9 w-9 overflow-hidden rounded-[11px] bg-[#18181b]">
            <Image src={logo} alt="PeakHeight" width={36} height={36} className="h-full w-full object-cover" />
          </div>
          <span className="font-manrope text-[15px] font-semibold tracking-tight text-[#18181b]">
            PeakHeight
          </span>
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="font-manrope text-[13px] font-medium text-[#a1a1aa] hover:text-[#18181b]"
        >
          Sign out
        </button>
      </header>

      <main className="mx-auto w-full max-w-lg px-5 pt-4">
        {tab === 'me' ? (
          <MeTab
            userId={user.id}
            name={name}
            profile={profile}
            progress={progress}
            isPremium={premium}
            history={history}
            onProfileHeight={(cm) =>
              setProfile((prev) => (prev ? { ...prev, current_height: cm } : prev))
            }
            onHistoryChange={setHistory}
          />
        ) : null}
        {tab === 'today' ? (
          <TodayTab
            userId={user.id}
            progress={progress}
            bundle={bundle}
            onBundleChange={setBundle}
            onProgressChange={setProgress}
          />
        ) : null}
        {tab === 'learn' ? <LearnTab /> : null}
        {tab === 'account' ? (
          <AccountTab
            userId={user.id}
            profile={profile}
            email={user.email}
            isPremium={premium}
            onSignOut={handleSignOut}
            onProfileChange={setProfile}
          />
        ) : null}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-zinc-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-stretch justify-between px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
          {TABS.map((item) => {
            const active = tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`flex min-h-[52px] flex-1 flex-col items-center justify-center rounded-xl px-1 font-manrope text-[12px] font-medium transition-colors ${
                  active ? 'text-[#18181b]' : 'text-[#a1a1aa] hover:text-[#52525b]'
                }`}
              >
                <span
                  className={`mb-1 h-1 w-1 rounded-full ${active ? 'bg-[#18181b]' : 'bg-transparent'}`}
                />
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
