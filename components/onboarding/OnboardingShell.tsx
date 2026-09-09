'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import FloatingStars from './FloatingStars'
import { ONBOARDING_COLORS } from '@/lib/constants/onboarding'

export default function OnboardingShell({
  children,
  stars = true,
}: {
  children: ReactNode
  stars?: boolean
}) {
  return (
    <div
      className="min-h-screen min-h-dvh relative overflow-hidden"
      style={{ background: ONBOARDING_COLORS.WASH }}
    >
      {stars ? <FloatingStars /> : null}
      {children}
    </div>
  )
}

export function OnboardingMotionColumn({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="relative z-10 min-h-screen min-h-dvh flex flex-col"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {children}
    </motion.div>
  )
}
