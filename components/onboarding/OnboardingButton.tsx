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
        whileTap={disabled ? {} : { scale: 0.98 }}
        onClick={onPress}
        disabled={disabled}
        type="button"
        className={`
          relative flex w-full items-center justify-center
          h-[52px] sm:h-[54px]
          px-8
          rounded-full
          text-white
          font-manrope font-medium
          text-[16px]
          tracking-[-0.01em]
          shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]
          ${disabled ? 'opacity-45 cursor-not-allowed' : 'cursor-pointer'}
          touch-manipulation
          ${className}
        `}
        style={{
          background: disabled
            ? 'rgba(24, 24, 27, 0.45)'
            : 'linear-gradient(180deg, #27272a 0%, #18181b 100%)',
        }}
      >
        <span className="inline-flex items-center justify-center gap-2">
          {title}
          {showArrow && !disabled ? (
            <span aria-hidden className="text-[17px] leading-none">
              →
            </span>
          ) : null}
        </span>
      </motion.button>
    )
  }

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onPress}
      disabled={disabled}
      type="button"
      className={`
        flex w-full items-center justify-center
        h-[52px] sm:h-[54px]
        px-8
        rounded-full
        border
        font-manrope
        ${
          disabled
            ? 'opacity-45 cursor-not-allowed border-zinc-200'
            : 'border-zinc-300 hover:border-[#18181b] active:border-[#18181b]'
        }
        bg-white
        transition-all touch-manipulation
        ${className}
      `}
    >
      <span className="text-[#18181b] font-medium text-[16px]">{title}</span>
    </motion.button>
  )
}
