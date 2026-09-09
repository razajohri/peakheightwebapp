import { supabase } from '@/lib/supabase/client'

export type HeightMeasurement = {
  id?: string
  user_id: string
  measurement_date: string
  height_cm: number
  measurement_type?: string | null
  notes?: string | null
}

function todayStr() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export async function fetchHeightHistory(userId: string, days = 90): Promise<HeightMeasurement[]> {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  const cutoffStr = cutoff.toISOString().slice(0, 10)

  const { data, error } = await supabase
    .from('height_measurements')
    .select('id, user_id, measurement_date, height_cm, measurement_type, notes')
    .eq('user_id', userId)
    .gte('measurement_date', cutoffStr)
    .order('measurement_date', { ascending: true })

  if (error) {
    console.error('[dashboard] fetchHeightHistory', error)
    return []
  }
  return (data as HeightMeasurement[]) || []
}

export async function logHeightMeasurement(
  userId: string,
  heightCm: number,
  opts?: { notes?: string; updateProfile?: boolean }
): Promise<{ success: boolean; error?: string }> {
  if (!Number.isFinite(heightCm) || heightCm < 100 || heightCm > 250) {
    return { success: false, error: 'Enter a height between 100 and 250 cm.' }
  }

  const { error } = await supabase.from('height_measurements').insert({
    user_id: userId,
    measurement_date: todayStr(),
    height_cm: heightCm,
    measurement_type: 'manual',
    notes: opts?.notes || 'Logged on web',
  })

  if (error) {
    return { success: false, error: error.message || 'Could not save measurement.' }
  }

  if (opts?.updateProfile !== false) {
    await supabase
      .from('users')
      .update({ current_height: heightCm, updated_at: new Date().toISOString() })
      .eq('id', userId)
  }

  return { success: true }
}

export function heightDeltaCm(history: HeightMeasurement[]) {
  if (history.length < 2) return null
  const first = history[0].height_cm
  const last = history[history.length - 1].height_cm
  if (!Number.isFinite(first) || !Number.isFinite(last)) return null
  return Math.round((last - first) * 10) / 10
}
