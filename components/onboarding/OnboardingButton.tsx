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
          min-h-[56px] sm:min-h-[60px] md:min-h-[64px]
          px-6 sm:px-8
          rounded-full
          bg-white
          text-black
          font-bold
          tracking-wide
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          touch-manipulation
          ${className}
        `}
      >
        <span className="text-base sm:text-lg md:text-xl">{title}</span>
      </motion.button>
    )
  }

  // Secondary variant
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onPress}
      disabled={disabled}
      className={`
        w-full
        min-h-[56px] sm:min-h-[60px] md:min-h-[64px]
        px-6 sm:px-8
        rounded-full
        border
        ${disabled 
          ? 'opacity-50 cursor-not-allowed border-white/15' 
          : 'border-white/30 hover:border-white/60 active:border-white/80'
        }
        bg-transparent
        transition-all touch-manipulation
        ${className}
      `}
    >
      <span className="text-white font-semibold text-base sm:text-lg md:text-xl">
        {title}
      </span>
    </motion.button>
  )
}
