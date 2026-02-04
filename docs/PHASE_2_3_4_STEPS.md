# Phase 2, 3 & 4 – Step-by-step

Do **Phase 2** first, then **Phase 3**, then **Phase 4**. Test after each phase.

---

# PHASE 2: Email auth

## 2.1 Supabase – Enable Email and (optional) allow profile creation

1. Go to **[Supabase Dashboard](https://supabase.com/dashboard)** → your project.
2. Left sidebar: **Authentication** → **Providers**.
3. Click **Email**.
4. Turn **ON**: “Enable Email provider”.
5. For easiest testing: turn **OFF** “Confirm email” (so you don’t need to set up email confirmation).
6. Click **Save**.

## 2.2 (If signup fails) Allow new users to create their profile

If after signup you get an error creating the user profile, run this in Supabase:

1. **SQL Editor** → New query.
2. Paste and run:

```sql
-- Allow authenticated users to insert their own row in public.users
CREATE POLICY "Users can insert own profile"
ON public.users FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Allow users to update their own row
CREATE POLICY "Users can update own profile"
ON public.users FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow users to read their own row
CREATE POLICY "Users can read own profile"
ON public.users FOR SELECT
TO authenticated
USING (auth.uid() = id);
```

3. Run the query. If you get “policy already exists”, your RLS is already set; you can ignore.

## 2.2b (Optional) Allow redirect back to localhost

For local testing, Supabase must allow your app URL:

1. **Supabase** → **Authentication** → **URL Configuration**.
2. **Redirect URLs**: add `http://localhost:3000/auth/callback` and `http://localhost:3000/**`.
3. Save. (You can add your production URL later when you deploy.)

## 2.3 Test in your app

1. App running: `npm run dev` → open **http://localhost:3000**.
2. Go to **Onboarding** (e.g. click “Start” on landing).
3. Go through steps until you reach **Create account / Sign in**.
4. Sign up: enter **email** + **password** (+ name if shown). Submit.
5. You should move to the next step (e.g. paywall) or see the dashboard.
6. Open **http://localhost:3000/dashboard** – you should see the dashboard when logged in.

**Phase 2 done when:** Email sign up works and dashboard loads.

---

# PHASE 3: Google Sign-In

## 3.1 Google Cloud – OAuth consent screen

1. Go to **[Google Cloud Console](https://console.cloud.google.com)**.
2. Top bar: select or **create a project** (e.g. “PeakHeight”).
3. Left menu: **APIs & Services** → **OAuth consent screen**.
4. If first time:
   - **User Type**: External → **Create**.
   - **App name**: PeakHeight (or your app name).
   - **User support email**: your email.
   - **Developer contact**: your email.
   - **Save and Continue** → Scopes → **Save and Continue** → Test users (optional) → **Save and Continue**.
5. If you already have a consent screen, you can skip to 3.2.

## 3.2 Google Cloud – Create OAuth client ID

1. Left menu: **APIs & Services** → **Credentials**.
2. **+ Create Credentials** → **OAuth client ID**.
3. **Application type**: **Web application**.
4. **Name**: e.g. `PeakHeight Web`.
5. **Authorized redirect URIs** → **+ Add URI**:
   - Paste: `https://ffdtcjigdccrbxjcizko.supabase.co/auth/v1/callback`
   - (Use your Supabase project URL if different: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`)
6. Click **Create**.
7. Copy the **Client ID** and **Client Secret** (you’ll paste them in Supabase).

## 3.3 Supabase – Enable Google

1. **Supabase Dashboard** → **Authentication** → **Providers**.
2. Click **Google**.
3. Turn **ON** “Enable Sign in with Google”.
4. Paste **Client ID** and **Client Secret** from step 3.2.
5. Click **Save**.

## 3.4 Test in your app

1. In your app, go to the Auth step (onboarding or `/auth`).
2. Click **“Continue with Google”**.
3. Sign in with a Google account.
4. You should be redirected back and logged in (onboarding/dashboard).

**Phase 3 done when:** “Continue with Google” works.

---

# PHASE 4: Apple Sign-In

You need an **Apple Developer account** ($99/year). If you don’t have one, skip Phase 4.

## 4.1 Apple Developer – Services ID

1. Go to **[Apple Developer](https://developer.apple.com/account)** → **Certificates, Identifiers & Profiles**.
2. Left: **Identifiers** → **+** to add.
3. Select **Services IDs** → **Continue**.
4. **Description**: e.g. `PeakHeight Web`.
5. **Identifier**: e.g. `com.peakheight.web` (unique, reverse-domain style).
6. **Continue** → **Register**.
7. Click the new **Services ID**.
8. Enable **Sign In with Apple** → **Configure**.
9. **Primary App ID**: choose your main iOS app (or create an App ID first).
10. **Domains and Subdomains**: e.g. `peakheight.app` or your production domain. For local testing you can add `localhost` or skip and test later on a deployed URL.
11. **Return URLs**: add **exactly**:
    - `https://ffdtcjigdccrbxjcizko.supabase.co/auth/v1/callback`
    - (Replace with your Supabase project URL if different.)
12. **Save** → **Continue** → **Save**.

## 4.2 Apple Developer – Sign In with Apple key

1. Left: **Keys** → **+** to add.
2. **Key Name**: e.g. `PeakHeight Web Sign In with Apple`.
3. Enable **Sign In with Apple** → **Configure** → select your **Primary App ID** → **Save**.
4. **Continue** → **Register**.
5. **Download** the `.p8` file (you can only download once). Keep it safe.
6. Note:
   - **Key ID** (shown on the key page).
   - **Team ID** (top right in Apple Developer).
   - **Services ID** (e.g. `com.peakheight.web`) = **Client ID** for Supabase.

## 4.3 Supabase – Enable Apple

1. **Supabase Dashboard** → **Authentication** → **Providers**.
2. Click **Apple**.
3. Turn **ON** “Enable Sign in with Apple”.
4. Fill in:
   - **Services ID (Client ID)**: e.g. `com.peakheight.web`.
   - **Secret Key**: open the `.p8` file in a text editor, copy **all** contents (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`).
   - **Key ID**: from step 4.2.
   - **Team ID**: from step 4.2.
   - **Bundle ID**: your primary iOS App ID (e.g. `com.peakheight.app`), if required by Supabase.
5. Click **Save**.

## 4.4 Test in your app

1. In your app, go to the Auth step.
2. Click **“Continue with Apple”**.
3. Sign in with Apple ID.
4. You should be redirected back and logged in.

**Phase 4 done when:** “Continue with Apple” works (or you’ve skipped Phase 4).

---

# Checklist

| Phase | Done |
|-------|------|
| 2 – Email auth | ☐ Supabase Email ON, sign up works, dashboard loads |
| 3 – Google | ☐ Google OAuth client created, Supabase Google ON, “Continue with Google” works |
| 4 – Apple | ☐ Services ID + key in Apple, Supabase Apple ON, “Continue with Apple” works (or skipped) |

If anything fails, say which step and the exact error message (browser or Supabase).
