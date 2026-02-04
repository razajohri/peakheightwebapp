'use client'

import { motion } from 'framer-motion'

interface Onboarding1Props {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onAuthRequired: (mode?: 'signup' | 'signin') => void
}

export default function Onboarding1({ data, updateData, onNext, onAuthRequired }: Onboarding1Props) {

  const handleStart = () => {
    onNext()
  }

  return (
    <div className="min-h-screen min-h-dvh bg-black text-white overflow-hidden relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 min-h-screen bg-cover bg-center bg-top"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBb37tt-xUmXkkXxJwcsMOWJFoMmhvshe23NDZhj3J42TGvt05smGKYuDGuw_gIJUJueOEjvLcBTqt2A9SQyy1dysZAgkZKP1alfbttAqX5bOnivgqlU0nHon86XslGwrYDlwz_joznPHykGnJ30Ql2i5mbrBAG7dDE7uxUnGSpV2dikL_xF1SJOEFrXYpORkZgTVhy4RZIj8eCycSZnKy0W3jU1LqA4eShy6XAWfNK50r9RNqvPiLhHXGDGyBCcQZTtRZAnGofDg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 30%, transparent 100%)',
          }}
        />
      </div>

      {/* Content */}
      <main className="relative z-10 w-full min-h-screen min-h-dvh flex flex-col justify-end items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full px-6 pb-16 flex flex-col items-center text-center space-y-2 mb-8"
        >
          {/* Main Title */}
          <h1 
            className="text-[80px] sm:text-[100px] font-bold uppercase leading-none text-white tracking-[-4px]"
            style={{
              fontFamily: "var(--font-oswald), 'Oswald', Impact, Haettenschweiler, sans-serif",
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            PeakHeight
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base font-bold uppercase mb-10 text-white tracking-[0.2em]">
            Grow taller, naturally
          </p>

          {/* CTA Button */}
          <div className="pt-4 w-full flex justify-center">
            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="text-black font-extrabold uppercase text-lg py-5 px-10 rounded-full w-full max-w-xs bg-white transition-transform duration-200"
              style={{
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
              }}
            >
              Start Onboarding
            </motion.button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
