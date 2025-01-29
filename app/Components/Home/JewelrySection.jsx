'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CategoryBanner from './CategoryBanner';
import Product from '../Common/Product';

export default function JewelrySection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.kambily.store/products/');
        const data = await response.json();
        console.log("data", data);
        console.log("data_product", data.products.slice(0, 2));
        setProducts(data.products.slice(0, 2)); // On prend seulement les 2 premiers produits
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className=" py-3">
        <div className="flex items-center gap-3 mb-8">
          <div className="text-[#048B9A]">
            <Image src="/icons/price.png" alt="Quality" width={100} height={100} />
          </div>
          <div>
            <h2 className="text-sm font-medium">Meilleures Offres</h2>
            <p className="text-xs text-gray-400 leading-tight">
              Découvrez nos offres imbattables conçues pour offrir le meilleur rapport qualité-prix.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {loading ? (
            // Skeleton loading
            [...Array(2)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))
          ) : (
            products.map((product) => (
              <Product
                key={product.id}
                image={product.images[0].image || "/bijoux/default.jpg"}
                title={product.name}
                price={`${product.regular_price.toLocaleString()}`}
                inStock={product.etat_stock === 'En stock'}
              />
            ))
          )}
        </div>
      </div>

      <CategoryBanner 
        imageUrl="/chaine.jpg"
        imageAlt="Collection de bijoux"
        category="BIJOUTERIE"
        title="Éblouissez-vous avec notre collection de bijoux"
        description="Parcourez notre collection pour trouver des bijoux qui parlent de votre style unique."
        onClick={() => {
          console.log('Explorer la collection de bijoux');
        }}
      />
    </>
  );
}

function JewelryItem({ image, title, price, inStock = true }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="relative aspect-square">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
        <div className="text-[#048B9A] font-medium mt-1">{price}</div>
        {inStock && (
          <div className="flex items-center gap-2 text-xs text-green-600 mt-1">
            <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
            En stock
          </div>
        )}
        <button className="w-full mt-2 bg-[#048B9A] text-white py-2 rounded-lg text-sm hover:bg-[#037483] transition-colors">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
} 