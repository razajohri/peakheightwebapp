import Link from 'next/link'
import { posts } from './posts'

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#11151d_0%,_#0b0e13_60%,_#090b0f_100%)] text-white">
      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            PeakHeight Blog
          </p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
            Height Growth Tips, Backed by Practical Habits
          </h1>
          <p className="mt-4 text-base text-white/70">
            Learn how posture, exercises, nutrition, and sleep work together to help you maximize
            your natural height potential.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30"
            >
              <div className="mb-3 flex items-center gap-3 text-xs text-white/50">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-2xl font-semibold">
                <Link href={`/blog/${post.slug}`} className="transition hover:text-white/90">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm text-white/70">{post.description}</p>
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
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex text-sm font-semibold text-white/80 hover:text-white"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
