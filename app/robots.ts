import { MetadataRoute } from 'next'
import { HOST_IP, PORT } from './constants'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/private',
        '/api',
        '/test',
        '/profile',
        '/commandes',
        '/paiement',
        '/confirmation'
      ]
    },
    sitemap: `https://${HOST_IP}:${PORT}/sitemap.xml`,
    host: `https://${HOST_IP}:${PORT}`
  }
} 