'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import logo from '../peakheight-logo.jpg'
import { Waves } from '@/components/ui/wave-background'
import styles from './landing.module.css'

// Detect if user is on iOS or Android
function getMobileOS(): 'ios' | 'android' | 'other' {
  if (typeof window === 'undefined') return 'other'
  const userAgent = navigator.userAgent || navigator.vendor
  if (/android/i.test(userAgent)) return 'android'
  if (/iPad|iPhone|iPod/.test(userAgent)) return 'ios'
  return 'other'
}

const features = [
  {
    icon: '🎯',
    title: 'AI-Powered Analysis',
    description: 'Get your personalized growth potential calculated by our advanced AI.',
  },
  {
    icon: '📊',
    title: 'Track Progress',
    description: 'Monitor your height journey with detailed analytics and insights.',
  },
  {
    icon: '🏋️',
    title: '200+ Exercises',
    description: 'Science-backed stretches and workouts designed for maximum growth.',
  },
  {
    icon: '🥗',
    title: 'Nutrition Plans',
    description: 'Meal plans rich in growth-promoting nutrients tailored to you.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Take the Quiz',
    description: 'Answer a few questions about your goals and lifestyle.',
  },
  {
    number: '02',
    title: 'Get Your Plan',
    description: 'Receive a personalized program based on your potential.',
  },
  {
    number: '03',
    title: 'Start Growing',
    description: 'Follow daily routines and track your progress.',
  },
]

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [showAppPopup, setShowAppPopup] = useState(false)
  const [mobileOS, setMobileOS] = useState<'ios' | 'android' | 'other'>('other')
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    
    // Show app store popup after 3 seconds on mobile
    const os = getMobileOS()
    setMobileOS(os)
    
    if (os !== 'other') {
      const timer = setTimeout(() => {
        setShowAppPopup(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div className={styles.page}>
      {/* Floating Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src={logo}
              alt="PeakHeight"
              width={32}
              height={32}
              className={styles.logoImage}
            />
            <span className={styles.logoText}>PeakHeight</span>
          </Link>
          <div className={styles.headerLinks}>
            <span className={styles.headerLang}>EN</span>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className={styles.hero} ref={heroRef}>
          <div className={styles.heroWaveBg} aria-hidden>
            <Waves
              strokeColor="rgba(255,255,255,0.2)"
              backgroundColor="#000000"
              pointerSize={0}
            />
          </div>
          <div className={styles.heroGlow} />
          <div className={`${styles.heroContent} ${isVisible ? styles.heroVisible : ''}`}>
            {/* Main Headline */}
            <h1 className={styles.heroTitle}>
              Unlock Your
              <span className={styles.heroTitleGradient}> Maximum </span>
              Height Potential
            </h1>

            <p className={styles.heroSubtitle}>
              PeakHeight helps you grow taller - naturally.
            </p>

            {/* CTA Button - Start onboarding */}
            <Link href="/onboarding" className={styles.ctaButton}>
              <span>Start Now — Get Your Plan</span>
              <svg className={styles.ctaButtonIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            {/* App Store Badges in Hero */}
            <div className={styles.heroStoreBadges}>
              <a
                href="https://apps.apple.com/us/app/peak-height/id6752793377"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.heroStoreBadge} ${styles.heroStoreBadgeApple}`}
                aria-label="Download on the App Store"
              />
              <a
                href="https://play.google.com/store/apps/details?id=com.peakheight.app"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.heroStoreBadge} ${styles.heroStoreBadgeGoogle}`}
                aria-label="Get it on Google Play"
              />
            </div>

            {/* Phone Mockup */}
            <div className={styles.phoneContainer}>
              <div className={styles.phoneGlow} />
              <Image
                src="/assets/imnotnew.webp"
                alt="PeakHeight App"
                width={320}
                height={640}
                className={styles.phoneImage}
                priority
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Features</span>
            <h2 className={styles.sectionTitle}>Everything You Need to Grow</h2>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature) => (
              <div key={feature.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Video Section */}
        <section className={styles.videoSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>See It In Action</span>
            <h2 className={styles.sectionTitle}>Watch How It Works</h2>
          </div>
          <div className={styles.videoContainer}>
            <iframe
              className={styles.videoIframe}
              src="https://www.youtube.com/embed/n_nawi0zbFM"
              title="PeakHeight walkthrough"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* How It Works */}
        <section className={styles.stepsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>How It Works</span>
            <h2 className={styles.sectionTitle}>3 Simple Steps</h2>
          </div>
          <div className={styles.stepsGrid}>
            {steps.map((step, index) => (
              <div key={step.number} className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.number}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
                {index < steps.length - 1 && <div className={styles.stepConnector} />}
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className={styles.finalCta}>
          <div className={styles.finalCtaGlow} />
          <h2 className={styles.finalCtaTitle}>Ready to Reach Your Peak?</h2>
          <p className={styles.finalCtaSubtitle}>
            Start your personalized growth journey today.
          </p>
          <Link href="/onboarding" className={styles.ctaButton}>
            <span>Get Started Free</span>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <Image src={logo} alt="PeakHeight" width={28} height={28} className={styles.footerLogo} />
            <span>PeakHeight</span>
          </div>
          <div className={styles.footerLinks}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href="mailto:usepeakheight@gmail.com">Support</a>
          </div>
          <p className={styles.footerCopy}>© {new Date().getFullYear()} PeakHeight. All rights reserved.</p>
        </div>
      </footer>

      {/* App Store Popup */}
      {showAppPopup && (
        <div className={styles.appStorePopup}>
          <div className={styles.appStorePopupInner} style={{ position: 'relative' }}>
            <button
              className={styles.appStorePopupClose}
              onClick={() => setShowAppPopup(false)}
              aria-label="Close"
            >
              ×
            </button>
            <Image
              src={logo}
              alt="PeakHeight"
              width={48}
              height={48}
              className={styles.appStorePopupIcon}
            />
            <div className={styles.appStorePopupContent}>
              <p className={styles.appStorePopupTitle}>PeakHeight App</p>
              <p className={styles.appStorePopupSubtitle}>
                {mobileOS === 'ios' ? 'Search "PeakHeight" on App Store or Copy Link' : 'Get it on Google Play'}
              </p>
            </div>
            <a
              href={mobileOS === 'ios' 
                ? 'https://apps.apple.com/us/app/peak-height/id6752793377'
                : 'https://play.google.com/store/apps/details?id=com.peakheight.app'
              }
              target="_blank"
              rel="noopener noreferrer"
              className={styles.appStorePopupButton}
            >
              GET
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
