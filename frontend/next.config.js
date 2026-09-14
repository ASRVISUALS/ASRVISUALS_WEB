/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'asrvisuals.live',
      'www.asrvisuals.live',
      'youtube.com',
      'www.youtube.com',
      'i.ytimg.com',
      'img.youtube.com',
      'images.unsplash.com',
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  compress: true,
  
  // Production optimizations
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  // Security Headers
  async headers() {
    // Completely disable custom headers on localhost to prevent CSS/asset blocking
    if (!process.env.VERCEL) {
      return []
    }

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.youtube.com https://cal.com https://js.stripe.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://fonts.gstatic.com https://db.onlinewebfonts.com",
              "frame-src 'self' https://www.youtube.com https://youtube.com https://cal.com https://js.stripe.com",
              "connect-src 'self' https://www.youtube.com https://api.stripe.com https://asrvisuals.live https://va.vercel-scripts.com",
              "media-src 'self' https://www.youtube.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self' http://localhost:5173 https://admin-six-steel.vercel.app"
            ].join('; ')
          }
        ],
      },
    ]
  },
}

module.exports = nextConfig