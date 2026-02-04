# PeakHeight Web App - Onboarding Flow

This is the web version of PeakHeight's onboarding flow, built with Next.js.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.local.example` to `.env.local` and update with your Supabase credentials:
```bash
cp .env.local.example .env.local
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js app directory with pages and layouts
- `/components` - React components for onboarding screens
- `/lib` - Utility functions, constants, and Supabase client
- `/public` - Static assets (images, etc.)

## Onboarding Flow

The onboarding consists of 19 screens that guide users through:
1. Welcome screen
2. Gender selection
3. Age input
4. Current height
5. Parents' heights
6. Dream height
7-19. Additional screens (to be ported from mobile app)

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Supabase** - Backend and authentication
