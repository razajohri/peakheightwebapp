const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '..', 'components/onboarding')
const files = fs
  .readdirSync(dir)
  .filter(
    (f) =>
      f.startsWith('Onboarding') &&
      f.endsWith('.tsx') &&
      !['OnboardingButton.tsx', 'OnboardingShell.tsx'].includes(f)
  )

const pairs = [
  [/border-white\/50 bg-white\/10/g, 'border-[#18181b] bg-[#18181b]'],
  [/border-white\/40 bg-white\/10/g, 'border-[#18181b] bg-[#18181b]'],
  [/border-white\/30 bg-white\/10/g, 'border-[#18181b] bg-[#18181b]'],
  [/border-white\/15 bg-white\/5/g, 'border-zinc-200 bg-white'],
  [/border-white\/10 bg-white\/5/g, 'border-zinc-200 bg-white'],
  [/hover:border-white\/25/g, 'hover:border-zinc-300'],
  [/hover:border-white\/30/g, 'hover:border-zinc-300'],
  [/hover:border-white\/40/g, 'hover:border-zinc-400'],
  [/hover:border-white\/60/g, 'hover:border-[#18181b]'],
  [/hover:bg-white\/10/g, 'hover:bg-zinc-50'],
  [/hover:bg-white\/5/g, 'hover:bg-zinc-50'],
  [/active:border-white\/80/g, 'active:border-[#18181b]'],
  [/bg-white\/5/g, 'bg-white'],
  [/bg-white\/10/g, 'bg-zinc-100'],
  [/bg-white\/15/g, 'bg-zinc-100'],
  [/bg-black\/85/g, 'bg-[#18181b]/70'],
  [/bg-black\/80/g, 'bg-[#18181b]/60'],
  [/bg-black\/70/g, 'bg-[#18181b]/50'],
  [/bg-black\/60/g, 'bg-[#18181b]/40'],
  [/bg-black\/50/g, 'bg-[#18181b]/40'],
  [/bg-black\/40/g, 'bg-[#18181b]/30'],
  [/bg-\[#0A0A0A\]/g, 'bg-[#f4f7fc]'],
  [/bg-\[#0a0a0a\]/g, 'bg-[#f4f7fc]'],
  [/bg-\[#050505\]/g, 'bg-[#f4f7fc]'],
  [/bg-black/g, 'bg-[#f4f7fc]'],
  [/text-white\/90/g, 'text-zinc-700'],
  [/text-white\/80/g, 'text-zinc-600'],
  [/text-white\/70/g, 'text-[#a1a1aa]'],
  [/text-white\/60/g, 'text-[#a1a1aa]'],
  [/text-white\/50/g, 'text-zinc-400'],
  [/text-white\/40/g, 'text-zinc-400'],
  [/text-white\/30/g, 'text-zinc-300'],
  [/border-white\/50/g, 'border-[#18181b]'],
  [/border-white\/40/g, 'border-zinc-400'],
  [/border-white\/30/g, 'border-zinc-300'],
  [/border-white\/25/g, 'border-zinc-300'],
  [/border-white\/20/g, 'border-zinc-200'],
  [/border-white\/15/g, 'border-zinc-200'],
  [/border-white\/10/g, 'border-zinc-200'],
  [/border-white\b/g, 'border-[#18181b]'],
  [/text-white text-\[28px\] font-bold/g, 'text-[#18181b] font-playfair font-normal text-[28px]'],
  [/text-white text-\[32px\] font-bold/g, 'text-[#18181b] font-playfair font-normal text-[32px]'],
  [/text-white text-3xl font-bold/g, 'text-[#18181b] font-playfair font-normal text-3xl'],
  [/text-white text-2xl font-bold/g, 'text-[#18181b] font-playfair font-normal text-2xl'],
  [/text-white text-xl font-bold/g, 'text-[#18181b] font-semibold text-xl'],
  [/text-white font-bold/g, 'text-[#18181b] font-semibold'],
  [/text-white\b/g, 'text-[#18181b]'],
  [/fill="white"/g, 'fill="#18181b"'],
  [/stroke="white"/g, 'stroke="#18181b"'],
  [/stroke="rgba\(255,255,255,0\.6\)"/g, 'stroke="#a1a1aa"'],
  [/\[color-scheme:dark\]/g, '[color-scheme:light]'],
  [/via-\[#1a1a2e\]/g, 'via-[#edf3fb]'],
  [/from-black/g, 'from-[#f4f7fc]'],
  [/to-black/g, 'to-[#dde7f4]'],
]

for (const f of files) {
  const p = path.join(dir, f)
  let s = fs.readFileSync(p, 'utf8')
  const orig = s
  for (const [re, rep] of pairs) s = s.replace(re, rep)

  s = s.replace(
    /fill="#18181b" \/>\s*<path d="M8 12l3 3 5-6" stroke="black"/g,
    'fill="white" /><path d="M8 12l3 3 5-6" stroke="#18181b"'
  )
  s = s.replace(
    /const color = selected \? 'white' : 'rgba\(255,255,255,0\.6\)'/g,
    "const color = selected ? 'white' : '#a1a1aa'"
  )
  s = s.replace(
    /const color = selected \? '#18181b' : '#a1a1aa'/g,
    "const color = selected ? 'white' : '#a1a1aa'"
  )
  s = s.replace(
    /\$\{isSelected \? 'text-\[#18181b\]' : 'text-\[#a1a1aa\]'\}/g,
    "${isSelected ? 'text-white' : 'text-[#18181b]'}"
  )
  s = s.replace(
    /\$\{isSelected \? 'text-\[#18181b\]' : 'text-\[#18181b\]'\}/g,
    "${isSelected ? 'text-white' : 'text-[#18181b]'}"
  )
  s = s.replace(
    /\$\{selected[^}]*\? 'text-\[#18181b\]' : 'text-\[#a1a1aa\]'\}/g,
    (m) => m.replace("text-[#18181b]'", "text-white'").replace("text-[#a1a1aa]'", "text-[#18181b]'")
  )

  if (s !== orig) {
    fs.writeFileSync(p, s)
    console.log('updated', f)
  } else {
    console.log('unchanged', f)
  }
}
