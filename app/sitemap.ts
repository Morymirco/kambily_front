import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const productsResponse = await fetch(`https://api.kambily.store/products/`)
    const productsData = await productsResponse.json()
    const products = Array.isArray(productsData) ? productsData : []

    const productUrls = products.map((product) => ({
      url: `https://kambily.store/boutique/${product.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8
    }))

    const staticUrls = [
      {
        url: 'https://kambily.store',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1
      },
      {
        url: 'https://kambily.store/boutique',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9
      }
    ]

    return [...staticUrls, ...productUrls]
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap:', error)
    return [
      {
        url: 'https://kambily.store',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1
      },
      {
        url: 'https://kambily.store/boutique',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9
      }
    ]
    }
}