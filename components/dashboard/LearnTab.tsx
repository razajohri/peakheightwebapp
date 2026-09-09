'use client'

import { useState } from 'react'
import { WEB_LEARN_CARDS } from '@/lib/dashboard/content'
import { AppDownloadCard } from './AppDownloadCard'

export function LearnTab() {
  const [openId, setOpenId] = useState<string | null>(WEB_LEARN_CARDS[0]?.id ?? null)

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1 font-manrope text-[12px] font-medium tracking-[0.08em] text-[#a1a1aa]">
          LEARN
        </p>
        <h2 className="font-playfair text-[30px] font-normal tracking-[-0.02em] text-[#18181b]">
          Growth insights
        </h2>
        <p className="mt-1 font-manrope text-[14px] text-[#71717a]">
          Web-friendly lessons. Videos, extras, and deeper playbooks are in the app.
        </p>
      </div>

      <div className="space-y-2.5">
        {WEB_LEARN_CARDS.map((card) => {
          const open = openId === card.id
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setOpenId(open ? null : card.id)}
              className="w-full rounded-[18px] border border-zinc-200 bg-white px-4 py-3.5 text-left transition-colors hover:border-zinc-300"
            >
              <div className="mb-1 flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#f4f7fc] px-2 py-0.5 font-manrope text-[10px] font-bold tracking-[0.06em] text-[#52525b]">
                  {card.tag.toUpperCase()}
                </span>
                <span className="font-manrope text-[12px] text-[#a1a1aa]">{open ? 'Hide' : 'Read'}</span>
              </div>
              <p className="font-manrope text-[14px] font-semibold text-[#18181b]">{card.title}</p>
              {open ? (
                <p className="mt-2 font-manrope text-[13px] leading-relaxed text-[#71717a]">
                  {card.summary}
                </p>
              ) : null}
            </button>
          )
        })}
      </div>

      <AppDownloadCard
        title="More lessons & guided extras"
        body="Browse the full Learn library, videos, and personalized extras inside PeakHeight on your phone."
      />
    </div>
  )
}
