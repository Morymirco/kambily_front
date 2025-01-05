'use client'
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaEye, FaFacebookF, FaHeart, FaLink, FaShoppingCart, FaTimes, FaTwitter, FaWhatsapp } from 'react-icons/fa';

// Interface pour les props du composant ProductCard
interface ProductCardProps {
  image: string;
  gallery?: string[];
  title: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  description?: string;
  isFavorite?: boolean;
}

interface SharePlatform {
  platform: 'facebook' | 'twitter' | 'whatsapp' | 'copy';
}

const ProductCard = ({ 
  image, 
  gallery = [], 
  title, 
  price, 
  oldPrice, 
  inStock, 
  description, 
  isFavorite: initialFavorite = false 
}: ProductCardProps) => {
  const [showToast, setShowToast] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [showFavToast, setShowFavToast] = useState(false);

  const images = [image, ...(gallery || [])];

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleShare = async (platform: SharePlatform['platform']) => {
    const url = window.location.href;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${url}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        break;
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    setShowFavToast(true);
    setTimeout(() => setShowFavToast(false), 2000);
  };

  return (
    <>
      <div className="group bg-white rounded-xl overflow-hidden relative">
        {/* Image Container */}
        <div className="relative h-[200px] w-full overflow-hidden">
          <Image
            src={images[currentImageIndex]}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay au survol */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Indicateur du nombre d'images */}
          {images.length > 1 && (
            <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full z-10">
              {currentImageIndex + 1}/{images.length}
            </div>
          )}

          {/* Badge promo */}
          {oldPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
              Promo
            </div>
          )}

          {/* Boutons de navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
              >
                <FaChevronLeft className="w-3 h-3 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
              >
                <FaChevronRight className="w-3 h-3 text-gray-800" />
              </button>
            </>
          )}

          {/* Bouton œil */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={() => setShowModal(true)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            >
              <FaEye className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4">
          <h3 className="text-sm text-gray-800 mb-2 line-clamp-2 group-hover:text-[#048B9A] transition-colors">
            {title}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <p className="text-lg font-bold text-gray-900">{price}GNF</p>
            {oldPrice && (
              <p className="text-sm text-gray-500 line-through">{oldPrice}GNF</p>
            )}
          </div>

          {description && (
            <p className="text-sm text-gray-500 mb-2">{description}</p>
          )}
          
          {inStock && (
            <div className="flex items-center text-[#048B9A] mb-3">
              <svg 
                className="w-4 h-4 mr-1" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 8l-2-2H5L3 8h18z" />
                <path d="M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8" />
                <path d="M12 12v6" />
                <path d="M12 12l4-4" />
                <path d="M12 12l-4-4" />
              </svg>
              <span className="text-sm">In Stock</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {/* Bouton Favoris - Modifié pour apparaître au survol */}
            <button
              onClick={handleFavorite}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 ${
                isFavorite 
                  ? 'bg-red-50 hover:bg-red-100' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <FaHeart 
                className={`w-4 h-4 transition-colors duration-300 ${
                  isFavorite ? 'text-red-500' : 'text-gray-600'
                }`}
              />
            </button>

            {/* Bouton Ajouter au panier */}
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex-1 bg-[#048B9A] text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
            >
              {isAddingToCart ? (
                <>
                  <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  <span className="ml-2">Ajout...</span>
                </>
              ) : (
                <>
                  <FaShoppingCart className="w-3.5 h-3.5" />
                  <span className="text-xs">Ajouter au panier</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-5xl relative"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all z-10"
              >
                <FaTimes className="w-5 h-5 text-gray-600" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                {/* Section image */}
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={images[selectedImage]}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Miniatures */}
                  {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                      {images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative aspect-square rounded-lg overflow-hidden ${
                            selectedImage === index ? 'ring-2 ring-[#048B9A]' : ''
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`${title} view ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Section informations */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">{title}</h2>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-2xl font-bold text-[#048B9A]">
                      {price}GNF
                    </span>
                    {oldPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {oldPrice}GNF
                      </span>
                    )}
                  </div>

                  {description && (
                    <p className="text-gray-600 mb-6">{description}</p>
                  )}

                  {/* Bouton Ajouter au panier */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="w-full bg-[#048B9A] text-white rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-[#037483] transition-colors mb-6"
                  >
                    {isAddingToCart ? (
                      <>
                        <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        <span>Ajout en cours...</span>
                      </>
                    ) : (
                      <>
                        <FaShoppingCart className="w-5 h-5" />
                        Ajouter au panier
                      </>
                    )}
                  </button>

                  {/* Partage */}
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-3">Partager</h3>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleShare('facebook')}
                        className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
                      >
                        <FaFacebookF />
                      </button>
                      <button 
                        onClick={() => handleShare('twitter')}
                        className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600"
                      >
                        <FaTwitter />
                      </button>
                      <button 
                        onClick={() => handleShare('whatsapp')}
                        className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600"
                      >
                        <FaWhatsapp />
                      </button>
                      <button 
                        onClick={() => handleShare('copy')}
                        className="w-9 h-9 rounded-full bg-gray-600 text-white flex items-center justify-center hover:bg-gray-700 relative"
                      >
                        <FaLink />
                        {copySuccess && (
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
                            Copié !
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
          <div className="bg-white border rounded-lg shadow-lg p-4 w-[300px] flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 text-green-600 font-medium text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ajouté au panier
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-1 truncate">{title}</p>
              <Link href="/panier">
                <button className="mt-2 text-[#048B9A] text-sm font-medium hover:text-[#037383] transition-colors">
                  Voir le panier
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification pour les favoris */}
      <AnimatePresence>
        {showFavToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <div className="bg-white border rounded-lg shadow-lg p-4 flex items-center gap-4">
              {/* Image du produit */}
              <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                {/* Titre du produit */}
                <p className="text-gray-600 text-sm mb-1.5 line-clamp-2">
                  {title}
                </p>

                <div className="flex items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isFavorite ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    <FaHeart className={`w-4 h-4 ${
                      isFavorite ? 'text-red-500' : 'text-gray-600'
                    }`} />
                  </div>
                  <p className="text-sm font-medium">
                    {isFavorite 
                      ? 'Ajouté aux favoris' 
                      : 'Retiré des favoris'
                    }
                  </p>
                </div>
                <Link href="/favoris">
                  <button className="text-[#048B9A] text-sm hover:text-[#037483] transition-colors mt-1">
                    Voir mes favoris
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard; 