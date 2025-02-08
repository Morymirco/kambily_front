/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kambily.store',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404', '/500', '/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://kambily.store/server-sitemap.xml',
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