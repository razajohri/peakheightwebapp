import { supabase } from '@/lib/supabase/client'

function todayStr() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function parseJsonArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value || '[]')
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

/** Simple web starter plan when mobile has not generated the day yet. */
const WEB_DEFAULT_TASKS = [
  {
    id: 'web_mobility',
    title: 'Morning mobility',
    category: 'mobility',
    description: '5–10 minutes of neck, chest, and hang-friendly stretches.',
    estimated_time: '10 min',
  },
  {
    id: 'web_protein',
    title: 'Protein-forward meals',
    category: 'nutrition',
    description: 'Hit a solid protein target across breakfast and dinner.',
    estimated_time: 'All day',
  },
  {
    id: 'web_walk',
    title: 'Walk or light legs',
    category: 'activity',
    description: 'Keep blood flowing with a long walk or easy leg work.',
    estimated_time: '20–40 min',
  },
  {
    id: 'web_sleep',
    title: 'Protect tonight’s sleep',
    category: 'recovery',
    description: 'Wind down earlier and aim for ~8 hours.',
    estimated_time: 'Evening',
  },
  {
    id: 'web_discipline',
    title: 'Discipline check-in',
    category: 'discipline',
    description: 'Stay consistent with recovery habits that support sleep and growth.',
    estimated_time: 'All day',
  },
]

export type DailyTask = {
  id: string | number
  title: string
  category?: string
  description?: string
  estimated_time?: string
  emoji?: string
}

export type DailyTaskBundle = {
  dayNumber: number
  tasks: DailyTask[]
  completedTasks: Array<string | number>
  isCompleted: boolean
  completionPercentage: number
  source: 'mobile' | 'web_default'
}

export type UserProgressRow = {
  user_id: string
  current_day: number
  current_streak: number
  longest_streak: number
  total_streak?: number
  total_tasks_completed?: number
  plan_start_date?: string | null
  last_activity_date?: string | null
}

function stripMeta(tasks: unknown[]): DailyTask[] {
  return tasks
    .filter((t): t is Record<string, unknown> => {
      if (!t || typeof t !== 'object') return false
      if ((t as { __templateMeta?: boolean }).__templateMeta) return false
      return true
    })
    .map((t) => ({
      id: (t.id as string | number) ?? String(Math.random()),
      title: String(t.title || 'Task'),
      category: t.category ? String(t.category) : undefined,
      description: t.description ? String(t.description) : undefined,
      estimated_time: t.estimated_time ? String(t.estimated_time) : undefined,
      emoji: t.emoji ? String(t.emoji) : undefined,
    }))
}

