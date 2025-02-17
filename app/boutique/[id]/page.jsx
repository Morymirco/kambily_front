'use client'
import { useAuth } from '@/app/providers/AuthProvider';
import { useFavorites } from '@/app/providers/FavoritesProvider';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaFacebookF, FaHeart, FaImage, FaLinkedinIn, FaShare, FaShoppingCart, FaStar, FaTimes, FaTwitter, FaUser, FaWhatsapp } from 'react-icons/fa';
import { FiZoomIn } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '../../Components/Common/ProductCard';
import { HOST_IP, PORT, PROTOCOL_HTTP } from '../../constants';
import { useCart } from '@/app/providers/CartProvider';

const ProductSkeleton = () => (
  <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12">
    {/* Fil d'Ariane skeleton */}
    <div className="flex items-center gap-2 mb-8">
      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
      <div className="w-2 h-4 bg-gray-200 rounded animate-pulse" />
      <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
      <div className="w-2 h-4 bg-gray-200 rounded animate-pulse" />
      <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Galerie d'images skeleton */}
      <div className="space-y-4">
        <div className="relative aspect-square rounded-lg bg-gray-200 animate-pulse" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
          ))}
        </div>
      </div>

      {/* Informations produit skeleton */}
      <div className="space-y-6">
        {/* Titre */}
        <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse" />

        {/* Prix et notation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Tailles */}
        <div className="space-y-4">
          <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>

        {/* Couleurs */}
        <div className="space-y-4">
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
        </div>

        {/* Quantité */}
        <div className="space-y-4">
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-4 pt-6">
          <div className="flex-1 h-14 bg-gray-200 rounded-lg animate-pulse" />
          <div className="flex-1 h-14 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

const ReviewsTab = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun avis pour le moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div 
          key={review.id}
          className="border-b border-gray-200 pb-6 last:border-b-0"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              {review.user?.image ? (
                <Image
                  src={review.user.image}
                  alt={`${review.user.first_name} ${review.user.last_name}`}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-400 w-5 h-5" />
                </div>
              )}
              <div>
                <h4 className="font-medium text-gray-900">
                  {`${review.user.first_name} ${review.user.last_name}`}
                </h4>
                <p className="text-sm text-gray-500">
                  {format(new Date(review.created_at), 'dd MMMM yyyy', { locale: fr })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(review.rating) 
                      ? 'text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">
                {parseFloat(review.rating).toFixed(1)}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
};

