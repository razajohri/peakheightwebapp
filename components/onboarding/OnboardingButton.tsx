'use client'

import { motion } from 'framer-motion'

interface OnboardingButtonProps {
  title: string
  onPress: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function OnboardingButton({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
  className = '',
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
          min-h-[52px] sm:min-h-[56px]
          px-6 sm:px-8
          rounded-full
          bg-[#18181b]
          text-white
          font-medium
          tracking-wide
          ${disabled ? 'opacity-45 cursor-not-allowed' : 'cursor-pointer'}
          touch-manipulation
          ${className}
        `}
      >
        <span className="text-base sm:text-lg">{title}</span>
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
        min-h-[52px] sm:min-h-[56px]
        px-6 sm:px-8
        rounded-full
        border
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
      <span className="text-[#18181b] font-medium text-base sm:text-lg">{title}</span>
    </motion.button>
  )
}
