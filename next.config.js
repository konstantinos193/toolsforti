/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'placehold.co',
      '157.180.36.186',  // Your API server domain
      'images.odin.fun',
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '157.180.36.186',
        port: '4000',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig 