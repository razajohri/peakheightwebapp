import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ffdtcjigdccrbxjcizko.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmZHRjamlnZGNjcmJ4amNpemtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1Mzk5NzYsImV4cCI6MjA3MzExNTk3Nn0.88u-IPP9lmFd0zFQ-aUge1_c_gL-32H_XCjtxVDkAH0'

// Routes that require authentication
const protectedRoutes = ['/dashboard']

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/auth']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if this is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next()
  }

  // Get the session from cookies
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  // Try multiple cookie patterns that Supabase might use
  const cookiePatterns = [
    'sb-ffdtcjigdccrbxjcizko-auth-token',
    'sb-access-token',
    'sb-refresh-token'
  ]
  
  let isAuthenticated = false
  
  for (const pattern of cookiePatterns) {
    const cookie = request.cookies.get(pattern)?.value
    if (cookie) {
      try {
        const tokenData = JSON.parse(cookie)
        if (tokenData?.access_token) {
          const { data: { user }, error } = await supabase.auth.getUser(tokenData.access_token)
          if (user && !error) {
            isAuthenticated = true
            break
          }
        }
      } catch (e) {
        // Try next pattern
        continue
      }
    }
  }
  
  // Fallback: check all cookies for Supabase auth pattern
  if (!isAuthenticated) {
    const allCookies = request.cookies.getAll()
    for (const cookie of allCookies) {
      if (cookie.name.includes('auth-token') || cookie.name.includes('access-token')) {
        try {
          const tokenData = JSON.parse(cookie.value)
          if (tokenData?.access_token) {
            const { data: { user }, error } = await supabase.auth.getUser(tokenData.access_token)
            if (user && !error) {
              isAuthenticated = true
              break
            }
          }
        } catch (e) {
          continue
        }
      }
    }
  }

  // If trying to access protected route without auth, redirect to auth
  if (isProtectedRoute && !isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // If trying to access auth route while authenticated, redirect to dashboard
  if (isAuthRoute && isAuthenticated && !request.nextUrl.searchParams.has('from')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Temporarily disabled - using client-side auth checks instead
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - onboarding (onboarding flow)
     */
    // '/((?!api|_next/static|_next/image|favicon.ico|public|onboarding).*)',
  ],
}
