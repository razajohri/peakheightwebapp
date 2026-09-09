'use client'

import { WEB_TODAY_FOCUS } from '@/lib/dashboard/content'
import type { DashboardProgress } from '@/lib/dashboard/data'
import { AppDownloadCard } from './AppDownloadCard'

export function TodayTab({ progress }: { progress: DashboardProgress | null }) {
  const day = progress?.current_day ?? 1
  const streak = progress?.current_streak ?? 0

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1 font-manrope text-[12px] font-medium tracking-[0.08em] text-[#a1a1aa]">
          TODAY
        </p>
        <h2 className="font-playfair text-[30px] font-normal tracking-[-0.02em] text-[#18181b]">
          Day {day} focus
        </h2>
        <p className="mt-1 font-manrope text-[14px] text-[#71717a]">
          {streak > 0
            ? `${streak}-day streak — keep the chain going in the app.`
            : 'A light web preview of today’s priorities. Complete tasks in the app.'}
        </p>
      </div>

      <div className="space-y-2.5">
        {WEB_TODAY_FOCUS.map((item, index) => (
          <div
            key={item.id}
            className="flex items-start gap-3 rounded-[18px] border border-zinc-200 bg-white px-4 py-3.5"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f4f7fc] font-manrope text-[12px] font-semibold text-[#18181b]">
              {index + 1}
            </span>
            <div>
              <p className="font-manrope text-[14px] font-semibold text-[#18181b]">{item.title}</p>
              <p className="mt-0.5 font-manrope text-[13px] text-[#71717a]">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <AppDownloadCard
        title="Complete today’s full checklist in the app"
        body="Timed routines, task check-offs, reminders, and streak protection are mobile-only for now."
      />
    </div>
  )
}
