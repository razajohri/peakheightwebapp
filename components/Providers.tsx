'use client'

import type { ReactNode } from 'react'
import { AuthProvider } from '@/contexts/AuthContext'

/** Root client providers — keep AuthProvider here so /auth → /paywall does not remount auth state. */
export default function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
