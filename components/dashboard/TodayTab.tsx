'use client'

import { useState } from 'react'
import type { DailyTaskBundle } from '@/lib/dashboard/dailyTasks'
import { completeDailyTask } from '@/lib/dashboard/dailyTasks'
import type { DashboardProgress } from '@/lib/dashboard/data'
import { AppDownloadCard } from './AppDownloadCard'

export function TodayTab({
  userId,
  progress,
  bundle,
  onBundleChange,
  onProgressChange,
}: {
  userId: string
  progress: DashboardProgress | null
  bundle: DailyTaskBundle | null
  onBundleChange: (b: DailyTaskBundle) => void
  onProgressChange: (p: DashboardProgress) => void
}) {
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const day = bundle?.dayNumber ?? progress?.current_day ?? 1
  const streak = progress?.current_streak ?? 0
  const completed = new Set((bundle?.completedTasks || []).map(String))
  const pct = bundle?.completionPercentage ?? 0

  const handleComplete = async (taskId: string | number) => {
    if (completed.has(String(taskId)) || pendingId) return
    setError('')
    setPendingId(String(taskId))
    try {
      const result = await completeDailyTask(userId, day, taskId)
      if (result.error || !result.bundle) {
        setError(result.error || 'Could not update task.')
        return
      }
      onBundleChange(result.bundle)
      if (result.progress) {
        onProgressChange({
          current_day: result.progress.current_day,
          current_streak: result.progress.current_streak,
          longest_streak: result.progress.longest_streak,
        })
      }
    } finally {
      setPendingId(null)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1 font-manrope text-[12px] font-medium tracking-[0.08em] text-[#a1a1aa]">
          TODAY
        </p>
        <h2 className="font-playfair text-[30px] font-normal tracking-[-0.02em] text-[#18181b]">
          Day {day}
        </h2>
        <p className="mt-1 font-manrope text-[14px] text-[#71717a]">
          {streak > 0 ? `${streak}-day streak · ` : ''}
          {pct}% complete
          {bundle?.source === 'web_default' ? ' · web starter plan' : ''}
        </p>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-[#18181b] transition-all duration-300"
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>

      {error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 font-manrope text-[13px] text-red-600">{error}</p>
      ) : null}

      {!bundle ? (
        <p className="font-manrope text-[14px] text-[#71717a]">Loading your tasks…</p>
      ) : (
        <div className="space-y-2.5">
          {bundle.tasks.map((task) => {
            const done = completed.has(String(task.id))
            const busy = pendingId === String(task.id)
            return (
              <button
                key={String(task.id)}
                type="button"
                disabled={done || !!pendingId}
                onClick={() => handleComplete(task.id)}
                className={`flex w-full items-start gap-3 rounded-[18px] border px-4 py-3.5 text-left transition-colors ${
                  done
                    ? 'border-zinc-100 bg-zinc-50'
                    : 'border-zinc-200 bg-white hover:border-zinc-300'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    done ? 'border-[#18181b] bg-[#18181b] text-white' : 'border-zinc-300 bg-white'
                  }`}
                >
                  {busy ? (
                    <span className="h-3 w-3 animate-spin rounded-full border border-zinc-300 border-t-[#18181b]" />
                  ) : done ? (
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : null}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`font-manrope text-[14px] font-semibold ${
                      done ? 'text-[#a1a1aa] line-through' : 'text-[#18181b]'
                    }`}
                  >
                    {task.emoji ? `${task.emoji} ` : ''}
                    {task.title}
                  </p>
                  {task.description ? (
                    <p className="mt-0.5 font-manrope text-[13px] text-[#71717a]">{task.description}</p>
                  ) : null}
                  {task.estimated_time ? (
                    <p className="mt-1 font-manrope text-[11px] text-[#a1a1aa]">{task.estimated_time}</p>
                  ) : null}
                </div>
              </button>
            )
          })}
        </div>
      )}

      <AppDownloadCard
        title="Hub workouts & reminders are in the app"
        body="Check off tasks here. Timed routines, push reminders, and advanced day unlock logic stay mobile-first."
      />
    </div>
  )
}
