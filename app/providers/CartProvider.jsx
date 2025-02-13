'use client'
import Image from 'next/image';
import Link from 'next/link';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthProvider';
import { HOST_IP, PORT, PROTOCOL_HTTP } from './../constants';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const { authFetch, isAuthenticated } = useAuth();

  // Charger le panier depuis l'API si connecté
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated) {
        try {
          const response = await authFetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/carts/`);
          if (response.ok) {
            const data = await response.json();
            console.log("depuis le pro",data);
            setCartItems(data || []);
            
          }
        } catch (error) {
          console.error('Erreur chargement panier:', error);
        }
      }
    };

    loadCart();
  }, [isAuthenticated]);

  const addToCart = async (product) => {
    try {
      if (!isAuthenticated) {
        // Sauvegarder l'URL actuelle pour rediriger après la connexion
        localStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.href = '/login';
        return;
      }
  
      // Préparer le corps de la requête
      const body = {
        quantity: product.quantity || 1, // Quantité obligatoire
        colors: product.colors || [],    // Couleurs optionnelles
        sizes: product.sizes || [],      // Tailles optionnelles
      };
  
      // Envoyer la requête à l'API
      const response = await authFetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/carts/create/${product.id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          // Token expiré ou invalide
          localStorage.removeItem('token');
          localStorage.setItem('redirectAfterLogin', window.location.pathname);
          window.location.href = '/login';
          return;
        }
        throw new Error('Erreur lors de l\'ajout au panier');
      }
  
      const data = await response.json();
      setCartItems(data.items);
  
      // Afficher le toast personnalisé
      toast.custom((t) => (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
          <div className="bg-white border rounded-lg shadow-lg p-4 w-[300px] flex items-center gap-4">
            {/* Image du produit */}
            <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
  
            {/* Contenu */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 font-medium text-sm">
                <div className="text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ajouté au panier
                </div>
              </div>
  
              <p className="text-gray-600 text-sm mt-1 truncate">
                {product.name}
              </p>
  
              <Link href='/panier'>
                <button className="mt-2 text-[#048B9A] text-sm font-medium hover:text-[#037383] transition-colors">
                  Voir le panier
                </button>
              </Link>
            </div>
          </div>
        </div>
      ), { duration: 4000 });
  
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error.message || 'Une erreur est survenue lors de l\'ajout au panier');
    }
  };
  const removeFromCart = async (productId) => {
    try {
      const response = await authFetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/carts/remove/${productId}/`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');

      const data = await response.json();
      setCartItems(data.items || []);
      toast.success('Produit retiré du panier');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Impossible de retirer le produit');
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await authFetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/carts/update/${productId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour');

      const data = await response.json();
      setCartItems(data.items || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Impossible de mettre à jour la quantité');
    }
  };

  const clearCart = async () => {
    try {
      const response = await authFetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/carts/clear/`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Erreur lors du vidage du panier');

      setCartItems([]);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Impossible de vider le panier');
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 