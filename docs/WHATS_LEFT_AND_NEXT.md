# PeakHeight Web App – What's Left & Next Steps

**Last updated:** Feb 2026

---

## ✅ What's Done

- **Landing page** – Working
- **Onboarding flow** – All steps, auth (email + Apple + Google), paywall (monthly + yearly)
- **Auth** – Supabase auth, user profile in `public.users`, sign out clears RevenueCat
- **Dashboard** – Account, subscription block, “Manage subscription” (Customer Center–style), plan summary, app download links
- **Onboarding data** – Saves to Supabase when signed in and user reaches “You're All Set!”
- **RevenueCat** – Full integration: init, offerings (monthly/yearly), purchase, restore, **PeakHeight Web** entitlement, presentPaywall component, `openCustomerCenter`
- **Paywall** – Custom onboarding paywall + optional RevenueCat-hosted paywall; Development Mode when RC not configured
- **Webhook** – `POST /api/revenuecat/webhook` updates `users.premium_status` and `user_subscriptions`
- **Environment** – `.env.local` has RevenueCat test API key; placeholders for webhook secret and Supabase service role
- **Middleware** – Disabled (dashboard uses client-side auth)
- **Docs** – Apple/Google auth, setup plan, RevenueCat integration, this file

---

## 🔲 What's Next (in order)

### 1. RevenueCat Dashboard setup

- [ ] **Connect Stripe** – RevenueCat → Project Settings → Apps → + New → Stripe → Connect
- [ ] **Products** – Create or import **monthly** and **yearly** (Stripe) and link to packages with identifiers `monthly` and `yearly`
- [ ] **Entitlement** – Create **PeakHeight Web**, attach both products
- [ ] **Offering** – Create offering (e.g. `default`), add monthly + yearly packages, set as **Current**
- [ ] **API key** – You already have test key in `.env.local`; for production use live Web API key from Project Settings → API Keys

### 2. Webhook + Supabase keys

- [ ] **Supabase** – Copy **service_role** key from Supabase Dashboard → Settings → API → paste into `.env.local` as `SUPABASE_SERVICE_ROLE_KEY`
- [ ] **Webhook secret** – Pick a random string (e.g. `my_webhook_secret_xyz`), add to `.env.local` as `REVENUECAT_WEBHOOK_AUTH_HEADER`
- [ ] **RevenueCat webhook** – Project Settings → Webhooks → Add URL:  
  - Production: `https://your-domain.com/api/revenuecat/webhook`  
  - Local test: use ngrok to expose `http://localhost:3001/api/revenuecat/webhook`  
  - Set **Authorization** header to the same value as `REVENUECAT_WEBHOOK_AUTH_HEADER`

### 3. Test the full flow

- [ ] Run app: `npm run dev` (e.g. port 3001)
- [ ] Sign up → complete onboarding → paywall: choose **Monthly** or **Yearly** → pay with Stripe test card
- [ ] Check Supabase: `users.premium_status = true`, row in `user_subscriptions`
- [ ] Open Dashboard: subscription shows Active, “Manage subscription” opens Stripe portal (or fallback)
- [ ] Optional: test **Restore purchases** on paywall

### 4. Optional / later

- [ ] **Deploy** – Vercel (or other host), set env vars, add production URL to Supabase redirect URLs and RevenueCat webhook
- [ ] **Re-enable middleware** – If you want server-side auth check for `/dashboard`, fix cookie/session in `middleware.ts` and re-enable matcher
- [ ] **Live keys** – Switch to RevenueCat live API key and Stripe live keys for production

---

## Quick reference

| Item | Where |
|------|--------|
| RevenueCat + Stripe | Project Settings → Apps → + New → Stripe |
| Web API key | Project Settings → API Keys (Web) |
| Webhook | Project Settings → Webhooks |
| Entitlement | Entitlements → **PeakHeight Web** |
| Package IDs | **monthly**, **yearly** (in your offering) |
| Supabase service_role | Supabase Dashboard → Settings → API |
