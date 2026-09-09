'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  looksLikeGeneratedId,
  type DashboardProfile,
} from '@/lib/dashboard/data'
import { updateUserProfile } from '@/lib/dashboard/profile'
import { isRevenueCatConfigured, openCustomerCenter } from '@/lib/services/revenuecat'
import { AppDownloadCard } from './AppDownloadCard'

const WORKOUT_OPTIONS = [
  { value: 'never', label: 'Never' },
  { value: 'rarely', label: 'Rarely' },
  { value: 'sometimes', label: 'Sometimes' },
  { value: 'often', label: 'Often' },
]

export function AccountTab({
  userId,
  profile,
  email,
  isPremium,
  onSignOut,
  onProfileChange,
}: {
  userId: string
  profile: DashboardProfile | null
  email?: string | null
  isPremium: boolean
  onSignOut: () => void
  onProfileChange: (p: DashboardProfile) => void
}) {
  const [editing, setEditing] = useState(false)
  const [firstName, setFirstName] = useState(profile?.first_name || '')
  const [displayName, setDisplayName] = useState(profile?.display_name || '')
  const [sleepHours, setSleepHours] = useState(
    profile?.sleep_hours != null ? String(profile.sleep_hours) : '8'
  )
  const [workout, setWorkout] = useState(profile?.workout_frequency || 'sometimes')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const fullName =
    profile?.first_name && profile?.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : profile?.display_name && !looksLikeGeneratedId(profile.display_name)
        ? profile.display_name
        : profile?.first_name || null

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaved(false)
    setSaving(true)
    try {
      const sleep = Number(sleepHours)
      const result = await updateUserProfile(userId, {
        first_name: firstName.trim() || undefined,
        display_name: displayName.trim() || firstName.trim() || undefined,
        sleep_hours: Number.isFinite(sleep) ? sleep : null,
        workout_frequency: workout,
      })
      if (result.error || !result.profile) {
        setError(result.error || 'Could not save profile.')
        return
      }
      onProfileChange(result.profile as DashboardProfile)
      setEditing(false)
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

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
        {!editing ? (
          <>
            <div className="space-y-3 font-manrope text-[13px]">
              <div className="flex justify-between gap-3">
                <span className="text-[#71717a]">Name</span>
                <span className="font-medium text-[#18181b]">{fullName || '—'}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#71717a]">Email</span>
                <span
                  className="max-w-[220px] truncate font-medium text-[#18181b]"
                  title={email || undefined}
                >
                  {email || profile?.email || '—'}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#71717a]">Plan</span>
                <span className="font-medium text-[#18181b]">{isPremium ? 'Pro' : 'Basic'}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#71717a]">Sleep</span>
                <span className="font-medium text-[#18181b]">
                  {profile?.sleep_hours != null ? `${profile.sleep_hours} hrs` : '—'}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#71717a]">Training</span>
                <span className="font-medium capitalize text-[#18181b]">
                  {profile?.workout_frequency || '—'}
                </span>
              </div>
            </div>
            {saved ? (
              <p className="mt-3 font-manrope text-[12px] text-[#18181b]">Profile updated.</p>
            ) : null}
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="mt-5 flex h-12 w-full items-center justify-center rounded-full border border-zinc-200 font-manrope text-[14px] font-medium text-[#18181b]"
            >
              Edit profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="mb-1 block font-manrope text-[12px] text-[#a1a1aa]">First name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-11 w-full rounded-xl border border-zinc-200 px-3 font-manrope text-[14px] outline-none focus:border-[#18181b]"
              />
            </div>
            <div>
              <label className="mb-1 block font-manrope text-[12px] text-[#a1a1aa]">Display name</label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="h-11 w-full rounded-xl border border-zinc-200 px-3 font-manrope text-[14px] outline-none focus:border-[#18181b]"
              />
            </div>
            <div>
              <label className="mb-1 block font-manrope text-[12px] text-[#a1a1aa]">Sleep hours</label>
              <input
                type="number"
                min={4}
                max={12}
                step={0.5}
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                className="h-11 w-full rounded-xl border border-zinc-200 px-3 font-manrope text-[14px] outline-none focus:border-[#18181b]"
              />
            </div>
            <div>
              <label className="mb-1 block font-manrope text-[12px] text-[#a1a1aa]">Training</label>
              <select
                value={workout}
                onChange={(e) => setWorkout(e.target.value)}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 font-manrope text-[14px] outline-none focus:border-[#18181b]"
              >
                {WORKOUT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            {error ? <p className="font-manrope text-[12px] text-red-600">{error}</p> : null}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="h-11 flex-1 rounded-full border border-zinc-200 font-manrope text-[13px] font-medium text-[#71717a]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="h-11 flex-1 rounded-full bg-[#18181b] font-manrope text-[13px] font-semibold text-white disabled:opacity-45"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-3 space-y-2.5">
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
        <h3 className="mb-2 font-manrope text-[13px] font-semibold text-[#18181b]">On mobile only</h3>
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
