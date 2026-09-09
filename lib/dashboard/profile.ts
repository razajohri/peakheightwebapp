import { supabase } from '@/lib/supabase/client'

export type ProfileUpdates = {
  display_name?: string
  first_name?: string
  last_name?: string
  sleep_hours?: number | null
  workout_frequency?: string | null
}

export async function updateUserProfile(userId: string, updates: ProfileUpdates) {
  const payload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (updates.display_name != null) payload.display_name = updates.display_name.trim()
  if (updates.first_name != null) payload.first_name = updates.first_name.trim()
  if (updates.last_name != null) payload.last_name = updates.last_name.trim()
  if (updates.sleep_hours !== undefined) payload.sleep_hours = updates.sleep_hours
  if (updates.workout_frequency !== undefined) {
    payload.workout_frequency = updates.workout_frequency
  }

  const { data, error } = await supabase
    .from('users')
    .update(payload)
    .eq('id', userId)
    .select(
      'id, email, display_name, first_name, last_name, current_height, target_height, current_weight, gender, sleep_hours, workout_frequency, premium_status, premium_expires_at, onboarding_completed'
    )
    .maybeSingle()

  if (error) {
    return { profile: null, error: error.message }
  }
  return { profile: data, error: null }
}
