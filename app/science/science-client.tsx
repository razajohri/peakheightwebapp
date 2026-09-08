'use client'

import Image from 'next/image'
import Link from 'next/link'
import logo from '../../peakheight-logo.jpg'
import { Waves } from '@/components/ui/wave-background'
import styles from './science.module.css'

export default function ScienceClient() {
    return (
        <div className={styles.page}>
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
                </div>
            </header>

            <main>
                <section className={styles.hero}>
                    <div className={styles.heroWaveBg} aria-hidden>
                        <Waves
                            strokeColor="rgba(255,255,255,0.2)"
                            backgroundColor="#000000"
                            pointerSize={0}
                        />
                    </div>
                    <div className={styles.heroGlow} />
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            The <span className={styles.heroTitleGradient}>Science</span> & Methodology
                        </h1>
                        <p className={styles.heroSubtitle}>
                            PeakHeight relies on proven biological mechanics—spinal decompression, optimized nutrition, and recovery—to unlock height potential naturally.
                        </p>
                    </div>
                </section>

                <section className={styles.contentSection}>
                    <div className={styles.contentContainer}>
                        <span className={styles.sectionTag}>Overview</span>
                        <h2 className={styles.sectionTitle}>Can You Naturally Grow Taller?</h2>
                        <p className={styles.paragraph}>
                            While genetics play the primary role in dictating your final adult height, lifestyle and environmental factors can prevent you from reaching your true genetic potential. Studies indicate that up to 20% of an individual's height variation can be influenced by environmental factors such as nutrition, physical activity, and sleep.
                        </p>
                        <p className={styles.paragraph}>
                            PeakHeight is an intelligent system designed to optimize these environmental factors. By compiling hundreds of clinical observations and physiological principles, our app guides users through daily routines that maximize bone density development, correct postural deficit, and facilitate human growth hormone (HGH) release during sleep.
                        </p>

                        <div className={styles.pillarGrid}>
                            <div className={styles.pillarCard}>
                                <div className={styles.pillarIcon}>🦴</div>
                                <h3 className={styles.pillarTitle}>Spinal Decompression</h3>
                                <p className={styles.pillarDesc}>
                                    The human spine consists of 33 vertebrae separated by cartilage discs. Poor posture and gravity compress these discs leading to a "shorter" stature. Target stretches decompress the spine, immediately reclaiming lost posture and expanding disc volume.
                                </p>
                            </div>
                            <div className={styles.pillarCard}>
                                <div className={styles.pillarIcon}>🥗</div>
                                <h3 className={styles.pillarTitle}>Nutritional Optimization</h3>
                                <p className={styles.pillarDesc}>
                                    Bone remodeling heavily relies on micronutrients. PeakHeight’s nutrition guidance focuses on specific ratios of Calcium, Vitamin D, Magnesium, and Zinc to ensure your body has the exact physical building blocks to develop maximum bone matrix density.
                                </p>
                            </div>
                            <div className={styles.pillarCard}>
                                <div className={styles.pillarIcon}>💤</div>
                                <h3 className={styles.pillarTitle}>Sleep & HGH</h3>
                                <p className={styles.pillarDesc}>
                                    The pituitary gland releases over 70% of its daily human growth hormone (HGH) output during slow-wave deep sleep. Our physiological routines are designed to reduce cortisol before bed, extending deep sleep phases for maximum hormonal secretion.
                                </p>
                            </div>
                            <div className={styles.pillarCard}>
                                <div className={styles.pillarIcon}>🏃</div>
                                <h3 className={styles.pillarTitle}>Wolff's Law</h3>
                                <p className={styles.pillarDesc}>
                                    Wolff's law states that bone in a healthy person will adapt to the loads under which it is placed. High-impact stimuli and controlled microfracture exercises prompt osteoblasts to strengthen and rebuild bone fibers dynamically.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.finalCta}>
                    <h2 className={styles.sectionTitle}>Optimize Your Potential</h2>
                    <p className={styles.paragraph} style={{ marginBottom: '32px' }}>
                        Download PeakHeight for a personalized plan based on our biological growth models.
                    </p>
                    <div className={styles.storeBadges}>
                        <a
                            href="https://apps.apple.com/us/app/peak-height/id6752793377"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.storeBadge}
                            aria-label="Download on the App Store"
                        >
                            <Image
                                src="/badge-app-store.webp"
                                alt="Download on the App Store"
                                width={190}
                                height={56}
                                className={styles.storeBadgeImg}
                                loading="lazy"
                                sizes="190px"
                            />
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.peakheight.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.storeBadge}
                            aria-label="Get it on Google Play"
                        >
                            <Image
                                src="/badge-google-play.webp"
                                alt="Get it on Google Play"
                                width={190}
                                height={56}
                                className={styles.storeBadgeImg}
                                loading="lazy"
                                sizes="190px"
                            />
                        </a>
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerBrand}>
                        <Image src={logo} alt="PeakHeight" width={28} height={28} className={styles.footerLogo} />
                        <span>PeakHeight</span>
                    </div>
                    <div className={styles.footerLinks}>
                        <Link href="/science">Science</Link>
                        <Link href="/privacy">Privacy</Link>
                        <Link href="/terms">Terms</Link>
                        <a href="mailto:usepeakheight@gmail.com">Support</a>
                    </div>
                    <p className={styles.medicalDisclaimer}>
                        Disclaimer: PeakHeight is intended for informational and fitness purposes only and does not constitute professional medical advice, diagnosis, or treatment. Our methodology is based on general physiological principles. Always consult with a healthcare provider before starting any new fitness or nutrition program, especially if you have an underlying health condition.
                    </p>
                    <p className={styles.footerCopy}>© {new Date().getFullYear()} PeakHeight. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
