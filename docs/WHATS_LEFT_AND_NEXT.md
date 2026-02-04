# PeakHeight Web App – What's Left & Tomorrow

**Last updated:** Jan 31, 2026

---

## ✅ What's Done

- **Landing page** – Working
- **Onboarding flow** – All steps, auth step (email + Apple + Google), paywall
- **Auth** – Supabase email sign up/sign in, Apple & Google OAuth, auth callback, user profile in `public.users`
- **Dashboard** – Shows user info, subscription status, onboarding summary, iOS/Android download links
- **Onboarding data** – Saves to Supabase (`users`, `user_progress`, `user_preferences`, `user_join_events`) when user is signed in and reaches "You're All Set!"
- **Paywall** – UI with weekly/yearly plans; **Development Mode** (simulated payment) works when RevenueCat is not configured
- **RevenueCat code** – `lib/services/revenuecat.ts` (init, offerings, purchase, restore, etc.)
- **RevenueCat webhook** – `app/api/revenuecat/webhook/route.ts` – updates `users.premium_status` and `user_subscriptions` on payment events
- **Environment** – `.env.local` has placeholders for Supabase, RevenueCat, Stripe, webhook secret
- **Middleware** – Currently disabled (was redirecting to auth); dashboard uses client-side auth check
- **Docs** – Apple/Google auth setup, setup plan, this file

---

## 🔲 What's Left

### 1. RevenueCat + Stripe (finish setup)

- [ ] **Connect Stripe to RevenueCat** (you were about to do this)
  - RevenueCat Dashboard → Add app → Stripe → Connect with Stripe OAuth
- [ ] **Create products in RevenueCat** (or import from Stripe)
  - Weekly plan (e.g. $4.99/week)
  - Yearly plan (e.g. $49.99/year)
- [ ] **Create offering** in RevenueCat (e.g. `default`) with weekly + annual packages
- [ ] **Create entitlement** (e.g. `premium`) and attach both products
- [ ] **Get Web API key** from RevenueCat → Project Settings → API Keys
- [ ] **Fill in `.env.local`**:
  - `NEXT_PUBLIC_REVENUECAT_API_KEY=rcb_...`
  - `REVENUECAT_WEBHOOK_AUTH_HEADER=<your-secret>`
  - `SUPABASE_SERVICE_ROLE_KEY=<from Supabase Dashboard>`
  - Optional: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY` if needed

### 2. RevenueCat webhook (live)

- [ ] **Add webhook in RevenueCat** → Project Settings → Webhooks
  - URL: `https://your-domain.com/api/revenuecat/webhook`
  - Authorization header: same value as `REVENUECAT_WEBHOOK_AUTH_HEADER`
- [ ] For **local testing**: use ngrok (or similar) to expose `http://localhost:3001/api/revenuecat/webhook` and use that URL in RevenueCat

### 3. After payment: sync to Supabase

- [ ] **Test a real payment** (Stripe test mode)
- [ ] Confirm webhook fires and updates:
  - `public.users` → `premium_status = true`, `premium_expires_at`
  - `public.user_subscriptions` → new row with plan, dates, payment_source
- [ ] Confirm dashboard shows premium status after payment

### 4. Optional / polish

- [ ] Re-enable **middleware** for `/dashboard` once cookie/session handling is confirmed (or keep client-side only)
- [ ] **Restore purchases** button on dashboard/paywall (RevenueCat restore)
- [ ] **Error handling** – e.g. webhook down, invalid payload
- [ ] **Deploy** web app (Vercel, etc.) and set production env vars

---

## 📋 Tomorrow's Plan

1. **Finish RevenueCat + Stripe**
   - Connect Stripe in RevenueCat
   - Create products + offering + entitlement
   - Add API key and webhook secret to `.env.local`

2. **Webhook**
   - Add webhook URL in RevenueCat (production or ngrok for local)
   - Test with a Stripe test payment

3. **Verify flow**
   - Sign up → onboarding → paywall → pay with test card → check Supabase (`users.premium_status`, `user_subscriptions`) and dashboard

4. **Optional**
   - Restore purchases, re-enable middleware, deploy

---

## Quick reference

- **RevenueCat connect Stripe:** Project Settings → Apps → + New → Stripe → Connect with Stripe  
- **Web API key:** Project Settings → API Keys (starts with `rcb_`)  
- **Webhook:** Project Settings → Webhooks → URL = `https://yourdomain.com/api/revenuecat/webhook`  
- **Supabase service role:** Supabase Dashboard → Settings → API → service_role key  

---

See you tomorrow. 👋
