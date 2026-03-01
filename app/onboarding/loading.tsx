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
        backgroundColor: '#000',
        gap: 12,
      }}
    >
      <span style={{ fontSize: 64, fontWeight: 700, color: '#fff' }}>3</span>
      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Getting ready…</span>
    </div>
  )
}
