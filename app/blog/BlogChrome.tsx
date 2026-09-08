import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import logo from '../../peakheight-logo.jpg'
import styles from './blog.module.css'

export function BlogChrome({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand}>
            <Image src={logo} alt="PeakHeight" width={24} height={24} className={styles.logo} />
            PeakHeight
          </Link>
          <nav className={styles.nav} aria-label="Blog">
            <Link href="/blog">Blog</Link>
            <Link href="/science">Science</Link>
            <Link href="/">Get the app</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/science">Science</Link>
        <a href="mailto:usepeakheight@gmail.com">Support</a>
      </footer>
    </div>
  )
}
