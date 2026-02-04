'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DatePickerProps {
  date: Date
  onChange: (date: Date) => void
  minimumDate?: Date
  maximumDate?: Date
}

export default function DatePicker({
  date,
  onChange,
  minimumDate = new Date(1920, 0, 1),
  maximumDate = new Date(),
}: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false)

  const formatDate = (date: Date) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const handleDateChange = (type: 'year' | 'month' | 'day', value: number) => {
    const newDate = new Date(date)
    if (type === 'year') newDate.setFullYear(value)
    if (type === 'month') newDate.setMonth(value - 1)
    if (type === 'day') newDate.setDate(value)
    onChange(newDate)
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1919 }, (_, i) => currentYear - i)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div className="w-full">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowPicker(!showPicker)}
        className="w-full p-5 sm:p-6 rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-4 hover:border-white/20 hover:bg-white/8 transition-all touch-manipulation"
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path
              d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="flex-1 text-left">
          <p className="text-xs text-white/50 mb-1.5 font-medium">Date of Birth</p>
          <p className="text-white text-lg sm:text-xl font-semibold">{formatDate(date)}</p>
        </div>
        <motion.div
          animate={{ rotate: showPicker ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white/60"
          >
            <path
              d="M7 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-5 sm:p-6 rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-md overflow-hidden"
          >
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {/* Month */}
              <div>
                <label className="text-xs text-white/60 mb-2 block font-medium">Month</label>
                <select
                  value={date.getMonth()}
                  onChange={(e) => handleDateChange('month', parseInt(e.target.value) + 1)}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white text-sm sm:text-base font-medium focus:outline-none focus:border-white/30 focus:bg-white/15 transition-all appearance-none cursor-pointer"
                >
                  {months.map((month, index) => (
                    <option key={index} value={index} className="bg-[#1a1a1a]">
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              {/* Day */}
              <div>
                <label className="text-xs text-white/60 mb-2 block font-medium">Day</label>
                <select
                  value={date.getDate()}
                  onChange={(e) => handleDateChange('day', parseInt(e.target.value))}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white text-sm sm:text-base font-medium focus:outline-none focus:border-white/30 focus:bg-white/15 transition-all appearance-none cursor-pointer"
                >
                  {days.map((day) => (
                    <option key={day} value={day} className="bg-[#1a1a1a]">
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="text-xs text-white/60 mb-2 block font-medium">Year</label>
                <select
                  value={date.getFullYear()}
                  onChange={(e) => handleDateChange('year', parseInt(e.target.value))}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white text-sm sm:text-base font-medium focus:outline-none focus:border-white/30 focus:bg-white/15 transition-all appearance-none cursor-pointer"
                >
                  {years.map((year) => (
                    <option key={year} value={year} className="bg-[#1a1a1a]">
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {date.getFullYear() > new Date().getFullYear() - 18 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-xs text-white/50 text-center"
              >
                Parent/guardian consent required for users under 18
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
