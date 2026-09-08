import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts().map((post) => ({
        url: `https://usepeakheight.com/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [
        {
            url: 'https://usepeakheight.com',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://usepeakheight.com/science',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://usepeakheight.com/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        ...posts,
        {
            url: 'https://usepeakheight.com/privacy',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://usepeakheight.com/terms',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        // /onboarding kept in codebase for later — not listed while store downloads are primary CTA
    ]
}
