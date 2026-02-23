# Onboarding spec: same pages & questions (Web + Mobile)

Use this as the **single source of truth** so the Peak Height web app and mobile app use the **same pages and same questions**. You can change the UI per platform; the flow and content stay in sync.

- **Config in code:** `lib/onboarding/onboardingSteps.ts` — step order, titles, options, and data keys. Mobile can copy this file or reimplement from this spec.

---

## Flow overview

| Step | Type        | Title / Question (exact) | Data key(s) |
|------|-------------|---------------------------|-------------|
| 1    | Intro       | PeakHeight — "Grow taller, naturally" | — |
| 2    | Question    | Choose your Gender        | `gender` |
| 3    | Question    | How old are you?          | `dateOfBirth` (derive `age`) |
| 4    | Question    | What is your ethnicity?   | `ethnicity` |
| 5    | Question    | What is your height & weight? | `measurementSystem`, `currentHeight`, `currentWeight`, `feet`/`inches`/`pounds` or `cm`/`kg` |
| 6    | Question    | What's your Dream Height? | `dreamHeight` / `targetHeight`, `dreamFeet`/`dreamInches` or `dreamCm` |
| 7    | Question    | How tall are your parents? | `parentHeight` (father/mother in cm), `fatherFeet`/`fatherInches`/`motherFeet`/`motherInches` or `fatherCm`/`motherCm`, `parentMeasurementSystem`; **optional Skip** |
| 8    | Info        | Height isn't just inherited, it's earned. | — |
| 9    | Question    | What have you tried? (Select all that apply) | `triedOptions` (array) |
| 10   | Question    | What is your foot size?   | `footSize`, `footSizeSystem` |
| 11   | Question    | How often do you work out? | `workoutFrequency` |
| 12   | Question    | How many hours do you sleep? | `sleepHours` |
| 13   | Info        | Losing Height Potential Every Night? | — |
| 14   | Question    | Do you smoke or drink alcohol? | `smokingStatus`, `drinkingStatus` |
| 15   | Info        | The reality of being short | — |
| 16   | Info        | How tall will you actually grow? (chart) | — |
| 17   | Info        | Leave a Rating (optional) | — |
| 18   | Info        | We're setting everything up for you (loading) | — |
| 19   | CTA         | Unlock Your Growth Potential (report ready → Sign up) | — |
| 20   | Auth        | Sign up / Sign in         | — |
| 21   | Paywall     | Subscribe                 | — |
| 22   | Complete    | You're All Set!           | — |

---

## Step-by-step: titles, subtitles, options, validation

### Step 1 — Intro
- **Title:** PeakHeight  
- **Subtitle:** Grow taller, naturally  
- **CTA:** Start Onboarding  
- **Data:** None  

---

### Step 2 — Gender
- **Title:** Choose your Gender  
- **Subtitle:** This will be used to calibrate your custom plan.  
- **Options (single select):** Female | Male | Other  
- **Data key:** `gender` (values: `'female'` | `'male'` | `'other'`)  

---

### Step 3 — Age
- **Title:** How old are you?  
- **Subtitle:** Choose your date of birth  
- **Input:** Date picker (date of birth)  
- **Data key:** `dateOfBirth` (ISO string). Backend can derive `age`.  
- **Note:** Web shows under-18 warning; mobile may do the same.  

---

### Step 4 — Ethnicity
- **Title:** What is your ethnicity?  
- **Subtitle:** This helps us personalize your growth plan  
- **Options (single select):**  
  Asian | Black/African | Caucasian/White | Hispanic/Latino | Mixed/Other | Prefer not to say  
- **Data key:** `ethnicity` (string)  

---

### Step 5 — Height & weight
- **Title:** What is your height & weight?  
- **Unit toggle:** Imperial | Metric  
- **Imperial:** feet, inches, pounds  
- **Metric:** cm, kg  
- **Data keys:** `measurementSystem`, `currentHeight` (cm), `currentWeight` (kg), `feet`, `inches`, `pounds`, `cm`, `kg`  
- **Validation:** Height and weight required (non-zero).  

