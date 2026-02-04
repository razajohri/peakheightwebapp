-- Phase 2: Run this in Supabase SQL Editor ONLY IF signup works but creating user profile fails.
-- (Supabase Dashboard → SQL Editor → New query → paste → Run)

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
