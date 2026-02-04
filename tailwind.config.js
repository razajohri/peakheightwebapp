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
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      colors: {
        background: '#000000',
        surface: '#0a0a0a',
        surfaceElevated: '#1f1f1f',
        textPrimary: '#FFFFFF',
        textSecondary: '#9CA3AF',
      },
      screens: {
        'xs': '375px',   // Small phones
        'sm': '640px',   // Large phones / Small tablets
        'md': '768px',   // Tablets
        'lg': '1024px',  // Small desktops
        'xl': '1280px',  // Desktops
        '2xl': '1536px', // Large desktops
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [],
}
