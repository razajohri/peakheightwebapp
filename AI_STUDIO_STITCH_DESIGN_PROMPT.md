# AI Studio Prompt: Apply Stitch Designs to Onboarding Pages

## 🎯 Task Overview

You have access to design files in **Stitch** (design tool). **IMPORTANT**: Stitch does NOT have exact designs for these onboarding pages, but it has **related/related designs** that share similar design patterns, aesthetics, and styles.

Your task is to:
1. **Extract design patterns** from Stitch's related designs (colors, typography, spacing, component styles, animations)
2. **Adapt those design patterns** to fit the 17 onboarding screens
3. **Apply the Stitch design language** to the existing onboarding codebase
4. **Maintain** the existing code structure and components
5. **Match** the Stitch design aesthetics and style system

---

## 📁 Existing Codebase Structure

### Core Components (Keep These - Update Styling to Match Stitch)
- `components/onboarding/ProgressHeader.tsx`
- `components/onboarding/OnboardingButton.tsx`
- `components/onboarding/OnboardingOptionCard.tsx`
- `components/onboarding/DatePicker.tsx`
- `components/onboarding/FloatingStars.tsx`
- `components/onboarding/Slider.tsx`
- `components/onboarding/Modal.tsx`

### Onboarding Screens (Update with Stitch Designs)
- `components/onboarding/Onboarding1.tsx` - Welcome/Hero
- `components/onboarding/Onboarding2.tsx` - Gender Selection
- `components/onboarding/Onboarding3.tsx` - Date of Birth
- `components/onboarding/Onboarding4.tsx` - Ethnicity
- `components/onboarding/Onboarding5.tsx` - Height & Weight
- `components/onboarding/Onboarding5B.tsx` - Dream Height
- `components/onboarding/Onboarding6.tsx` - Parents' Heights
- `components/onboarding/Onboarding7.tsx` - Hope Video
- `components/onboarding/Onboarding7A.tsx` - What Have You Tried
- `components/onboarding/Onboarding8.tsx` - Foot Size
- `components/onboarding/Onboarding9.tsx` - Workout Frequency
- `components/onboarding/Onboarding10.tsx` - Sleep Hours
- `components/onboarding/Onboarding11.tsx` - Sleep Potential
- `components/onboarding/Onboarding12.tsx` - Smoking & Drinking
- `components/onboarding/Onboarding13.tsx` - Reality of Being Short
- `components/onboarding/Onboarding13A.tsx` - Growth Graph
- `components/onboarding/Onboarding14.tsx` - Testimonials & Rating
- `components/onboarding/Onboarding15.tsx` - Analysis
- `components/onboarding/Onboarding17.tsx` - Locked Preview + CTA

### Context Provider (Keep As-Is)
- `contexts/OnboardingContext.tsx`

---

## 🎨 Instructions for Stitch Design Integration

### Step 1: Access Stitch Related Designs
1. **Connect to Stitch** and locate all available design files
2. **Identify** related designs that share similar patterns to onboarding screens:
   - Welcome/hero screens → for Onboarding1
   - Selection/choice screens → for Onboarding2, Onboarding4, Onboarding7A, Onboarding9
   - Form/input screens → for Onboarding3, Onboarding5, Onboarding6, Onboarding8, Onboarding10
   - Information/display screens → for Onboarding7, Onboarding11, Onboarding13, Onboarding13A
   - Toggle/switch screens → for Onboarding12
   - Progress/completion screens → for Onboarding14, Onboarding15, Onboarding17
3. **Extract** the following design patterns from Stitch's related designs:
   - **Design System**: Color palette, typography system, spacing scale
   - **Component Patterns**: Button styles, card designs, input field styles, slider designs
   - **Layout Patterns**: Screen structure, element positioning, spacing relationships
   - **Animation Patterns**: Transition styles, hover effects, interaction feedback
   - **Visual Style**: Glassmorphism, gradients, shadows, borders, rounded corners

