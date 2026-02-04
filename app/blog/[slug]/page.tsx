import Link from 'next/link'
import { notFound } from 'next/navigation'
import { posts } from '../posts'

type PageProps = {
  params: { slug: string }
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export default function BlogPostPage({ params }: PageProps) {
  const post = posts.find((item) => item.slug === params.slug)
  if (!post) {
    notFound()
  }

  const relatedPosts = posts.filter((item) => item.slug !== post.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#11151d_0%,_#0b0e13_60%,_#090b0f_100%)] text-white">
      <main className="mx-auto w-full max-w-5xl px-6 py-16">
        <Link href="/blog" className="text-sm text-white/60 hover:text-white">
          ← Back to Blog
        </Link>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{post.title}</h1>
        <p className="mt-3 text-base text-white/70">{post.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/50">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
          <span>•</span>
          <span>Last updated {post.date}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 space-y-10 text-sm text-white/70">
          <p className="text-base text-white/80">{post.hero}</p>

          {post.sections.map((section) => (
            <div key={section.heading} className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-white/70">
                  {paragraph}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 ? (
                <ul className="list-disc space-y-2 pl-5 text-white/70">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          {post.faq && post.faq.length > 0 ? (
            <div className="space-y-4 pt-4">
              <h2 className="text-2xl font-semibold text-white">Frequently Asked Questions</h2>
              {post.faq.map((item) => (
                <div key={item.question} className="rounded-xl border border-white/10 p-5">
                  <p className="font-semibold text-white">{item.question}</p>
                  <p className="mt-2 text-white/70">{item.answer}</p>
                </div>
              ))}
            </div>
          ) : null}

          {relatedPosts.length > 0 ? (
            <div className="space-y-4 pt-4">
              <h2 className="text-2xl font-semibold text-white">Related articles</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedPosts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="rounded-xl border border-white/10 p-4 transition hover:border-white/40"
                  >
                    <p className="text-xs text-white/50">
                      {item.date} • {item.readTime}
                    </p>
                    <p className="mt-2 font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-white/70">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">
              Build your height growth routine with PeakHeight
            </h2>
            <p className="mt-3 text-white/70">
              Track posture, exercises, nutrition, and sleep in one place. Stay consistent with
              daily routines designed to help you grow taller naturally.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-neutral-200"
              >
                Explore the app
              </Link>
            </div>
          </div>

          <p className="text-xs text-white/50">
            Disclaimer: This content is for informational purposes only and is not medical advice.
            Individual results vary based on age, genetics, and health factors.
          </p>
        </div>
      </main>
    </div>
  )
}
