import { supabase } from '@/lib/supabase/client'
import type { OnboardingData } from '@/lib/onboarding/types'

export type { OnboardingData } from '@/lib/onboarding/types'

/**
 * Save onboarding data to Supabase users table
 * Maps web onboarding fields to database columns (matching mobile schema)
 */
export async function saveOnboardingData(userId: string, data: OnboardingData): Promise<{ success: boolean; error?: string }> {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Onboarding] Saving to Supabase...', { userId, fields: Object.keys(data) })
  }
  try {
    // Map onboarding data to database columns
    const dbData: Record<string, any> = {
      updated_at: new Date().toISOString(),
      onboarding_completed: true,
    }

    // Gender
    if (data.gender) {
      dbData.gender = data.gender.toLowerCase()
    }

    // Date of birth (web: dateOfBirth ISO; mobile/legacy: age -> approximate)
    if (data.dateOfBirth) {
      dbData.date_of_birth = data.dateOfBirth.split('T')[0]
    } else if (data.age) {
      const birthYear = new Date().getFullYear() - data.age
      dbData.date_of_birth = `${birthYear}-01-01`
    }

    // Heights (in cm) — same fields as mobile
    if (data.currentHeight != null) {
      dbData.current_height = data.currentHeight
    }
    if (data.targetHeight != null) {
      dbData.target_height = data.targetHeight
    }
    if (data.dreamHeight != null) {
      dbData.target_height = data.dreamHeight
    }

    // Weight (same as mobile)
    if (data.currentWeight != null) {
      dbData.current_weight = data.currentWeight
    }

    // Parent heights (web: parentHeightFather/Mother in cm; mobile may use parentHeight.father/mother)
    if (data.parentHeightFather != null) dbData.parent_height_father = data.parentHeightFather
    if (data.parentHeightMother != null) dbData.parent_height_mother = data.parentHeightMother
    if (data.parentHeight?.father != null) dbData.parent_height_father = data.parentHeight.father
    if (data.parentHeight?.mother != null) dbData.parent_height_mother = data.parentHeight.mother
    if (data.fatherCm != null) dbData.father_cm = data.fatherCm
    if (data.motherCm != null) dbData.mother_cm = data.motherCm
    if (data.fatherFeet != null) dbData.father_feet = data.fatherFeet
    if (data.fatherInches != null) dbData.father_inches = data.fatherInches
    if (data.motherFeet != null) dbData.mother_feet = data.motherFeet
    if (data.motherInches != null) dbData.mother_inches = data.motherInches
    if (data.parentMeasurementSystem) dbData.parent_measurement_system = data.parentMeasurementSystem

    // Motivation
    if (data.motivation) {
      dbData.motivation = data.motivation
    }

    // Barriers (array)
    if (data.barriers && Array.isArray(data.barriers)) {
      dbData.barriers = data.barriers
    }

    // Ethnicity
    if (data.ethnicity) {
      dbData.ethnicity = data.ethnicity
    }

    // Foot size
    if (data.footSize) {
      dbData.foot_size = data.footSize
    }
    if (data.footSizeSystem) {
      dbData.foot_size_system = data.footSizeSystem
    }

    // Workout frequency mapping
    if (data.workoutFrequency) {
      const freqMap: Record<string, string> = {
        '0-2': 'rarely',
        '3-4': 'sometimes',
        '5-7': 'often',
        'never': 'never',
        'rarely': 'rarely',
        'sometimes': 'sometimes',
        'often': 'often',
        'daily': 'daily'
      }
      dbData.workout_frequency = freqMap[data.workoutFrequency] || data.workoutFrequency
    }

    // Sleep hours
    if (data.sleepHours) {
      dbData.sleep_hours = data.sleepHours
    }

    // Smoking/drinking status
    if (typeof data.smokingStatus === 'boolean') {
      dbData.smoking_status = data.smokingStatus
    }
    if (typeof data.drinkingStatus === 'boolean') {
      dbData.drinking_status = data.drinkingStatus
    }

    // Tried options (array)
    if (data.triedOptions && Array.isArray(data.triedOptions)) {
      dbData.tried_options = data.triedOptions
    }

    // Stopping goals (array)
    if (data.stoppingGoals && Array.isArray(data.stoppingGoals)) {
      dbData.stopping_goals = data.stoppingGoals
    }

    // User name
    if (data.userName) {
      dbData.display_name = data.userName
      const nameParts = data.userName.split(' ')
      if (nameParts.length > 0) {
        dbData.first_name = nameParts[0]
        if (nameParts.length > 1) {
          dbData.last_name = nameParts.slice(1).join(' ')
        }
      }
    }

    // Update user profile
    const { error } = await supabase
      .from('users')
      .update(dbData)
      .eq('id', userId)

    if (error) {
      console.error('[Onboarding] Supabase update users failed:', error)
      return { success: false, error: error.message }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Onboarding] public.users updated OK')
    }

    // Create user_progress entry if it doesn't exist
    await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        current_day: 1,
        current_streak: 0,
        longest_streak: 0,
        total_streak: 0,
        plan_start_date: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })

    // Create user_preferences entry if it doesn't exist
    await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        notification_habits: true,
        notification_community: true,
        notification_ai_tips: true,
        units: 'metric',
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })

    // Record join event
    await supabase
      .from('user_join_events')
      .upsert({
        user_id: userId,
        joined_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })

    if (process.env.NODE_ENV === 'development') {
      console.log('[Onboarding] All data saved to Supabase: users, user_progress, user_preferences, user_join_events')
    }
    return { success: true }
  } catch (error) {
    console.error('[Onboarding] Error saving onboarding data:', error)
    return { success: false, error: 'Failed to save data' }
  }
}

/**
 * Check if user has completed onboarding
 */
export async function hasCompletedOnboarding(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('onboarding_completed')
      .eq('id', userId)
      .single()

    if (error || !data) {
      return false
    }

    return data.onboarding_completed === true
  } catch {
    return false
  }
}

/**
 * Check if user has active subscription
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('premium_status, premium_expires_at')
      .eq('id', userId)
      .single()

    if (error || !data) {
      return false
    }

    // Check if premium and not expired
    if (!data.premium_status) {
      return false
    }

    if (data.premium_expires_at) {
      return new Date(data.premium_expires_at) > new Date()
    }

    return data.premium_status
  } catch {
    return false
  }
}

/**
 * Get user profile data
 */
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error getting user profile:', error)
    return null
  }
}
