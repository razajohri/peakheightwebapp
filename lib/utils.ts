/**
 * Merge class names (shadcn-style). Add clsx + tailwind-merge for full behavior.
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
