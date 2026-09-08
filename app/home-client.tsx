'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import logo from '../peakheight-logo.jpg'
import styles from './landing.module.css'

function getMobileOS(): 'ios' | 'android' | 'other' {
  if (typeof window === 'undefined') return 'other'
  const userAgent = navigator.userAgent || navigator.vendor || ''
  if (/android/i.test(userAgent)) return 'android'
  if (/iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return 'ios'
  }
  return 'other'
}

const features = [
  {
    mark: '01',
    title: 'AI-Powered Analysis',
    description: 'Get your personalized growth potential calculated by our advanced AI.',
  },
  {
    mark: '02',
    title: 'Track Progress',
    description: 'Monitor your height journey with detailed analytics and insights.',
  },
  {
    mark: '03',
    title: '200+ Exercises',
    description: 'Science-backed stretches and workouts designed for maximum growth.',
  },
  {
    mark: '04',
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

const APP_STORE = 'https://apps.apple.com/us/app/peak-height/id6752793377'
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.peakheight.app'

export default function HomeClient() {
  const [showAppPopup, setShowAppPopup] = useState(false)
  const [mobileOS, setMobileOS] = useState<'ios' | 'android' | 'other'>('other')
  const [loadVideo, setLoadVideo] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const videoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const os = getMobileOS()
    setMobileOS(os)

    let popupTimer: ReturnType<typeof setTimeout> | undefined
    if (os !== 'other') {
      popupTimer = setTimeout(() => setShowAppPopup(true), 4500)
    }

    return () => {
      if (popupTimer) clearTimeout(popupTimer)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const node = videoRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadVideo(true)
          observer.disconnect()
        }
      },
      { rootMargin: '160px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const primaryStore = mobileOS === 'android' ? PLAY_STORE : APP_STORE

  return (
    <div className={styles.page}>
      <nav
        className={`${styles.nav} ${navScrolled ? styles.navScrolled : ''} ${menuOpen ? styles.navMenuOpen : ''}`}
        aria-label="Primary"
      >
        <div className={styles.navBar}>
          <div className={styles.navInner}>
            <Link href="/" className={styles.logoLink} aria-label="PeakHeight home">
              <Image
                src={logo}
                alt=""
                width={20}
                height={20}
                className={styles.logoImage}
                priority
              />
              <span className={styles.logoTextFull}>PeakHeight</span>
              <span className={styles.logoTextShort}>PeakHeight</span>
            </Link>

            {/* Desktop — FaceIQ: text-xs zinc-400 links, gap-8, pill CTA */}
            <div className={styles.navDesktop}>
              <Link href="/science" className={styles.navLink}>
                Science
              </Link>
              <Link href="/#how-it-works" className={styles.navLink}>
                How it works
              </Link>
              <a href="mailto:usepeakheight@gmail.com" className={styles.navLink}>
                Support
              </a>
              <a
                href={primaryStore}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navCta}
              >
                Get the app
              </a>
            </div>

            {/* Mobile — FaceIQ: compact CTA + menu */}
            <div className={styles.navMobile}>
              <a
                href={primaryStore}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navCtaMobile}
              >
                Get the app
              </a>
              <button
                type="button"
                className={styles.navMenuBtn}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M4 5h16M4 12h16M4 19h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {menuOpen ? (
          <div className={styles.navSheet}>
            <Link href="/science" className={styles.navSheetLink} onClick={() => setMenuOpen(false)}>
              Science
            </Link>
            <Link href="/#how-it-works" className={styles.navSheetLink} onClick={() => setMenuOpen(false)}>
              How it works
            </Link>
            <Link href="/privacy" className={styles.navSheetLink} onClick={() => setMenuOpen(false)}>
              Privacy
            </Link>
            <Link href="/terms" className={styles.navSheetLink} onClick={() => setMenuOpen(false)}>
              Terms
            </Link>
            <a
              href={primaryStore}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navSheetCta}
              onClick={() => setMenuOpen(false)}
            >
              Get the app
            </a>
          </div>
        ) : null}
      </nav>

      <main>
        {/* FaceIQ-style centered hero — no phone, no waves, no duplicate badges */}
        <section className={styles.hero}>
          <div className={styles.heroAtmosphere} aria-hidden />
          {/* Exact FaceIQ aurora stack — cyan + lavender blooms, no line waves */}
          <div className={styles.heroGlow} aria-hidden />
          <div className={styles.heroBloom} aria-hidden />
          <div className={styles.heroFade} aria-hidden />
          <div className={styles.heroContent}>
            <div className={styles.socialProof}>
              <span className={styles.socialStars} aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={styles.socialStar}
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
                    <path
                      fill="currentColor"
                      d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                    />
                  </svg>
                ))}
              </span>
              <span className={styles.socialItem}>Trusted by growers worldwide</span>
              <span className={styles.socialSep} aria-hidden />
              <span className={styles.socialItem}>100+ height metrics</span>
            </div>

            <h1 className={styles.heroTitle}>
              Your Height.
              <br />
              Measured. Tracked. Improved.
            </h1>

            <p className={styles.heroSubtitle}>
              Analyze your height across 100+ metrics, get a personalized plan, and track your progress over time.
            </p>

            <div className={styles.heroCtaRow}>
              <div className={styles.heroStoreBadges} aria-label="Download PeakHeight">
                <a
                  href={APP_STORE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.heroStoreBadge}
                  aria-label="Download on the App Store"
                >
                  <Image
                    src="/badge-app-store.webp"
                    alt="Download on the App Store"
                    width={160}
                    height={52}
                    className={styles.heroStoreBadgeImg}
                    priority
                    sizes="160px"
                  />
                </a>
                <a
                  href={PLAY_STORE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.heroStoreBadge}
                  aria-label="Get it on Google Play"
                >
                  <Image
                    src="/badge-google-play.webp"
                    alt="Get it on Google Play"
                    width={160}
                    height={52}
                    className={styles.heroStoreBadgeImg}
                    priority
                    sizes="160px"
                  />
                </a>
              </div>
              <a href="#how-it-works" className={styles.secondaryCta}>
                See how it works
              </a>
            </div>
          </div>
        </section>

        {/* Product visual below the fold */}
        <section className={styles.productSection} aria-label="App preview">
          <div className={styles.phoneContainer}>
            <div className={styles.phoneGlow} aria-hidden />
            <Image
              src="/assets/imnotnew.webp"
              alt="PeakHeight app preview"
              width={320}
              height={640}
              className={styles.phoneImage}
              sizes="(max-width: 430px) 70vw, 300px"
              loading="lazy"
            />
          </div>
        </section>

        <section className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Features</span>
            <h2 className={styles.sectionTitle}>Everything you need to grow</h2>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature) => (
              <article key={feature.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.mark}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.videoSection} ref={videoRef}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>See it in action</span>
            <h2 className={styles.sectionTitle}>Watch how it works</h2>
          </div>
          <div className={styles.videoContainer}>
            {loadVideo ? (
              <iframe
                className={styles.videoIframe}
                src="https://www.youtube.com/embed/n_nawi0zbFM"
                title="PeakHeight walkthrough"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className={styles.videoPoster}
                onClick={() => setLoadVideo(true)}
                aria-label="Play PeakHeight walkthrough"
              >
                <span className={styles.videoPlay}>Play</span>
              </button>
            )}
          </div>
        </section>

        <section className={styles.stepsSection} id="how-it-works">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>How it works</span>
            <h2 className={styles.sectionTitle}>Three simple steps</h2>
          </div>
          <div className={styles.stepsGrid}>
            {steps.map((step) => (
              <article key={step.number} className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.number}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.finalCtaGlow} aria-hidden />
          <h2 className={styles.finalCtaTitle}>Ready to reach your peak?</h2>
          <p className={styles.finalCtaSubtitle}>
            Download PeakHeight and start your personalized growth journey today.
          </p>
          <a
            href={primaryStore}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.finalPrimaryCta}
          >
            Start Your Journey
            <span className={styles.ctaArrow} aria-hidden>
              →
            </span>
          </a>
          <div className={styles.finalStores}>
            <a
              href={APP_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroStoreBadge}
              aria-label="Download on the App Store"
            >
              <Image
                src="/badge-app-store.webp"
                alt="Download on the App Store"
                width={160}
                height={52}
                className={styles.heroStoreBadgeImg}
                loading="lazy"
                sizes="160px"
              />
            </a>
            <a
              href={PLAY_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroStoreBadge}
              aria-label="Get it on Google Play"
            >
              <Image
                src="/badge-google-play.webp"
                alt="Get it on Google Play"
                width={160}
                height={52}
                className={styles.heroStoreBadgeImg}
                loading="lazy"
                sizes="160px"
              />
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <Image src={logo} alt="" width={28} height={28} className={styles.footerLogo} />
            <span>PeakHeight</span>
          </div>
          <div className={styles.footerLinks}>
            <Link href="/science">Science</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href="mailto:usepeakheight@gmail.com">Support</a>
          </div>
          <p className={styles.footerDisclaimer}>
            Disclaimer: PeakHeight is intended for informational and fitness purposes only and does not constitute professional medical advice, diagnosis, or treatment. Always consult with a healthcare provider before starting any new fitness or nutrition program.
          </p>
          <p className={styles.footerCopy}>© {new Date().getFullYear()} PeakHeight. All rights reserved.</p>
        </div>
      </footer>

      {showAppPopup && (
        <div className={styles.appStorePopup} role="dialog" aria-label="Get the PeakHeight app">
          <div className={styles.appStorePopupInner}>
            <button
              type="button"
              className={styles.appStorePopupClose}
              onClick={() => setShowAppPopup(false)}
              aria-label="Close"
            >
              ×
            </button>
            <Image
              src={logo}
              alt=""
              width={48}
              height={48}
              className={styles.appStorePopupIcon}
            />
            <div className={styles.appStorePopupContent}>
              <p className={styles.appStorePopupTitle}>PeakHeight</p>
              <p className={styles.appStorePopupSubtitle}>
                {mobileOS === 'ios' ? 'Available on the App Store' : 'Get it on Google Play'}
              </p>
            </div>
            <a
              href={primaryStore}
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
