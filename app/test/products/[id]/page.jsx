'use client'
import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaHeart, FaShoppingCart, FaMinus, FaPlus, FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function ProductDetail({ params }) {
  const router = useRouter();
  const productId = use(params).id.split('-')[0];
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://192.168.43.134:8000/products/show/${productId}`);
      if (!response.ok) throw new Error('Produit non trouvé');
      const data = await response.json();
      console.log('Données du produit:', data);
      setProduct(data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!product) return <div>Produit non trouvé</div>;

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[éèê]/g, 'e')
      .replace(/[àâ]/g, 'a')
      .replace(/[ùû]/g, 'u')
      .replace(/[ôö]/g, 'o')
      .replace(/[ïî]/g, 'i')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const navigateToProduct = async (direction) => {
    const newId = direction === 'next' 
      ? parseInt(productId) + 1 
      : parseInt(productId) - 1;

    try {
      const response = await fetch(`http://192.168.43.134:8000/products/show/${newId}`);
      if (!response.ok) throw new Error('Produit non trouvé');
      const data = await response.json();
      const slug = createSlug(data.name);
      router.push(`/test/products/${newId}-${slug}`);
    } catch (err) {
      console.error('Erreur de navigation:', err);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12">
      <button 
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-[#048B9A] hover:underline mb-8"
      >
        <FaArrowLeft /> Retour aux produits
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galerie d'images */}
        <div>
          {/* Image principale */}
          <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
            <Image
              src={product.images[selectedImage]?.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Miniatures */}
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-[#048B9A] scale-105' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image.image}
                    alt={`${product.name} - vue ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informations produit */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-[#048B9A]">
                {parseFloat(product.price).toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'GNF'
                })}
              </span>
              <div className="flex items-center text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar className="text-gray-300" />
                <span className="ml-2 text-gray-600">(4.0)</span>
              </div>
            </div>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Catégorie */}
          <div className="border-t border-b py-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-600">Catégorie:</span>
              <span className="font-medium capitalize">{product.category.name}</span>
            </div>

            {/* Quantité */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Quantité:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <FaMinus />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 bg-[#048B9A] text-white px-6 py-3 rounded-lg hover:bg-[#037483] transition-colors flex items-center justify-center gap-2">
              <FaShoppingCart />
              Ajouter au panier
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 rounded-lg border ${
                isFavorite 
                  ? 'bg-red-50 text-red-500 border-red-500' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <FaHeart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation entre produits */}
      <div className="mt-12 flex justify-between">
        <button
          onClick={() => navigateToProduct('prev')}
          disabled={parseInt(productId) <= 1}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Produit précédent
        </button>
        <button
          onClick={() => navigateToProduct('next')}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          Produit suivant
        </button>
      </div>
    </div>
  );
} 