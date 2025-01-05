'use client'
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaEye, FaFacebookF, FaFilter, FaLink, FaSearch, FaShoppingCart, FaTimes, FaTwitter, FaWhatsapp } from 'react-icons/fa';

// Composant Toast modifié
const Toast = ({ message, image, onView }) => (
  <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
    <div className="bg-white border rounded-lg shadow-lg p-4 w-[300px] flex items-center gap-4">
      {/* Image du produit */}
      <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
        <Image
          src={image}
          alt="Product"
          fill
          className="object-cover"
        />
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          {/* Message et icône */}
          <div className="flex items-center gap-1.5 text-green-600 font-medium text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Ajouté au panier
          </div>
        </div>

        {/* Nom du produit */}
        <p className="text-gray-600 text-sm mt-1 truncate">
          {message}
        </p>

        {/* Bouton Voir */}
        <Link href='/panier'>
        <button
          onClick={onView}
          className="mt-2 text-[#048B9A] text-sm font-medium hover:text-[#037383] transition-colors"
        >
          Voir le panier
        </button>
        
        </Link>
      </div>
    </div>
  </div>
);

// Composant ProductCard mis à jour
const ProductCard = ({ id, image, gallery = [], title, price, inStock, category, viewMode }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const hasGallery = gallery && gallery.length > 0;
  const allImages = hasGallery ? [image, ...gallery] : [image];
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleOpenModal = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 500);
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 4000); // Durée augmentée à 4 secondes
    }, 800);
  };

  const handleViewCart = () => {
    // Redirection vers le panier
    console.log('Redirection vers le panier');
    setShowToast(false);
  };

  const handleQuantityChange = (action) => {
    if (action === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (action === 'increment') {
      setQuantity(quantity + 1);
    }
  };

  const handleShare = (platform) => {
    // Implementation of handleShare function
  };

  if (viewMode === 'list') {
    return (
      <div className="border rounded-xl overflow-hidden bg-white group">
        <div className="flex">
          {/* Colonne gauche : Image/Carousel avec largeur augmentée et coins arrondis */}
          <div className="w-[320px] h-[280px] relative flex-shrink-0 p-3">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              {hasGallery ? (
                <ImageCarousel images={allImages} title={title} />
              ) : (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              )}
              <div 
                onClick={handleOpenModal}
                className="absolute top-3 right-3 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-gray-100 z-10"
              >
                <FaEye className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Colonne centrale : Infos produit avec titre plus grand */}
          <div className="flex-1 p-6 flex flex-col justify-start min-w-0">
            <Link href={`/boutique/${id}`}>
              <h3 className="text-xl leading-6 font-semibold  text-gray-800 hover:text-[#048B9A] transition-colors mb-4 truncate">
                {title}
              </h3>
            </Link>

            <div className="mb-4">
              <span className="text-xl font-bold text-[#048B9A]">{price}GNF</span>
            </div>

            {inStock ? (
              <div className="flex items-center text-green-600">
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
                <span className="text-sm">En stock</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500">
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
                  <path d="M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8" opacity="0.5" />
                  <path d="M4 4l16 16" strokeWidth="1.5" />
                </svg>
                <span className="text-sm">Rupture de stock</span>
              </div>
            )}
          </div>

          {/* Colonne droite : Description et bouton */}
          <div className="w-[300px] p-6 border-l flex flex-col justify-between flex-shrink-0 bg-gray-50">
            <p className="text-sm text-gray-600 line-clamp-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <button 
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full bg-[#048B9A] text-white h-12 rounded-lg flex items-center justify-center gap-2 hover:bg-[#037383] transition-colors mt-4"
            >
              {isAddingToCart ? (
                <>
                  <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  <span className="ml-2">Ajout...</span>
                </>
              ) : (
                <>
                  <FaShoppingCart className="w-4 h-4" />
                  Ajouter
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Le reste du composant reste EXACTEMENT identique
  return (
    <>
      <div className={`
        border rounded-xl overflow-hidden bg-white group
        ${viewMode === 'list' ? 'flex' : ''}
      `}>
        {/* Image du produit */}
        <div className={`
          relative overflow-hidden rounded-2xl
          ${viewMode === 'list' ? 'w-[300px] h-[300px]' : 'h-[300px] w-full'}
        `}>
          {hasGallery ? (
            <ImageCarousel images={allImages} title={title} />
          ) : (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div 
            onClick={handleOpenModal}
            className="absolute top-3 right-3 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-gray-100 z-10"
          >
            <FaEye className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        {/* Informations du produit */}
        <div className={`
          p-4 flex flex-col
          ${viewMode === 'list' ? 'flex-1 justify-between' : ''}
        `}>
          <div>
            <Link href={`/boutique/${id}`}>
              <h3 className={`
                text-gray-800 font-bold hover:text-[#12B886] transition-colors
                ${viewMode === 'list' ? 'text-xl mb-4' : 'text-sm mb-2 line-clamp-2'}
              `}>
                {title}
              </h3>
            </Link>

            {viewMode === 'list' && (
              <p className="text-gray-600 mb-4 line-clamp-3">
                {/* Description si disponible */}
                Une description détaillée du produit pourrait être affichée ici en mode liste...
              </p>
            )}

            <div className="flex  font-light items-center gap-2 mb-3">
              <span className={`  ${viewMode === 'list' ? 'text-2xl' : 'text-lg'}`}>
                {price}GNF
              </span>
            </div>

            {inStock ? (
              <div className="flex items-center text-green-600 mb-3">
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
                <span className="text-sm">En stock</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500 mb-3">
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
                  <path d="M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8" opacity="0.5" />
                  <path d="M4 4l16 16" strokeWidth="1.5" />
                </svg>
                <span className="text-sm">Rupture de stock</span>
              </div>
            )}
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`
              bg-[#048B9A] text-white rounded-lg flex items-center justify-center gap-2 
              hover:bg-[#037383] transition-all relative overflow-hidden
              ${viewMode === 'list' 
                ? 'w-[200px] h-12' 
                : 'w-full h-10 sm:opacity-0 sm:group-hover:opacity-100'
              }
              ${isAddingToCart ? 'cursor-wait' : 'cursor-pointer'}
            `}
          >
            {isAddingToCart ? (
              <>
                <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                <span className="ml-2">Ajout...</span>
              </>
            ) : (
              <>
                <FaShoppingCart className="w-4 h-4" />
                Ajouter
              </>
            )}
          </button>
        </div>
      </div>

      {/* Toast notification modifiée */}
      {showToast && (
        <Toast 
          message={title}
          image={image}
          onView={handleViewCart}
        />
      )}

      {/* Modal identique à celui de Produit.jsx */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-5xl relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all z-10 group"
            >
              <FaTimes className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Section image principale et miniatures */}
              <div className="space-y-4">
                {/* Image principale */}
                <div className="relative h-[500px] rounded-lg overflow-hidden">
                  <Image
                    src={allImages[selectedImage]}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                  {hasGallery && (
                    <>
                      <button
                        onClick={() => setSelectedImage(prev => prev === 0 ? allImages.length - 1 : prev - 1)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                      >
                        <FaChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedImage(prev => (prev + 1) % allImages.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                      >
                        <FaChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Miniatures */}
                {hasGallery && (
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all ${
                          selectedImage === index 
                            ? 'ring-2 ring-[#048B9A] opacity-100' 
                            : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${title} - vue ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Section détails */}
              <div className="space-y-6">
                {/* Titre */}
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                
                {/* Stock */}
                {inStock && (
                  <div className="flex items-center text-green-600">
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
                    <span>En stock</span>
                  </div>
                )}

                {/* Prix */}
                <p className="text-3xl font-bold text-[#048B9A]">{price}GNF</p>

                {/* Groupe Quantité + Ajouter au panier */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg h-12">
                    <button
                      onClick={() => handleQuantityChange('decrement')}
                      className="px-3 h-full text-gray-600 hover:text-[#048B9A] disabled:opacity-50 disabled:cursor-not-allowed border-r"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange('increment')}
                      className="px-3 h-full text-gray-600 hover:text-[#048B9A] border-l"
                    >
                      +
                    </button>
                  </div>

                  <button 
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="w-[200px] bg-[#048B9A] text-white h-12 rounded-lg flex items-center justify-center gap-2 hover:bg-[#037383] transition-colors"
                  >
                    {isAddingToCart ? (
                      <>
                        <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        <span className="ml-2">Ajout...</span>
                      </>
                    ) : (
                      <>
                        <FaShoppingCart className="w-4 h-4" />
                        Ajouter
                      </>
                    )}
                  </button>
                </div>

                {/* Tailles */}
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Tailles disponibles</h3>
                  <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL'].map((size) => (
                      <button 
                        key={size}
                        className="w-10 h-10 border rounded-md flex items-center justify-center hover:border-[#048B9A] hover:text-[#048B9A]"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Catégorie */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Catégorie:</h3>
                    <div className="text-gray-600">
                      {category}
                    </div>
                  </div>
                </div>

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
          </div>
        </div>
      )}
    </>
  );
};

const Boutique = () => {
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [priceRange, setPriceRange] = useState([0, 185000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // Données de produits étendues
  const allProducts = [
    {
      id: 1,
      category: 'vetements',
      image: "/pyjama.png",
      title: "Ensemble De Pyjama Short & Top À Fines Brides Imprimé Cœur",
      price: 65000,
      oldPrice: 85000,
      inStock: true
    },
    {
      id: 2,
      category: 'accessoires',
      image: "/casque.webp",
      title: "Casquette Los Angeles California",
      price: 45000,
      oldPrice: 55000,
      inStock: true
    },
    {
      id: 3,
      category: 'vetements',
      image: "/tshirt.png",
      title: "Ensemble Blanc Motif Cœur",
      price: 75000,
      oldPrice: 95000,
      inStock: true
    },
    {
      id: 4,
      category: 'vetements',
      image: "/souris.webp",
      title: "Body Sculptant Sans Couture",
      price: 55000,
      oldPrice: 70000,
      inStock: false
    },
    {
      id: 5,
      category: 'vetements',
      image: "/tshirt.png",
      title: "Robe d'Été Légère Fleurie",
      price: 85000,
      oldPrice: 100000,
      inStock: true
    },
    {
      id: 6,
      category: 'accessoires',
      image: "/tshirt.png",
      title: "Sac à Main Élégant",
      price: 120000,
      oldPrice: 150000,
      inStock: true
    },
    {
      id: 7,
      category: 'vetements',
      image: "/tshirt.png",
      title: "Jean Slim Taille Haute",
      price: 95000,
      oldPrice: 115000,
      inStock: true
    },
    {
      id: 8,
      category: 'accessoires',
      image: "/tshirt.png",
      title: "Montre Analogique Classique",
      price: 180000,
      oldPrice: 220000,
      inStock: true
    }
  ];

  // Catégories avec leur nombre de produits
  const categories = [
    { name: 'Accessoires', count: 4 },
    { name: 'Accessoires de tête', count: 1 },
    { name: 'Chapeau', count: 1 },
    { name: 'Lunettes', count: 1 },
    { name: 'Bijouterie', count: 6 },
    { name: 'Bijoux de corps', count: 1 },
    { name: 'Bracelets', count: 2 },
    { name: 'Colliers', count: 3 },
    { name: 'Colliers femmes', count: 2 },
    { name: 'Electronique', count: 6 },
    { name: 'Coques & accessoires de téléphone', count: 2 },
    { name: 'Non classé', count: 2 },
    { name: 'Sous-vêtements', count: 1 },
    { name: 'Vêtements', count: 5 },
    { name: 'Vêtements pour femmes', count: 3 },
    { name: 'Hauts', count: 1 },
  ];

  // Filtrer les produits quand la recherche change
  useEffect(() => {
    setIsFiltering(true);
    const timeoutId = setTimeout(() => {
      const filtered = allProducts.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      setIsFiltering(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Animation variants pour les produits
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const productVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    show: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-16 my-8">
      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#048B9A]">Accueil</Link>
        <span>›</span>
        <span className="text-gray-900">Boutique</span>
      </div>

      {/* Barre de recherche avec suggestions */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="relative max-w-2xl mx-auto">
          <motion.div
            animate={{
              scale: isSearchFocused ? 1.02 : 1,
              boxShadow: isSearchFocused 
                ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
                : '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => {
                setTimeout(() => setIsSearchFocused(false), 200)
              }}
              className="w-full px-5 py-4 pr-12 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A] bg-white transition-all duration-200"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <FaSearch className={`w-5 h-5 transition-colors duration-200 ${
                isSearchFocused ? 'text-[#048B9A]' : 'text-gray-400'
              }`} />
            </div>
          </motion.div>
          
          {/* Suggestions de recherche avec animation */}
          <AnimatePresence>
            {searchQuery && isSearchFocused && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-20"
              >
                <h3 className="text-sm font-medium text-gray-600 mb-3">Suggestions :</h3>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {['Robe d\'été', 'Robe de soirée', 'Robe longue'].filter(item => 
                    item.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setIsSearchFocused(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-gray-700"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tags populaires avec animation */}
        <motion.div 
          className="mt-3 flex items-center justify-center gap-2 flex-wrap text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-gray-500">Recherches populaires:</span>
          {['Robe', 'T-shirt', 'Accessoires', 'Chaussures'].map((tag, index) => (
            <motion.button
              key={tag}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchQuery(tag);
                setIsSearchFocused(false);
              }}
              className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Barre d'outils de la boutique */}
      <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-4 mb-8">
        {/* Première ligne : Résultats et Filtres */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Nombre de résultats */}
          <div className="text-gray-600 text-sm">
            Affichage de 1–12 sur 24 résultats
          </div>

          {/* Bouton Filter */}
          <button 
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483] transition-colors text-sm"
          >
            <FaFilter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter Products</span>
            <span className="sm:hidden">Filtres</span>
          </button>
        </div>

        {/* Deuxième ligne : Options de tri et affichage */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Tri */}
          <div className="flex items-center gap-2 flex-grow sm:flex-grow-0">
            <span className="text-sm text-gray-600 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-[#048B9A] focus:border-[#048B9A] bg-white w-full sm:w-auto"
            >
              <option value="popular">Tri par popularité</option>
              <option value="recent">Plus récents</option>
              <option value="prixCroissant">Prix croissant</option>
              <option value="prixDecroissant">Prix décroissant</option>
            </select>
          </div>

          {/* Nombre d'items par page */}
          <div className="flex items-center gap-2 order-last sm:order-none">
            <span className="text-sm text-gray-600 hidden sm:inline">Show:</span>
            <select
              className="border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-[#048B9A] focus:border-[#048B9A] bg-white"
            >
              <option>12</option>
              <option>24</option>
              <option>36</option>
            </select>
          </div>

          {/* Boutons de vue - Masqués sur mobile */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-[#12B886] text-white' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              aria-label="Vue en grille"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zm-12 6h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zm-12 6h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
              </svg>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-[#12B886] text-white' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              aria-label="Vue en liste"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h16v4H4V4zm0 6h16v4H4v-4zm0 6h16v4H4v-4z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Snackbar de filtres */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start overflow-y-auto py-8">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">FILTRER</h2>
              <button 
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-8">
              {/* Prix */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Prix</h3>
                <div className="px-4">
                  <div className="flex justify-between mb-4 text-gray-600">
                    <span>{priceRange[0].toLocaleString()}GNF</span>
                    <span>{priceRange[1].toLocaleString()}GNF</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="185000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#048B9A]"
                  />
                </div>
              </div>

              {/* Barre de recherche */}
              <div className="mb-10">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher une catégorie..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#048B9A] focus:border-[#048B9A] outline-none"
                  />
                  <svg className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Catégories */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Catégories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-h-[400px] overflow-y-auto pr-4">
                  {categories.map((category, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded border-gray-300 text-[#048B9A] focus:ring-[#048B9A]"
                        />
                        <span className="text-gray-700 group-hover:text-[#048B9A] transition-colors">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer avec boutons */}
            <div className="border-t p-6 flex justify-between items-center bg-gray-50 rounded-b-xl">
              <button 
                onClick={() => {
                  setPriceRange([0, 185000]);
                  // Réinitialiser autres filtres
                }}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Réinitialiser les filtres
              </button>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                >
                  Annuler
                </button>
                <button 
                  onClick={() => {
                    // Appliquer les filtres
                    setShowFilters(false);
                  }}
                  className="px-6 py-2.5 bg-[#048B9A] hover:bg-[#037483] text-white rounded-lg font-medium transition-colors"
                >
                  Appliquer les filtres
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Résultats de la recherche */}
      <div className="mt-8">
        {/* Message de recherche en cours */}
        <AnimatePresence>
          {isFiltering && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500 py-4"
            >
              Recherche en cours...
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nombre de résultats */}
        <AnimatePresence>
          {!isFiltering && searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 text-gray-600"
            >
              {filteredProducts.length} résultat(s) trouvé(s) pour "{searchQuery}"
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grille de produits avec animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}
        >
          <AnimatePresence>
            {(searchQuery ? filteredProducts : allProducts).map(product => (
              <motion.div
                key={product.id}
                variants={productVariants}
                layout
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <ProductCard
                  {...product}
                  viewMode={viewMode}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Message aucun résultat */}
        <AnimatePresence>
          {!isFiltering && searchQuery && filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <FaSearch className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-gray-500">
                  Essayez avec d'autres mots-clés ou parcourez nos catégories
                </p>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-[#048B9A] hover:underline"
              >
                Voir tous les produits
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <nav className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">
            ‹
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#048B9A] text-white">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50">
            ›
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Boutique; 