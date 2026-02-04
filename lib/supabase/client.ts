import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ffdtcjigdccrbxjcizko.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmZHRjamlnZGNjcmJ4amNpemtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1Mzk5NzYsImV4cCI6MjA3MzExNTk3Nn0.88u-IPP9lmFd0zFQ-aUge1_c_gL-32H_XCjtxVDkAH0'

if (process.env.NODE_ENV === 'development') {
  console.log('[Supabase] Client initialized', { url: supabaseUrl })
}

// Create Supabase client for browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
  global: {
    headers: {
      'X-Client-Info': 'peakheight-web',
    },
  },
})
