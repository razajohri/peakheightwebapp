# PeakHeight Web Funnel - Product Requirements Document

## Overview

**Goal:** Create a web funnel to drive TikTok traffic through onboarding and payment on web, avoiding Apple's 30% commission.

**User Flow:**
```
TikTok Ad → Landing Page → Web Onboarding (19 steps) → Auth → Paywall (Stripe) → Dashboard → Download iOS/Android App
```

**Key Requirement:** Single unified Supabase database for web, iOS, and Android. Users who sign up on web can sign in on mobile with the same credentials and have premium status sync automatically.

---

## Tech Stack

- **Frontend:** Next.js (already set up)
- **Auth:** Supabase Auth (Apple Sign-In + Email/Password)
- **Database:** Supabase PostgreSQL (same as mobile: `ffdtcjigdccrbxjcizko.supabase.co`)
- **Payments:** Stripe (web payments to avoid Apple's 30% fee)
- **Mobile Apps:** React Native/Expo (existing)

---

## Current State

### Already Built ✅

1. **Landing Page** (`/app/page.tsx`)
   - Hero section with app preview
   - Features section
   - Testimonials
   - How it works
   - FAQ
   - App Store/Play Store links

2. **Web Onboarding** (`/app/onboarding/page.tsx`)
   - 19-step flow matching mobile app
   - All screens implemented in `/components/onboarding/`
   - OnboardingContext for state management
   - LocalStorage persistence

3. **Supabase Integration**
   - Same database as mobile app
   - Client configured in `/lib/supabase/client.ts`

### Needs Implementation 🚧

1. **Auth Page** (`/app/auth/page.tsx`) - Currently placeholder
2. **Paywall Page** (`/app/paywall/page.tsx`) - Does not exist
3. **Dashboard Page** (`/app/dashboard/page.tsx`) - Does not exist
4. **Stripe Integration** - Not set up
5. **Flow Connection** - Auth → Paywall → Dashboard

---

## Onboarding Flow (19 Steps)

| Step | Screen | Purpose |
|------|--------|---------|
| 1 | Onboarding1 | Welcome / Gender selection |
| 2 | Onboarding2 | Age input |
| 3 | Onboarding3 | Current height |
| 4 | Onboarding4 | Target/dream height |
| 5 | Onboarding5 | Parent heights |
| 6 | Onboarding5B | Additional parent info |
| 7 | Onboarding6 | Ethnicity |
| 8 | Onboarding7 | Motivation |
| 9 | Onboarding7A | Additional motivation |
| 10 | Onboarding8 | Sleep habits |
| 11 | Onboarding9 | Exercise frequency |
| 12 | Onboarding10 | Barriers |
| 13 | Onboarding11 | What they've tried |
| 14 | Onboarding12 | Lifestyle (smoking/drinking) |
| 15 | Onboarding13 | AI Analysis loading |
| 16 | Onboarding13A | Results preview |
| 17 | Onboarding14 | Growth potential |
| 18 | Onboarding15 | Personalized plan preview |
| 19 | Onboarding17 | Final CTA → Auth |

---

## Phase 1: Authentication System

### Requirements

1. **Apple Sign-In (Web)**
   - Use Supabase OAuth with Apple provider
   - Configure in Supabase Dashboard
   - Same Apple credentials work on mobile

2. **Email/Password Auth**
   - Sign up with email, password, first name, last name
   - Sign in for returning users
   - Match mobile UI style (black/white theme)

3. **Auth Flow**
   - After onboarding step 19, redirect to auth
   - Store onboarding data in localStorage before auth
   - After auth success, save onboarding data to Supabase `users` table
   - Redirect to paywall

### UI Components Needed

- `AppleSignInButton.tsx`
- `EmailAuthForm.tsx` (sign up / sign in modes)
- Auth page layout matching mobile style

### Database Fields (users table)

```sql
-- Already exists, onboarding saves to these fields:
- id (UUID, from Supabase Auth)
- email
- display_name
- first_name
- last_name
- date_of_birth
- gender
- current_height
- target_height
- parent_height_father
- parent_height_mother
- ethnicity
- motivation
- barriers
- workout_frequency
- sleep_hours
- smoking_status
- drinking_status
- onboarding_completed (boolean)
- premium_status (boolean)
- premium_expires_at (timestamp)
```

---

## Phase 2: Stripe Paywall

### Requirements

1. **Stripe Products**
   - Weekly subscription (~$9.99/week)
   - Yearly subscription (~$49.99/year) - highlighted as best value

2. **Checkout Flow**
   - Display pricing cards
   - Stripe Checkout for payment
   - Handle success/cancel redirects

3. **Webhook Handler**
   - Listen for `checkout.session.completed`
   - Update Supabase `user_subscriptions` table
   - Set `premium_status = true` in `users` table

### UI Components Needed

- `PricingCard.tsx`
- `PaywallPage.tsx` with trust indicators, features list, pricing

### Pricing Display

```
┌─────────────────────────────────────┐
│  MOST POPULAR                       │
│  ────────────────                   │
│  Yearly Plan                        │
│  $49.99/year                        │
│  Save 60%                           │
│  ✓ All premium features             │
│  ✓ AI height predictions            │
│  ✓ Personalized plans               │
│  [Start Free Trial]                 │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Weekly Plan                        │
│  $9.99/week                         │
│  ✓ All premium features             │
│  [Subscribe]                        │
└─────────────────────────────────────┘
```

---

## Phase 3: Dashboard

### Requirements

1. **Post-Payment Landing**
   - Welcome message with user's first name
   - Summary of their profile/goals
   - Clear CTA to download the app

2. **App Download Section**
   - iOS App Store badge + link
   - Google Play badge + link
   - Instructions: "Sign in with the same account"

3. **Account Status**
   - Show subscription status
   - Show expiration date

### UI Layout

```
┌─────────────────────────────────────┐
│  Welcome, [First Name]! 🎉          │
│                                     │
│  Your account is ready.             │
│  Download the app to start your     │
│  personalized growth journey.       │
│                                     │
│  ┌─────────┐  ┌─────────┐          │
│  │ App     │  │ Google  │          │
│  │ Store   │  │ Play    │          │
│  └─────────┘  └─────────┘          │
│                                     │
│  ─────────────────────────────      │
│  Your Profile Summary               │
│  • Current Height: 5'9"             │
│  • Goal Height: 6'2"                │
│  • Plan: Yearly Premium ✓           │
│                                     │
└─────────────────────────────────────┘
```

---

## Phase 4: Flow Integration

### Complete User Journey

1. **Landing Page** (`/`)
   - User clicks "Start Quiz" or "Choose a Program"
   
2. **Onboarding** (`/onboarding`)
   - 19 steps collect user data
   - Data stored in OnboardingContext + localStorage
   - Step 19 has "Create Account" button
   
3. **Auth** (`/auth`)
   - Apple Sign-In or Email signup
   - On success: save onboarding data to Supabase
   - Redirect to paywall
   
4. **Paywall** (`/paywall`)
   - Show pricing plans
   - Stripe Checkout
   - On success: update subscription in DB
   - Redirect to dashboard
   
5. **Dashboard** (`/dashboard`)
   - Show welcome + app download links
   - User downloads iOS/Android app
   - Signs in with same credentials
   - Premium status syncs automatically

---

## File Structure

```
peakheightwebapp/
├── app/
│   ├── page.tsx                    ✅ Landing (exists)
│   ├── auth/
│   │   ├── page.tsx                🚧 Auth page (rebuild)
│   │   └── callback/
│   │       └── route.ts            🆕 OAuth callback
│   ├── onboarding/
│   │   ├── page.tsx                ✅ Onboarding (exists)
│   │   └── complete/
│   │       └── page.tsx            ✅ Completion (exists)
│   ├── paywall/
│   │   └── page.tsx                🆕 Stripe paywall
│   ├── dashboard/
│   │   └── page.tsx                🆕 Post-payment dashboard
│   └── api/
│       └── stripe/
│           └── webhook/
│               └── route.ts        🆕 Stripe webhook
├── components/
│   ├── auth/
│   │   ├── AppleSignInButton.tsx   🆕
│   │   └── EmailAuthForm.tsx       🆕
│   ├── paywall/
│   │   └── PricingCard.tsx         🆕
│   └── onboarding/                 ✅ All exist
├── lib/
│   ├── services/
│   │   ├── auth.ts                 🆕 Auth service
│   │   └── stripe.ts               🆕 Stripe service
│   └── supabase/
│       └── client.ts               ✅ Exists
└── contexts/
    └── OnboardingContext.tsx       ✅ Exists
```

---

## Design Requirements

### Theme (matching mobile app)

- **Background:** `#000000` (black)
- **Surface:** `#0a0a0a`
- **Surface Elevated:** `#1f1f1f`
- **Text Primary:** `#FFFFFF`
- **Text Secondary:** `#9CA3AF`
- **Border:** `#1f1f1f`
- **Border Selected:** `#FFFFFF`
- **Button Background:** `#FFFFFF`
- **Button Text:** `#000000`

### Typography

- Font: Inter
- Page titles: 32px, bold
- Subtitles: 16px, regular
- Button text: 17px, semibold

### Mobile-First

- All pages must be mobile-responsive
- TikTok traffic is 99% mobile devices
- Test on 375px width minimum

---

## Prerequisites

1. **Apple Developer Account**
   - Service ID for Sign in with Apple (web)
   - Domain verification

2. **Stripe Account**
   - Create subscription products
   - Get API keys (publishable + secret)
   - Configure webhook endpoint

3. **Supabase Configuration**
   - Enable Apple OAuth provider
   - Add redirect URLs

---

## Implementation Order

| Priority | Task | Status |
|----------|------|--------|
| 1 | Auth page UI (Apple + Email) | 🚧 |
| 2 | Paywall page UI | 🚧 |
| 3 | Dashboard page UI | 🚧 |
| 4 | Apple Sign-In integration | 🚧 |
| 5 | Stripe integration | 🚧 |
| 6 | Webhook handler | 🚧 |
| 7 | Flow connection | 🚧 |
| 8 | Testing | 🚧 |

---

## Success Metrics

- Users can complete onboarding on web
- Users can sign up with Apple or Email
- Users can pay via Stripe
- Subscription status syncs to mobile app
- Users can sign in on iOS/Android with same account

---

## Notes

- Mobile app uses RevenueCat for in-app purchases
- Web uses Stripe directly
- Both write to same `user_subscriptions` table
- `premium_status` field is source of truth for premium access
