/**
 * Shared onboarding data shape for web and mobile.
 * Same fields as ONBOARDING_SPEC_WEB_AND_MOBILE.md so DB save works for both.
 */

export interface OnboardingData {
  gender?: string
  age?: number
  dateOfBirth?: string
  currentHeight?: number
  currentWeight?: number
  targetHeight?: number
  dreamHeight?: number
  parentHeight?: { father?: number; mother?: number }
  parentHeightFather?: number | null
  parentHeightMother?: number | null
  fatherFeet?: number | null
  fatherInches?: number | null
  motherFeet?: number | null
  motherInches?: number | null
  fatherCm?: number | null
  motherCm?: number | null
  parentMeasurementSystem?: string
  measurementSystem?: string
  feet?: number
  inches?: number
  pounds?: number
  cm?: number
  kg?: number
  dreamFeet?: number
  dreamInches?: number
  dreamCm?: number
  motivation?: string
  barriers?: string[]
  ethnicity?: string
  footSize?: number
  footSizeSystem?: string
  workoutFrequency?: string
  sleepHours?: number
  smokingStatus?: boolean
  drinkingStatus?: boolean
  triedOptions?: string[]
  stoppingGoals?: string[]
  userName?: string
  [key: string]: any
}
