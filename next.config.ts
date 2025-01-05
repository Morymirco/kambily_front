/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.43.134',
        port: '8000',
        pathname: '/media/**',
      },
    ],
  },
}

module.exports = nextConfig