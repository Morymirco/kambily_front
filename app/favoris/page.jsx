'use client'
import { useCart } from '@/app/providers/CartProvider';
import { useFavorites } from '@/app/providers/FavoritesProvider';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa';
import Produit from '../Components/Common/Product';

export default function Wishlist() {
  const { favorites, loading, refreshFavorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [removedProductId, setRemovedProductId] = useState(null);
  const [addingToCartId, setAddingToCartId] = useState(null);

  useEffect(() => {
    refreshFavorites();
  }, []);
  console.log(favorites);

  const handleToggleFavorite = async (productId) => {
    if (isTogglingFavorite) return;
    
    setIsTogglingFavorite(true);
    setRemovedProductId(productId);
    
    try {
      await toggleFavorite(productId);
      toast.success('Produit retiré des favoris');
      await refreshFavorites();
    } catch (error) {
      console.error('Erreur lors du retrait des favoris:', error);
      toast.error('Une erreur est survenue');
    } finally {
      setIsTogglingFavorite(false);
      setRemovedProductId(null);
    }
  };

  const handleAddToCart = async (product) => {
    if (addingToCartId) return;
    
    setAddingToCartId(product.id);
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.promo_price || product.regular_price,
        image: product.image.image,
        quantity: 1
      });
      toast.success('Produit ajouté au panier');
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      toast.error('Erreur lors de l\'ajout au panier');
    } finally {
      setAddingToCartId(null);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12">
      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#048B9A]">Accueil</Link>
        <span>›</span>
        <span className="text-gray-900">Mes favoris</span>
      </div>

      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Mes favoris</h1>
        <p className="text-gray-600">
          {favorites.length} produit{favorites.length > 1 ? 's' : ''} dans vos favoris
        </p>
      </div>

      {loading ? (
        // Skeleton loader pendant le chargement
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="border rounded-xl p-4 space-y-4 animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : favorites.length > 0 ? (
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {favorites.map((favorite) => (
              <motion.div
                key={favorite.id}
                layout
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Produit
                  id={favorite.product.id}
                  image={favorite.product.image.image}
                  gallery={favorite.product.gallery || []}
                  title={favorite.product.name}
                  price={favorite.product.promo_price}
                  oldPrice={favorite.product.regular_price}
                  inStock={favorite.product.etat_stock}
                  description={favorite.product.short_description}
                  category={favorite.product.category?.name}
                  isFavorite={true}
                  onToggleFavorite={() => handleToggleFavorite(favorite.product.id)}
                  isTogglingFavorite={isTogglingFavorite && removedProductId === favorite.product.id}
                  onAddToCart={() => handleAddToCart(favorite.product)}
                  isAddingToCart={addingToCartId === favorite.product.id}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="mb-4">
            <FaHeart className="w-16 h-16 mx-auto text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            Votre liste de favoris est vide
          </h2>
          <p className="text-gray-600 mb-6">
            Parcourez notre boutique et ajoutez des produits à vos favoris
          </p>
          <Link 
            href="/boutique"
            className="inline-block bg-[#048B9A] text-white px-6 py-3 rounded-lg 
              hover:bg-[#037483] transition-colors"
          >
            Découvrir nos produits
          </Link>
        </motion.div>
      )}
    </div>
  );
} 