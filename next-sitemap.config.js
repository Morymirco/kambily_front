/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://votre-domaine.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404', '/500', '/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://votre-domaine.com/server-sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/private'],
      },
    ],
  },
  changefreq: 'daily',
  priority: 0.7,
} 