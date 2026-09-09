// Shown while /onboarding loads — pure HTML, no JS. Works even when main bundle 404s.
export default function OnboardingLoading() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f7fc',
        gap: 12,
      }}
    >
      <span style={{ fontSize: 64, fontWeight: 700, color: '#18181b' }}>3</span>
      <span style={{ fontSize: 14, color: '#a1a1aa' }}>Getting ready…</span>
    </div>
  )
}
