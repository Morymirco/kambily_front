'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaCartPlus, FaHeart, FaMinus, FaPlus, FaShare } from 'react-icons/fa';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.kambily.store/products/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors du chargement du produit');
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      toast.error('Veuillez sélectionner une taille');
      return;
    }
    if (!selectedColor && product.colors?.length > 0) {
      toast.error('Veuillez sélectionner une couleur');
      return;
    }
    // Ajouter au panier
    toast.success('Produit ajouté au panier');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${url}`);
        break;
    }
    setShowShareModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 border-4 border-[#048B9A] border-t-transparent rounded-full animate-spin"
        />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Produit non trouvé'}</p>
          <button 
            onClick={() => router.back()}
            className="px-6 py-3 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483]"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Bouton retour */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-[#048B9A]"
        >
          <FaArrowLeft />
          <span>Retour aux produits</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Galerie d'images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={product.images?.[selectedImage]?.image || '/tshirt.png'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Miniatures */}
              <div className="grid grid-cols-4 gap-2">
                {product.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 
                      ${selectedImage === index ? 'border-[#048B9A]' : 'border-transparent'}`}
                  >
                    <Image
                      src={image.image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Informations produit */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <p className="text-gray-600 mt-2">{product.short_description}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-[#048B9A]">
                  {product.regular_price} GNF
                </span>
                {product.promo_price && product.promo_price !== product.regular_price && (
                  <span className="text-xl text-gray-500 line-through">
                    {product.promo_price} GNF
                  </span>
                )}
              </div>

              {/* Tailles */}
              {product.sizes?.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Tailles disponibles</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size.id)}
                        className={`px-4 py-2 rounded-md border ${
                          selectedSize === size.id
                            ? 'border-[#048B9A] bg-[#048B9A] text-white'
                            : 'border-gray-300 hover:border-[#048B9A]'
                        }`}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Couleurs */}
              {product.colors?.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Couleurs disponibles</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color.id
                            ? 'border-[#048B9A] ring-2 ring-[#048B9A] ring-offset-2'
                            : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color.code }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantité */}
              <div>
                <h3 className="font-medium mb-2">Quantité</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                  >
                    <FaMinus className="w-3 h-3" />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                  >
                    <FaPlus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#048B9A] text-white h-12 rounded-lg flex items-center justify-center gap-2 hover:bg-[#037483]"
                >
                  <FaCartPlus />
                  Ajouter au panier
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`w-12 h-12 rounded-lg border flex items-center justify-center ${
                    isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <FaHeart />
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="w-12 h-12 rounded-lg border flex items-center justify-center text-gray-400 hover:text-[#048B9A]"
                >
                  <FaShare />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 