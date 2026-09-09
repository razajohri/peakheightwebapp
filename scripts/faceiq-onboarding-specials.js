const fs = require('fs')
const path = require('path')

function patch(file, replacements) {
  const p = path.join(__dirname, '..', file)
  let s = fs.readFileSync(p, 'utf8')
  for (const [from, to] of replacements) {
    if (typeof from === 'string') {
      if (!s.includes(from)) {
        console.warn('MISS', file, from.slice(0, 60))
        continue
      }
      s = s.split(from).join(to)
    } else {
      s = s.replace(from, to)
    }
  }
  fs.writeFileSync(p, s)
  console.log('patched', file)
}

const wash = 'bg-gradient-to-b from-[#f4f7fc] via-[#edf3fb] to-[#dde7f4]'
const inkBtn =
  'w-full h-[54px] rounded-full bg-[#18181b] text-white font-medium text-[16px] flex items-center justify-center active:scale-[0.98] transition-transform cursor-pointer'

patch('components/onboarding/Onboarding17.tsx', [
  [
    'className="fixed inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#edf3fb] to-[#0A0A0A] flex flex-col"',
    `className="fixed inset-0 ${wash} flex flex-col"`,
  ],
  [
    'className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full px-4 py-1.5"',
    'className="bg-white border border-zinc-200 rounded-full px-4 py-1.5"',
  ],
  [
    '<span className="text-amber-400 text-[12px] font-semibold">✨ Your Report is Ready</span>',
    '<span className="text-[#18181b] text-[12px] font-medium">Your Report is Ready</span>',
  ],
  [
    '<span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"> Growth Potential</span>',
    '<span className="text-[#18181b]"> Growth Potential</span>',
  ],
  [
    '<div className="w-8 h-[2px] bg-gradient-to-r from-white/20 to-amber-500/50" />',
    '<div className="w-8 h-[2px] bg-gradient-to-r from-zinc-200 to-[#18181b]/40" />',
  ],
  ['<span className="text-amber-400 text-[18px]">→</span>', '<span className="text-[#18181b] text-[18px]">→</span>'],
  [
    '<div className="w-8 h-[2px] bg-gradient-to-r from-amber-500/50 to-amber-500" />',
    '<div className="w-8 h-[2px] bg-[#18181b]" />',
  ],
  [
    '<p className="text-amber-400/80 text-[11px] font-medium mb-1">GOAL</p>',
    '<p className="text-[#a1a1aa] text-[11px] font-medium mb-1">GOAL</p>',
  ],
  [
    '<p className="text-amber-400 text-[24px] font-bold">{targetHeight}</p>',
    '<p className="text-[#18181b] text-[24px] font-semibold">{targetHeight}</p>',
  ],
  [/text-amber-400/g, 'text-[#18181b]'],
  [
    'className="flex-shrink-0 px-5 pt-3 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent relative z-10"',
    'className="flex-shrink-0 px-5 pt-3 bg-gradient-to-t from-[#dde7f4] via-[#edf3fb]/90 to-transparent relative z-10"',
  ],
  [
    /className="w-full h-\[54px\] rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-\[#18181b\] font-semibold text-\[16px\] flex items-center justify-center shadow-\[0_8px_30px_rgba\(245,158,11,0\.3\)\] active:scale-\[0\.98\] transition-transform cursor-pointer"/,
    `className="${inkBtn}"`,
  ],
])

patch('components/onboarding/OnboardingAuth.tsx', [
  [
    'className="fixed inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#edf3fb] to-[#0A0A0A] flex flex-col"',
    `className="fixed inset-0 ${wash} flex flex-col"`,
  ],
  [/focus:border-amber-500\/50/g, 'focus:border-[#18181b]'],
  [
    /className="w-full h-\[52px\] rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-\[#18181b\] font-semibold text-\[15px\] flex items-center justify-center shadow-\[0_8px_30px_rgba\(245,158,11,0\.3\)\] active:scale-\[0\.98\] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"/,
    'className="w-full h-[52px] rounded-full bg-[#18181b] text-white font-medium text-[15px] flex items-center justify-center active:scale-[0.98] transition-transform disabled:opacity-45 disabled:cursor-not-allowed"',
  ],
  ['className="text-amber-400 font-semibold"', 'className="text-[#18181b] font-semibold underline"'],
])

patch('components/onboarding/OnboardingComplete.tsx', [
  [
    'className="fixed inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#edf3fb] to-[#0A0A0A] flex flex-col"',
    `className="fixed inset-0 ${wash} flex flex-col"`,
  ],
  [/border-t-amber-500/g, 'border-t-[#18181b]'],
  ['className="text-amber-300 text-sm mb-4 text-center max-w-[300px]"', 'className="text-[#a1a1aa] text-sm mb-4 text-center max-w-[300px]"'],
  [
    /className="w-full max-w-\[320px\] h-\[54px\] rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-\[#18181b\] font-semibold text-\[16px\] flex items-center justify-center shadow-\[0_8px_30px_rgba\(245,158,11,0\.3\)\] active:scale-\[0\.98\] transition-transform disabled:opacity-50 mb-6"/,
    'className="w-full max-w-[320px] h-[54px] rounded-full bg-[#18181b] text-white font-medium text-[16px] flex items-center justify-center active:scale-[0.98] transition-transform disabled:opacity-45 mb-6"',
  ],
])

patch('components/onboarding/Onboarding13A.tsx', [
  [/#00FFC6/g, '#18181b'],
  [
    "style={{ textShadow: '0 0 20px rgba(0, 255, 198, 0.5)' }}",
    'style={{}}',
  ],
])

patch('components/onboarding/Onboarding15.tsx', [
  ['backgroundFill="#000000"', 'backgroundFill="#f4f7fc"'],
])

patch('app/onboarding/loading.tsx', [
  [
    `backgroundColor: '#000'`,
    `backgroundColor: '#f4f7fc'`,
  ],
  [`color: '#fff'`, `color: '#18181b'`],
  [`color: 'rgba(255,255,255,0.5)'`, `color: '#a1a1aa'`],
])

patch('app/onboarding/page.tsx', [
  [`backgroundColor: '#000'`, `backgroundColor: '#f4f7fc'`],
  [`color: '#fff'`, `color: '#18181b'`],
  [
    `border: '2px solid rgba(255,255,255,0.3)'`,
    `border: '2px solid #e5e7eb'`,
  ],
  [`borderTopColor: '#fff'`, `borderTopColor: '#18181b'`],
  [
    'className="min-h-screen bg-black flex flex-col items-center justify-center gap-4"',
    'className="min-h-screen bg-[#f4f7fc] flex flex-col items-center justify-center gap-4"',
  ],
  [
    'className="w-8 h-8 border-2 border-white/30 border-t-amber-500 rounded-full animate-spin"',
    'className="w-8 h-8 border-2 border-zinc-200 border-t-[#18181b] rounded-full animate-spin"',
  ],
  [
    'className="text-white/60 text-sm"',
    'className="text-[#a1a1aa] text-sm"',
  ],
])
