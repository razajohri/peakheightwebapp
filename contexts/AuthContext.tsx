'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { logOutRevenueCat } from '@/lib/services/revenuecat'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUpWithEmail: (email: string, password: string, name?: string) => Promise<{ error: AuthError | null }>
  signInWithApple: () => Promise<{ error: AuthError | null }>
  signInWithGoogle: () => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  isPremium: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    let cancelled = false

    const getInitialSession = async () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Auth] Getting initial session from Supabase...')
      }
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (cancelled) return
        if (error) {
          console.error('[Auth] Error getting session:', error)
        } else if (process.env.NODE_ENV === 'development') {
          console.log('[Auth] Session loaded:', session ? 'User signed in' : 'No session')
        }
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          await checkPremiumStatus(session.user.id)
        }
      } catch (error: unknown) {
        if (cancelled) return
        const isAbort = error instanceof Error && error.name === 'AbortError'
        const isAbortLike = typeof error === 'object' && error !== null && (error as { name?: string }).name === 'AbortError'
        if (isAbort || isAbortLike) return
        console.error('[Auth] Error getting session:', error)
      } finally {
        if (!cancelled) setLoading(false)
        if (process.env.NODE_ENV === 'development' && !cancelled) {
          console.log('[Auth] Loading complete')
        }
      }
    }

    const timeout = setTimeout(() => {
      if (!cancelled) {
        console.warn('[Auth] Session load timed out after 8s - stopping spinner')
        setLoading(false)
      }
    }, 8000)

    getInitialSession()
      .then(() => clearTimeout(timeout))
      .catch((err: unknown) => {
        clearTimeout(timeout)
        if (cancelled) return
        const isAbort = err instanceof Error && err.name === 'AbortError'
        const isAbortLike = typeof err === 'object' && err !== null && (err as { name?: string }).name === 'AbortError'
        if (isAbort || isAbortLike) {
          setLoading(false)
          return
        }
        console.error('[Auth] getInitialSession failed:', err)
        setLoading(false)
      })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (cancelled) return
        try {
          setSession(session)
          setUser(session?.user ?? null)
          if (session?.user) {
            await checkPremiumStatus(session.user.id)
          } else {
            setIsPremium(false)
          }
        } catch (err: unknown) {
          const isAbort = err instanceof Error && err.name === 'AbortError'
          const isAbortLike = typeof err === 'object' && err !== null && (err as { name?: string }).name === 'AbortError'
          if (!isAbort && !isAbortLike) console.error('[Auth] onAuthStateChange error:', err)
        } finally {
          if (!cancelled) setLoading(false)
        }
      }
    )

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [])

  const checkPremiumStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('premium_status, premium_expires_at')
        .eq('id', userId)
        .maybeSingle()

      if (error) {
        console.error('Error checking premium status:', error)
        return
      }

      // No row yet (user not in users table) = not premium
      const isActive = data?.premium_status && 
        (!data.premium_expires_at || new Date(data.premium_expires_at) > new Date())
      
      setIsPremium(!!isActive)
    } catch (error) {
      console.error('Error checking premium status:', error)
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (!error && data.user) {
      await ensureUserProfileForSignIn(data.user.id, data.user.email ?? email)
      if (process.env.NODE_ENV === 'development') {
        console.log('[Auth] Sign in OK – user row ensured in Supabase', { userId: data.user.id, email })
      }
    }
    return { error }
  }

  const signUpWithEmail = async (email: string, password: string, name?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
          full_name: name,
        },
      },
    })

    // If signup successful, create user profile in users table
    if (!error && data.user) {
      await createUserProfile(data.user.id, email, name)
      if (process.env.NODE_ENV === 'development') {
        console.log('[Auth] Sign up OK – user profile created in Supabase (users table)', { userId: data.user.id, email })
      }
    }

    return { error }
  }

  /** Ensure a user row exists (e.g. after sign-in). Only sets id, email, updated_at so existing profile is not overwritten. */
  const ensureUserProfileForSignIn = async (userId: string, email: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .upsert(
          {
            id: userId,
            email,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        )
      if (error) {
        console.error('[Auth] Error ensuring user row on sign-in:', error)
      } else if (process.env.NODE_ENV === 'development') {
        console.log('[Auth] User row ensured in public.users', { userId, email })
      }
    } catch (error) {
      console.error('Error ensuring user profile:', error)
    }
  }

  const createUserProfile = async (userId: string, email: string, name?: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .upsert({
          id: userId,
          email,
          display_name: name,
          first_name: name?.split(' ')[0],
          last_name: name?.split(' ').slice(1).join(' '),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        })

      if (error) {
        console.error('[Auth] Error creating user profile in Supabase:', error)
      } else if (process.env.NODE_ENV === 'development') {
        console.log('[Auth] User profile upserted in public.users', { userId, email })
      }
    } catch (error) {
      console.error('Error creating user profile:', error)
    }
  }

  const signInWithApple = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          // Request email and name scopes
          scope: 'name email',
        },
      },
    })
    return { error }
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    return { error }
  }

  const signOut = async () => {
    await logOutRevenueCat()
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setIsPremium(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithApple,
        signInWithGoogle,
        signOut,
        isPremium,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