export async function ensureUserProgress(userId: string): Promise<UserProgressRow | null> {
  const { data: existing } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()

  if (existing) return existing as UserProgressRow

  const today = todayStr()
  const insert = {
    user_id: userId,
    current_day: 1,
    current_streak: 0,
    longest_streak: 0,
    total_streak: 0,
    total_tasks_completed: 0,
    plan_start_date: today,
    last_activity_date: null,
    streak_freeze_available: true,
    previous_streak: 0,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('user_progress')
    .upsert(insert, { onConflict: 'user_id' })
    .select('*')
    .maybeSingle()

  if (error) {
    console.error('[dashboard] ensureUserProgress', error)
    return null
  }
  return (data as UserProgressRow) ?? insert
}

export async function loadTodayBundle(userId: string): Promise<{
  progress: UserProgressRow | null
  bundle: DailyTaskBundle | null
}> {
  const progress = await ensureUserProgress(userId)
  if (!progress) return { progress: null, bundle: null }

  const dayNumber = Math.max(1, Number(progress.current_day) || 1)

  let { data: row, error } = await supabase
    .from('daily_tasks')
    .select('*')
    .eq('user_id', userId)
    .eq('day_number', dayNumber)
    .maybeSingle()

  if (error) {
    console.error('[dashboard] loadTodayBundle', error)
    return { progress, bundle: null }
  }

  let source: 'mobile' | 'web_default' = 'mobile'

  if (!row) {
    const payload = {
      user_id: userId,
      day_number: dayNumber,
      date: todayStr(),
      tasks: WEB_DEFAULT_TASKS,
      completed_tasks: [],
      is_completed: false,
      completion_percentage: 0,
      updated_at: new Date().toISOString(),
    }
    const inserted = await supabase.from('daily_tasks').insert(payload).select('*').maybeSingle()
    if (inserted.error && !inserted.error.message?.includes('duplicate')) {
      // Race: row may already exist
      const again = await supabase
        .from('daily_tasks')
        .select('*')
        .eq('user_id', userId)
        .eq('day_number', dayNumber)
        .maybeSingle()
      row = again.data
    } else {
      row = inserted.data ?? payload
      source = 'web_default'
    }
  }

  if (!row) return { progress, bundle: null }

  const tasks = stripMeta(parseJsonArray(row.tasks))
  let completed = parseJsonArray(row.completed_tasks) as Array<string | number>
  completed = completed.filter((id) => tasks.some((t) => String(t.id) === String(id)))
  const done = completed.length
  const total = Math.max(1, tasks.length)
  const completionPercentage =
    typeof row.completion_percentage === 'number'
      ? row.completion_percentage
      : Math.round((done / total) * 100)

  return {
    progress,
    bundle: {
      dayNumber,
      tasks,
      completedTasks: completed,
      isCompleted: !!row.is_completed || done >= tasks.length,
      completionPercentage,
      source: source === 'web_default' || tasks.some((t) => String(t.id).startsWith('web_'))
        ? source === 'web_default' || tasks.every((t) => String(t.id).startsWith('web_'))
          ? 'web_default'
          : 'mobile'
        : 'mobile',
    },
  }
}

export async function completeDailyTask(
  userId: string,
  dayNumber: number,
  taskId: string | number
): Promise<{ bundle: DailyTaskBundle | null; progress: UserProgressRow | null; error?: string }> {
  const { data: row, error: fetchErr } = await supabase
    .from('daily_tasks')
    .select('*')
    .eq('user_id', userId)
    .eq('day_number', dayNumber)
    .maybeSingle()

  if (fetchErr || !row) {
    return { bundle: null, progress: null, error: 'Could not load today’s tasks.' }
  }

  const tasks = stripMeta(parseJsonArray(row.tasks))
  let completed = parseJsonArray(row.completed_tasks) as Array<string | number>
  if (completed.some((id) => String(id) === String(taskId))) {
    const { progress } = await loadTodayBundle(userId)
    return {
      progress,
      bundle: {
        dayNumber,
        tasks,
        completedTasks: completed,
        isCompleted: !!row.is_completed,
        completionPercentage: row.completion_percentage || 0,
        source: 'mobile',
      },
    }
  }

  completed = [...completed, taskId]
  const done = completed.length
  const total = Math.max(1, tasks.length)
  const completionPercentage = Math.round((done / total) * 100)
  const isCompleted = done >= tasks.length

  const { error: updateErr } = await supabase
    .from('daily_tasks')
    .update({
      completed_tasks: completed,
      completion_percentage: completionPercentage,
      is_completed: isCompleted,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .eq('day_number', dayNumber)

  if (updateErr) {
    return { bundle: null, progress: null, error: updateErr.message }
  }

  // Soft streak: first meaningful progress today (≥50% or day complete)
  let progress = await ensureUserProgress(userId)
  const today = todayStr()
  if (
    progress &&
    progress.last_activity_date !== today &&
    (completionPercentage >= 50 || isCompleted)
  ) {
    const nextStreak = (progress.current_streak || 0) + 1
    const longest = Math.max(progress.longest_streak || 0, nextStreak)
    await supabase
      .from('user_progress')
      .update({
        current_streak: nextStreak,
        longest_streak: longest,
        total_streak: (progress.total_streak || 0) + 1,
        last_activity_date: today,
        total_tasks_completed: (progress.total_tasks_completed || 0) + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)

    progress = {
      ...progress,
      current_streak: nextStreak,
      longest_streak: longest,
      last_activity_date: today,
    }
  }

  return {
    progress,
    bundle: {
      dayNumber,
      tasks,
      completedTasks: completed,
      isCompleted,
      completionPercentage,
      source: tasks.every((t) => String(t.id).startsWith('web_')) ? 'web_default' : 'mobile',
    },
  }
}
