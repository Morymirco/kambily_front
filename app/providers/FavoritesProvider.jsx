'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthProvider';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites doit être utilisé dans un FavoritesProvider');
  }
  return context;
};

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authFetch, isAuthenticated } = useAuth();

  // Charger les favoris au montage du composant
  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Récupérer tous les favoris
  const fetchFavorites = async () => {
    try {
      const response = await authFetch('https://api.kambily.store/favorites/');
      if (!response.ok) throw new Error('Erreur lors de la récupération des favoris');
      
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Impossible de charger vos favoris');
    } finally {
      setLoading(false);
    }
  };

  // Vérifier si un produit est en favori
  const isFavorite = (productId) => {
    return favorites.some(fav => fav.product.id === productId);
  };

  // Ajouter un produit aux favoris
  const addToFavorites = async (productId) => {
    try {
      const response = await authFetch(`https://api.kambily.store/favorites/create/${productId}/`, {
        method: 'POST'
      });

      if (!response.ok) throw new Error('Erreur lors de l\'ajout aux favoris');
      
      const newFavorite = await response.json();
      setFavorites(prev => [...prev, newFavorite]);
      toast.success('Produit ajouté aux favoris');
      
      return true;
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Impossible d\'ajouter aux favoris');
      return false;
    }
  };

  // Retirer un produit des favoris
  const removeFromFavorites = async (productId) => {
    try {
      const response = await authFetch(`https://api.kambily.store/favorites/delete/${productId}/`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression des favoris');

      setFavorites(prev => prev.filter(fav => fav.product.id !== productId));
      toast.success('Produit retiré des favoris');
      
      return true;
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Impossible de retirer des favoris');
      return false;
    }
  };

  // Toggle favori (ajouter/retirer)
  const toggleFavorite = async (productId) => {
    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour gérer vos favoris');
      return false;
    }

    if (isFavorite(productId)) {
      return removeFromFavorites(productId);
    } else {
      return addToFavorites(productId);
    }
  };

  const value = {
    favorites,
    loading,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    refreshFavorites: fetchFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
} 