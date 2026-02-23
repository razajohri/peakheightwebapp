'use client'

import { motion } from 'framer-motion'
import ProgressHeader from './ProgressHeader'

interface Onboarding17Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
  onAuthRequired: (mode?: 'signup' | 'signin') => void
}

function formatHeight(heightInCm: number | undefined) {
  if (!heightInCm || heightInCm === 0) return "—"
  const totalInches = heightInCm / 2.54
  const feet = Math.floor(totalInches / 12)
  const inches = Math.round(totalInches % 12)
  return `${feet}'${inches}"`
}

const benefits = [
  { icon: '📊', title: 'Personalized Growth Plan', desc: 'Tailored to your body & goals' },
  { icon: '🏋️', title: '200+ Growth Exercises', desc: 'Science-backed stretches & workouts' },
  { icon: '🥗', title: 'Nutrition Guide', desc: 'Foods that maximize growth' },
  { icon: '😴', title: 'Sleep Optimization', desc: 'Boost growth hormone naturally' },
  { icon: '📈', title: 'Progress Tracking', desc: 'See your gains over time' },
]

export default function Onboarding17({ data, updateData, onNext, onBack, onAuthRequired }: Onboarding17Props) {
  const currentHeight = formatHeight(data?.currentHeight)
  const targetHeight = formatHeight(data?.targetHeight)

  const handleStartJourney = () => {
    onAuthRequired('signup')
  }

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] flex flex-col"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <ProgressHeader currentStep={19} totalSteps={22} onBack={onBack} />
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="max-w-[400px] mx-auto w-full px-5 pt-2 pb-4">
          {/* Header Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-4"
          >
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full px-4 py-1.5">
              <span className="text-amber-400 text-[12px] font-semibold">✨ Your Report is Ready</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-[28px] font-bold text-center leading-tight mb-2"
          >
            Unlock Your
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"> Growth Potential</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-white/60 text-[14px] text-center mb-6"
          >
            Based on your answers, we've created a personalized plan just for you
          </motion.p>

          {/* Height Preview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-5"
          >
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <p className="text-white/50 text-[11px] font-medium mb-1">NOW</p>
                <p className="text-white text-[24px] font-bold">{currentHeight}</p>
              </div>
              <div className="flex items-center gap-2 px-4">
                <div className="w-8 h-[2px] bg-gradient-to-r from-white/20 to-amber-500/50" />
                <span className="text-amber-400 text-[18px]">→</span>
                <div className="w-8 h-[2px] bg-gradient-to-r from-amber-500/50 to-amber-500" />
              </div>
              <div className="text-center flex-1">
                <p className="text-amber-400/80 text-[11px] font-medium mb-1">GOAL</p>
                <p className="text-amber-400 text-[24px] font-bold">{targetHeight}</p>
              </div>
            </div>
          </motion.div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-5"
          >
            <p className="text-white/40 text-[11px] font-semibold tracking-wider mb-3">WHAT YOU'LL GET</p>
            
            <div className="space-y-2.5">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3"
                >
                  <span className="text-[20px]">{benefit.icon}</span>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-[14px]">{benefit.title}</p>
                    <p className="text-white/50 text-[12px]">{benefit.desc}</p>
                  </div>
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* App Store Rating */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg className="w-4 h-4 text-white/20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-white font-semibold text-[13px]">4.0</span>
            <span className="text-white/50 text-[12px]">on App Store</span>
          </motion.div>

        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div 
        className="flex-shrink-0 px-5 pt-3 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent relative z-10"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}
      >
        <div className="max-w-[400px] mx-auto w-full">
          {/* CTA Button */}
          <button
            onClick={handleStartJourney}
            className="w-full h-[54px] rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-[16px] flex items-center justify-center shadow-[0_8px_30px_rgba(245,158,11,0.3)] active:scale-[0.98] transition-transform cursor-pointer"
          >
            Unlock My Custom Report
          </button>
        </div>
      </div>
    </div>
  )
}
