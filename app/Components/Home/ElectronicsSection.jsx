'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import SmallProductCard from './SmallProductCard';

export default function ElectronicsSection() {
  const [mainProduct, setMainProduct] = useState(null);
  const [smallProducts, setSmallProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.kambily.store/products/');
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        
        if (data.products && data.products.length > 0) {
          const firstProduct = data.products[2];
          setMainProduct(firstProduct);
          setSmallProducts(data.products.slice(1, 4));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("mainProduct a été mis à jour:", mainProduct);
  }, [mainProduct]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!mainProduct || smallProducts.length === 0) {
    return null;
  }

  return (
    <div className="px-4 space-y-4">
      {/* Carte principale */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={mainProduct.images[0].image}
            alt={mainProduct.name}
            fill
            className="object-contain p-4"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium">
            {mainProduct.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            {mainProduct.regular_price && (
              <span className="text-gray-400 line-through text-sm">
                {mainProduct.regular_price.toLocaleString()}GNF
              </span>
            )}
            <span className="text-[#048B9A] font-medium">
              {mainProduct.promo_price.toLocaleString()}GNF
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-600 mt-1">
            <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
            {mainProduct.etat_stock ? 'En stock' : 'Rupture de stock'}
          </div>
          {mainProduct.short_description && (
            <p className="text-xs text-gray-400 mt-1">
              {mainProduct.short_description}
            </p>
          )}
        </div>
      </div>

      {/* Petites cartes */}
      <div className="space-y-2">
        {smallProducts.map((product) => (
          <SmallProductCard 
            key={product.id}
            imageUrl={product.images[0].image}
            title={product.name}
            price={product.promo_price}
            originalPrice={product.regular_price}
            inStock={product.etat_stock}
          />
        ))}
      </div>
    </div>
  );
} 