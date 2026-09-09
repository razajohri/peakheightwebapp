import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'

export type DashboardProfile = {
  id: string
  email?: string | null
  display_name?: string | null
  first_name?: string | null
  last_name?: string | null
  current_height?: number | null
  target_height?: number | null
  current_weight?: number | null
  gender?: string | null
  sleep_hours?: number | null
  workout_frequency?: string | null
  premium_status?: boolean | null
  premium_expires_at?: string | null
  onboarding_completed?: boolean | null
}

export type DashboardProgress = {
  current_day?: number | null
  current_streak?: number | null
  longest_streak?: number | null
}

export function looksLikeGeneratedId(value: string) {
  const v = value.trim()
  if (!v) return true
  if (/^[a-z][-_]?\d{3,}$/i.test(v)) return true
  if (/^user[-_]?\d+$/i.test(v)) return true
  if (/^\d{4,}$/.test(v)) return true
  return false
}

export function getFriendlyName(profile: DashboardProfile | null, user: User | null) {
  const candidates = [
    profile?.first_name,
    profile?.display_name,
    typeof user?.user_metadata?.display_name === 'string'
      ? user.user_metadata.display_name
      : undefined,
    typeof user?.user_metadata?.full_name === 'string'
      ? user.user_metadata.full_name
      : undefined,
  ]

  for (const raw of candidates) {
    if (!raw) continue
    const name = String(raw).trim()
    if (!name || looksLikeGeneratedId(name)) continue
    return name.split(/\s+/)[0]
  }

  const emailLocal = user?.email?.split('@')[0]
  if (emailLocal && !looksLikeGeneratedId(emailLocal) && emailLocal.length > 2) {
    return emailLocal
  }
  return 'there'
}

export function formatHeightCm(cm: number | null | undefined) {
  if (cm == null || !Number.isFinite(cm) || cm <= 0) return '—'
  const totalInches = cm / 2.54
  const feet = Math.floor(totalInches / 12)
  const inches = Math.round(totalInches % 12)
  return `${feet}'${inches}"`
}

export function cmRemaining(current?: number | null, target?: number | null) {
  if (current == null || target == null) return null
  const diff = target - current
  if (!Number.isFinite(diff)) return null
  return Math.max(0, Math.round(diff * 10) / 10)
}

export async function fetchDashboardData(userId: string): Promise<{
  profile: DashboardProfile | null
  progress: DashboardProgress | null
}> {
  const [profileRes, progressRes] = await Promise.all([
    supabase
      .from('users')
      .select(
        'id, email, display_name, first_name, last_name, current_height, target_height, current_weight, gender, sleep_hours, workout_frequency, premium_status, premium_expires_at, onboarding_completed'
      )
      .eq('id', userId)
      .maybeSingle(),
    supabase
      .from('user_progress')
      .select('current_day, current_streak, longest_streak')
      .eq('user_id', userId)
      .maybeSingle(),
  ])

  return {
    profile: (profileRes.data as DashboardProfile | null) ?? null,
    progress: (progressRes.data as DashboardProgress | null) ?? null,
  }
}
