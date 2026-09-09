'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import { OptionTitle } from './OptionCard'
import { COUNTRIES, findCountry, type CountryOption } from '@/lib/onboarding/locations'

interface OnboardingLocationProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

function genderLabel(gender?: string) {
  const g = (gender || '').toLowerCase()
  if (g === 'female') return 'Women'
  if (g === 'male') return 'Men'
  return 'Your gender'
}

function genderPopulation(gender?: string) {
  const g = (gender || '').toLowerCase()
  if (g === 'female') return '4.1B'
  if (g === 'male') return '4.2B'
  return '8.3B'
}

export default function OnboardingLocation({
  data,
  updateData,
  onNext,
  onBack,
}: OnboardingLocationProps) {
  const initialCountry =
    findCountry(data.countryCode || data.country || '') || COUNTRIES[0]

  const [country, setCountry] = useState<CountryOption>(initialCountry)
  const [city, setCity] = useState<string>(
    data.city && initialCountry.cities.includes(data.city)
      ? data.city
      : initialCountry.cities[0]
  )
  const [openMenu, setOpenMenu] = useState<'country' | 'city' | null>(null)
  const [detecting, setDetecting] = useState(false)
  const [detectError, setDetectError] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updateData({
      country: country.name,
      countryCode: country.code,
      city,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country.code, city])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const selectCountry = (next: CountryOption) => {
    setCountry(next)
    setCity(next.cities[0])
    setOpenMenu(null)
  }

  const selectCity = (next: string) => {
    setCity(next)
    setOpenMenu(null)
  }

  const detectAutomatically = async () => {
    setDetecting(true)
    setDetectError('')
    try {
      const res = await fetch('https://ipapi.co/json/', { cache: 'no-store' })
      if (!res.ok) throw new Error('detect failed')
      const json = (await res.json()) as {
        country_code?: string
        country_name?: string
        city?: string
      }
      const matched =
        findCountry(json.country_code || '') ||
        findCountry(json.country_name || '') ||
        null
      if (!matched) {
        setDetectError('Couldn’t match your country. Pick one below.')
        return
      }
      setCountry(matched)
      const detectedCity = (json.city || '').trim()
      const cityMatch = matched.cities.find(
        (c) => c.toLowerCase() === detectedCity.toLowerCase()
      )
      setCity(cityMatch || matched.cities[0])
    } catch {
      setDetectError('Detection unavailable. Choose your city manually.')
    } finally {
      setDetecting(false)
    }
  }

  const genderLine = useMemo(() => genderLabel(data.gender), [data.gender])
  const genderPop = useMemo(() => genderPopulation(data.gender), [data.gender])

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={4} totalSteps={22} onBack={onBack} />

        <div ref={rootRef} className="flex flex-1 flex-col overflow-y-auto px-6 pt-6">
          <OptionTitle subtitle="Your city narrows it the most." className="mb-8 text-center">
            Where do you live?
          </OptionTitle>

          <div className="relative mx-auto w-full max-w-md space-y-3">
            {/* Country */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === 'country' ? null : 'country')}
                className="flex h-[54px] w-full items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 text-left transition-colors hover:border-zinc-300"
              >
                <span className="text-[22px] leading-none">{country.flag}</span>
                <span className="font-manrope text-[13px] font-semibold tracking-wide text-[#71717a]">
                  {country.code}
                </span>
                <span className="flex-1 font-manrope text-[15px] font-medium text-[#18181b]">
                  {country.name}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#a1a1aa]">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {openMenu === 'country' ? (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute left-0 right-0 z-20 mt-2 max-h-56 overflow-y-auto rounded-2xl border border-zinc-200 bg-white py-1 shadow-lg"
                  >
                    {COUNTRIES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => selectCountry(c)}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50 ${
                          c.code === country.code ? 'bg-zinc-50' : ''
                        }`}
                      >
                        <span className="text-[20px]">{c.flag}</span>
                        <span className="w-8 font-manrope text-[12px] font-semibold text-[#71717a]">
                          {c.code}
                        </span>
                        <span className="font-manrope text-[14px] text-[#18181b]">{c.name}</span>
                      </button>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {/* City */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === 'city' ? null : 'city')}
                className="flex h-[54px] w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 text-left transition-colors hover:border-zinc-300"
              >
                <span className="font-manrope text-[15px] font-medium text-[#18181b]">{city}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#a1a1aa]">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {openMenu === 'city' ? (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute left-0 right-0 z-20 mt-2 max-h-56 overflow-y-auto rounded-2xl border border-zinc-200 bg-white py-1 shadow-lg"
                  >
                    {country.cities.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => selectCity(c)}
                        className={`flex w-full items-center px-4 py-3 text-left font-manrope text-[14px] text-[#18181b] hover:bg-zinc-50 ${
                          c === city ? 'bg-zinc-50 font-medium' : ''
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={detectAutomatically}
              disabled={detecting}
              className="flex items-center gap-2 pt-1 font-manrope text-[13px] font-medium text-[#7c8cff] disabled:opacity-60"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                <path
                  d="M12 2v3M12 19v3M2 12h3M19 12h3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              {detecting ? 'Detecting…' : 'Detect automatically'}
            </button>

            {detectError ? (
              <p className="font-manrope text-[12px] text-[#a1a1aa]">{detectError}</p>
            ) : null}
          </div>

          {/* Population funnel */}
          <div className="mx-auto mt-10 w-full max-w-md space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#18181b]" />
                  <span className="font-manrope text-[13px] text-[#18181b]">Everyone alive</span>
                </div>
                <span className="font-manrope text-[13px] font-medium text-[#18181b]">8.3B</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100">
                <div className="h-full w-full rounded-full bg-[#d4d4d8]" />
              </div>
            </div>

            <p className="font-manrope text-[11px] uppercase tracking-[0.08em] text-[#a1a1aa]">
              your gender
            </p>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#18181b]" />
                  <span className="font-manrope text-[13px] text-[#18181b]">{genderLine}</span>
                </div>
                <span className="font-manrope text-[13px] font-medium text-[#18181b]">{genderPop}</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100">
                <div className="h-full w-[52%] rounded-full bg-[#a1a1aa]" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-10 pt-6">
          <OnboardingButton title="Continue" onPress={onNext} disabled={!country || !city} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
