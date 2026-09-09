import type { Metadata, Viewport } from 'next'
import { Manrope, Playfair_Display } from 'next/font/google'
import './globals.css'
import CookieConsent from '@/components/CookieConsent'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  preload: true,
  adjustFontFallback: true,
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://usepeakheight.com'),
  title: 'PeakHeight - Unlock Your Full Height Potential',
  description: 'Maximize your height potential naturally with the right daily habits and AI tools',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
  icons: {
    icon: '/peakheight-logo.jpg',
    apple: '/peakheight-logo.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body
        className={`${manrope.className} antialiased`}
        style={{
          backgroundColor: '#ffffff',
          color: '#18181b',
          margin: 0,
          minHeight: '100vh',
        }}
      >
        {/* Critical CSS when main stylesheet 404s — base + full onboarding step 1 */}
        <style dangerouslySetInnerHTML={{
          __html: `
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
          html{background:#fff;color:#18181b;-webkit-text-size-adjust:100%}
          body{min-height:100vh;min-height:100dvh;overflow-x:hidden;font-family:var(--font-manrope),ui-sans-serif,system-ui,sans-serif}
          .font-playfair{font-family:var(--font-playfair),Georgia,serif}
          .font-manrope{font-family:var(--font-manrope),ui-sans-serif,system-ui,sans-serif}
          button,a,[role=button]{touch-action:manipulation;-webkit-tap-highlight-color:transparent}
          @keyframes ph-spin{to{transform:rotate(360deg)}}
          .ph-critical-spinner{animation:ph-spin .8s linear infinite}
          .min-h-screen,.min-h-dvh{min-height:100dvh}
          .flex{display:flex}.flex-col{flex-direction:column}.flex-1{flex:1}
          .items-center{align-items:center}.justify-center{justify-content:center}
          .justify-between{justify-content:space-between}
          .bg-black{background:#f4f7fc}.text-white{color:#fff}.bg-white{background:#fff}.text-black{color:#18181b}
          .text-white\\/60{color:#a1a1aa}
          .text-white\\/70{color:#a1a1aa}
          .relative{position:relative}.overflow-hidden{overflow:hidden}
          .fixed{position:fixed}.absolute{position:absolute}
          .inset-0{top:0;right:0;bottom:0;left:0}
          .z-0{z-index:0}.z-10{z-index:10}.z-20{z-index:20}
          .pointer-events-none{pointer-events:none}
          .px-4{padding-left:1rem;padding-right:1rem}
          .px-6{padding-left:1.5rem;padding-right:1.5rem}
          .pt-6{padding-top:1.5rem}.pt-8{padding-top:2rem}
          .pb-4{padding-bottom:1rem}.pb-8{padding-bottom:2rem}.pb-10{padding-bottom:2.5rem}
          .mb-2{margin-bottom:.5rem}.mb-8{margin-bottom:2rem}
          .mt-2{margin-top:.5rem}
          .text-center{text-align:center}
          .text-\\[28px\\]{font-size:28px}.font-bold{font-weight:700}
          .font-medium{font-weight:500}.font-semibold{font-weight:600}
          .text-base{font-size:1rem}.text-lg{font-size:1.125rem}
          .text-xs{font-size:.75rem}.text-sm{font-size:.875rem}
          .leading-relaxed{line-height:1.625}
          .w-full{width:100%}.max-w-md{max-width:28rem}.mx-auto{margin-left:auto;margin-right:auto}
          .rounded-2xl{border-radius:1rem}.rounded-full{border-radius:9999px}
          .border{border-width:1px}
          .border-white\\/10,.border-white\\/15{border-color:#e5e7eb}
          .border-white\\/50{border-color:#18181b}
          .bg-white\\/5{background-color:#fff}
          .bg-white\\/10{background-color:#f4f4f5}
          .p-4{padding:1rem}.gap-3,.gap-4{gap:.75rem}
          .space-y-3>*+*{margin-top:.75rem}
          .min-h-\\[56px\\]{min-height:56px}
          .cursor-pointer{cursor:pointer}.cursor-not-allowed{cursor:not-allowed}
          .opacity-50{opacity:.5}
          .h-1\\.5{height:.375rem}.h-full{height:100%}
        `}} />
        <noscript>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f7fc', color: '#18181b', padding: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 18, marginBottom: 12 }}>JavaScript is required.</p>
            <a href="/" style={{ color: '#18181b', textDecoration: 'underline' }}>Reload page</a>
          </div>
        </noscript>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
