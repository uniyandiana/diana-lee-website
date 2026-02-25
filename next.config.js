/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Optimize image formats and quality
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year

    // Remote patterns for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  // Enable compression
  compress: true,

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize performance
  poweredByHeader: false,
}

module.exports = nextConfig
