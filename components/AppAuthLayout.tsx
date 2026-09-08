'use client'

import { AuthProvider } from '@/contexts/AuthContext'
import type { ReactNode } from 'react'

/** Shared layout wrapper for routes that need Supabase auth. */
export default function AppAuthLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
