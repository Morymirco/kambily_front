'use client'
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebookF, FaHeart, FaLinkedinIn, FaShare, FaShoppingCart, FaStar, FaTimes, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { FiZoomIn } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import ProductCard from './../../Components/Common/ProductCard';

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: '',
    images: []
  });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFavToast, setShowFavToast] = useState(false);

  // Images du produit (à remplacer par vos vraies images)
  const productImages = [
    '/sex1.webp',
    '/sex2.webp',
    '/sex3.webp',
    '/sex1.webp',
  ];

  // Tailles disponibles
  const sizes = ['S', 'M', 'L', 'XL'];

  // Données des produits similaires
  const similarProducts = [
    {
      id: 1,
      image: "/realite.webp",
      gallery: ["/realite.webp", "/realite2.webp", "/realite3.webp"],
      title: "Réalité Virtuelle Casque , Portable 3D Virtuel Réalité Lunettes Pour Films Et Jeux",
      price: "185,000",
      oldPrice: "210,000",
      inStock: true,
      description: "Profitez dès maintenant avant la fin de l'offre"
    },
    {
      id: 2,
      image: "/pochette.webp",
      gallery: ["/pochette.webp", "/pochette2.webp"],
      title: "Coque De Téléphone Portable Figure",
      price: "45,000",
      inStock: true
    },
    {
      id: 3,
      image: "/lumiere.webp",
      gallery: ["/lumiere.webp", "/lumiere2.webp"],
      title: "1 pièce Lumière d'ambiance pour téléphone clip rond avec miroir",
      price: "40,000",
      inStock: true
    },
    {
      id: 4,
      image: "/lunettes.webp",
      gallery: ["/lunettes.webp", "/lunettes2.webp"],
      title: "3 Pièces Lunettes De Soleil De Mode",
      price: "85,000",
      oldPrice: "100,000",
      inStock: true,
      description: "Ne manquez pas cette opportunité tant qu'elle dure"
    }
  ];

  // Données des avis
  const reviews = [
    {
      id: 1,
      user: "Marie S.",
      rating: 5,
      date: "15 Mars 2024",
      comment: "Très satisfaite de mon achat ! Le tissu est de bonne qualité et la taille correspond parfaitement.",
      avatar: "/avatars/user1.jpg"
    },
    {
      id: 2,
      user: "Sophie L.",
      rating: 4,
      date: "10 Mars 2024",
      comment: "Bon rapport qualité-prix. Seul petit bémol : le délai de livraison un peu long.",
      avatar: "/avatars/user2.jpg"
    }
  ];

  // Données des catégories
  const categories = ['Pyjama', 'Femme', 'Ensemble', 'Nuit'];

  // Fonction pour gérer la soumission de l'avis
  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique pour envoyer l'avis à votre backend
    console.log('Nouvel avis:', newReview);
    
    // Réinitialiser le formulaire et fermer le modal
    setNewReview({
      rating: 0,
      title: '',
      comment: '',
      images: []
    });
    setShowReviewModal(false);
  };

  // Fonction pour ouvrir le lightbox
  const openLightbox = (index) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
    // Désactiver le scroll du body
    document.body.style.overflow = 'hidden';
  };

  // Fonction pour fermer le lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    // Réactiver le scroll du body
    document.body.style.overflow = 'unset';
  };

  // Navigation dans le lightbox
  const nextImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setLightboxImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  // Fonction pour gérer le partage
  const handleShare = async (platform) => {
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
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
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

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    setShowFavToast(true);
    setTimeout(() => setShowFavToast(false), 2000);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12">
      {/* Fil d'Ariane */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <Link href="/" className="text-gray-500 hover:text-[#048B9A]">Accueil</Link>
        <span className="text-gray-500">/</span>
        <Link href="/boutique" className="text-gray-500 hover:text-[#048B9A]">Boutique</Link>
        <span className="text-gray-500">/</span>
        <span className="text-gray-900">Détails du produit</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galerie d'images avec bouton zoom */}
        <div className="space-y-4">
          {/* Image principale */}
          <div className="relative aspect-square rounded-xl overflow-hidden group">
            <Image
              src={productImages[selectedImage]}
              alt="Product"
              fill
              className="object-cover"
              priority
            />
            {/* Bouton zoom */}
            <button
              onClick={() => openLightbox(selectedImage)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
            >
              <FiZoomIn className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Miniatures avec bouton zoom */}
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                <button
                  onClick={() => setSelectedImage(index)}
                  className={`w-full h-full relative ${
                    selectedImage === index ? 'ring-2 ring-[#048B9A]' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Product view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
                {/* Bouton zoom sur les miniatures */}
                <button
                  onClick={() => openLightbox(index)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                >
                  <FiZoomIn className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {isLightboxOpen && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
            {/* Bouton fermer - Correction de la position et du z-index */}
            <button
              onClick={closeLightbox}
              className="fixed top-4 right-4 w-12 h-12 flex items-center justify-center text-white hover:text-gray-300 transition-colors z-[60]"
            >
              <IoMdClose className="w-8 h-8" />
            </button>

            {/* Container de l'image */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={productImages[lightboxImageIndex]}
                  alt="Product zoom view"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Boutons navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                ›
              </button>

              {/* Miniatures en bas */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setLightboxImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      lightboxImageIndex === index 
                        ? 'border-white' 
                        : 'border-transparent hover:border-white/50'
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={productImages[index]}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Informations produit */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Ensemble De Pyjama Short & Top À Fines Brides Imprimé Cœur</h1>

          {/* Prix et notation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#048B9A]">65,000 GNF</span>
              <span className="text-lg text-gray-500 line-through">85,000 GNF</span>
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center gap-3">
              {/* Bouton favoris */}
              <button 
                onClick={handleFavorite}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isFavorite 
                    ? 'bg-red-50 hover:bg-red-100' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <FaHeart 
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isFavorite ? 'text-red-500' : 'text-gray-600'
                  }`} 
                />
              </button>

              {/* Bouton partager */}
              <button 
                onClick={() => setShowShareModal(true)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FaShare className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600">
            Un ensemble de pyjama confortable et élégant, parfait pour une nuit reposante. 
            Le top à fines brides et le short assorti sont ornés d'un charmant imprimé cœur.
          </p>

          {/* Sélection de taille */}
          <div>
            <h3 className="font-medium mb-3">Taille</h3>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-lg border ${
                    selectedSize === size
                      ? 'border-[#048B9A] text-[#048B9A]'
                      : 'border-gray-300 hover:border-gray-400'
                  } flex items-center justify-center font-medium`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantité */}
          <div>
            <h3 className="font-medium mb-3">Quantité</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4 pt-6">
            <button className="flex-1 bg-[#048B9A] text-white h-14 rounded-lg flex items-center justify-center gap-2 hover:bg-[#037483] transition-colors">
              <FaShoppingCart />
              <span>Ajouter au panier</span>
            </button>
            <button className="flex-1 border border-[#048B9A] text-[#048B9A] h-14 rounded-lg flex items-center justify-center gap-2 hover:bg-[#048B9A] hover:text-white transition-colors">
              Acheter maintenant
            </button>
          </div>

          {/* Catégories */}
          <div className="pt-6 border-t">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Catégories:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/boutique?category=${category.toLowerCase()}`}
                    className="text-[#048B9A] hover:underline text-sm bg-[#E6F4F6] px-3 py-1 rounded-full"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Partage social */}
          <div className="pt-6 border-t">
            <h3 className="font-medium mb-3">Partager</h3>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <FaFacebookF />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <FaTwitter />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#0077B5] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbar Description et Avis */}
      <div className="mt-16">
        {/* Onglets */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-8 py-4 font-medium text-lg transition-colors relative
              ${activeTab === 'description' 
                ? 'text-[#048B9A]' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Description
            {activeTab === 'description' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#048B9A]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-8 py-4 font-medium text-lg transition-colors relative
              ${activeTab === 'reviews' 
                ? 'text-[#048B9A]' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Avis (12)
            {activeTab === 'reviews' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#048B9A]" />
            )}
          </button>
        </div>

        {/* Contenu des onglets */}
        <div className="py-8">
          {activeTab === 'description' ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Description du produit</h3>
                <p className="text-gray-600 leading-relaxed">
                  Découvrez notre ensemble pyjama élégant et confortable, parfait pour vos moments de détente. 
                  Confectionné dans un tissu doux et respirant, cet ensemble comprend un top à fines brides 
                  et un short assorti, tous deux ornés d'un charmant motif cœur.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Caractéristiques</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Matière : 95% Coton, 5% Élasthanne</li>
                  <li>Lavable en machine à 30°C</li>
                  <li>Ne pas utiliser de sèche-linge</li>
                  <li>Disponible en plusieurs tailles</li>
                  <li>Fabriqué en Guinée</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Livraison et retours</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Livraison gratuite à partir de 500,000 GNF d'achat</li>
                  <li>Délai de livraison : 2-4 jours ouvrés</li>
                  <li>Retours gratuits sous 30 jours</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* En-tête des avis */}
              <div className="flex items-start gap-8 p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">4.5</div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < 4.5 ? "text-yellow-400" : "text-gray-300"} />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">Basé sur 12 avis</div>
                </div>

                <div className="flex-1">
                  {/* Barres de progression des notes */}
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3 mb-2">
                      <div className="text-sm text-gray-600 w-6">{rating}</div>
                      <FaStar className="text-yellow-400 w-4 h-4" />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 10}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-500 w-12">
                        {rating === 5 ? '70%' : rating === 4 ? '20%' : '10%'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Liste des avis */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <FaUser className="text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">{review.user}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <FaStar 
                                key={i}
                                className={i < review.rating ? "text-yellow-400 w-4 h-4" : "text-gray-300 w-4 h-4"}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>

              {/* Bouton Ajouter un avis */}
              <div className="text-center mt-8">
                <motion.button
                  onClick={() => setShowReviewModal(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#048B9A] text-white px-6 py-3 rounded-lg hover:bg-[#037483] transition-colors"
                >
                  Donner votre avis
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section Produits Similaires */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Produits Similaires</h2>
        
        {/* Grille des produits similaires */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {similarProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              gallery={product.gallery}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              inStock={product.inStock}
              description={product.description}
            />
          ))}
        </div>
      </div>

      {/* Modal pour donner un avis */}
      <AnimatePresence>
        {showReviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowReviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header du modal */}
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-bold">Donner votre avis</h3>
                <button 
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Formulaire d'avis */}
              <form onSubmit={handleSubmitReview} className="p-6 space-y-6">
                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre note *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="text-2xl focus:outline-none"
                      >
                        <FaStar 
                          className={star <= newReview.rating 
                            ? "text-yellow-400" 
                            : "text-gray-300"
                          } 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Titre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre de votre avis *
                  </label>
                  <input
                    type="text"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                    required
                  />
                </div>

                {/* Commentaire */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre avis détaillé *
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                    required
                  />
                </div>

                {/* Boutons d'action */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483] disabled:opacity-50"
                    disabled={!newReview.rating || !newReview.comment.trim() || !newReview.title.trim()}
                  >
                    Publier l'avis
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de partage */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl w-full max-w-md p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Partager ce produit</h3>
                <button 
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Lien du produit */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Lien du produit :</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-600"
                  />
                  <button
                    onClick={() => handleShare('copy')}
                    className="px-4 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483] transition-colors relative"
                  >
                    Copier
                    {copySuccess && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
                        Copié !
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Boutons de partage */}
              <div>
                <p className="text-sm text-gray-600 mb-3">Partager sur les réseaux sociaux :</p>
                <div className="grid grid-cols-4 gap-3">
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <FaFacebookF className="w-6 h-6 text-blue-600" />
                    <span className="text-xs text-gray-600">Facebook</span>
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <FaTwitter className="w-6 h-6 text-sky-500" />
                    <span className="text-xs text-gray-600">Twitter</span>
                  </button>
                  <button 
                    onClick={() => handleShare('whatsapp')}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <FaWhatsapp className="w-6 h-6 text-green-500" />
                    <span className="text-xs text-gray-600">WhatsApp</span>
                  </button>
                  <button 
                    onClick={() => handleShare('linkedin')}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <FaLinkedinIn className="w-6 h-6 text-blue-700" />
                    <span className="text-xs text-gray-600">LinkedIn</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  src={productImages[0]}
                  alt="Product"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                {/* Titre du produit */}
                <p className="text-gray-600 text-sm mb-1.5 line-clamp-2">
                  Réalité Virtuelle Casque , Portable 3D Virtuel Réalité Lunettes Pour Films Et Jeux
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
    </div>
  );
};

export default ProductDetail; 