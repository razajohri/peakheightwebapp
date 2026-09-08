import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BlogBlocks } from '@/components/blog/BlogBlocks'
import { BlogJsonLd } from '@/components/blog/BlogJsonLd'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { BlogChrome } from '../BlogChrome'
import styles from '../blog.module.css'

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  const url = `/blog/${post.slug}`
  return {
    title: `${post.title} | PeakHeight`,
    description: post.description,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = getRelatedPosts(post.slug)

  return (
    <BlogChrome>
      <BlogJsonLd post={post} />
      <main className={styles.main}>
        <article>
          <header className={styles.articleHeader}>
            <span className={styles.kicker}>{post.category}</span>
            <h1 className={styles.articleTitle}>{post.title}</h1>
            <p className={styles.articleDesc}>{post.description}</p>
            <div className={styles.metaRow}>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>{post.readingMinutes} min read</span>
              <span>Updated {formatDate(post.updatedAt)}</span>
            </div>
          </header>

          <BlogBlocks blocks={post.blocks} styles={styles} />

          {post.faqs.length > 0 ? (
            <section className={styles.faq} aria-labelledby="faq-heading">
              <h2 id="faq-heading" className={styles.faqTitle}>
                Frequently asked questions
              </h2>
              {post.faqs.map((faq) => (
                <div key={faq.question} className={styles.faqItem}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </section>
          ) : null}

          <div className={styles.ctaBox}>
            <h2>Track the habits that move height</h2>
            <p>
              PeakHeight turns posture, recovery, and nutrition into a daily system you can measure.
            </p>
            <Link href="/">Get PeakHeight</Link>
          </div>

          {related.length > 0 ? (
            <aside className={styles.related}>
              <p className={styles.relatedTitle}>Keep reading</p>
              <div className={styles.relatedList}>
                {related.map((item) => (
                  <Link key={item.slug} href={`/blog/${item.slug}`}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </aside>
          ) : null}
        </article>
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
