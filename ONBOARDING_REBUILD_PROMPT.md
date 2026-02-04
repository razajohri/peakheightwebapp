# Complete Onboarding Rebuild Prompt - A to Z
## Premium Mobile-First Onboarding Flow with Animations

---

## 🎯 Project Overview

Build a premium, mobile-first onboarding experience for PeakHeight - a height growth app. The onboarding should feel luxurious, modern, and engaging with smooth animations, glassmorphism effects, and a cohesive design system.

**Platform**: Next.js 14+ (App Router)  
**Framework**: React with TypeScript  
**Animations**: Framer Motion  
**Styling**: Tailwind CSS  
**Total Screens**: 19 sequential onboarding steps

---

## 🎨 Design System & Visual Language

### Color Palette
- **Background**: `bg-gradient-to-br from-black via-[#0a0a0a] to-black`
- **Primary Text**: `text-white`
- **Secondary Text**: `text-white/60` to `text-white/80`
- **Cards**: `bg-white/5` to `bg-white/10` with `backdrop-blur-sm` or `backdrop-blur-md`
- **Borders**: `border-white/10` to `border-white/20`
- **Accents**: White gradients with opacity variations

### Typography
- **Headings**: `font-bold` or `font-black`, responsive sizes: `text-3xl sm:text-4xl md:text-5xl`
- **Body**: `font-medium` to `font-semibold`, `text-sm sm:text-base md:text-lg`
- **Labels**: `text-xs` to `text-sm`, `text-white/50` to `text-white/60`

### Spacing & Layout
- **Container Padding**: `px-4 sm:px-6 md:px-8`
- **Vertical Spacing**: `py-6 sm:py-8`
- **Card Padding**: `p-5 sm:p-6 md:p-7`
- **Gap Between Elements**: `gap-4 sm:gap-5 md:gap-6`
- **Max Width**: `max-w-md mx-auto` for content areas

### Border Radius
- **Cards**: `rounded-2xl`
- **Buttons**: `rounded-2xl`
- **Small Elements**: `rounded-xl`

### Glassmorphism Effects
- **Light Glass**: `bg-white/5 backdrop-blur-sm border-2 border-white/10`
- **Medium Glass**: `bg-white/8 backdrop-blur-md border-2 border-white/15`
- **Heavy Glass**: `bg-white/10 backdrop-blur-md border-2 border-white/20`

### Animations
- **Page Transitions**: Fade in + slide up (`opacity: 0 → 1`, `y: 20 → 0`)
- **Card Hover**: Scale up (`scale: 1 → 1.02`), lift (`y: 0 → -2`)
- **Button Press**: Scale down (`scale: 1 → 0.98`)
- **Progress Bar**: Smooth width animation with gradient shimmer
- **Selection**: Scale + rotate checkmark animation
- **Background Gradients**: Slow floating animation (15-25s duration)

---

## 📱 Core Components Specification

### 1. ProgressHeader Component

**Purpose**: Shows current step progress and back button

**Features**:
- Animated progress bar with gradient fill
- Step counter (current/total)
- Back button with glassmorphism
- Smooth progress animation on step change

**Design**:
```tsx
- Back button: Circular, glassmorphism, hover effects
- Progress bar: Height 1.5-2px, white gradient fill, shimmer effect
- Step counter: Tabular numbers, white/60 text
- Padding: pt-safe-top pt-6 sm:pt-8, px-4 sm:px-6 md:px-8
```

**Animations**:
- Progress bar width animates from 0 to target percentage
- Shimmer effect continuously moves across progress bar
- Back button scales on press

---

### 2. OnboardingButton Component

**Purpose**: Primary action button

**Variants**:
- **Primary**: White gradient background with shine effect
- **Secondary**: Glassmorphism with border

**Design**:
```tsx
Primary:
- Background: gradient-to-r from-white via-white to-gray-50
- Shine effect: Animated gradient sweep
- Text: Black, bold, responsive sizing
- Height: min-h-[56px] sm:min-h-[60px] md:min-h-[64px]
- Border radius: rounded-2xl
- Disabled: opacity-50

Secondary:
- Background: bg-white/5 backdrop-blur-sm
- Border: border-2 border-white/20
- Text: White, semibold
- Hover: border-white/30, bg-white/8
```

