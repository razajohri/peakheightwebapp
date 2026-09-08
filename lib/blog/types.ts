export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; text: string }

export type BlogFaq = {
  question: string
  answer: string
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  primaryKeyword: string
  secondaryKeywords: string[]
  publishedAt: string
  updatedAt: string
  readingMinutes: number
  category: string
  blocks: BlogBlock[]
  faqs: BlogFaq[]
}
