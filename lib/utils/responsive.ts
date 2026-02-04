// Responsive utilities for mobile-first design
// Breakpoints: mobile (< 768px), tablet (768px - 1024px), desktop (> 1024px)

export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
}

export const useResponsive = () => {
  // For client-side hooks, we'll use Tailwind classes instead
  // This is just for reference
  return {
    isMobile: true, // Always mobile-first
    isTablet: false,
    isDesktop: false,
  }
}

// Responsive spacing utilities
export const spacing = {
  // Mobile-first: use smaller values, Tailwind will handle larger screens
  pagePadding: 'px-4 sm:px-6 md:px-8 lg:px-12',
  pagePaddingVertical: 'py-4 sm:py-6 md:py-8',
  sectionGap: 'gap-4 sm:gap-6 md:gap-8',
  cardGap: 'gap-3 sm:gap-4 md:gap-6',
}

// Responsive typography
export const typography = {
  title: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  subtitle: 'text-base sm:text-lg md:text-xl',
  body: 'text-sm sm:text-base md:text-lg',
  small: 'text-xs sm:text-sm',
}
