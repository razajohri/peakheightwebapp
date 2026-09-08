import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { BlogChrome } from './BlogChrome'
import styles from './blog.module.css'

export const metadata: Metadata = {
  title: 'Height Growth Blog — Guides on Sleep, Training & Nutrition | PeakHeight',
  description:
    'Practical height growth guides from PeakHeight: grow taller after 18, exercises, nutrition, and sleep—honest science, no miracle claims.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'PeakHeight Blog — Height Growth Guides',
    description:
      'Guides on growing taller after 18, exercises, foods, and sleep—built for real habits, not hype.',
    url: '/blog',
    type: 'website',
  },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <BlogChrome>
      <main className={styles.main}>
        <span className={styles.kicker}>PeakHeight Blog</span>
        <h1 className={styles.indexTitle}>Guides to maximize how tall you stand</h1>
        <p className={styles.indexLead}>
          Honest, habit-first articles on posture training, nutrition, sleep, and what’s realistic after
          puberty—paired with the PeakHeight system.
        </p>

        <div className={styles.grid}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
              <div className={styles.cardMeta}>
                <span>{post.category}</span>
                <span>{post.readingMinutes} min read</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardDesc}>{post.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </BlogChrome>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
