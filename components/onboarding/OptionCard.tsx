'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface OptionCardProps {
  selected: boolean
  onClick: () => void
  label: string
  description?: string
  icon?: ReactNode
  index?: number
  /** multi-select uses checkbox fill; single uses radio */
  multi?: boolean
  className?: string
}

function SelectionMark({ selected, multi }: { selected: boolean; multi?: boolean }) {
  if (multi) {
    return (
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border transition-colors ${
          selected ? 'border-[#18181b] bg-[#18181b]' : 'border-zinc-300 bg-white'
        }`}
        aria-hidden
      >
        {selected ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.2L4.8 8.5L9.5 3.5"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
    )
  }

  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
        selected ? 'border-[#18181b]' : 'border-zinc-300'
      }`}
      aria-hidden
    >
      {selected ? <span className="h-2.5 w-2.5 rounded-full bg-[#18181b]" /> : null}
    </span>
  )
}

export default function OptionCard({
  selected,
  onClick,
  label,
  description,
  icon,
  index = 0,
  multi = false,
  className = '',
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full flex items-center gap-3.5 rounded-2xl bg-white px-4 py-[18px] text-left transition-all duration-200 touch-manipulation ${
        selected
          ? 'border-2 border-[#18181b] shadow-[0_1px_0_rgba(24,24,27,0.04)]'
          : 'border border-zinc-200 hover:border-zinc-300'
      } ${className}`}
    >
      <SelectionMark selected={selected} multi={multi} />
      {icon ? <span className="shrink-0 text-[#a1a1aa]">{icon}</span> : null}
      <span className="min-w-0 flex-1">
        <span className="block font-manrope text-[16px] font-semibold leading-snug tracking-[-0.01em] text-[#18181b]">
          {label}
        </span>
        {description ? (
          <span className="mt-0.5 block font-manrope text-[13px] font-normal leading-snug text-[#a1a1aa]">
            {description}
          </span>
        ) : null}
      </span>
    </motion.button>
  )
}

export function OptionTitle({
  children,
  subtitle,
  className = '',
}: {
  children: ReactNode
  subtitle?: string
  className?: string
}) {
  return (
    <div className={`text-center ${className}`}>
      <h1 className="font-playfair font-medium text-[28px] sm:text-[30px] leading-[1.2] tracking-[-0.02em] text-[#18181b]">
        {children}
      </h1>
      {subtitle ? (
        <p className="mt-2.5 font-manrope text-[15px] leading-relaxed text-[#a1a1aa]">{subtitle}</p>
      ) : null}
    </div>
  )
}
