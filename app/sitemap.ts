import { MetadataRoute } from 'next'
import { HOST_IP, PORT, PROTOCOL_HTTP } from './constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Récupérer les produits
  const productsResponse = await fetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/products/`)
  const products = await productsResponse.json()

  const productUrls = products.map((product: any) => ({
    url: `https://${HOST_IP}:${PORT}/boutique/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  return [
    {
      url: `https://${HOST_IP}:${PORT}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `https://${HOST_IP}:${PORT}/boutique`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productUrls,
  ]
} 