**Animations**:
- Hover: scale 1.02
- Press: scale 0.98
- Shine sweep: 2s duration, infinite with delay

---

### 3. OnboardingOptionCard Component

**Purpose**: Selectable option cards (for gender, ethnicity, etc.)

**Design**:
```tsx
Default State:
- Background: bg-white/5 backdrop-blur-sm
- Border: border-2 border-white/10
- Padding: p-5 sm:p-6 md:p-7
- Border radius: rounded-2xl

Selected State:
- Background: bg-white/10 backdrop-blur-md
- Border: border-white
- Shadow: shadow-lg shadow-white/10
- Checkmark: Animated scale + rotate

Hover State:
- Scale: 1.02
- Y: -2px
- Border: border-white/20
- Background: bg-white/8
```

**Animations**:
- Hover: scale + lift
- Selection: Checkmark scales from 0 with rotation
- Background glow fades in on selection

---

### 4. DatePicker Component

**Purpose**: Date selection with expandable picker

**Design**:
```tsx
Trigger Button:
- Glassmorphism card
- Icon on left (calendar)
- Date display in center
- Chevron on right (rotates on open)

Picker Panel:
- Animated expand/collapse
- Three select dropdowns (Month, Day, Year)
- Glassmorphism background
- Smooth height animation
```

**Animations**:
- Panel: Height 0 → auto, opacity fade, y slide
- Chevron: Rotate 0 → 180 degrees
- Smooth transitions: 0.3s duration

---

### 5. FloatingStars Component

**Purpose**: Animated background stars

**Design**:
- 30-50 stars randomly positioned
- Varying sizes (1-3px)
- White with glow effect
- Opacity animation (0.3 → 1 → 0.2)
- Different durations (2-4s)
- Infinite loop

---

## 📋 Screen-by-Screen Specifications

### Screen 1: Welcome / Hero

**Layout**:
- Full screen hero
- Brand wordmark at top
- Hero image in center
- Swipe button at bottom
- Login link below button

**Elements**:
- **Title**: "PEAKHEIGHT" - Large, bold, white
- **Subtitle**: Feature list with bullets
- **Hero Image**: `/assets/imnotnew.webp` - Responsive sizing
- **Swipe Button**: Custom swipe-to-continue interaction
- **Login Link**: "Already have an account?" - Underlined, subtle

**Animations**:
- Title: Fade in + scale up
- Image: Spring animation from bottom
- Swipe button: Fade in from bottom
- Background gradients: Slow floating motion

**Swipe Button Details**:
- Track: Glassmorphism bar
- Thumb: White circular button with arrow
- Progress fill: Gradient that fills as user swipes
- Completion threshold: 75%
- Arrow animates when progress > 50%

---

### Screen 2: Gender Selection

**Layout**:
- Progress header
- Title + subtitle centered
- Three option cards (Female, Male, Other)
- Continue button at bottom

**Elements**:
- **Title**: "Choose your Gender"
- **Subtitle**: "This helps us personalize your growth plan"
- **Cards**: OnboardingOptionCard components
- **Button**: Disabled until selection made

**Animations**:
- Cards: Staggered fade in (0.1s delay each)
- Selection: Checkmark animation
- Card hover: Lift effect

---

### Screen 3: Date of Birth

**Layout**:
- Progress header
- Title + subtitle
- DatePicker component centered
- Continue button

**Elements**:
- **Title**: "How old are you?"
- **Subtitle**: "Select your date of birth"
- **DatePicker**: Expandable with month/day/year selects

**Animations**:
- DatePicker: Fade in + slide up
- Panel expand: Smooth height animation
- Chevron rotation

---

### Screen 4: Ethnicity Selection

**Layout**:
- Progress header
- Title + subtitle
- Scrollable list of ethnicity options
- Continue button

**Elements**:
- **Title**: "What's your ethnicity?"
- **Subtitle**: "This helps us understand genetic factors"
- **Options**: List of ethnicity cards (single select)
- **Scrollable**: If many options

**Design**:
- Use OnboardingOptionCard for each option
- Scrollable container if needed
- Selected state with checkmark

---

### Screen 5: Current Height & Weight

