export type LearnCard = {
  id: string
  tag: string
  title: string
  summary: string
}

export const WEB_LEARN_CARDS: LearnCard[] = [
  {
    id: 'gh-stretch',
    tag: 'Routine',
    title: 'Stretching prepares you — training drives growth',
    summary:
      'Daily mobility is essential, but sprint and strength stimulus plus recovery do the heavy lifting for height potential.',
  },
  {
    id: 'morning-first',
    tag: 'Habit',
    title: 'Front-load neck & chest stretches',
    summary:
      'Do your easy morning block early. Waiting until night makes the simplest habits the easiest to skip.',
  },
  {
    id: 'sleep-eight',
    tag: 'Recovery',
    title: 'Aim for 8 solid hours of sleep',
    summary:
      'Especially after hard training days — recovery is when your plan compounds.',
  },
  {
    id: 'consistency',
    tag: 'Mindset',
    title: 'Consistency beats miracle weeks',
    summary:
      'Real progress stories come from months of showing up, not one heroic week.',
  },
  {
    id: 'sprint-hard',
    tag: 'Training',
    title: 'Sprint on hard ground when you can',
    summary:
      'Impact underfoot matters. Keep sessions short and intentional — quality over endless jogging.',
  },
  {
    id: 'posture',
    tag: 'Posture',
    title: 'Sit tall during the day',
    summary:
      'Desk posture quietly steals height presentation. Reset your spine every hour you sit.',
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