### Step 2: Map Stitch Design Patterns to Onboarding Screens
For each onboarding screen:
1. **Identify** which Stitch related design best matches the screen's purpose
2. **Extract** design patterns (colors, typography, spacing, components) from that Stitch design
3. **Adapt** those patterns to fit the specific content and structure of the onboarding screen
4. **Map** Stitch design tokens to the screen's components

### Step 3: Apply Stitch Design Language
1. **Create** a unified design system from all Stitch related designs
2. **Apply** Stitch color palette across all screens
3. **Apply** Stitch typography system (fonts, sizes, weights, line heights)
4. **Apply** Stitch spacing scale (padding, margins, gaps)
5. **Apply** Stitch component styles (buttons, cards, inputs, sliders)
6. **Apply** Stitch animation patterns (timing, easing, effects)
7. **Maintain** consistency across all 17 screens using Stitch's design language

---

## 📋 Screen-by-Screen Stitch Design Pattern Mapping

**Note**: Stitch doesn't have exact designs for these screens. Find **related designs** in Stitch that share similar patterns and adapt them.

### Screen 1: Welcome / Hero
- **Find in Stitch**: Look for hero/welcome screens, landing pages, intro screens
- **Extract Patterns**: Hero layout style, image placement patterns, CTA button designs, gradient backgrounds
- **Apply**: Adapt Stitch's hero design patterns to welcome screen
- **Keep**: Existing component structure, update styling with Stitch patterns

### Screen 2: Gender Selection
- **Find in Stitch**: Look for selection screens, choice screens, option cards
- **Extract Patterns**: Card designs, selection states, hover effects, spacing between options
- **Apply**: Use Stitch's selection screen patterns for gender cards
- **Keep**: OnboardingOptionCard component, update styles with Stitch patterns

### Screen 3: Date of Birth
- **Find in Stitch**: Look for form screens, date picker screens, input screens
- **Extract Patterns**: Input field styling, date picker design, form layout
- **Apply**: Adapt Stitch's form/input patterns to date picker
- **Keep**: DatePicker component, update appearance with Stitch patterns

### Screen 4: Ethnicity Selection
- **Find in Stitch**: Look for list screens, multi-option screens, scrollable selection screens
- **Extract Patterns**: List design, card styles, scroll behavior, selection indicators
- **Apply**: Use Stitch's list/selection patterns
- **Keep**: OnboardingOptionCard, update to match Stitch patterns

### Screen 5: Height & Weight
- **Find in Stitch**: Look for slider screens, range input screens, value selection screens
- **Extract Patterns**: Slider track/thumb designs, value display styles, unit toggle designs
- **Apply**: Adapt Stitch's slider patterns
- **Keep**: Slider component, update styling with Stitch patterns

### Screen 5B: Dream Height
- **Find in Stitch**: Similar to Screen 5 - slider/range input screens
- **Extract Patterns**: Same as Screen 5, but note any "goal" or "target" styling differences
- **Apply**: Similar patterns to Screen 5 with goal-oriented styling
- **Keep**: Component structure, match Stitch slider patterns

### Screen 6: Parents' Heights
- **Find in Stitch**: Look for multi-input screens, form screens with multiple fields
- **Extract Patterns**: Two-input layout patterns, modal/info popup designs, help button styles
- **Apply**: Adapt Stitch's multi-input form patterns
- **Keep**: Slider and Modal components, update styles with Stitch patterns

### Screen 7: Hope Video
- **Find in Stitch**: Look for video player screens, media screens, content display screens
- **Extract Patterns**: Video container designs, title styling, content layout
- **Apply**: Use Stitch's media/content display patterns
- **Keep**: Video implementation, match Stitch media screen patterns

