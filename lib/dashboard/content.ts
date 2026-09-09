export type LearnCard = {
  id: string
  tag: string
  title: string
  summary: string
  detail: string
}

export const WEB_LEARN_CARDS: LearnCard[] = [
  {
    id: 'gh-stretch',
    tag: 'Routine',
    title: 'Stretching prepares you — training drives growth',
    summary:
      'Daily mobility is essential, but sprint and strength stimulus plus recovery do the heavy lifting for height potential.',
    detail:
      'Use stretches to stay limber and recover, then pair them with hard but short training blocks and sleep. Mobility alone rarely moves the needle after puberty.',
  },
  {
    id: 'morning-first',
    tag: 'Habit',
    title: 'Front-load neck & chest stretches',
    summary:
      'Do your easy morning block early. Waiting until night makes the simplest habits the easiest to skip.',
    detail:
      'Morning is when willpower is highest for small habits. Lock neck tilts, chest openers, and hang work before school or work starts.',
  },
  {
    id: 'sleep-eight',
    tag: 'Recovery',
    title: 'Aim for 8 solid hours of sleep',
    summary:
      'Especially after hard training days — recovery is when your plan compounds.',
    detail:
      'Growth hormone pulses are strongest in deep sleep. Protect a consistent bedtime more than chasing perfect weekends.',
  },
  {
    id: 'consistency',
    tag: 'Mindset',
    title: 'Consistency beats miracle weeks',
    summary:
      'Real progress stories come from months of showing up, not one heroic week.',
    detail:
      'Track streaks for accountability, but optimize for repeatable days you can keep for 8–12 weeks.',
  },
  {
    id: 'sprint-hard',
    tag: 'Training',
    title: 'Sprint on hard ground when you can',
    summary:
      'Impact underfoot matters. Keep sessions short and intentional — quality over endless jogging.',
    detail:
      'Prefer outdoor hard surfaces for short passes. If you must use a treadmill, use a slight incline and keep volume low.',
  },
  {
    id: 'posture',
    tag: 'Posture',
    title: 'Sit tall during the day',
    summary:
      'Desk posture quietly steals height presentation. Reset your spine every hour you sit.',
    detail:
      'Set a phone reminder every 60 minutes: stand, roll shoulders, chin slightly tucked, breathe into ribs for 30 seconds.',
  },
  {
    id: 'protein',
    tag: 'Nutrition',
    title: 'Protein is non-negotiable',
    summary: 'Support training recovery with protein at breakfast and dinner.',
    detail:
      'You do not need perfection — aim for a palm-sized protein source at two meals minimum, every day.',
  },
  {
    id: 'hydrate',
    tag: 'Nutrition',
    title: 'Hydrate before you feel thirsty',
    summary: 'Dehydration makes training and recovery feel harder than they should.',
    detail:
      'Start the morning with water, then keep a bottle nearby during study/work blocks. Pair electrolytes only if you sweat hard.',
  },
]

export const WEB_TODAY_FOCUS = [
  {
    id: 'mobility',
    title: 'Morning mobility',
    detail: '5–10 minutes of neck, chest, and hang-friendly stretches.',
  },
  {
    id: 'protein',
    title: 'Protein-forward meals',
    detail: 'Hit a solid protein target across breakfast and dinner.',
  },
  {
    id: 'sleep',
    title: 'Protect tonight’s sleep',
    detail: 'Wind down earlier so you can land ~8 hours.',
  },
  {
    id: 'walk',
    title: 'Long walk or light legs',
    detail: 'Keep blood flowing — walk or easy leg work counts.',
  },
]
