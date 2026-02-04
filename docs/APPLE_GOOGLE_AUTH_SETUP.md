# Apple Sign-In & Google Sign-In Setup (Web)

You need both so users can log in on the web with "Continue with Apple" and "Continue with Google".  
**Google Pay** is not needed for web login — that’s for payments on Android (handled by Play Store + RevenueCat).

---

## 1. Apple Sign-In (Web)

### 1.1 Apple Developer Account

1. Go to [Apple Developer](https://developer.apple.com) and sign in.
2. **Certificates, IDs & Profiles** → **Identifiers**.
3. Click **+** to add an identifier.
4. Choose **Services IDs** → Continue.
5. Fill in:
   - **Description**: e.g. `PeakHeight Web`
   - **Identifier**: e.g. `com.peakheight.web` (must be unique)
6. Enable **Sign In with Apple** and click **Configure**.
7. **Primary App ID**: Select your main app’s App ID (e.g. your iOS app).
8. **Domains and Subdomains**: Your web domain, e.g. `peakheight.app` or `app.peakheight.com`.
9. **Return URLs**:  
   - Local: `http://localhost:3000/auth/callback`  
   - Prod: `https://your-domain.com/auth/callback`  
   (Use your real Supabase redirect URL if different — see below.)
10. Save, then continue and register the Services ID.

### 1.2 Create a Sign In with Apple Key

1. **Certificates, IDs & Profiles** → **Keys** → **+**.
2. **Key Name**: e.g. `PeakHeight Web Sign In with Apple`.
3. Enable **Sign In with Apple** → Configure → select your **Primary App ID**.
4. Register the key, then **Download** the `.p8` file (you can only download once).
5. Note:
   - **Key ID** (e.g. `ABC123XYZ`)
   - **Services ID** (e.g. `com.peakheight.web`)
   - **Team ID** and **Client ID** from your Apple Developer account.

### 1.3 Supabase: Enable Apple

1. **Supabase Dashboard** → your project → **Authentication** → **Providers**.
2. Turn **Apple** ON.
3. Fill in:
   - **Services ID**: e.g. `com.peakheight.web`
   - **Secret Key**: contents of the `.p8` file
   - **Key ID**: from step 1.2
   - **Team ID**: from Apple Developer
   - **Client ID**: same as Services ID (or your App ID if required)
4. **Redirect URL**: Supabase shows something like  
   `https://<project-ref>.supabase.co/auth/v1/callback`.  
   In Apple’s Return URLs you must use this **exact** Supabase callback URL (not `https://your-domain.com/auth/callback`). Your Next.js app redirects to this via `/auth/callback`.
5. Save.

**Important:** In Apple’s Return URL you use the **Supabase callback URL** from the Apple provider page. Your app’s `/auth/callback` route then exchanges the code with Supabase and redirects the user.

---

## 2. Google Sign-In (Web)

### 2.1 Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com).
2. Create or select a project (e.g. PeakHeight).
3. **APIs & Services** → **Credentials** → **Create Credentials** → **OAuth client ID**.
4. If asked, configure **OAuth consent screen**:
   - **User Type**: External (or Internal for testing only).
   - **App name**: PeakHeight (or your app name).
   - **Support email**: your email.
   - **Authorized domains**: e.g. `peakheight.app`, `your-project.supabase.co`.
   - Save.
5. Back to **Create OAuth client ID**:
   - **Application type**: **Web application**.
   - **Name**: e.g. `PeakHeight Web`.
   - **Authorized redirect URIs** → **Add URI**:
     - Supabase callback: `https://<project-ref>.supabase.co/auth/v1/callback`  
       (Copy the exact URL from Supabase → Auth → Providers → Google.)
6. Create. Copy the **Client ID** and **Client Secret**.

### 2.2 Supabase: Enable Google

1. **Supabase Dashboard** → **Authentication** → **Providers**.
2. Turn **Google** ON.
3. Paste **Client ID** and **Client Secret** from Google Cloud.
4. Save.

---

## 3. Your app’s auth flow

- User clicks **Continue with Apple** or **Continue with Google**.
- They are sent to Apple/Google, then back to **Supabase** (`.../auth/v1/callback`).
- Supabase redirects to your app: **`https://your-domain.com/auth/callback?code=...`** (or `next=/dashboard` etc.).
- Your **`/auth/callback`** route exchanges the `code` with Supabase and then redirects to `/dashboard` (or onboarding).

So you **do** need to:
- Set up **Apple Auth** (Services ID + key + Supabase).
- Set up **Google Sign-In** (OAuth client + Supabase).

You **don’t** need to set up “Google Pay” for web login; that’s for payments on Android (Play Store + RevenueCat).

---

## 4. Quick checklist

| Step | Apple | Google |
|------|--------|--------|
| Create identifier / OAuth client | Services ID + Key | OAuth 2.0 Web client |
| Add redirect URI | Return URL = Supabase callback | Authorized redirect = Supabase callback |
| Enable in Supabase | Apple provider ON, fill Key ID, Team ID, Secret | Google provider ON, Client ID + Secret |
| Test | “Continue with Apple” on web | “Continue with Google” on web |

Use the **exact** Supabase callback URL shown in each provider’s setup (Supabase → Auth → Providers → Apple / Google) for the redirect/return URL in Apple and Google.
