'use client'

import { useMemo, useState } from 'react'
import {
  cmRemaining,
  formatHeightCm,
  type DashboardProfile,
  type DashboardProgress,
} from '@/lib/dashboard/data'
import {
  fetchHeightHistory,
  heightDeltaCm,
  logHeightMeasurement,
  type HeightMeasurement,
} from '@/lib/dashboard/height'
import { AppDownloadCard } from './AppDownloadCard'

function cmToFeetInchesLabel(cm: number) {
  return formatHeightCm(cm)
}

export function MeTab({
  userId,
  name,
  profile,
  progress,
  isPremium,
  history,
  onProfileHeight,
  onHistoryChange,
}: {
  userId: string
  name: string
  profile: DashboardProfile | null
  progress: DashboardProgress | null
  isPremium: boolean
  history: HeightMeasurement[]
  onProfileHeight: (cm: number) => void
  onHistoryChange: (rows: HeightMeasurement[]) => void
}) {
  const [heightInput, setHeightInput] = useState(
    profile?.current_height != null ? String(profile.current_height) : ''
  )
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const now = formatHeightCm(profile?.current_height)
  const goal = formatHeightCm(profile?.target_height)
  const remaining = cmRemaining(profile?.current_height, profile?.target_height)
  const day = progress?.current_day ?? 1
  const streak = progress?.current_streak ?? 0
  const delta = useMemo(() => heightDeltaCm(history), [history])

  const chartPoints = useMemo(() => {
    if (history.length < 2) return null
    const values = history.map((h) => h.height_cm)
    const min = Math.min(...values)
    const max = Math.max(...values)
    const span = Math.max(0.5, max - min)
    const w = 280
    const h = 72
    const pts = history.map((row, i) => {
      const x = (i / (history.length - 1)) * w
      const y = h - ((row.height_cm - min) / span) * (h - 8) - 4
      return `${x},${y}`
    })
    return { w, h, points: pts.join(' ') }
  }, [history])

  const handleLog = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    const cm = Number(heightInput)
    setSaving(true)
    try {
      const result = await logHeightMeasurement(userId, cm)
      if (!result.success) {
        setError(result.error || 'Could not save.')
        return
      }
      onProfileHeight(cm)
      const next = await fetchHeightHistory(userId)
      onHistoryChange(next)
      setMessage(`Saved ${cmToFeetInchesLabel(cm)}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1 font-manrope text-[12px] font-medium tracking-[0.08em] text-[#a1a1aa]">
          ME
        </p>
        <h2 className="font-playfair text-[30px] font-normal tracking-[-0.02em] text-[#18181b]">
          {name === 'there' ? 'Your growth hub' : `Hey, ${name}`}
        </h2>
        <p className="mt-1 font-manrope text-[14px] text-[#71717a]">
          Log height, track progress, and keep your plan moving on the web.
        </p>
      </div>

      <div className="rounded-[22px] border border-zinc-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-manrope text-[13px] font-semibold tracking-[0.04em] text-[#a1a1aa]">
            HEIGHT
          </h3>
          {isPremium ? (
            <span className="rounded-full bg-[#18181b] px-2.5 py-1 font-manrope text-[10px] font-bold tracking-[0.06em] text-white">
              PRO
            </span>
          ) : null}
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-manrope text-[11px] text-[#a1a1aa]">Now</p>
            <p className="font-playfair text-[36px] leading-none text-[#18181b]">{now}</p>
          </div>
          <div className="pb-2 font-manrope text-[18px] text-[#a1a1aa]">→</div>
          <div className="text-right">
            <p className="font-manrope text-[11px] text-[#a1a1aa]">Goal</p>
            <p className="font-playfair text-[36px] leading-none text-[#18181b]">{goal}</p>
          </div>
        </div>
        {remaining != null && remaining > 0 ? (
          <p className="mt-4 font-manrope text-[13px] text-[#71717a]">
            About <span className="font-semibold text-[#18181b]">{remaining} cm</span> to your goal
          </p>
        ) : null}
        {delta != null ? (
          <p className="mt-1 font-manrope text-[13px] text-[#71717a]">
            Logged change:{' '}
            <span className="font-semibold text-[#18181b]">
              {delta > 0 ? '+' : ''}
              {delta} cm
            </span>
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[18px] border border-zinc-200 bg-white p-4">
          <p className="font-manrope text-[11px] text-[#a1a1aa]">Plan day</p>
          <p className="mt-1 font-playfair text-[28px] text-[#18181b]">{day}</p>
        </div>
        <div className="rounded-[18px] border border-zinc-200 bg-white p-4">
          <p className="font-manrope text-[11px] text-[#a1a1aa]">Streak</p>
          <p className="mt-1 font-playfair text-[28px] text-[#18181b]">{streak}</p>
        </div>
      </div>

      <div className="rounded-[18px] border border-zinc-200 bg-white p-4">
        <h3 className="mb-3 font-manrope text-[13px] font-semibold tracking-[0.04em] text-[#a1a1aa]">
          LOG HEIGHT
        </h3>
        <form onSubmit={handleLog} className="flex gap-2">
          <input
            type="number"
            step="0.1"
            min={100}
            max={250}
            value={heightInput}
            onChange={(e) => setHeightInput(e.target.value)}
            placeholder="cm"
            className="h-11 flex-1 rounded-full border border-zinc-200 bg-white px-4 font-manrope text-[14px] text-[#18181b] outline-none focus:border-[#18181b]"
          />
          <button
            type="submit"
            disabled={saving || !heightInput}
            className="h-11 rounded-full bg-[#18181b] px-5 font-manrope text-[13px] font-semibold text-white disabled:opacity-45"
          >
            {saving ? '…' : 'Save'}
          </button>
        </form>
        {error ? <p className="mt-2 font-manrope text-[12px] text-red-600">{error}</p> : null}
        {message ? <p className="mt-2 font-manrope text-[12px] text-[#18181b]">{message}</p> : null}
      </div>

      {chartPoints ? (
        <div className="rounded-[18px] border border-zinc-200 bg-white p-4">
          <h3 className="mb-3 font-manrope text-[13px] font-semibold tracking-[0.04em] text-[#a1a1aa]">
            TREND
          </h3>
          <svg viewBox={`0 0 ${chartPoints.w} ${chartPoints.h}`} className="h-20 w-full">
            <polyline
              fill="none"
              stroke="#18181b"
              strokeWidth="2"
              points={chartPoints.points}
            />
          </svg>
          <div className="mt-2 max-h-28 space-y-1 overflow-y-auto">
            {[...history].reverse().slice(0, 6).map((row) => (
              <div
                key={row.id || `${row.measurement_date}-${row.height_cm}`}
                className="flex justify-between font-manrope text-[12px] text-[#71717a]"
              >
                <span>{row.measurement_date}</span>
                <span className="font-medium text-[#18181b]">{formatHeightCm(row.height_cm)}</span>
              </div>
            ))}
          </div>
        </div>
      ) : history.length === 1 ? (
        <p className="font-manrope text-[13px] text-[#71717a]">
          Log another reading to see your trend.
        </p>
      ) : null}

      <div className="rounded-[18px] border border-zinc-200 bg-white p-4">
        <h3 className="mb-3 font-manrope text-[13px] font-semibold tracking-[0.04em] text-[#a1a1aa]">
          QUICK FACTORS
        </h3>
        <ul className="space-y-2.5 font-manrope text-[13px] text-[#18181b]">
          <li className="flex justify-between gap-3">
            <span className="text-[#71717a]">Training</span>
            <span className="font-medium capitalize">{profile?.workout_frequency || 'Not set'}</span>
          </li>
          <li className="flex justify-between gap-3">
            <span className="text-[#71717a]">Sleep target</span>
            <span className="font-medium">
              {profile?.sleep_hours != null ? `${profile.sleep_hours} hrs` : 'Not set'}
            </span>
          </li>
          <li className="flex justify-between gap-3">
            <span className="text-[#71717a]">Weight</span>
            <span className="font-medium">
              {profile?.current_weight != null ? `${profile.current_weight} kg` : 'Not set'}
            </span>
          </li>
        </ul>
      </div>

      <AppDownloadCard
        title="AI coach & deeper analytics"
        body="Use the mobile app for AI coaching, detailed growth factors, and Hub training."
      />
    </div>
  )
}
