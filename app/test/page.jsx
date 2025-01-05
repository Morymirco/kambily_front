'use client'
import ProductCard from '@/app/Components/Common/ProductCard';
import Product from '@/app/Components/Common/Product';

export default function TestPage() {
  // Données de test communes
  const testProduct = {
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
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Page de Test des Composants</h1>

      {/* Test de ProductCard */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Test ProductCard</h2>
        <div className="max-w-sm">
          <ProductCard {...testProduct} />
        </div>
      </section>

      {/* Test de Product */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Test Product</h2>
        <div className="max-w-sm">
          <Product {...testProduct} />
        </div>
      </section>
    </div>
  );
} 