**Layout**:
- Progress header
- Title + subtitle
- Unit toggle (Imperial/Metric)
- Height slider
- Weight slider
- Continue button

**Elements**:
- **Title**: "What's your current height?"
- **Unit Toggle**: Switch between ft/in and cm
- **Height Slider**: Custom slider component
- **Weight Slider**: Custom slider component
- **Display**: Large number display showing current value

**Design**:
- Sliders: Glassmorphism track, white thumb
- Value display: Large, bold numbers
- Unit toggle: Toggle switch style

**Animations**:
- Slider thumb: Smooth movement
- Value display: Number count animation
- Unit toggle: Slide animation

---

### Screen 5B: Dream Height

**Layout**:
- Progress header
- Title + subtitle
- Unit toggle
- Dream height slider
- Continue button

**Elements**:
- **Title**: "What's your dream height?"
- **Subtitle**: "Set your growth goal"
- **Slider**: Similar to Screen 5
- **Motivational text**: "You can achieve this!"

**Design**:
- Similar to Screen 5
- More motivational messaging
- Goal-oriented language

---

### Screen 6: Parents' Heights

**Layout**:
- Progress header
- Title + subtitle
- Modal explanation (optional)
- Father's height input
- Mother's height input
- Continue button

**Elements**:
- **Title**: "Parents' Heights"
- **Subtitle**: "This helps predict your potential"
- **Info Button**: Opens modal explaining why
- **Input Fields**: Height sliders for each parent
- **Optional**: Allow "Don't know" option

**Design**:
- Two input cards side by side (mobile: stacked)
- Glassmorphism cards
- Info icon with tooltip/modal

---

### Screen 7: Hope Video

**Layout**:
- Progress header
- Title
- Video player (autoplay, muted, playsInline)
- Continue button

**Elements**:
- **Title**: "Height isn't just inherited, it's earned"
- **Video**: Embedded video player
- **Autoplay**: Muted, playsInline for mobile

**Design**:
- Video container: Rounded corners, glassmorphism border
- Full width on mobile, constrained on desktop
- Aspect ratio: 16:9

**Animations**:
- Video fades in
- Title animates in

---

### Screen 7A: What Have You Tried?

**Layout**:
- Progress header
- Title + subtitle
- Multi-select option cards
- Continue button

**Elements**:
- **Title**: "What have you tried before?"
- **Subtitle**: "Select all that apply"
- **Options**: Multi-select cards (e.g., "Supplements", "Exercises", "Diet", etc.)

**Design**:
- Cards can have multiple selected
- Selected: Border + background change
- Checkmark appears on selection

---

### Screen 8: Foot Size

**Layout**:
- Progress header
- Title + subtitle
- Foot size slider
- Shoe size system selector
- Continue button

**Elements**:
- **Title**: "What's your foot size?"
- **Slider**: Foot length in cm or inches
- **Shoe Size**: Dropdown for US/UK/EU sizes

**Design**:
- Slider + dropdown combination
- Visual foot size indicator (optional)

---

### Screen 9: Workout Frequency

**Layout**:
- Progress header
- Title + subtitle
- Frequency option cards
- Continue button

**Elements**:
- **Title**: "How often do you work out?"
- **Options**: "Never", "1-2 times/week", "3-4 times/week", "5+ times/week"

**Design**:
- Single select cards
- Use OnboardingOptionCard

---

### Screen 10: Sleep Hours

**Layout**:
- Progress header
- Title + subtitle
- Sleep hours slider
- Feedback message based on value
- Continue button

**Elements**:
- **Title**: "How many hours do you sleep?"
- **Slider**: 4-12 hours range
- **Feedback**: Dynamic message (e.g., "Great!" for 7-9 hours)

**Design**:
- Slider with hour markers
- Feedback card that updates
- Color-coded feedback (green for optimal)

**Animations**:
- Feedback message fades in/out on change
- Slider smooth movement

---

### Screen 11: Sleep Potential

**Layout**:
- Progress header
- Title + subtitle
- Image display (trust signal)
- Continue button

**Elements**:
- **Title**: "Sleep is crucial for growth"
- **Image**: Educational/inspirational image
- **Text**: Brief explanation about sleep and growth

**Design**:
- Large image display
- Text overlay or below image
- Trust-building content

