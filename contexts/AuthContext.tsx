'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'

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
    // Get initial session
    const getInitialSession = async () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Auth] Getting initial session from Supabase...')
      }
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
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
      } catch (error) {
        console.error('[Auth] Error getting session:', error)
      } finally {
        setLoading(false)
        if (process.env.NODE_ENV === 'development') {
          console.log('[Auth] Loading complete')
        }
      }
    }

    // Timeout: if auth takes longer than 8s, stop loading
    const timeout = setTimeout(() => {
      console.warn('[Auth] Session load timed out after 8s - stopping spinner')
      setLoading(false)
    }, 8000)

    getInitialSession().then(() => clearTimeout(timeout))

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await checkPremiumStatus(session.user.id)
        } else {
          setIsPremium(false)
        }
        
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const checkPremiumStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('premium_status, premium_expires_at')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error checking premium status:', error)
        return
      }

      // Check if premium and not expired
      const isActive = data?.premium_status && 
        (!data.premium_expires_at || new Date(data.premium_expires_at) > new Date())
      
      setIsPremium(isActive)
    } catch (error) {
      console.error('Error checking premium status:', error)
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (!error && data.user && process.env.NODE_ENV === 'development') {
      console.log('[Auth] Sign in OK – linked to Supabase', { userId: data.user.id, email })
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
