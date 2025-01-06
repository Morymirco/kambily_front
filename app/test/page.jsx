'use client'
import Product from '@/app/Components/Common/Product';
import ProductCard from '@/app/Components/Common/ProductCard';

export default function TestPage() {
  // Données de test communes
  const testProducts = [
    {
      id: 1,
      image: "/pyjama.png",
      gallery: [
        "/houston_tshirt.png",
        "/lunettes.webp",
        "/iphone.jpg"
      ],
      title: "Ensemble De Pyjama Confortable",
      price: "65,000",
      oldPrice: "75,000",
      inStock: true,
      description: "Pyjama confortable pour un sommeil réparateur",
      category: "Vêtements"
    },
    {
      id: 2,
      image: "/tshirt.png",
      gallery: [
        "/tshirt2.webp",
        "/tshirt.png"
      ],
      title: "T-shirt Houston",
      price: "85,000",
      oldPrice: "95,000",
      inStock: true,
      description: "T-shirt tendance pour homme",
      category: "Vêtements"
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Page de Test des Composants</h1>

      {/* Test de ProductCard */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Test ProductCard</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {testProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Test de Product */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Test Product</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {testProducts.map(product => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </section>
    </div>
  );
} 