---

### Screen 12: Smoking & Drinking

**Layout**:
- Progress header
- Title + subtitle
- Two toggle switches
- Continue button

**Elements**:
- **Title**: "Lifestyle Questions"
- **Toggles**: 
  - "Do you smoke?" (Yes/No)
  - "Do you drink alcohol?" (Yes/No)

**Design**:
- Modern toggle switches
- Glassmorphism cards for each question
- Clear labels

---

### Screen 13: Reality of Being Short

**Layout**:
- Progress header
- Title
- Animated facts display
- Continue button

**Elements**:
- **Title**: "The reality of being short"
- **Facts**: Rotating/animating fact cards
- **Content**: Empathetic, understanding tone

**Design**:
- Cards that animate in sequence
- Fade transitions between facts
- Emotional, supportive messaging

**Animations**:
- Facts fade in/out in sequence
- Smooth transitions
- 3-5 second intervals

---

### Screen 13A: Growth Graph

**Layout**:
- Progress header
- Title + subtitle
- Animated SVG graph
- Continue button

**Elements**:
- **Title**: "Your growth potential"
- **Graph**: Animated line/bar chart
- **Animation**: Graph draws itself on load

**Design**:
- SVG-based graph
- Smooth line drawing animation
- Data visualization showing potential

**Animations**:
- Graph line draws from left to right
- Data points animate in
- Smooth, professional animation

---

### Screen 14: Testimonials & Rating

**Layout**:
- Progress header
- Title
- Testimonial cards
- Rating modal trigger
- Continue button

**Elements**:
- **Title**: "See what others say"
- **Testimonials**: 2-3 review cards
- **Rating Button**: "Rate us on App Store"
- **Modal**: Rating request (soft CTA)

**Design**:
- Testimonial cards with avatars
- Star ratings displayed
- Modal: Glassmorphism overlay
- Non-intrusive rating request

**Animations**:
- Testimonials fade in staggered
- Modal: Scale + fade in
- Smooth overlay backdrop

---

### Screen 15: Analysis

**Layout**:
- Progress header
- Title
- Progress indicator animation
- "Analyzing..." text
- Completion state

**Elements**:
- **Title**: "Analyzing your answers"
- **Progress**: Animated progress bar or spinner
- **Status**: "Analyzing..." → "Complete!"
- **Animation**: 3-5 second analysis simulation

**Design**:
- Loading animation (spinner or progress)
- Smooth transition to completion
- Success state with checkmark

**Animations**:
- Progress fills from 0 to 100%
- Spinner rotates (if used)
- Completion: Checkmark scales in
- Smooth state transition

---

### Screen 17: Locked Preview + CTA

**Layout**:
- Progress header
- Title + subtitle
- Locked report preview (blurred)
- "Create Account" CTA button
- Skip option (optional)

**Elements**:
- **Title**: "Your personalized report is ready"
- **Preview**: Blurred/locked report image
- **CTA**: Large, prominent "Create Account" button
- **Text**: "Sign up to unlock your full report"

**Design**:
- Preview card with blur overlay
- Lock icon overlay
- Large, gradient CTA button
- Enticing but not pushy

**Animations**:
- Preview fades in
- Blur effect (CSS or image)
- CTA button: Pulse or glow effect
- Hover: Scale up

---

## 🎬 Animation Guidelines

### Page Transitions
- **Enter**: `opacity: 0 → 1`, `y: 20 → 0`
- **Duration**: 0.5s
- **Easing**: `easeOut`
- **Stagger**: 0.1s delay between elements

### Interactive Elements
- **Hover**: Scale 1.02, lift 2px
- **Press**: Scale 0.98
- **Selection**: Scale + rotate checkmark
- **Smooth**: Spring animations for natural feel

### Background Animations
- **Gradients**: 15-25s duration, infinite loop
- **Stars**: 2-4s opacity pulse, infinite
- **Shimmer**: 1.5-2s sweep, infinite with delay

### Progress Indicators
- **Progress Bar**: Smooth width animation (0.5s)
- **Shimmer**: Continuous sweep effect
- **Step Counter**: Number updates smoothly

---

## 📐 Responsive Breakpoints

