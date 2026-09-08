import type { BlogPost } from '@/lib/blog/types'

export function BlogJsonLd({ post }: { post: BlogPost }) {
  const url = `https://usepeakheight.com/blog/${post.slug}`
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'PeakHeight',
      url: 'https://usepeakheight.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PeakHeight',
      url: 'https://usepeakheight.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://usepeakheight.com/peakheight-logo.jpg',
      },
    },
    mainEntityOfPage: url,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(', '),
  }

  const faq =
    post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      {faq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
      ) : null}
    </>
  )
}
