# Deploy PeakHeight to Vercel

## Quick Deploy

1. Push your code to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **Add New Project** and import your repo.
4. Vercel auto-detects Next.js — no extra config needed.
5. Add environment variables (see below).
6. Click **Deploy**.

## Environment Variables

Add these in Vercel: Project Settings → Environment Variables.

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role (keep secret) |
| `NEXT_PUBLIC_REVENUECAT_API_KEY` | RevenueCat web API key |
| `REVENUECAT_WEBHOOK_AUTH_HEADER` | Webhook auth secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_APP_URL` | Production URL (e.g. `https://peakheight.app`) |

Copy from `.env.local.example` for the full list and descriptions.

## Post-Deploy

- Set your custom domain in Vercel Project Settings → Domains.
- Update RevenueCat webhook URL to `https://yourdomain.com/api/revenuecat/webhook`.
- Update Supabase auth redirect URLs to your production domain.
