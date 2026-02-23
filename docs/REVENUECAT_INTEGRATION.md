# RevenueCat SDK Integration – Peak Height Web App

This document describes the RevenueCat integration in the Peak Height web app: installation, configuration, entitlement (**PeakHeight Web**), products (**Monthly**, **Yearly**), paywall, Customer Center–style management, and best practices.

---

## 1. Installation

The RevenueCat Web SDK is installed via npm:

```bash
npm install --save @revenuecat/purchases-js
```

- **Documentation:** [RevenueCat Web SDK – Installation](https://www.revenuecat.com/docs/getting-started/installation/web-sdk#installation)
- **Package:** `@revenuecat/purchases-js` (already in `package.json`)

---

## 2. Configuration

### 2.1 API key

Your **Web** (public) API key is set in `.env.local`:

```env
NEXT_PUBLIC_REVENUECAT_API_KEY=test_jgCocIbxapAbgswKdZMYlfUuKOY
```

- Use the **test** key for sandbox; replace with the **live** key for production.
- Get keys from: **RevenueCat Dashboard → Project Settings → API Keys → Web**.

### 2.2 Initialize after login

RevenueCat must be initialized with a stable user ID (e.g. Supabase user id) so subscriptions are tied to the same account across devices:

```ts
import { initializeRevenueCat } from '@/lib/services/revenuecat'

// After user is authenticated (e.g. Supabase user)
await initializeRevenueCat(user.id)
```

Initialization is done:

- **Onboarding paywall:** when the user reaches the paywall step (user id from `useAuth()`).
- **Dashboard:** when the dashboard loads and RevenueCat is configured, so “Manage subscription” can use the management URL.

---

## 3. Entitlement: PeakHeight Web

The app checks access using the **PeakHeight Web** entitlement configured in RevenueCat.

- **Identifier:** `PeakHeight Web` (constant `ENTITLEMENT_ID` in `lib/services/revenuecat.ts`).
- **Check access:**

```ts
import { getCustomerInfo, checkEntitlement, ENTITLEMENT_ID } from '@/lib/services/revenuecat'

const customerInfo = await getCustomerInfo()
const hasAccess = checkEntitlement(customerInfo, ENTITLEMENT_ID)
```

- **Legacy / generic premium check:** `checkPremiumStatus(customerInfo)` returns true if the user has any active entitlement (including **PeakHeight Web**).

---

## 4. Products: Monthly & Yearly

The app expects an offering with packages identified as **monthly** and **yearly** (and optionally **weekly**).

- **Package identifiers in RevenueCat:** `monthly`, `yearly` (and `weekly` if you use it).
- **Fetch offerings:**

```ts
import { getOfferings } from '@/lib/services/revenuecat'

const { monthly, yearly, weekly, all, currentOffering } = await getOfferings()
```

- **Display:** Use `formatPrice(pkg)` and `getBillingPeriod(pkg)` for price and period (e.g. `/month`, `/year`).

---

## 5. Subscription actions

### 5.1 Purchase a package

```ts
import { purchasePackage } from '@/lib/services/revenuecat'

const result = await purchasePackage(selectedPackage)
if (result.success) {
  // Grant access; optionally sync to your backend
}
// Handle result.customerInfo (e.g. expiration, management URL)
```

- **User cancellation:** `purchasePackage` returns `{ success: false, customerInfo }` when the user cancels; no exception in that case.
- **Errors:** Other failures throw; handle in your UI (e.g. retry, message).

### 5.2 Restore purchases

```ts
import { restorePurchases, checkPremiumStatus } from '@/lib/services/revenuecat'

const customerInfo = await restorePurchases()
if (customerInfo && checkPremiumStatus(customerInfo)) {
  // Restore access in your app state / backend
}
```

- Used on the **onboarding paywall** (“Restore purchases”) and anywhere else you need to restore after reinstall or new device.

### 5.3 Customer info

```ts
import { getCustomerInfo, getManagementURL } from '@/lib/services/revenuecat'

const customerInfo = await getCustomerInfo()
const managementUrl = getManagementURL(customerInfo) // Stripe portal, etc.
```

- **Management URL:** For web subscriptions this is typically the Stripe customer portal; open it for “Manage subscription” (Customer Center–style flow).

---

## 6. RevenueCat Paywall (presentPaywall)

The RevenueCat-hosted paywall is shown via `presentPaywall()` so you can use a remotely configured paywall (RevenueCat Dashboard) with checkout and optional Express (Apple Pay / Google Pay).

### 6.1 From code

```ts
import { presentPaywall, openCustomerCenter } from '@/lib/services/revenuecat'

await presentPaywall({
  htmlTarget: document.getElementById('paywall-mount') ?? undefined,
  customerEmail: user?.email ?? undefined,
  onBack: () => { /* close paywall */ },
  onVisitCustomerCenter: () => openCustomerCenter('https://yoursite.com/support'),
  onPurchaseError: (err) => { /* show error */ },
})
```

- **htmlTarget:** Optional; if omitted, the paywall is shown in a full-screen overlay.
- **customerEmail:** Prefill checkout (e.g. when user is logged in).

### 6.2 React component

Use the provided component when you want a “View subscription options” button that opens the RevenueCat paywall:

```tsx
import RevenueCatPaywall from '@/components/paywall/RevenueCatPaywall'

<RevenueCatPaywall
  onPurchaseSuccess={() => router.push('/dashboard')}
  onBack={() => router.back()}
  customerCenterFallbackUrl="https://yoursite.com/support"
/>
```

- **Onboarding:** The main onboarding flow uses a **custom paywall** (`OnboardingPaywall.tsx`) that uses `getOfferings()` and `purchasePackage()`. You can alternatively use `RevenueCatPaywall` (or a page that only shows `RevenueCatPaywall`) to use the **remotely configured** paywall instead.

---

## 7. Customer Center (web)

RevenueCat’s **Customer Center** UI is not available on web. The web app provides a **Customer Center–style** experience by:

- **Manage subscription:** On the **Dashboard**, when the user has a subscription and RevenueCat is initialized, a “Manage subscription” button calls `openCustomerCenter(fallbackUrl)`.
- **Behavior:** `openCustomerCenter()` opens `customerInfo.managementURL` (e.g. Stripe portal) when available; otherwise it opens the fallback URL (e.g. `/support` or a help page).

```ts
import { openCustomerCenter } from '@/lib/services/revenuecat'

openCustomerCenter('https://yoursite.com/support')
```

---

## 8. Error handling and best practices

- **Initialize once per user:** Reuse the same Purchases instance; the service keeps a singleton and reuses it until `logOutRevenueCat()`.
- **Sign out:** When the user signs out, call `logOutRevenueCat()` so the next user gets a clean state.
- **User cancel:** Check `purchasePackage()` result; do not treat user cancel as a generic error.
- **Network / API errors:** Catch errors from `getOfferings`, `purchasePackage`, `restorePurchases`, `getCustomerInfo` and show user-friendly messages or retry.
- **Entitlement:** Use `checkEntitlement(customerInfo, ENTITLEMENT_ID)` for **PeakHeight Web**; use `checkPremiumStatus(customerInfo)` for “any premium” logic.

---

## 9. Product and offering setup in RevenueCat

1. **Products (Stripe):** Create products for **monthly** and **yearly** (and optionally **weekly**) and connect Stripe to RevenueCat (Web Billing).
2. **Packages:** In your **Offering**, create packages with identifiers `monthly` and `yearly` (and `weekly` if used), and attach the corresponding Stripe products.
3. **Entitlement:** Create an entitlement **PeakHeight Web** and attach both (or all) products to it.
4. **Paywall (optional):** In RevenueCat, create a paywall and attach it to the same offering if you use `presentPaywall()` or the **RevenueCat Paywall** component.

---

## 10. Webhook (Supabase sync)

The route `app/api/revenuecat/webhook/route.ts` receives RevenueCat events and updates Supabase (`users.premium_status`, `user_subscriptions`). Configure in RevenueCat:

- **URL:** `https://your-domain.com/api/revenuecat/webhook`
- **Authorization:** Set a secret and the same value in `.env.local` as `REVENUECAT_WEBHOOK_AUTH_HEADER`.
- **Supabase:** Set `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` so the webhook can update `users` and `user_subscriptions`.

---

## 11. File reference

| File | Purpose |
|------|--------|
| `lib/services/revenuecat.ts` | Init, offerings, purchase, restore, entitlement check, presentPaywall, openCustomerCenter, logout, format helpers |
| `components/onboarding/OnboardingPaywall.tsx` | Custom paywall (monthly/yearly, restore, RevenueCat or fallback) |
| `components/paywall/RevenueCatPaywall.tsx` | Wrapper for RevenueCat’s presentPaywall (remote paywall UI) |
| `app/dashboard/page.tsx` | Init RevenueCat, “Manage subscription” (Customer Center–style) |
| `app/api/revenuecat/webhook/route.ts` | Webhook handler for Supabase sync |

---

## 12. Quick checklist

- [ ] `NEXT_PUBLIC_REVENUECAT_API_KEY` in `.env.local` (test or live).
- [ ] RevenueCat Dashboard: entitlement **PeakHeight Web**, packages **monthly** and **yearly** (and optional **weekly**), offering set as current.
- [ ] Stripe connected to RevenueCat (Web Billing); products created and linked to packages.
- [ ] Webhook URL and auth header set in RevenueCat; `REVENUECAT_WEBHOOK_AUTH_HEADER` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.
- [ ] After login, `initializeRevenueCat(user.id)` is called (paywall and dashboard).
- [ ] On sign out, `logOutRevenueCat()` is called (e.g. from auth context or dashboard sign-out).

This integration is implemented in the Peak Height web app and ready to use with your RevenueCat project and API key.