### Screen 7A: What Have You Tried?
- **Find in Stitch**: Look for multi-select screens, checkbox screens, selection grids
- **Extract Patterns**: Multi-select card designs, checkbox styles, selection states
- **Apply**: Adapt Stitch's multi-select patterns
- **Keep**: OnboardingOptionCard, update for multi-select with Stitch patterns

### Screen 8: Foot Size
- **Find in Stitch**: Look for combination input screens, slider + dropdown screens
- **Extract Patterns**: Slider + dropdown combination, input grouping patterns
- **Apply**: Use Stitch's combination input patterns
- **Keep**: Slider component, add dropdown styling from Stitch patterns

### Screen 9: Workout Frequency
- **Find in Stitch**: Look for frequency screens, interval selection screens, option cards
- **Extract Patterns**: Frequency option card designs, interval display styles
- **Apply**: Adapt Stitch's frequency/interval selection patterns
- **Keep**: OnboardingOptionCard, match Stitch patterns

### Screen 10: Sleep Hours
- **Find in Stitch**: Look for slider screens with feedback, value input with context screens
- **Extract Patterns**: Slider design, feedback card styling, contextual information display
- **Apply**: Use Stitch's slider + feedback patterns
- **Keep**: Slider component, add feedback card from Stitch patterns

### Screen 11: Sleep Potential
- **Find in Stitch**: Look for information screens, image + text layouts, educational screens
- **Extract Patterns**: Image layout patterns, text placement, information card styles
- **Apply**: Adapt Stitch's information display patterns
- **Keep**: Image component, match Stitch layout patterns

### Screen 12: Smoking & Drinking
- **Find in Stitch**: Look for toggle screens, yes/no screens, switch screens
- **Extract Patterns**: Toggle switch designs, question card styles, binary choice layouts
- **Apply**: Use Stitch's toggle/switch patterns
- **Keep**: Component structure, implement Stitch toggle patterns

### Screen 13: Reality of Being Short
- **Find in Stitch**: Look for fact cards, information cards, animated content screens
- **Extract Patterns**: Fact card designs, animation timing, card reveal patterns
- **Apply**: Adapt Stitch's card + animation patterns
- **Keep**: Animation structure, match Stitch card patterns

### Screen 13A: Growth Graph
- **Find in Stitch**: Look for graph screens, chart screens, data visualization screens
- **Extract Patterns**: Graph/chart design styles, colors, animation patterns
- **Apply**: Use Stitch's data visualization patterns
- **Keep**: SVG structure, match Stitch graph/chart patterns

### Screen 14: Testimonials & Rating
- **Find in Stitch**: Look for testimonial screens, review screens, rating screens, modal screens
- **Extract Patterns**: Testimonial card designs, rating component styles, modal styling
- **Apply**: Adapt Stitch's testimonial/rating patterns
- **Keep**: Modal component, match Stitch card patterns

### Screen 15: Analysis
- **Find in Stitch**: Look for progress screens, loading screens, completion screens
- **Extract Patterns**: Progress indicator designs, completion state styles, loading animations
- **Apply**: Use Stitch's progress/completion patterns
- **Keep**: Animation logic, match Stitch visual patterns

### Screen 17: Locked Preview + CTA
- **Find in Stitch**: Look for preview screens, locked content screens, CTA screens
- **Extract Patterns**: Preview card designs, CTA button styles, blur/overlay effects
- **Apply**: Adapt Stitch's preview/CTA patterns
- **Keep**: Component structure, match Stitch patterns

---

## 🎨 Design Pattern Extraction Checklist (From Stitch Related Designs)

**Extract design patterns from Stitch's related designs** (not exact matches, but similar screens). Build a unified design system from all related designs:

### Colors
- [ ] Background colors/gradients
- [ ] Text colors (primary, secondary)
- [ ] Card/component background colors
- [ ] Border colors
- [ ] Accent/highlight colors
- [ ] Button colors (default, hover, active)

