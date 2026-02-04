# PeakHeight Web – Setup Plan (Right Order)

Follow this order. Each step builds on the previous one.

---

## Phase 1: Get the app running (no accounts needed)

| Step | What to do | How to verify |
|------|------------|----------------|
| **1.1** | Open terminal, go to `peakheightwebapp`, run `npm install` | No errors |
| **1.2** | Copy `.env.local.example` to `.env.local` | File `.env.local` exists |
| **1.3** | In `.env.local`, set only Supabase: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (from Supabase → Settings → API). Leave the rest as placeholder for now. | Keys are pasted, no typos |
| **1.4** | Run `npm run dev` | App runs at http://localhost:3000 |
| **1.5** | Click around: Landing page → “Start” or CTA → Onboarding. Go through a few steps. | Pages load, no red errors in browser console |

**Done when:** App runs locally and you can see landing + onboarding.

---

## Phase 2: Auth with email (Supabase only)

| Step | What to do | How to verify |
|------|------------|----------------|
| **2.1** | In Supabase Dashboard: **Authentication** → **Providers** → **Email**. Ensure “Enable Email provider” is ON. Confirm “Confirm email” is OFF for now (so you don’t need to set up email confirmation). | Email provider is enabled |
| **2.2** | In your app: go to onboarding, reach the **Auth** step (Create account / Sign in). Sign up with a **new email + password**. | You get an account and move to the next step (or paywall) |
| **2.3** | Optional: go to `/dashboard`. You should see the dashboard (or get redirected to auth if not logged in). | Dashboard loads when logged in |

**Done when:** You can sign up with email and see the dashboard.

---

## Phase 3: Google Sign-In (one OAuth provider)

| Step | What to do | How to verify |
|------|------------|----------------|
| **3.1** | Google Cloud Console: create/select project → **APIs & Services** → **Credentials** → **OAuth consent screen** (if not done: External, app name, your email, add domain). | Consent screen is configured |
| **3.2** | **Credentials** → **Create Credentials** → **OAuth client ID** → Application type: **Web application**. Name e.g. “PeakHeight Web”. **Authorized redirect URIs**: add `https://ffdtcjigdccrbxjcizko.supabase.co/auth/v1/callback`. Create. Copy **Client ID** and **Client Secret**. | You have Client ID + Secret |
| **3.3** | Supabase: **Authentication** → **Providers** → **Google** → Enable. Paste Client ID and Client Secret. Save. | Google provider is ON and saved |
| **3.4** | In your app: open Auth step, click **“Continue with Google”**. Sign in with a Google account. | You are logged in and redirected (onboarding/dashboard) |

**Done when:** “Continue with Google” works on your app.

---

## Phase 4: Apple Sign-In (optional, needs Apple Developer $99/year)

| Step | What to do | How to verify |
|------|------------|----------------|
| **4.1** | Apple Developer: create **Services ID** for web, enable Sign In with Apple, set Return URL to `https://ffdtcjigdccrbxjcizko.supabase.co/auth/v1/callback`. | Services ID created and Return URL set |
| **4.2** | Create **Sign In with Apple** key, download `.p8`. Note Key ID, Team ID, Client ID (Services ID). | You have .p8 and IDs |
| **4.3** | Supabase: **Authentication** → **Providers** → **Apple** → Enable. Fill Services ID, Key ID, Team ID, Secret (contents of .p8). Save. | Apple provider is ON |
| **4.4** | In app: click **“Continue with Apple”**. | You are logged in with Apple |

**Done when:** “Continue with Apple” works (or you skip this phase and keep only Email + Google).

---

## Phase 5: Payments (RevenueCat + Stripe)

| Step | What to do | How to verify |
|------|------------|----------------|
| **5.1** | RevenueCat: add **Web** platform. Connect **Stripe** (Web Billing). Create products (e.g. weekly, yearly) and an **Offering**. Copy **Web API key**. | You have RevenueCat Web API key |
| **5.2** | In `.env.local`: set `NEXT_PUBLIC_REVENUECAT_API_KEY`. Restart `npm run dev`. | Env var set, app restarted |
| **5.3** | In app: go through onboarding to **Paywall**. Check that plans load (no “RevenueCat not configured” errors). Optionally do a test purchase if you have Stripe test mode. | Paywall shows plans; test purchase works in test mode |
| **5.4** | RevenueCat: **Webhooks** → add URL `https://your-domain.com/api/revenuecat/webhook`. Set auth header; put same value in `.env.local` as `REVENUECAT_WEBHOOK_AUTH_HEADER`. Use **Supabase service role key** in `.env.local` for `SUPABASE_SERVICE_ROLE_KEY`. | Webhook is set; after a test purchase, Supabase `users.premium_status` or `user_subscriptions` updates |

**Done when:** Web paywall works and webhook updates Supabase after a purchase.

---

## Phase 6: Deploy (production)

| Step | What to do | How to verify |
|------|------------|----------------|
| **6.1** | Deploy app (e.g. Vercel): connect repo, set all env vars from `.env.local`. Deploy. | App is live at your URL |
| **6.2** | In Supabase **Authentication** → **URL Configuration**: set **Site URL** to your production URL (e.g. `https://app.peakheight.com`). Add **Redirect URLs** (e.g. `https://app.peakheight.com/auth/callback`, `https://app.peakheight.com/**`). | Supabase allows your production domain |
| **6.3** | In Google OAuth client: add **Authorized redirect URI** `https://ffdtcjigdccrbxjcizko.supabase.co/auth/v1/callback` (same as before; Supabase handles redirect). Add **Authorized JavaScript origins** (e.g. `https://app.peakheight.com`). | Google works on production |
| **6.4** | If you use Apple: in Services ID add production Return URL if different (e.g. same Supabase callback). | Apple works on production |
| **6.5** | RevenueCat webhook: ensure URL is your production URL. | Webhook receives events from production |

**Done when:** Users can sign up, pay, and see dashboard on the live URL.

---

## Quick reference: order of work

1. **Phase 1** – Install, env, run app.
2. **Phase 2** – Email auth in Supabase + test in app.
3. **Phase 3** – Google OAuth (Google Cloud + Supabase) + test.
4. **Phase 4** – Apple (optional).
5. **Phase 5** – RevenueCat + Stripe + webhook.
6. **Phase 6** – Deploy and production URLs.

Start with **Phase 1** and complete each phase before moving to the next.
