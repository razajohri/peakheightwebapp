// Onboarding-specific design constants
// These are separate from main app constants to maintain the black/white onboarding theme

export const ONBOARDING_TYPOGRAPHY = {
  // Page Titles
  PAGE_TITLE: {
    fontSize: '32px',
    fontFamily: 'var(--font-inter)',
    fontWeight: 'bold',
    lineHeight: '40px',
    letterSpacing: '-0.5px',
    color: '#FFFFFF',
  },
  // Subtitles
  SUBTITLE: {
    fontSize: '16px',
    fontFamily: 'var(--font-inter)',
    lineHeight: '24px',
    color: '#9CA3AF',
  },
  // Body Text
  BODY: {
    fontSize: '16px',
    fontFamily: 'var(--font-inter)',
    lineHeight: '24px',
    color: '#FFFFFF',
  },
  // Option Text
  OPTION_TEXT: {
    fontSize: '18px',
    fontFamily: 'var(--font-inter)',
    lineHeight: '24px',
    color: '#FFFFFF',
  },
  // Button Text
  BUTTON_TEXT: {
    fontSize: '17px',
    fontFamily: 'var(--font-inter)',
    color: '#000000',
    fontWeight: '600',
  },
  // Progress Text
  PROGRESS_TEXT: {
    fontSize: '14px',
    fontFamily: 'var(--font-inter)',
    color: '#9CA3AF',
  },
} as const;

export const ONBOARDING_COLORS = {
  BACKGROUND: '#000000',
  SURFACE: '#0a0a0a',
  SURFACE_ELEVATED: '#1f1f1f',
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#9CA3AF',
  BORDER: '#1f1f1f',
  BORDER_SELECTED: '#FFFFFF',
  BUTTON_BACKGROUND: '#FFFFFF',
  BUTTON_DISABLED: 'rgba(255, 255, 255, 0.5)',
  PROGRESS_BAR: '#1f1f1f',
  PROGRESS_FILL: '#FFFFFF',
} as const;

export const ONBOARDING_SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
  // Common patterns
  PAGE_HORIZONTAL: 24,
  PAGE_VERTICAL: 16,
  SECTION_GAP: 32,
  CARD_PADDING: 18,
  BUTTON_PADDING_VERTICAL: 16,
  BUTTON_PADDING_HORIZONTAL: 24,
} as const;

export const ONBOARDING_BORDER_RADIUS = {
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 24,
  BUTTON: 12,
  CARD: 12,
  BACK_BUTTON: 20,
} as const;

export const ONBOARDING_TOTAL_STEPS = 19; // Total number of onboarding pages

export const ONBOARDING_ANIMATIONS = {
  PAGE_TRANSITION: 300,
  CONTENT_FADE: 600,
  BUTTON_PRESS: 100,
  PROGRESS_BAR: 500,
} as const;
