'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import OnboardingShell, { OnboardingMotionColumn } from './OnboardingShell'
import ProgressHeader from './ProgressHeader'
import OnboardingButton from './OnboardingButton'
import { OptionTitle } from './OptionCard'

interface OnboardingCohortProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

type CohortRow = {
  label: string
  sublabel?: string
  value: string
  width: string
}

function genderTitle(gender?: string) {
  const g = (gender || '').toLowerCase()
  if (g === 'female') return 'Women'
  if (g === 'male') return 'Men'
  return 'Your peer group'
}

function genderPop(gender?: string) {
  const g = (gender || '').toLowerCase()
  if (g === 'female') return { value: '4.1B', width: '49%' }
  if (g === 'male') return { value: '4.2B', width: '51%' }
  return { value: '8.3B', width: '100%' }
}

function ageFromDob(dateOfBirth?: string): number | null {
  if (!dateOfBirth) return null
  const dob = new Date(dateOfBirth)
  if (Number.isNaN(dob.getTime())) return null
  const now = new Date()
  let age = now.getFullYear() - dob.getFullYear()
  const m = now.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age -= 1
  return age
}

function ageBand(age: number | null, fallbackAge?: number) {
  const a = age ?? fallbackAge ?? null
  if (a == null || !Number.isFinite(a)) {
    return { title: 'Your age group', value: '1.1B', width: '28%' }
  }
  const start = Math.floor(a / 5) * 5
  const end = start + 4
  // Rough illustrative cohort sizes that shrink with specificity
  const map: Record<number, { value: string; width: string }> = {
    10: { value: '620M', width: '34%' },
    15: { value: '590M', width: '32%' },
    20: { value: '480M', width: '30%' },
    25: { value: '312M', width: '26%' },
    30: { value: '290M', width: '24%' },
    35: { value: '250M', width: '22%' },
    40: { value: '220M', width: '20%' },
    45: { value: '190M', width: '18%' },
    50: { value: '160M', width: '16%' },
  }
  const stats = map[start] || { value: '200M', width: '20%' }
  return {
    title: `Aged ${start}-${end}`,
    value: stats.value,
    width: stats.width,
  }
}

function countryPop(code?: string, name?: string) {
  const key = (code || '').toUpperCase()
  const known: Record<string, { value: string; width: string }> = {
    PK: { value: '240M', width: '18%' },
    IN: { value: '1.4B', width: '42%' },
    US: { value: '340M', width: '20%' },
    GB: { value: '68M', width: '10%' },
    CA: { value: '41M', width: '8%' },
    AU: { value: '27M', width: '7%' },
    BD: { value: '173M', width: '14%' },
    NG: { value: '230M', width: '16%' },
    BR: { value: '216M', width: '15%' },
    MX: { value: '130M', width: '12%' },
    AE: { value: '10M', width: '5%' },
    SA: { value: '37M', width: '8%' },
    DE: { value: '84M', width: '10%' },
    FR: { value: '68M', width: '10%' },
    TR: { value: '85M', width: '10%' },
    ID: { value: '280M', width: '17%' },
    PH: { value: '117M', width: '11%' },
    MY: { value: '34M', width: '7%' },
    SG: { value: '6M', width: '4%' },
    NL: { value: '18M', width: '6%' },
  }
  const stats = known[key] || { value: '50M', width: '9%' }
  const label = [key, name].filter(Boolean).join(' ') || 'Your country'
  return { title: label, ...stats }
}

function cityPop(city?: string) {
  if (!city) return { title: 'Your city', value: '1.2M', width: '6%' }
  const known: Record<string, { value: string; width: string }> = {
    Lahore: { value: '13M', width: '8%' },
    Karachi: { value: '17M', width: '9%' },
    Islamabad: { value: '1.2M', width: '4%' },
    'New York': { value: '8.3M', width: '7%' },
    London: { value: '9M', width: '7%' },
    Dubai: { value: '3.6M', width: '5%' },
    Mumbai: { value: '21M', width: '10%' },
    Delhi: { value: '32M', width: '12%' },
    Toronto: { value: '6.3M', width: '6%' },
    Sydney: { value: '5.3M', width: '5%' },
  }
  const stats = known[city] || { value: '1.5M', width: '5%' }
  return { title: city, ...stats }
}

function CohortItem({
  row,
  index,
}: {
  row: CohortRow
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 * index }}
      className="space-y-2"
    >
      {row.sublabel ? (
        <p className="font-manrope text-[11px] font-medium uppercase tracking-[0.08em] text-[#a1a1aa]">
          {row.sublabel}
        </p>
      ) : null}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#18181b]" />
          <span className="truncate font-manrope text-[15px] font-medium text-[#18181b]">
            {row.label}
          </span>
        </div>
        <span className="shrink-0 font-manrope text-[14px] text-[#71717a]">{row.value}</span>
      </div>
      <div className="h-[7px] w-full overflow-hidden rounded-full bg-zinc-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: row.width }}
          transition={{ duration: 0.55, delay: 0.12 * index, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-[#b4b4bc]"
        />
      </div>
    </motion.div>
  )
}

export default function OnboardingCohort({
  data,
  onNext,
  onBack,
}: OnboardingCohortProps) {
  const rows = useMemo(() => {
    const gender = genderPop(data.gender)
    const age = ageBand(ageFromDob(data.dateOfBirth), data.age)
    const country = countryPop(data.countryCode, data.country)
    const city = cityPop(data.city)

    const list: CohortRow[] = [
      { label: 'Everyone alive', value: '8.3B', width: '100%' },
      {
        label: genderTitle(data.gender),
        sublabel: 'your gender',
        value: gender.value,
        width: gender.width,
      },
      {
        label: age.title,
        sublabel: 'your age',
        value: age.value,
        width: age.width,
      },
      {
        label: country.title,
        sublabel: 'your country',
        value: country.value,
        width: country.width,
      },
      {
        label: city.title,
        sublabel: 'your city',
        value: city.value,
        width: city.width,
      },
    ]

    if (data.ethnicity && data.ethnicity !== 'Prefer not to say') {
      list.push({
        label: data.ethnicity,
        sublabel: 'your background',
        value: '86M',
        width: '4%',
      })
    }

    return list
  }, [data])

  return (
    <OnboardingShell>
      <OnboardingMotionColumn>
        <ProgressHeader currentStep={4} totalSteps={22} onBack={onBack} />

        <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-4">
          <OptionTitle className="mb-8">
            Here&apos;s who you&apos;re measured against.
          </OptionTitle>

          <div className="mx-auto w-full max-w-md space-y-6 pb-4">
            {rows.map((row, index) => (
              <CohortItem key={`${row.label}-${index}`} row={row} index={index} />
            ))}
          </div>
        </div>

        <div className="px-6 pb-10 pt-4">
          <OnboardingButton title="Continue" onPress={onNext} />
        </div>
      </OnboardingMotionColumn>
    </OnboardingShell>
  )
}
