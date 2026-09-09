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
        className={`
          relative w-full
          min-h-[52px] sm:min-h-[54px]
          px-6 sm:px-8
          rounded-full
          bg-[#18181b]
          text-white
          font-manrope font-medium
          tracking-[-0.01em]
          ${disabled ? 'opacity-45 cursor-not-allowed' : 'cursor-pointer'}
          touch-manipulation
          ${className}
        `}
      >
        <span className="inline-flex items-center justify-center gap-2 text-[16px] sm:text-[17px]">
          {title}
          {showArrow && !disabled ? <span aria-hidden className="translate-y-px">→</span> : null}
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
      className={`
        w-full
        min-h-[52px] sm:min-h-[54px]
        px-6 sm:px-8
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
      <span className="text-[#18181b] font-medium text-[16px] sm:text-[17px]">{title}</span>
    </motion.button>
  )
}
