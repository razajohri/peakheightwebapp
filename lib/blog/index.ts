import type { BlogPost } from './types'
import { postGrowTallerAfter18 } from './posts/how-to-grow-taller-after-18'
import { postExercisesToGrowTaller } from './posts/exercises-to-grow-taller'
import { postFoodsGrowTaller } from './posts/foods-that-help-you-grow-taller'
import { postSleepAndHeight } from './posts/sleep-and-height-growth'

export const blogPosts: BlogPost[] = [
  postGrowTallerAfter18,
  postExercisesToGrowTaller,
  postFoodsGrowTaller,
  postSleepAndHeight,
].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))

export function getAllPosts(): BlogPost[] {
  return blogPosts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== slug).slice(0, limit)
}
