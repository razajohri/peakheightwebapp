# PeakHeight Web App – What’s Next

## What’s already built

- **Auth** – Apple, Google, and email with Supabase  
- **Onboarding** – Full flow, data saved to Supabase  
- **Paywall** – RevenueCat Web SDK (Stripe)  
- **RevenueCat webhook** – Syncs web + mobile payments to Supabase  
- **Dashboard** – Account, subscription details, plan summary, app download links  
- **Database** – Migration done (Stripe fields, subscription plans)

---

## Your checklist (in order)

### 1. Install dependencies

```bash
cd peakheightwebapp
npm install
```

### 2. Environment variables

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```
2. Edit `.env.local` and fill in:
   - **Supabase**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - **RevenueCat**: `NEXT_PUBLIC_REVENUECAT_API_KEY`, `REVENUECAT_WEBHOOK_AUTH_HEADER`
   - (Optional for now) Stripe keys if you use them directly

### 3. Apple Auth & Google Sign-In (required for web login)

- **Apple Sign-In**: Create a Services ID in Apple Developer, create a Sign In with Apple key, then enable Apple in Supabase and use the **Supabase callback URL** as the Return URL in Apple.
- **Google Sign-In**: Create an OAuth 2.0 Web client in Google Cloud Console, add the **Supabase callback URL** as authorized redirect, then enable Google in Supabase with Client ID + Secret.

**Step-by-step:** See **`docs/APPLE_GOOGLE_AUTH_SETUP.md`** for full Apple + Google setup.

- **RLS**: In Supabase, ensure `users` and `user_subscriptions` allow the operations your app needs (select/insert/update for the anon or authenticated role as you prefer).

### 4. RevenueCat setup

- In [RevenueCat](https://app.revenuecat.com): add **Web** as a platform.
- Connect **Stripe** (Web Billing).
- Create products (e.g. weekly, yearly) and an **Offering** that contains them.
- Copy the **Web API key** → `NEXT_PUBLIC_REVENUECAT_API_KEY`.
- **Webhooks**: add `https://your-domain.com/api/revenuecat/webhook`, set the auth header → `REVENUECAT_WEBHOOK_AUTH_HEADER`.

### 5. Run and test locally

```bash
npm run dev
```

- Go through: **Landing → Onboarding → Auth (email or OAuth) → Paywall → Dashboard**.
- Confirm onboarding data and subscription status in Supabase.
- If RevenueCat Web SDK API differs from the code, adjust `lib/services/revenuecat.ts` to match [RevenueCat Web SDK docs](https://www.revenuecat.com/docs/web).

### 6. Deploy

- Deploy to **Vercel** (or your host).
- Set the same env vars in the project settings.
- In Supabase and RevenueCat, set redirect/webhook URLs to your **production** domain (e.g. `https://app.peakheight.com/auth/callback` and `https://app.peakheight.com/api/revenuecat/webhook`).

### 7. Optional polish

- **Middleware**: If your Supabase cookie name differs (e.g. different project ref), update the cookie name in `middleware.ts`.
- **Dashboard**: Add “Manage subscription” (e.g. Stripe Customer Portal link for web, or instructions for App Store / Play Store).
- **Analytics**: Add TikTok pixel or other tracking on landing and key steps.

---

## Quick reference

| Item              | Where |
|-------------------|--------|
| Auth (Apple/Google/Email) | Supabase Auth + `contexts/AuthContext.tsx`, `app/auth/` |
| Paywall           | RevenueCat Web SDK in `components/onboarding/OnboardingPaywall.tsx`, `lib/services/revenuecat.ts` |
| Webhook (all payments) | `app/api/revenuecat/webhook/route.ts` |
| Dashboard         | `app/dashboard/page.tsx` |
| Save onboarding   | `lib/services/user.ts` → `saveOnboardingData()` |
| Env template      | `.env.local.example` |

If you tell me your host (e.g. Vercel) and whether you use Apple/Google sign-in yet, I can give step-by-step for that part next.
