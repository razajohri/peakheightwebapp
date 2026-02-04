'use client'

import { motion } from 'framer-motion'
import FloatingStars from './FloatingStars'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'

interface Onboarding13AProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export default function Onboarding13A({ data, updateData, onNext, onBack }: Onboarding13AProps) {
  return (
    <div className="min-h-screen min-h-dvh bg-black relative overflow-hidden">
      <FloatingStars />

      <div className="relative z-10 min-h-screen min-h-dvh flex flex-col">
        <ProgressHeader currentStep={16} onBack={onBack} />

        <div className="flex-1 flex flex-col px-6 pt-4">
          {/* Chart Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-[#050505] border border-white/10 p-6 shadow-[0_0_30px_rgba(0,255,198,0.15)]"
          >
            {/* Title */}
            <h1 className="text-white text-3xl font-bold text-center mb-6 leading-tight" style={{ textShadow: '0 0 20px rgba(0, 255, 198, 0.5)' }}>
              How tall will you actually grow?
            </h1>

            {/* Chart Placeholder */}
            <div className="relative h-48 mb-6">
              <svg width="100%" height="100%" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet">
                {/* Y-axis labels */}
                <text x="10" y="25" fill="#9CA3AF" fontSize="11">6'2"</text>
                <text x="10" y="55" fill="#9CA3AF" fontSize="11">6'0"</text>
                <text x="10" y="90" fill="#9CA3AF" fontSize="11">5'10"</text>
                <text x="10" y="125" fill="#9CA3AF" fontSize="11">5'8"</text>
                <text x="10" y="160" fill="#9CA3AF" fontSize="11">5'6"</text>
                
                {/* Grid lines */}
                <path d="M40 160 L300 160" stroke="#1f1f1f" strokeWidth="1" />
                <path d="M40 110 L300 110" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M40 60 L300 60" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />

                {/* Bad habits line */}
                <motion.path
                  d="M40 150 Q140 120 200 118 T300 128"
                  stroke="url(#badGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />

                {/* Good habits line */}
                <motion.path
                  d="M40 150 Q140 70 200 40 T300 25"
                  stroke="url(#goodGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />

                {/* Height gain indicator */}
                <line x1="280" y1="25" x2="280" y2="128" stroke="#00FFC6" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="290" y="80" fill="#00FFC6" fontSize="14" fontWeight="bold">+4"</text>

                <defs>
                  <linearGradient id="badGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF2D55" />
                    <stop offset="100%" stopColor="#FF8A00" />
                  </linearGradient>
                  <linearGradient id="goodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00FFC6" />
                    <stop offset="100%" stopColor="#00A0FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Legend */}
            <div className="flex justify-between px-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF2D55]" />
                <span className="text-white text-sm">Without optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00FFC6]" />
                <span className="text-white text-sm">With AI prediction</span>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6"
          >
            <div className="flex justify-around mb-5">
              <div className="text-center">
                <p className="text-[#00FFC6] text-2xl font-bold">87%</p>
                <p className="text-white/50 text-sm">Accuracy Rate</p>
              </div>
              <div className="text-center">
                <p className="text-[#00FFC6] text-2xl font-bold">2.4"</p>
                <p className="text-white/50 text-sm">Avg Growth</p>
              </div>
            </div>
            
            <p className="text-white text-center text-base leading-relaxed">
              Our AI predicts your maximum height potential based on genetics and lifestyle patterns.
            </p>
          </motion.div>
        </div>

        {/* Button */}
        <div className="px-6 pb-10">
          <OnboardingButton title="Continue" onPress={onNext} disabled={false} />
        </div>
      </div>
    </div>
  )
}