### Typography
- [ ] Font families
- [ ] Font sizes (mobile, tablet, desktop)
- [ ] Font weights
- [ ] Line heights
- [ ] Letter spacing
- [ ] Text colors

### Spacing
- [ ] Container padding
- [ ] Element gaps
- [ ] Card padding
- [ ] Button padding
- [ ] Section margins

### Components
- [ ] Button styles (all states)
- [ ] Card styles (default, selected, hover)
- [ ] Input field styles
- [ ] Slider track and thumb styles
- [ ] Progress bar styles
- [ ] Modal/overlay styles

### Layout
- [ ] Screen structure
- [ ] Element positioning
- [ ] Responsive breakpoints
- [ ] Max widths
- [ ] Alignment

### Animations
- [ ] Transition durations
- [ ] Easing functions
- [ ] Animation types (fade, slide, scale)
- [ ] Hover effects
- [ ] Interaction feedback

### Assets
- [ ] Image placements
- [ ] Icon styles and sizes
- [ ] Illustration styles
- [ ] Background patterns

---

## 🔧 Implementation Rules

### 1. Preserve Code Structure
- **KEEP** all existing component files
- **KEEP** the same file structure
- **KEEP** the same props interfaces
- **KEEP** the same state management
- **ONLY UPDATE** styling, colors, spacing, typography

### 2. Component Updates
- **UPDATE** component styling to match Stitch
- **KEEP** component functionality
- **KEEP** component props
- **UPDATE** CSS classes to match Stitch design tokens

### 3. Design Token Mapping
Create a mapping from Stitch design tokens to Tailwind classes:
```tsx
// Example: If Stitch has "Primary Blue #3B82F6"
// Map to: bg-blue-500 or use custom color

// If Stitch has "Spacing 16px"
// Map to: p-4 or gap-4

// If Stitch has "Font Size 24px"
// Map to: text-2xl or use custom size
```

### 4. Responsive Design
- **EXTRACT** mobile, tablet, desktop designs from Stitch
- **MAP** to Tailwind breakpoints: `sm:`, `md:`, `lg:`
- **APPLY** Stitch's responsive specifications

### 5. Animations
- **EXTRACT** animation specs from Stitch
- **IMPLEMENT** using Framer Motion
- **MATCH** timing, easing, and effects exactly

---

## 📝 Implementation Steps

### Phase 1: Design Pattern Extraction
1. Access Stitch and locate **related designs** (not exact matches)
2. Identify which Stitch designs relate to which onboarding screen types:
   - Hero/welcome screens → for Screen 1
   - Selection/choice screens → for Screens 2, 4, 7A, 9
   - Form/input screens → for Screens 3, 5, 6, 8, 10
   - Information/display screens → for Screens 7, 11, 13, 13A
   - Toggle/switch screens → for Screen 12
   - Progress/completion screens → for Screens 14, 15, 17
3. Extract design patterns from related Stitch designs:
   - Build unified color palette from all related designs
   - Build unified typography system from all related designs
   - Build unified spacing scale from all related designs
   - Document component style patterns (buttons, cards, inputs, sliders)
   - Note animation patterns and specifications
4. Create a cohesive design system from all Stitch related designs
5. Export any assets (images, icons) from Stitch if applicable

### Phase 2: Design System Creation
1. Create design token mapping file
2. Convert Stitch colors to Tailwind/CSS
3. Convert Stitch typography to Tailwind classes
4. Convert Stitch spacing to Tailwind spacing
5. Document component style specifications

### Phase 3: Component Updates
1. Update ProgressHeader to match Stitch design
2. Update OnboardingButton to match Stitch button styles
3. Update OnboardingOptionCard to match Stitch card designs
4. Update DatePicker to match Stitch input styles
5. Update Slider to match Stitch slider design
6. Update Modal to match Stitch modal design