### Mobile (Default)
- Padding: `px-4 py-6`
- Text: `text-3xl` (headings), `text-sm` (body)
- Cards: `p-5`
- Max width: Full width

### Tablet (sm: 640px+)
- Padding: `px-6 py-8`
- Text: `text-4xl` (headings), `text-base` (body)
- Cards: `p-6`
- Max width: `max-w-md`

### Desktop (md: 1024px+)
- Padding: `px-8 py-10`
- Text: `text-5xl` (headings), `text-lg` (body)
- Cards: `p-7`
- Max width: `max-w-lg` or `max-w-xl`

---

## 🔧 Technical Requirements

### Dependencies
```json
{
  "framer-motion": "^10.x",
  "next": "^14.x",
  "react": "^18.x",
  "typescript": "^5.x",
  "tailwindcss": "^3.x"
}
```

### File Structure
```
components/onboarding/
  ├── ProgressHeader.tsx
  ├── OnboardingButton.tsx
  ├── OnboardingOptionCard.tsx
  ├── DatePicker.tsx
  ├── FloatingStars.tsx
  ├── Slider.tsx (for height/weight inputs)
  ├── Onboarding1.tsx
  ├── Onboarding2.tsx
  ├── ... (Onboarding3-17)
  └── index.ts
```

### Context Provider
- Use `OnboardingContext` for state management
- Persist to localStorage
- Handle step navigation
- Store form data

### Safe Area Support
- Use `pt-safe-top` and `pb-safe-bottom` for iOS notches
- Test on iPhone with notch
- Ensure content doesn't clip

---

## ✅ Quality Checklist

### Design
- [ ] Consistent glassmorphism throughout
- [ ] Smooth animations on all interactions
- [ ] Proper spacing and typography hierarchy
- [ ] Responsive on all screen sizes
- [ ] Safe area support for iOS

### Functionality
- [ ] All inputs validate correctly
- [ ] Progress tracking works
- [ ] Back navigation functions
- [ ] Data persists to localStorage
- [ ] Smooth transitions between screens

### Performance
- [ ] Images optimized (WebP, lazy loading)
- [ ] Animations use GPU acceleration
- [ ] No layout shifts
- [ ] Fast initial load
- [ ] Smooth 60fps animations

### Accessibility
- [ ] Proper ARIA labels
- [ ] Keyboard navigation support
- [ ] Focus states visible
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader friendly

---

## 🚀 Implementation Order

1. **Phase 1**: Core Components
   - ProgressHeader
   - OnboardingButton
   - OnboardingOptionCard
   - FloatingStars
   - DatePicker

2. **Phase 2**: Input Components
   - Slider component
   - Toggle switches
   - Multi-select cards

3. **Phase 3**: Screens 1-5
   - Welcome
   - Gender
   - Date of Birth
   - Ethnicity
   - Height & Weight

4. **Phase 4**: Screens 5B-10
   - Dream Height
   - Parents' Heights
   - Video
   - What Have You Tried
   - Foot Size
   - Workout Frequency
   - Sleep Hours

5. **Phase 5**: Screens 11-17
   - Sleep Potential
   - Smoking/Drinking
   - Reality of Being Short
   - Growth Graph
   - Testimonials
   - Analysis
   - Locked Preview

6. **Phase 6**: Polish & Testing
   - Animation timing adjustments
   - Responsive testing
   - Performance optimization
   - Accessibility audit

---

## 💡 Key Principles

1. **Premium Feel**: Every element should feel high-quality and polished
2. **Smooth Animations**: No jank, everything should be buttery smooth
3. **Mobile First**: Optimize for mobile, enhance for desktop
4. **Consistent Design**: Use the design system throughout
5. **User Delight**: Surprise and delight users with thoughtful animations
6. **Performance**: Fast loading, smooth interactions
7. **Accessibility**: Usable by everyone

---

## 📝 Notes for AI Implementation

- Use Framer Motion for all animations
- Implement glassmorphism with Tailwind's backdrop-blur
- Create reusable components for consistency
- Test on real mobile devices
- Optimize images and assets
- Use TypeScript for type safety
- Follow the design system strictly
- Add loading states where appropriate
- Handle edge cases (no selection, invalid input, etc.)
- Make it feel premium and polished

---

**End of Prompt**
