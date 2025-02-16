'use client'
import Image from 'next/image';
import Link from 'next/link';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { HOST_IP, PORT, PROTOCOL_HTTP } from './../constants';
import { useAuth } from './AuthProvider';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const { authFetch, isAuthenticated } = useAuth();

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const storedCartString = localStorage.getItem('cartItems');
  
    // Check if storedCartString is not null or undefined
    if (!storedCartString) {
      console.error('No cart items found in localStorage');
      return;
    }
  
    try {
      // Attempt to parse the JSON string
      const storedCart = JSON.parse(storedCartString);
  
      // Check if storedCart is an array and has items
      if (Array.isArray(storedCart) && storedCart.length > 0) {
        fetchProductDetails(storedCart); // Call the function to fetch product details
      } else {
        console.error('Cart items are not in the expected format');
      }
    } catch (error) {
      console.error('Failed to parse cart items from localStorage:', error);
    }
  }, []);

  const fetchProductDetails = async (storedCart) => {
    try {
      // Créer un tableau de promesses pour récupérer les détails de chaque produit
      const productRequests = storedCart.map(item =>
        fetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/products/${item.id}/`)
      );

      // Attendre que toutes les requêtes soient complètes
      const responses = await Promise.all(productRequests);

      // Vérifier si toutes les réponses sont correctes
      const products = await Promise.all(responses.map(res => {
        if (!res.ok) {
          throw new Error('Erreur lors de la récupération des produits');
        }
        return res.json();
        console.log('Product des produ',res.json());
        
      }));

      // Enrichir les articles du panier avec les détails des produits
      const enrichedCartItems = storedCart.map((item, index) => ({
        ...item,
        product: products[index], // Ajoute les détails du produit
      }));

      // Mettre à jour l'état du panier avec les articles enrichis
      setCartItems(enrichedCartItems);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails des produits:', error);
    }
  };

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
            localStorage.setItem('cartItems', JSON.stringify(data)); // Synchroniser avec localStorage
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
      // Vérifier si le produit existe déjà dans le panier
      const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
  
      if (existingProductIndex !== -1) {
        // Si le produit existe, mettre à jour la quantité
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingProductIndex].quantity += product.quantity || 1;
  
        if (!isAuthenticated) {
          // Mettre à jour le localStorage si l'utilisateur n'est pas connecté
          setCartItems(updatedCartItems);
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
          toast.success('Quantité mise à jour dans le panier (non connecté)');
          return;
        }
  
        // Mettre à jour la quantité via l'API si l'utilisateur est connecté
        const response = await authFetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/carts/update/${product.id}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: updatedCartItems[existingProductIndex].quantity })
        });
  
        if (!response.ok) throw new Error('Erreur lors de la mise à jour de la quantité');
  
        const data = await response.json();
        setCartItems(data.items || []);
        localStorage.setItem('cartItems', JSON.stringify(data.items || []));
        toast.success('Quantité mise à jour dans le panier');
        return;
      }
  
      // Si le produit n'existe pas, l'ajouter au panier
      if (!isAuthenticated) {
        // Sauvegarder le produit dans localStorage si l'utilisateur n'est pas connecté
        const updatedCart = [...cartItems, { ...product, quantity: product.quantity || 1 }];
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        toast.success('Produit ajouté au panier (non connecté)');
        return;
      }
  
      // Ajouter le produit via l'API si l'utilisateur est connecté
      const body = {
        quantity: product.quantity || 1,
        colors: product.colors || [],
        sizes: product.sizes || [],
      };
  
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
      localStorage.setItem('cartItems', JSON.stringify(data.items));
  
      // Afficher le toast personnalisé
      toast.custom((t) => (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
          <div className="bg-white border rounded-lg shadow-lg p-4 w-[300px] flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
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
      localStorage.setItem('cartItems', JSON.stringify(data.items || [])); // Synchroniser avec localStorage
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
      localStorage.setItem('cartItems', JSON.stringify(data.items || [])); // Synchroniser avec localStorage
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
      localStorage.setItem('cartItems', JSON.stringify([])); // Synchroniser avec localStorage
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