### Phase 4: Screen Updates
1. Map Stitch related designs to each onboarding screen
2. Update Onboarding1.tsx with Stitch hero/welcome design patterns
3. Update Onboarding2.tsx with Stitch selection screen design patterns
4. Update Onboarding3.tsx with Stitch form/input design patterns
5. Continue for all 17 screens, adapting Stitch patterns to each screen's content
6. Ensure consistency across all screens using the unified Stitch design system

### Phase 5: Testing & Refinement
1. Test all screens match Stitch designs
2. Verify responsive behavior matches Stitch
3. Check animations match Stitch specifications
4. Ensure color accuracy
5. Verify typography matches exactly

---

## 🎯 Success Criteria

All onboarding screens should:
1. ✅ **Use Stitch design patterns** - adapt related Stitch designs to each screen
2. ✅ **Use unified Stitch color palette** - consistent colors across all screens from Stitch
3. ✅ **Match Stitch typography system** - fonts, sizes, weights from Stitch
4. ✅ **Match Stitch spacing scale** - padding, gaps, margins from Stitch
5. ✅ **Match Stitch component styles** - buttons, cards, inputs from Stitch patterns
6. ✅ **Match Stitch animation patterns** - timing, easing, effects from Stitch
7. ✅ **Maintain code structure** - keep existing components and logic
8. ✅ **Be responsive** - adapt Stitch's responsive patterns
9. ✅ **Be consistent** - all screens should feel cohesive using Stitch's design language

---

## 💡 Key Instructions

### DO:
- ✅ Find related designs in Stitch (not exact matches)
- ✅ Extract design patterns from Stitch's related designs
- ✅ Build a unified design system from all Stitch designs
- ✅ Adapt Stitch design patterns to fit each onboarding screen
- ✅ Preserve existing code structure
- ✅ Update styling to match Stitch design language
- ✅ Use Stitch design tokens (colors, typography, spacing)
- ✅ Maintain component functionality
- ✅ Keep props interfaces the same
- ✅ Ensure consistency across all screens

### DON'T:
- ❌ Expect exact matches in Stitch (they don't exist)
- ❌ Create new designs (adapt Stitch patterns)
- ❌ Change component structure
- ❌ Modify props interfaces
- ❌ Change state management
- ❌ Alter component logic
- ❌ Use colors not from Stitch
- ❌ Use fonts not from Stitch
- ❌ Mix different design systems (use Stitch consistently)

---

## 📚 Reference Files to Study

Before applying Stitch designs, study these to understand the code structure:

1. `components/onboarding/Onboarding1.tsx` - Structure reference
2. `components/onboarding/Onboarding2.tsx` - Option cards pattern
3. `components/onboarding/Onboarding3.tsx` - Date picker pattern
4. `components/onboarding/Onboarding5.tsx` - Slider pattern
5. `components/onboarding/ProgressHeader.tsx` - Header component
6. `components/onboarding/OnboardingButton.tsx` - Button component
7. `components/onboarding/OnboardingOptionCard.tsx` - Card component

---

## 🚀 Final Instructions

1. **Access Stitch** and locate **related designs** (not exact matches - they don't exist)
2. **Identify** which Stitch designs relate to which onboarding screen types
3. **Extract** design patterns from all related Stitch designs
4. **Build** a unified design system from Stitch (colors, typography, spacing, components, animations)
5. **Map** Stitch design patterns to each onboarding screen
6. **Adapt** Stitch design patterns to fit each screen's specific content and structure
7. **Update** all 17 onboarding screens using Stitch's design language
8. **Preserve** all existing code structure and functionality
9. **Ensure** consistency across all screens using Stitch's unified design system

**Remember**: 
- Stitch doesn't have exact designs for these onboarding pages
- Find **related designs** in Stitch that share similar patterns
- Extract design patterns and adapt them to your onboarding screens
- Build a cohesive design system from all Stitch related designs
- The goal is to apply Stitch's design language and patterns to your onboarding pages!

---

**End of Prompt**
