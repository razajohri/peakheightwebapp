/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-manrope)', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        background: '#ffffff',
        surface: '#fafafa',
        surfaceElevated: '#ffffff',
        textPrimary: '#18181b',
        textSecondary: '#7c7c7c',
        brand: {
          black: '#1c1c1c',
          ink: '#18181b',
          grey: '#7c7c7c',
          mist: '#c4c4c4',
          line: '#e5e7eb',
        },
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      borderRadius: {
        pill: '9999px',
      },
    },
  },
  plugins: [],
}
