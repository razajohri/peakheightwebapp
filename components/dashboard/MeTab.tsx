'use client'

import {
  cmRemaining,
  formatHeightCm,
  type DashboardProfile,
  type DashboardProgress,
} from '@/lib/dashboard/data'
import { AppDownloadCard } from './AppDownloadCard'

export function MeTab({
  name,
  profile,
  progress,
  isPremium,
}: {
  name: string
  profile: DashboardProfile | null
  progress: DashboardProgress | null
  isPremium: boolean
}) {
  const now = formatHeightCm(profile?.current_height)
  const goal = formatHeightCm(profile?.target_height)
  const remaining = cmRemaining(profile?.current_height, profile?.target_height)
  const day = progress?.current_day ?? 1
  const streak = progress?.current_streak ?? 0

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
          Track your snapshot here. Open the app for coaching, workouts, and full daily plans.
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
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[18px] border border-zinc-200 bg-white p-4">
          <p className="font-manrope text-[11px] text-[#a1a1aa]">Plan day</p>
          <p className="mt-1 font-playfair text-[28px] text-[#18181b]">{day}</p>
          <p className="font-manrope text-[12px] text-[#71717a]">of your growth plan</p>
        </div>
        <div className="rounded-[18px] border border-zinc-200 bg-white p-4">
          <p className="font-manrope text-[11px] text-[#a1a1aa]">Streak</p>
          <p className="mt-1 font-playfair text-[28px] text-[#18181b]">{streak}</p>
          <p className="font-manrope text-[12px] text-[#71717a]">days consistent</p>
        </div>
      </div>

      <div className="rounded-[18px] border border-zinc-200 bg-white p-4">
        <h3 className="mb-3 font-manrope text-[13px] font-semibold tracking-[0.04em] text-[#a1a1aa]">
          QUICK FACTORS
        </h3>
        <ul className="space-y-2.5 font-manrope text-[13px] text-[#18181b]">
          <li className="flex justify-between gap-3">
            <span className="text-[#71717a]">Training</span>
            <span className="font-medium capitalize">
              {profile?.workout_frequency || 'Not set'}
            </span>
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
        title="AI coach, workouts & food tools"
        body="The Me tab on mobile unlocks AI coaching, detailed growth factors, and your full progress experience."
      />
    </div>
  )
}
