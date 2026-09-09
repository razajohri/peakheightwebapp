// Onboarding FaceIQ Labs light theme (matches landing + mobile app)

export const ONBOARDING_TYPOGRAPHY = {
  PAGE_TITLE: {
    fontSize: '32px',
    fontFamily: 'var(--font-playfair)',
    fontWeight: '400',
    lineHeight: '40px',
    letterSpacing: '-0.5px',
    color: '#18181b',
  },
  SUBTITLE: {
    fontSize: '16px',
    fontFamily: 'var(--font-manrope)',
    lineHeight: '24px',
    color: '#a1a1aa',
  },
  BODY: {
    fontSize: '16px',
    fontFamily: 'var(--font-manrope)',
    lineHeight: '24px',
    color: '#18181b',
  },
  OPTION_TEXT: {
    fontSize: '18px',
    fontFamily: 'var(--font-manrope)',
    lineHeight: '24px',
    color: '#18181b',
  },
  BUTTON_TEXT: {
    fontSize: '17px',
    fontFamily: 'var(--font-manrope)',
    color: '#FFFFFF',
    fontWeight: '600',
  },
  PROGRESS_TEXT: {
    fontSize: '14px',
    fontFamily: 'var(--font-manrope)',
    color: '#a1a1aa',
  },
} as const

export const ONBOARDING_COLORS = {
  BACKGROUND: '#ffffff',
  SURFACE: '#f4f7fc',
  SURFACE_ELEVATED: '#edf3fb',
  SURFACE_DEEP: '#e4ecf7',
  TEXT_PRIMARY: '#18181b',
  TEXT_SECONDARY: '#a1a1aa',
  TEXT_GREY: '#7c7c7c',
  BORDER: '#e5e7eb',
  BORDER_SELECTED: '#18181b',
  BUTTON_BACKGROUND: '#18181b',
  BUTTON_DISABLED: 'rgba(24, 24, 27, 0.45)',
  PROGRESS_BAR: '#e5e7eb',
  PROGRESS_FILL: '#18181b',
  WASH: 'linear-gradient(180deg, #f4f7fc 0%, #edf3fb 32%, #e4ecf7 58%, #dde7f4 100%)',
} as const

export const ONBOARDING_SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
  PAGE_HORIZONTAL: 24,
  PAGE_VERTICAL: 16,
  SECTION_GAP: 32,
  CARD_PADDING: 18,
  BUTTON_PADDING_VERTICAL: 16,
  BUTTON_PADDING_HORIZONTAL: 24,
} as const

export const ONBOARDING_BORDER_RADIUS = {
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 24,
  BUTTON: 9999,
  CARD: 16,
  BACK_BUTTON: 9999,
} as const

export const ONBOARDING_TOTAL_STEPS = 22

export const ONBOARDING_ANIMATIONS = {
  PAGE_TRANSITION: 300,
  CONTENT_FADE: 600,
  BUTTON_PRESS: 100,
  PROGRESS_BAR: 500,
} as const

/** Shared Tailwind class snippets for FaceIQ onboarding screens */
export const ONBOARDING_UI = {
  page: 'min-h-screen min-h-dvh relative overflow-hidden bg-[#f4f7fc]',
  title: 'text-[#18181b] font-playfair font-normal text-[28px] sm:text-[32px] tracking-tight',
  subtitle: 'text-[#a1a1aa] text-base',
  optionSelected: 'border-[#18181b] bg-[#18181b]',
  optionIdle: 'border-zinc-200 bg-white hover:border-zinc-300',
  optionLabelSelected: 'text-white',
  optionLabelIdle: 'text-[#18181b]',
} as const
