'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'ph_cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        background: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        boxShadow: '0 -8px 24px rgba(24, 24, 27, 0.06)',
        padding:
          '16px max(16px, env(safe-area-inset-right)) calc(16px + env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left))',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 14,
        }}
      >
        <p
          style={{
            flex: '1 1 280px',
            margin: 0,
            fontSize: 14,
            lineHeight: 1.5,
            color: '#52525b',
            fontFamily: 'var(--font-manrope), Manrope, ui-sans-serif, system-ui, sans-serif',
          }}
        >
          We use cookies and similar technologies to analyze site usage and improve your experience.
          By clicking &quot;Accept&quot;, you consent to our use of cookies.{' '}
          <Link
            href="/privacy"
            style={{ color: '#18181b', textDecoration: 'underline', textUnderlineOffset: 2 }}
          >
            Learn more
          </Link>
        </p>
        <button
          type="button"
          onClick={accept}
          style={{
            flexShrink: 0,
            minHeight: 40,
            padding: '10px 22px',
            border: 'none',
            borderRadius: 9999,
            background: '#18181b',
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'var(--font-manrope), Manrope, ui-sans-serif, system-ui, sans-serif',
            cursor: 'pointer',
            touchAction: 'manipulation',
          }}
        >
          Accept
        </button>
      </div>
    </div>
  )
}
