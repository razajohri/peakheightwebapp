'use client'

import Link from 'next/link'
import {
  looksLikeGeneratedId,
  type DashboardProfile,
} from '@/lib/dashboard/data'
import { isRevenueCatConfigured, openCustomerCenter } from '@/lib/services/revenuecat'
import { AppDownloadCard } from './AppDownloadCard'

export function AccountTab({
  profile,
  email,
  isPremium,
  onSignOut,
}: {
  profile: DashboardProfile | null
  email?: string | null
  isPremium: boolean
  onSignOut: () => void
}) {
  const fullName =
    profile?.first_name && profile?.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : profile?.display_name && !looksLikeGeneratedId(profile.display_name)
        ? profile.display_name
        : null

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1 font-manrope text-[12px] font-medium tracking-[0.08em] text-[#a1a1aa]">
          ACCOUNT
        </p>
        <h2 className="font-playfair text-[30px] font-normal tracking-[-0.02em] text-[#18181b]">
          Your profile
        </h2>
      </div>

      <div className="rounded-[22px] border border-zinc-200 bg-white p-5">
        <div className="space-y-3 font-manrope text-[13px]">
          <div className="flex justify-between gap-3">
            <span className="text-[#71717a]">Name</span>
            <span className="font-medium text-[#18181b]">{fullName || '—'}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-[#71717a]">Email</span>
            <span className="max-w-[220px] truncate font-medium text-[#18181b]" title={email || undefined}>
              {email || profile?.email || '—'}
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-[#71717a]">Plan</span>
            <span className="font-medium text-[#18181b]">{isPremium ? 'Pro' : 'Basic'}</span>
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          {!isPremium ? (
            <Link
              href="/paywall"
              className="flex h-12 w-full items-center justify-center rounded-full bg-[#18181b] font-manrope text-[14px] font-semibold text-white"
            >
              Unlock Pro
            </Link>
          ) : isRevenueCatConfigured() ? (
            <button
              type="button"
              onClick={() => openCustomerCenter('/support')}
              className="flex h-12 w-full items-center justify-center rounded-full border border-zinc-200 font-manrope text-[14px] font-medium text-[#18181b]"
            >
              Manage subscription
            </button>
          ) : null}

          <button
            type="button"
            onClick={onSignOut}
            className="flex h-12 w-full items-center justify-center rounded-full border border-zinc-200 font-manrope text-[14px] font-medium text-[#71717a] hover:text-[#18181b]"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="rounded-[18px] border border-zinc-200 bg-white p-4">
        <h3 className="mb-2 font-manrope text-[13px] font-semibold text-[#18181b]">
          On mobile only
        </h3>
        <ul className="space-y-1.5 font-manrope text-[13px] text-[#71717a]">
          <li>• Food scanner & nutrition tools</li>
          <li>• Timed Hub workouts</li>
          <li>• Push reminders & widgets</li>
          <li>• Tribe community posting</li>
        </ul>
      </div>

      <AppDownloadCard />

      <p className="text-center font-manrope text-[12px] text-[#a1a1aa]">
        Need help?{' '}
        <a href="mailto:support@peakheight.app" className="font-medium text-[#18181b] underline">
          Contact support
        </a>
      </p>
    </div>
  )
}