const ReviewForm = ({ productId, setReviews }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('rating', rating);
      formData.append('comment', comment);
      formData.append('product_id', productId);
      

    
      const response = await axios.post(
        `${PROTOCOL_HTTP}://${HOST_IP}${PORT}/reviews/create/`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 201) {
        // Récupérer les données de l'utilisateur connecté
        const userData = JSON.parse(localStorage.getItem('user'));
        
        // Créer le nouvel avis avec le format attendu
        const newReview = {
          id: response.data.id,
          user: {
            id: userData.id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            image: userData.image
          },
          rating: rating.toString(),
          comment: comment,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        // Ajouter le nouvel avis à la liste existante
        setReviews(prevReviews => [newReview, ...prevReviews]);
        
        // Réinitialiser le formulaire
        setRating(0);
        setComment('');
        setImages([]);
        
        toast.success('Votre avis a été publié avec succès !');
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la publication de votre avis');
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 border-t pt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Donner votre avis</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Note
        </label>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <button
                type="button"
                key={index}
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none"
              >
                <FaStar
                  className={`w-8 h-8 ${
                    ratingValue <= (hover || rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Votre commentaire
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A]"
          placeholder="Partagez votre expérience avec ce produit..."
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ajouter des photos (optionnel)
        </label>
        <div className="flex items-center gap-4">
          <label className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages([...e.target.files])}
              className="hidden"
            />
            <div className="flex items-center gap-2">
              <FaImage className="w-5 h-5 text-gray-500" />
              <span>Choisir des images</span>
            </div>
          </label>
          {images.length > 0 && (
            <span className="text-sm text-gray-500">
              {images.length} image{images.length > 1 ? 's' : ''} sélectionnée{images.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={!rating || !comment || isSubmitting}
        className="w-full px-4 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Publication en cours...</span>
          </div>
        ) : (
          'Publier votre avis'
        )}
      </button>
    </form>
  );
};

const LightboxGallery = ({ images, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    swiperRef.current?.swiper?.slideTo(index);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50">
      <div className="relative h-full flex flex-col">
        {/* Image principale */}
        <div className="flex-1 relative">
          <Swiper
            ref={swiperRef}
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="h-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full flex items-center justify-center">
                  <Image
                    src={image}
                    alt={`Product ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Miniatures centrées */}
        <div className="w-full pb-20 md:pb-8 px-4">
          <Swiper
            modules={[FreeMode]}
            spaceBetween={8}
            slidesPerView="auto"
            freeMode={true}
            centeredSlides={true}
            className="max-w-3xl mx-auto"
          >
            {images.map((image, index) => (
              <SwiperSlide 
                key={index}
                className={`!w-16 !h-16 relative rounded-lg overflow-hidden cursor-pointer transition-all ${
                  activeIndex === index ? 'ring-2 ring-[#048B9A] scale-110' : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white p-2"
        >
          <IoMdClose className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const formatPrice = (price) => {
  // Enlever les décimales et formater avec des espaces
  return price
    .toString()
    .split('.')[0]
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' GNF';
};

const ProductDetail = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const [showFavToast, setShowFavToast] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const { authFetch } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/products/${params.id}/`, {
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
      
        console.log(data);
        setReviews(data.reviews || []);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await axios.get(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/products/similar/${params.id}/`);
        
        // Regrouper tous les produits similaires
        const allSimilarProducts = [
          ...(response.data.similar_products_by_colors || []),
          ...(response.data.similar_products_by_categories || []),
          ...(response.data.similar_products_by_tags || []),
          ...(response.data.similar_products_by_sizes || [])
        ];

        // Transformer et dédupliquer les produits
        const uniqueProducts = Array.from(
          new Map(
            allSimilarProducts.map(product => [
              product.id,
              {
                id: product.id,
                image: product.images[0]?.image,
                gallery: product.images.map(img => img.image) || [],
                title: product.name,
                price: product.regular_price,
                oldPrice: product.promo_price,
                inStock: product.stock_status === 'in_stock',
                description:product.short_description?.length > 100 ? 
                             product.short_description.substring(0, 100) + '...' : 
                             product.short_description

              }
            ])
          ).values()
        );

        setSimilarProducts(uniqueProducts);
      } catch (error) {
        console.error('Erreur lors du chargement des produits similaires:', error);
      }
    };

    fetchSimilarProducts();
  }, [params.id]);

  // Récupérer les images du produit depuis l'API
  const productImages = product?.images?.map(img => img.image) || [];

  // Tailles disponibles
  const sizes = ['S', 'M', 'L', 'XL'];

  // Données des produits similaires
  // const similarProductsData = [
  //   {
  //     id: 1,
  //     image: "/realite.webp",
  //     gallery: ["/realite.webp", "/realite2.webp", "/realite3.webp"],
  //     title: "Réalité Virtuelle Casque , Portable 3D Virtuel Réalité Lunettes Pour Films Et Jeux",
  //     price: "185,000",
  //     oldPrice: "210,000",
  //     inStock: true,
  //     description: "Profitez dès maintenant avant la fin de l'offre"
  //   },
  //   {
  //     id: 2,
  //     image: "/pochette.webp",
  //     gallery: ["/pochette.webp", "/pochette2.webp"],
  //     title: "Coque De Téléphone Portable Figure",
  //     price: "45,000",
  //     inStock: true
  //   },
  //   {
  //     id: 3,
  //     image: "/lumiere.webp",
  //     gallery: ["/lumiere.webp", "/lumiere2.webp"],
  //     title: "1 pièce Lumière d'ambiance pour téléphone clip rond avec miroir",
  //     price: "40,000",
  //     inStock: true
  //   },
  //   {
  //     id: 4,
  //     image: "/lunettes.webp",
  //     gallery: ["/lunettes.webp", "/lunettes2.webp"],
  //     title: "3 Pièces Lunettes De Soleil De Mode",
  //     price: "85,000",
  //     oldPrice: "100,000",
  //     inStock: true,
  //     description: "Ne manquez pas cette opportunité tant qu'elle dure"
  //   }
  // ];

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

  const handleToggleFavorite = async () => {
    if (!product) return;
    
    setIsTogglingFavorite(true);
    try {
      await toggleFavorite(product.id);
    } catch (error) {
      console.error('Erreur lors de la modification des favoris:', error);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  // Fonction pour afficher les tailles
  const renderSizes = () => {
    if (!product?.sizes || !Array.isArray(product.sizes) || product.sizes.length === 0) {
      return (
        <div className="text-gray-500 italic">
          Taille unique
        </div>
      );
    }
    
    return product.sizes.map((size, index) => (
      <button
        key={index}
        onClick={() => setSelectedSize(size.name)}
        className={`w-12 h-12 rounded-lg border ${
          selectedSize === size.name
            ? 'border-[#048B9A] text-[#048B9A]'
            : 'border-gray-300 hover:border-gray-400'
        } flex items-center justify-center font-medium`}
      >
        {size.name}
      </button>
    ));
  };

  // Fonction pour afficher les couleurs
  const renderColors = () => {
    if (!product?.colors || !Array.isArray(product.colors) || product.colors.length === 0) {
      return (
        <div className="text-gray-500 italic">
          Couleur unique
        </div>
      );
    }
    
    return (
      <div className="flex gap-3">
        {product.colors.map((color, index) => (
          <button
            key={index}
            onClick={() => setSelectedColor(color.name)}
            className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center ${
              selectedColor === color.name
                ? 'border-[#048B9A]'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            style={{ backgroundColor: color.hex_code }}
            title={color.name}
          >
            {selectedColor === color.name && (
              <span className="text-white drop-shadow-lg">✓</span>
            )}
          </button>
        ))}
      </div>
    );
  };

  // Fonction pour afficher les catégories
  const renderCategories = () => {
    if (!product?.categories || !Array.isArray(product.categories)) {
      return (
        <div className="text-gray-500 italic">
          Aucune catégorie
        </div>
      );
    }
    
    return (
      <div className="flex flex-wrap gap-2">
        {product.categories.map((category, index) => (
          <Link
            key={index}
            href={`/boutique?category=${category.name.toLowerCase()}`}
            className="text-[#048B9A] hover:underline text-sm bg-[#E6F4F6] px-3 py-1 rounded-full"
          >
            {category.name}
          </Link>
        ))}
      </div>
    );
  };

  // Fonction pour afficher les étiquettes
  const renderTags = () => {
    if (!product?.etiquettes || !Array.isArray(product.etiquettes) || product.etiquettes.length === 0) {
      return (
        <div className="text-gray-500 italic">
          Aucune étiquette
        </div>
      );
    }
    
    return (
      <div className="flex flex-wrap gap-2">
        {product.etiquettes.map((tag, index) => (
          <Link
            key={index}
            href={`/boutique?tag=${tag.name.toLowerCase()}`}
            className="text-gray-600 hover:text-[#048B9A] text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            #{tag.name}
          </Link>
        ))}
      </div>
    );
  };

  const handleAddToCart = async () => {
    if (isAddingToCart) return;
    
    try {
      setIsAddingToCart(true);
      
      const productToAdd = {
        id: product.id,
        name: product.name,
        image: productImages[0],
        quantity: quantity
      };

      await addToCart(productToAdd);
      
      // Réinitialiser la quantité après l'ajout
      setQuantity(1);
      
    } catch (error) {
      toast.error("Erreur lors de l'ajout au panier");
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12">
      {/* Fil d'Ariane */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <Link href="/" className="text-gray-500 hover:text-[#048B9A]">Accueil</Link>
        <span className="text-gray-500">/</span>
        <Link href="/boutique" className="text-gray-500 hover:text-[#048B9A]">Boutique</Link>
        <span className="text-gray-500">/</span>
        <span className="text-gray-900">{product?.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galerie d'images avec bouton zoom */}
        <div className="space-y-4">
          {/* Image principale */}
          <div className="relative aspect-square rounded-xl overflow-hidden group">
            <Image
              src={productImages[selectedImage] || '/placeholder.png'}
              alt={product?.name || 'Product image'}
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
          <LightboxGallery
            images={productImages}
            onClose={closeLightbox}
          />
        )}

        {/* Informations produit */}
        <div className="space-y-6">
          <div className="space-y-6">
            {/* Titre du produit avec taille adaptée pour mobile */}
            <h1 className="text-lg md:text-2xl font-semibold leading-tight">
              {product?.name}
            </h1>

            {/* Prix et notation */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#048B9A]">
                  {formatPrice(product?.regular_price)}
                </span>
                {product?.promo_price != 0 && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product?.promo_price)}
                  </span>
                )}
              </div>

              {/* Boutons d'action */}
              <div className="flex items-center gap-3">
                {/* Bouton favoris */}
                <button 
                  onClick={handleToggleFavorite}
                  disabled={isTogglingFavorite || !product}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all
                    ${isFavorite(product?.id) 
                      ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                  aria-label={isFavorite(product?.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  {isTogglingFavorite ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaHeart 
                      className={`w-6 h-6 transition-transform duration-200 ${
                        isFavorite(product?.id) 
                          ? 'scale-110 fill-current' 
                          : 'scale-100 fill-transparent stroke-2'
                      }`}
                    />
                  )}
                </button>

                {/* Bouton partager */}
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label="Partager"
                >
                  <FaShare className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600">
            {product?.short_description}
            </p>

            {/* Sélection de taille */}
            <div>
              <h3 className="font-medium mb-3">Taille</h3>
              <div className="flex gap-3">
                {renderSizes()}
              </div>
            </div>

            {/* Section des couleurs */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Couleur</h3>
                {renderColors()}
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
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart || !product?.stock_status === 'in_stock'}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483] disabled:opacity-50"
              >
                {isAddingToCart ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Ajout en cours...</span>
                  </>
                ) : (
                  <>
                    <FaShoppingCart />
                    <span>Ajouter au panier</span>
                  </>
                )}
              </button>
              <button className="flex-[0.7] sm:flex-1 border border-[#048B9A] text-[#048B9A] h-14 rounded-lg flex items-center justify-center gap-2 hover:bg-[#048B9A] hover:text-white transition-colors text-sm sm:text-base">
                Acheter maintenant
              </button>
            </div>

            {/* Catégories */}
            <div className="pt-6 border-t">
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">Catégories:</span>
                {renderCategories()}
              </div>
            </div>

            {/* Étiquettes - à placer après les catégories */}
            <div className="pt-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">Étiquettes:</span>
                {renderTags()}
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
            Avis ({reviews.length})
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
                {
                
                }
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

              <ReviewsTab reviews={reviews} />
              <ReviewForm productId={params.id} setReviews={setReviews} />
            </div>
          )}
        </div>
      </div>


      {/* Section Produits Similaires */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Produits Similaires</h2>
        
        {/* Version mobile avec swiper */}
        <div className="md:hidden">
          <Swiper
            slidesPerView="auto"
            spaceBetween={16}
            freeMode={true}
            modules={[FreeMode]}
            className="w-full"
          >
            {similarProducts.map((product) => (
              <SwiperSlide key={product.id} className="w-[280px]">
                <ProductCard
                  image={product.image}
                  gallery={product.gallery}
                  title={product.title}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  inStock={product.inStock}
                  description={product.description}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Version desktop avec grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                    isFavorite(product?.id) ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    <FaHeart className={`w-4 h-4 ${
                      isFavorite(product?.id) ? 'text-red-500' : 'text-gray-600'
                    }`} />
                  </div>
                  <p className="text-sm font-medium">
                    {isFavorite(product?.id) 
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