---

### Step 6 — Dream height
- **Title:** What's your Dream Height?  
- **Unit toggle:** ft/in | cm  
- **Input:** Slider or picker (imperial: feet/inches; metric: cm)  
- **Data keys:** `dreamHeight` / `targetHeight` (cm), `dreamFeet`, `dreamInches`, `dreamCm`  

---

### Step 7 — Parent heights
- **Title:** How tall are your parents?  
- **Unit toggle:** Imperial | Metric  
- **Inputs:** Father height, Mother height (same unit system)  
- **Data keys:** `parentHeight` (father/mother in cm), `fatherFeet`, `fatherInches`, `motherFeet`, `motherInches`, `fatherCm`, `motherCm`, `parentMeasurementSystem`  
- **Optional:** "Skip" — store nulls for parent heights.  

---

### Step 8 — Info (no question)
- **Title:** Height isn't just inherited, **it's earned.**  
- **Body (typing effect):** The right daily routine can unlock hidden growth potential.  
- **Data:** None  

---

### Step 9 — What have you tried?
- **Title:** What have you tried?  
- **Subtitle:** Select all that apply  
- **Options (multi-select):** Supplements | Exercises | Diet changes | Posture correction | Nothing yet  
- **Data key:** `triedOptions` (array of: `'supplements'` | `'exercises'` | `'diet'` | `'posture'` | `'nothing'`)  

---

### Step 10 — Foot size
- **Title:** What is your foot size?  
- **Subtitle:** This helps us track your growth progress  
- **Unit toggle:** US | EU | UK  
- **Input:** Slider — US 5–15 (step 0.5), EU 35–50, UK 4–14  
- **Data keys:** `footSize` (number), `footSizeSystem` (`'us'` | `'eu'` | `'uk'`)  

---

### Step 11 — Workout frequency
- **Title:** How often do you work out?  
- **Subtitle (web):** This will be used to calibrate your custom plan.  
- **Options (single select):** 0–2 times a week | 3–4 times a week | 5–7 times a week  
- **Data key:** `workoutFrequency` (`'0-2'` | `'3-4'` | `'5-7'`)  

---

### Step 12 — Sleep hours
- **Title:** How many hours do you sleep?  
- **Subtitle:** This helps us optimize your growth plan  
- **Input:** Slider 3–12 hours, step 0.5  
- **Data key:** `sleepHours` (number)  
- **Optional UI:** Feedback text (e.g. &lt;7, 7–9, 9+).  

---

### Step 13 — Info (no question)
- **Title:** Losing Height Potential Every Night?  
- **Body:** Sleeping 8+ hours a day boosts growth hormone production by up to 75%, directly impacting height potential and testosterone level.  
- **Data:** None  

---

### Step 14 — Smoke / drink
- **Title:** Do you smoke or drink alcohol?  
- **Questions:**  
  - Do you smoke? Yes / No → `smokingStatus` (boolean)  
  - Do you drink alcohol? Yes / No → `drinkingStatus` (boolean)  
- **Data keys:** `smokingStatus`, `drinkingStatus`  
- **Optional:** Info text when Yes to either.  

---

### Step 15 — Info (no question)
- **Title:** The reality of being short  
- **Body (bullets):**  
  - 90% Women prefer tall man.  
  - Overlooked for leadership roles.  
  - Rejected before conversation starts.  
  - Mocked by friends casually.  
  - Paid less for same work.  
- **Footer:** "We built this app because we faced the same issues growing up."  
- **Data:** None  

---

