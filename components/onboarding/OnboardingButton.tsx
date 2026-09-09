'use client'

import { motion } from 'framer-motion'

interface OnboardingButtonProps {
  title: string
  onPress: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  className?: string
  showArrow?: boolean
}

/**
 * FaceIQ-matched primary CTA:
 * - solid zinc-900 pill
 * - Manrope medium 16px
 * - 52px height, px-8, gap-2.5
 * - soft lift shadow + inset highlight
 * - hover zinc-800, active scale
 */
export default function OnboardingButton({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
  className = '',
  showArrow = true,
}: OnboardingButtonProps) {
  if (variant === 'primary') {
    return (
      <motion.button
        whileHover={disabled ? {} : { scale: 1.01 }}
        whileTap={disabled ? {} : { scale: 0.985 }}
        onClick={onPress}
        disabled={disabled}
        type="button"
        className={`
          group relative flex w-full items-center justify-center
          h-[52px]
          px-8
          rounded-full
          font-manrope font-medium
          text-[16px] leading-6
          text-white
          transition-colors duration-200
          touch-manipulation
          ${disabled ? 'cursor-not-allowed bg-zinc-900/45' : 'cursor-pointer bg-zinc-900 hover:bg-zinc-800'}
          ${className}
        `}
        style={
          disabled
            ? undefined
            : {
                boxShadow:
                  '0 1px 0 rgba(255,255,255,0.12) inset, 0 10px 28px -12px rgba(24,24,27,0.55), 0 2px 6px rgba(24,24,27,0.18)',
              }
        }
      >
        <span className="inline-flex items-center justify-center gap-2.5">
          <span>{title}</span>
          {showArrow && !disabled ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
              className="translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </span>
      </motion.button>
    )
  }

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.01 }}
      whileTap={disabled ? {} : { scale: 0.985 }}
      onClick={onPress}
      disabled={disabled}
      type="button"
      className={`
        flex h-[52px] w-full items-center justify-center rounded-full border bg-white px-8
        font-manrope text-[16px] font-medium text-[#18181b] touch-manipulation transition-colors
        ${
          disabled
            ? 'cursor-not-allowed border-zinc-200 opacity-45'
            : 'cursor-pointer border-zinc-300 hover:border-[#18181b]'
        }
        ${className}
      `}
    >
      {title}
    </motion.button>
  )
}
