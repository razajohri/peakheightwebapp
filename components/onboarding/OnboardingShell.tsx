'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import FloatingStars from './FloatingStars'
import { ONBOARDING_COLORS, ONBOARDING_UI } from '@/lib/constants/onboarding'

export default function OnboardingShell({
  children,
  stars = true,
}: {
  children: ReactNode
  stars?: boolean
}) {
  return (
    <div
      className="relative min-h-screen min-h-dvh overflow-hidden"
      style={{
        backgroundImage: `${ONBOARDING_COLORS.AURORA}, ${ONBOARDING_COLORS.WASH}`,
        backgroundColor: '#f4f7fc',
      }}
    >
      {stars ? <FloatingStars /> : null}
      <div className={ONBOARDING_UI.frame}>{children}</div>
    </div>
  )
}

export function OnboardingMotionColumn({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="relative z-10 flex min-h-screen min-h-dvh w-full flex-1 flex-col"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {children}
    </motion.div>
  )
}
