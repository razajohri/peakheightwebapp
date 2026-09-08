import Link from 'next/link'
import type { ReactNode } from 'react'
import type { BlogBlock } from '@/lib/blog/types'

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

function renderInline(text: string) {
  const parts: ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  const re = new RegExp(LINK_RE)
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index))
    }
    const [, label, href] = match
    const external = href.startsWith('http')
    if (external) {
      parts.push(
        <a key={match.index} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      )
    } else {
      parts.push(
        <Link key={match.index} href={href}>
          {label}
        </Link>
      )
    }
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

export function BlogBlocks({
  blocks,
  styles,
}: {
  blocks: BlogBlock[]
  styles: Record<string, string>
}) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return (
              <p key={i} className={styles.paragraph}>
                {renderInline(block.text)}
              </p>
            )
          case 'h2':
            return (
              <h2 key={i} className={styles.h2} id={slugify(block.text)}>
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={i} className={styles.h3}>
                {block.text}
              </h3>
            )
          case 'ul':
            return (
              <ul key={i} className={styles.list}>
                {block.items.map((item) => (
                  <li key={item}>{renderInline(item)}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i} className={styles.listOrdered}>
                {block.items.map((item) => (
                  <li key={item}>{renderInline(item)}</li>
                ))}
              </ol>
            )
          case 'callout':
            return (
              <aside key={i} className={styles.callout}>
                {renderInline(block.text)}
              </aside>
            )
          default:
            return null
        }
      })}
    </>
  )
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
