/**
 * Presets for Hyperspeed effect (effectOptions).
 * Use with: <Hyperspeed effectOptions={hyperspeedPresets.six} />
 */

export interface HyperspeedEffectOptions {
  lineColor?: string
  backgroundColor?: string
  speed?: number
  lineCount?: number
}

export const hyperspeedPresets: Record<string, HyperspeedEffectOptions> = {
  one: {
    lineColor: 'rgba(255,255,255,0.35)',
    backgroundColor: '#000000',
    speed: 0.8,
    lineCount: 60,
  },
  two: {
    lineColor: 'rgba(200,220,255,0.4)',
    backgroundColor: '#050510',
    speed: 1,
    lineCount: 70,
  },
  three: {
    lineColor: 'rgba(255,180,100,0.4)',
    backgroundColor: '#0a0805',
    speed: 1.2,
    lineCount: 90,
  },
  four: {
    lineColor: 'rgba(100,255,200,0.35)',
    backgroundColor: '#030a08',
    speed: 1.1,
    lineCount: 85,
  },
  five: {
    lineColor: 'rgba(255,100,180,0.4)',
    backgroundColor: '#0a0508',
    speed: 0.9,
    lineCount: 75,
  },
  /** "Neon Waves" style – used for onboarding intro */
  six: {
    lineColor: 'rgba(0,255,198,0.5)',
    backgroundColor: '#000000',
    speed: 1.4,
    lineCount: 100,
  },
}
