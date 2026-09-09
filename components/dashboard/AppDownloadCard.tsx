'use client'

import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/dashboard/links'

export function AppDownloadCard({
  title = 'Get the full PeakHeight experience',
  body = 'Workouts, food scanner, reminders, Tribe, and your complete daily plan live in the mobile app.',
}: {
  title?: string
  body?: string
}) {
  return (
    <div className="rounded-[22px] border border-[#d7e4f4] bg-[#eef4fb] p-5">
      <h3 className="mb-1 font-manrope text-[15px] font-semibold text-[#18181b]">{title}</h3>
      <p className="mb-4 font-manrope text-[13px] leading-relaxed text-[#71717a]">{body}</p>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#18181b] font-manrope text-[13px] font-semibold text-white"
        >
          App Store
        </a>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center rounded-full border border-zinc-300 bg-white font-manrope text-[13px] font-semibold text-[#18181b]"
        >
          Google Play
        </a>
      </div>
    </div>
  )
}
