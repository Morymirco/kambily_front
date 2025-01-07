'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaArrowLeft, FaShoppingCart, FaHeart, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://kambily.ddns.net/products/${params.id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Erreur lors du chargement du produit');
        }

        const transformedProduct = {
          ...data,
          allImages: data.images?.map(img => img.image) || []
        };

        console.log('Données du produit:', transformedProduct);
        setProduct(transformedProduct);
        setLoading(false);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleQuantityChange = (action) => {
    if (action === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implémenter l'ajout au panier
    console.log('Ajout au panier:', {
      productId: product.id,
      quantity,
      size: selectedSize,
      color: selectedColor
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (product.allImages.length - 1) ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.allImages.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#048B9A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button 
            onClick={() => router.back()} 
            className="mt-4 px-4 py-2 bg-[#048B9A] text-white rounded hover:bg-[#037483]"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header amélioré */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-10 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold truncate flex-1 mx-4">
            {product.name}
          </h1>
          <motion.button 
            onClick={handleToggleFavorite}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full transition-colors ${
              isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaHeart className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.div>

      {/* Contenu avec animations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 py-6"
      >
        {/* Image du produit avec zoom au hover */}
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6 group">
          {product.allImages && product.allImages.length > 0 ? (
            <>
              <Image
                src={product.allImages[currentImageIndex]}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Boutons de navigation */}
              {product.allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaArrowRight />
                  </button>
                </>
              )}

              {/* Indicateurs */}
              {product.allImages.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {product.allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImageIndex === index 
                          ? 'bg-white w-4' 
                          : 'bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <Image
              src="/tshirt.png"
              alt={product.name}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Informations du produit */}
        <div className="space-y-6 bg-white rounded-lg p-6 shadow-sm">
          {/* Prix et stock */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {product.regular_price} GNF
              </p>
              {product.promo_price !== product.regular_price && (
                <p className="text-sm text-gray-500 line-through">
                  {product.promo_price} GNF
                </p>
              )}
            </div>
            <div className={`px-4 py-2 rounded-full ${
              product.stock_status 
                ? 'bg-green-50 text-green-600' 
                : 'bg-red-50 text-red-600'
            }`}>
              {product.stock_status ? 'En stock' : 'Rupture de stock'}
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {product.long_description || product.short_description || 'Aucune description disponible'}
            </p>
          </motion.div>

          {/* Tailles avec animation */}
          {product.sizes && product.sizes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-semibold mb-3">Tailles disponibles</h2>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size.name)}
                    className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                      selectedSize === size.name
                        ? 'border-[#048B9A] bg-[#048B9A] text-white'
                        : 'border-gray-200 hover:border-[#048B9A]'
                    }`}
                  >
                    {size.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Couleurs disponibles */}
          {product.colors && product.colors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-semibold mb-3">Couleurs disponibles</h2>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <motion.button
                    key={color.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(color.name)}
                    className={`group relative w-16 h-16 rounded-lg transition-all ${
                      selectedColor === color.name
                        ? 'ring-2 ring-[#048B9A] ring-offset-2'
                        : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-1'
                    }`}
                  >
                    {/* Couleur de fond basée sur le nom */}
                    <div 
                      className={`absolute inset-0 rounded-lg ${
                        color.name.toLowerCase() === 'blanc' ? 'border border-gray-200' : ''
                      }`}
                      style={{ backgroundColor: color.name.toLowerCase() }}
                    />
                    
                    {/* Overlay pour les couleurs claires */}
                    <div className={`
                      absolute inset-0 rounded-lg transition-opacity
                      ${selectedColor === color.name ? 'bg-black/5' : 'group-hover:bg-black/5'}
                      ${['blanc', 'jaune', 'beige'].includes(color.name.toLowerCase()) ? 'border border-gray-200' : ''}
                    `} />
                    
                    {/* Nom de la couleur */}
                    <div className="absolute inset-x-0 bottom-0 p-1 bg-black/40 rounded-b-lg">
                      <p className="text-xs text-white text-center font-medium truncate">
                        {color.name}
                      </p>
                    </div>

                    {/* Icône de sélection */}
                    {selectedColor === color.name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg 
                          className={`w-6 h-6 ${
                            ['blanc', 'jaune', 'beige'].includes(color.name.toLowerCase())
                              ? 'text-gray-800'
                              : 'text-white'
                          } drop-shadow-lg`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Couleur sélectionnée */}
              {selectedColor && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 flex items-center gap-2"
                >
                  <div 
                    className={`w-4 h-4 rounded-full ${
                      selectedColor.toLowerCase() === 'blanc' ? 'border border-gray-200' : ''
                    }`}
                    style={{ backgroundColor: selectedColor.toLowerCase() }}
                  />
                  <p className="text-sm text-gray-600">
                    Couleur sélectionnée : <span className="font-medium">{selectedColor}</span>
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Quantité */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-semibold mb-3">Quantité</h2>
            <div className="inline-flex items-center border-2 rounded-lg">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuantityChange('decrement')}
                className="px-4 py-2 text-gray-600 hover:text-[#048B9A] transition-colors"
                disabled={quantity <= 1}
              >
                -
              </motion.button>
              <span className="px-6 font-medium">{quantity}</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuantityChange('increment')}
                className="px-4 py-2 text-gray-600 hover:text-[#048B9A] transition-colors"
              >
                +
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bouton d'action fixe en bas avec animation */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={!product.stock_status || (!selectedSize && product.sizes?.length > 0) || (!selectedColor && product.colors?.length > 0)}
          className="w-full bg-[#048B9A] text-white px-6 py-4 rounded-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
        >
          <FaShoppingCart className="w-5 h-5" />
          <span className="font-medium">
            {!product.stock_status 
              ? 'Produit indisponible'
              : (!selectedSize && product.sizes?.length > 0)
              ? 'Veuillez sélectionner une taille'
              : (!selectedColor && product.colors?.length > 0)
              ? 'Veuillez sélectionner une couleur'
              : 'Ajouter au panier'
            }
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
} 