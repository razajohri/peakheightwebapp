/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ffdtcjigdccrbxjcizko.supabase.co',
      },
    ],
    unoptimized: false,
  },
}

module.exports = nextConfig
