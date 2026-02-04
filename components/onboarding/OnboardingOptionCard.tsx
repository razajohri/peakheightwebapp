'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface OnboardingOptionCardProps {
  label: string
  selected?: boolean
  onPress: () => void
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  showCheckmark?: boolean
  className?: string
}

export default function OnboardingOptionCard({
  label,
  selected = false,
  onPress,
  icon,
  iconPosition = 'right',
  showCheckmark = true,
  className = '',
}: OnboardingOptionCardProps) {
  return (
    <motion.button
      whileHover={selected ? {} : { scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onPress}
      className={`
        relative w-full 
        px-5 py-4 sm:px-6 sm:py-5
        rounded-2xl
        border
        transition-all duration-300
        touch-manipulation
        overflow-hidden
        text-left
        ${selected 
          ? 'border-white bg-white/10 shadow-[0_0_18px_rgba(255,255,255,0.15)]' 
          : 'border-white/15 bg-white/5 hover:border-white/30'
        }
        ${className}
      `}
    >
      {/* Background glow effect when selected */}
      {selected && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        {icon && iconPosition === 'left' && (
          <span className="text-white/60 text-2xl">{icon}</span>
        )}
        
        <span
          className={`
            flex-1 font-semibold
            text-base sm:text-lg md:text-xl
            transition-colors duration-300
            ${selected ? 'text-white' : 'text-white/70'}
          `}
        >
          {label}
        </span>

        {showCheckmark && selected && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex-shrink-0"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-black"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        )}
        
        {icon && iconPosition === 'right' && !selected && (
          <span className="text-white/40 text-2xl">{icon}</span>
        )}
      </div>
    </motion.button>
  )
}