### Step 16 — Info (chart)
- **Title:** How tall will you actually grow?  
- **Content:** Chart: "Without optimization" vs "With AI prediction" (+4" example), 87% Accuracy Rate, 2.4" Avg Growth.  
- **Data:** None  

---

### Step 17 — Leave a Rating (optional)
- **Title:** Leave a Rating  
- **Subtitle:** This helps us bring you more of what you love  
- **Content:** Testimonial cards; optional rating modal.  
- **Data:** None (or optional rating send to store/backend).  
- **Note:** Mobile may use native rate dialog or skip.  

---

### Step 18 — Loading
- **Title:** We're setting everything up for you  
- **Content:** Progress % and steps: Calculating growth potential… / Analyzing your profile… / Creating custom plan… / Setting up tracking…  
- **Data:** None  

---

### Step 19 — Report ready / CTA to auth
- **Title:** Unlock Your **Growth Potential**  
- **Subtitle:** Based on your answers, we've created a personalized plan just for you  
- **Content:** Height Now → Goal; benefits list (Personalized Growth Plan, 200+ Growth Exercises, Nutrition Guide, Sleep Optimization, Progress Tracking)  
- **CTA:** Start My Journey (triggers Sign up)  
- **Data:** None (uses existing onboarding data).  

---

### Step 20 — Auth
- **Purpose:** Sign up / Sign in (Apple, Google, email, etc.)  
- **Data:** Handled by auth; link user to onboarding data.  

---

### Step 21 — Paywall
- **Purpose:** Subscribe (e.g. weekly / monthly / yearly via RevenueCat).  
- **Data:** Subscription state.  

---

### Step 22 — Complete
- **Title:** You're All Set! (or equivalent)  
- **Purpose:** Save onboarding to backend, then go to dashboard/home.  
- **Data:** Persist all onboarding answers to user profile.  

---

## Data model (for backend / Supabase)

**Same fields in web and mobile** so one DB works for both. Use the keys below in your app; `lib/services/user.ts` maps them to DB columns.

### App (camelCase) → DB (snake_case)

| App field | DB column | Notes |
|-----------|-----------|--------|
| `gender` | `gender` | female, male, other |
| `dateOfBirth` | `date_of_birth` | ISO date (preferred); or derive from `age` |
| `age` | (→ `date_of_birth`) | Approximate year |
| `currentHeight` | `current_height` | cm |
| `currentWeight` | `current_weight` | kg |
| `targetHeight` or `dreamHeight` | `target_height` | cm |
| `parentHeightFather` or `parentHeight.father` | `parent_height_father` | cm |
| `parentHeightMother` or `parentHeight.mother` | `parent_height_mother` | cm |
| `fatherCm`, `motherCm`, `fatherFeet`, etc. | `father_cm`, `mother_cm`, `father_feet`, ... | Optional |
| `parentMeasurementSystem` | `parent_measurement_system` | |
| `ethnicity` | `ethnicity` | |
| `footSize` | `foot_size` | |
| `footSizeSystem` | `foot_size_system` | us, eu, uk |
| `workoutFrequency` | `workout_frequency` | 0-2→rarely, 3-4→sometimes, 5-7→often |
| `sleepHours` | `sleep_hours` | |
| `smokingStatus` | `smoking_status` | boolean |
| `drinkingStatus` | `drinking_status` | boolean |
| `triedOptions` | `tried_options` | string[] |
| `barriers` | `barriers` | string[] (if used) |
| `motivation` | `motivation` | (if used) |
| `userName` | `display_name`, `first_name`, `last_name` | |

**Shared type:** `lib/onboarding/types.ts` defines `OnboardingData` with these fields. Use it in web and (if you port it) in mobile so payloads stay identical.

---

## Summary

- **Total steps:** 22  
- **Question steps (user input):** 2 (Gender), 3 (Age), 4 (Ethnicity), 5 (Height & weight), 6 (Dream height), 7 (Parent heights), 9 (What have you tried?), 10 (Foot size), 11 (Workout frequency), 12 (Sleep), 14 (Smoke/drink).  
- **Info/CTA steps (no or optional input):** 1, 8, 13, 15, 16, 17, 18, 19.  
- **System steps:** 20 (Auth), 21 (Paywall), 22 (Complete).  

Use this spec to implement the **same pages and same questions** in the mobile app; only the UI (layout, components, animations) should differ.
