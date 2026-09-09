const fs = require('fs')
const path = require('path')
const dir = path.join(__dirname, '..', 'components/onboarding')

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.tsx'))) {
  const p = path.join(dir, f)
  let s = fs.readFileSync(p, 'utf8')
  const o = s
  s = s.split('[&::-webkit-slider-thumb]:bg-white').join(
    '[&::-webkit-slider-thumb]:bg-[#18181b] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white'
  )
  s = s.split("? 'bg-white text-black'").join("? 'bg-[#18181b] text-white'")
  s = s.split("? 'bg-zinc-100 text-[#18181b]'").join("? 'bg-[#18181b] text-white'")
  s = s
    .split("? 'border-[#18181b] bg-zinc-100 text-[#18181b]'")
    .join("? 'border-[#18181b] bg-[#18181b] text-white'")
  if (s !== o) {
    fs.writeFileSync(p, s)
    console.log('fixed', f)
  }
}
