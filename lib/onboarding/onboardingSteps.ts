/**
 * Single source of truth for onboarding steps and options.
 * Use the same order, questions, and options in the mobile app.
 * UI can differ; content and data keys stay in sync.
 */

export const TOTAL_ONBOARDING_STEPS = 22

export type StepType = 'intro' | 'question' | 'info' | 'auth' | 'paywall' | 'complete'

export interface OnboardingStepDef {
  step: number
  type: StepType
  title: string
  subtitle?: string
  dataKeys?: string[]
  /** For single/multi select; option id and label */
  options?: { id: string; label: string }[]
  /** For numeric/slider: min, max, step, unit */
  slider?: { min: number; max: number; step: number; unit?: string }
  /** Optional skip (e.g. parent heights) */
  canSkip?: boolean
}

export const ONBOARDING_STEPS: OnboardingStepDef[] = [
  { step: 1, type: 'intro', title: 'PeakHeight', subtitle: 'Grow taller, naturally' },
  {
    step: 2,
    type: 'question',
    title: 'Choose your Gender',
    subtitle: 'This will be used to calibrate your custom plan.',
    dataKeys: ['gender'],
    options: [
      { id: 'female', label: 'Female' },
      { id: 'male', label: 'Male' },
      { id: 'other', label: 'Other' },
    ],
  },
  {
    step: 3,
    type: 'question',
    title: 'How old are you?',
    subtitle: 'Choose your date of birth',
    dataKeys: ['dateOfBirth'],
  },
  {
    step: 4,
    type: 'question',
    title: 'What is your ethnicity?',
    subtitle: 'This helps us personalize your growth plan',
    dataKeys: ['ethnicity'],
    options: [
      { id: 'Asian', label: 'Asian' },
      { id: 'Black/African', label: 'Black/African' },
      { id: 'Caucasian/White', label: 'Caucasian/White' },
      { id: 'Hispanic/Latino', label: 'Hispanic/Latino' },
      { id: 'Mixed/Other', label: 'Mixed/Other' },
      { id: 'Prefer not to say', label: 'Prefer not to say' },
    ],
  },
  {
    step: 5,
    type: 'question',
    title: 'What is your height & weight?',
    dataKeys: ['measurementSystem', 'currentHeight', 'currentWeight', 'feet', 'inches', 'pounds', 'cm', 'kg'],
  },
  {
    step: 6,
    type: 'question',
    title: "What's your Dream Height?",
    dataKeys: ['dreamHeight', 'targetHeight', 'dreamFeet', 'dreamInches', 'dreamCm'],
  },
  {
    step: 7,
    type: 'question',
    title: 'How tall are your parents?',
    dataKeys: ['parentHeight', 'fatherFeet', 'fatherInches', 'motherFeet', 'motherInches', 'fatherCm', 'motherCm', 'parentMeasurementSystem'],
    canSkip: true,
  },
  {
    step: 8,
    type: 'info',
    title: "Height isn't just inherited, it's earned.",
    subtitle: "The right daily routine can unlock hidden growth potential.",
  },
  {
    step: 9,
    type: 'question',
    title: 'What have you tried?',
    subtitle: 'Select all that apply',
    dataKeys: ['triedOptions'],
    options: [
      { id: 'supplements', label: 'Supplements' },
      { id: 'exercises', label: 'Exercises' },
      { id: 'diet', label: 'Diet changes' },
      { id: 'posture', label: 'Posture correction' },
      { id: 'nothing', label: 'Nothing yet' },
    ],
  },
  {
    step: 10,
    type: 'question',
    title: 'What is your foot size?',
    subtitle: 'This helps us track your growth progress',
    dataKeys: ['footSize', 'footSizeSystem'],
    options: [
      { id: 'us', label: 'US' },
      { id: 'eu', label: 'EU' },
      { id: 'uk', label: 'UK' },
    ],
  },
  {
    step: 11,
    type: 'question',
    title: 'How often do you work out?',
    subtitle: 'This will be used to calibrate your custom plan.',
    dataKeys: ['workoutFrequency'],
    options: [
      { id: '0-2', label: '0-2 times a week' },
      { id: '3-4', label: '3-4 times a week' },
      { id: '5-7', label: '5-7 times a week' },
    ],
  },
  {
    step: 12,
    type: 'question',
    title: 'How many hours do you sleep?',
    subtitle: 'This helps us optimize your growth plan',
    dataKeys: ['sleepHours'],
    slider: { min: 3, max: 12, step: 0.5, unit: 'hours' },
  },
  {
    step: 13,
    type: 'info',
    title: 'Losing Height Potential Every Night?',
    subtitle: 'Sleeping 8+ hours a day boosts growth hormone production by up to 75%, directly impacting height potential and testosterone level.',
  },
  {
    step: 14,
    type: 'question',
    title: 'Do you smoke or drink alcohol?',
    dataKeys: ['smokingStatus', 'drinkingStatus'],
  },
  {
    step: 15,
    type: 'info',
    title: 'The reality of being short',
  },
  {
    step: 16,
    type: 'info',
    title: 'How tall will you actually grow?',
  },
  {
    step: 17,
    type: 'info',
    title: 'Leave a Rating',
    subtitle: 'This helps us bring you more of what you love',
  },
  {
    step: 18,
    type: 'info',
    title: "We're setting everything up for you",
  },
  {
    step: 19,
    type: 'info',
    title: 'Unlock Your Growth Potential',
    subtitle: "Based on your answers, we've created a personalized plan just for you",
  },
  { step: 20, type: 'auth', title: 'Sign up / Sign in' },
  { step: 21, type: 'paywall', title: 'Subscribe' },
  { step: 22, type: 'complete', title: "You're All Set!" },
]

/** Step index (0-based) to step number (1-based) */
export function getStepNumber(stepIndex: number): number {
  return stepIndex + 1
}

export function getStepDef(stepNumber: number): OnboardingStepDef | undefined {
  return ONBOARDING_STEPS.find((s) => s.step === stepNumber)
}

export function isQuestionStep(stepNumber: number): boolean {
  const def = getStepDef(stepNumber)
  return def?.type === 'question'
}
