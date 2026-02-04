import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ffdtcjigdccrbxjcizko.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmZHRjamlnZGNjcmJ4amNpemtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1Mzk5NzYsImV4cCI6MjA3MzExNTk3Nn0.88u-IPP9lmFd0zFQ-aUge1_c_gL-32H_XCjtxVDkAH0'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/onboarding'

  if (code) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
    })

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error('Auth callback error:', error)
        return NextResponse.redirect(new URL('/auth?error=auth_failed', requestUrl.origin))
      }

      if (data.user) {
        // Create or update user profile in users table
        const { error: profileError } = await supabase
          .from('users')
          .upsert({
            id: data.user.id,
            email: data.user.email,
            display_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name,
            first_name: data.user.user_metadata?.given_name,
            last_name: data.user.user_metadata?.family_name,
            avatar_url: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'id'
          })

        if (profileError) {
          console.error('Error creating user profile:', profileError)
        }
      }

      // Check if user has pending onboarding data in localStorage
      // This will be handled client-side after redirect
      
      // Redirect to the onboarding flow or dashboard based on user state
      return NextResponse.redirect(new URL(next, requestUrl.origin))
    } catch (error) {
      console.error('Auth callback exception:', error)
      return NextResponse.redirect(new URL('/auth?error=auth_failed', requestUrl.origin))
    }
  }

  // No code present, redirect to auth page
  return NextResponse.redirect(new URL('/auth', requestUrl.origin))
}
