'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface SliderProps {
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
  label?: string
  unit?: string
  showValue?: boolean
}

export default function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  unit = '',
  showValue = true,
}: SliderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const percentage = ((value - min) / (max - min)) * 100

  const calculateValue = (clientX: number) => {
    if (!trackRef.current) return value
    const rect = trackRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const newValue = min + (percentage / 100) * (max - min)
    const steppedValue = Math.round(newValue / step) * step
    return Math.max(min, Math.min(max, steppedValue))
  }

  const handleStart = (clientX: number) => {
    setIsDragging(true)
    const newValue = calculateValue(clientX)
    onChange(newValue)
  }

  const handleMove = (clientX: number) => {
    if (!isDragging) return
    const newValue = calculateValue(clientX)
    onChange(newValue)
  }

  const handleEnd = () => {
    setIsDragging(false)
  }

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleStart(e.clientX)
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleStart(e.touches[0].clientX)
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const handleMouseUp = () => handleEnd()
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX)
    }
    const handleTouchEnd = () => handleEnd()

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging])

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm sm:text-base text-gray-400 mb-2">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <div
          ref={trackRef}
          className="flex-1 h-2 sm:h-2.5 md:h-3 bg-[#1f1f1f] rounded-full relative cursor-pointer touch-none select-none touch-manipulation"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div
            className="absolute h-full bg-white rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-white rounded-full shadow-lg cursor-grab active:cursor-grabbing touch-manipulation"
            style={{ left: `calc(${percentage}% - ${typeof window !== 'undefined' && window.innerWidth >= 768 ? '12px' : '8px'})` }}
            whileTap={{ scale: 1.2 }}
            drag="x"
            dragConstraints={{ left: -10, right: 10 }}
            onDrag={(_, info) => {
              if (trackRef.current) {
                const rect = trackRef.current.getBoundingClientRect()
                const left = rect.left
                const newX = info.point.x - left
                const newPercentage = Math.max(0, Math.min(100, (newX / rect.width) * 100))
                const newValue = min + (newPercentage / 100) * (max - min)
                const steppedValue = Math.round(newValue / step) * step
                onChange(Math.max(min, Math.min(max, steppedValue)))
              }
            }}
          />
        </div>
        {showValue && (
          <div className="text-white text-sm sm:text-base md:text-lg font-medium min-w-[50px] sm:min-w-[60px] md:min-w-[70px] text-right">
            {value}{unit}
          </div>
        )}
      </div>
    </div>
  )
}
