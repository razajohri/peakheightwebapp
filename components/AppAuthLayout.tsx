'use client'

import type { ReactNode } from 'react'

/**
 * Route-group layout for authenticated app areas.
 * AuthProvider lives in root Providers so navigating /auth → /paywall keeps session.
 */
export default function AppAuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
