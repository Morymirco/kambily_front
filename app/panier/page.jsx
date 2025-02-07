'use client'
import { AddressSelector } from '@/app/Components/AddressSelector';
import { useAuth } from '@/app/providers/AuthProvider';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaEdit, FaMapPin, FaSearchLocation, FaTrash } from 'react-icons/fa';
import DeliveryTimeSelector from '../Components/DeliveryTimeSelector';
import LoginPrompt from '../Components/LoginPrompt';
import { HOST_IP, PORT, PROTOCOL_HTTP } from './../constants';

const containerStyle = {
  width: '100%',
  height: '300px'
};

// Position par défaut (Conakry)
const defaultCenter = {
  lat: 9.6412,
  lng: -13.5784
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const CartSkeleton = () => (
  <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-16 py-3 sm:py-6">
    {/* Titre skeleton */}
    <div className="w-48 h-8 bg-gray-200 rounded-lg animate-pulse mb-8" />

    <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
      {/* Colonne principale - Liste des produits */}
      <div className="md:col-span-2 space-y-4 sm:space-y-6">
        {/* Articles skeleton */}
        {[1, 2, 3].map((item) => (
          <div 
            key={item} 
            className="bg-white rounded-lg shadow-sm p-3 sm:p-4 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4"
          >
            {/* Image skeleton */}
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 rounded-lg animate-pulse" />

            {/* Détails produit skeleton */}
            <div className="flex-1 space-y-2">
              <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
              
              {/* Tailles et couleurs skeleton */}
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <div className="w-12 h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-14 h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Prix skeleton */}
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Contrôles quantité skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-12 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse ml-2" />
            </div>
          </div>
        ))}

        {/* Bouton Continuer les achats skeleton */}
        <div className="w-40 h-10 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Colonne résumé */}
      <div className="space-y-6">
        {/* Résumé de la commande skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <div className="w-48 h-6 bg-gray-200 rounded animate-pulse" />
          
          {/* Lignes de prix skeleton */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex justify-between">
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex justify-between pt-4 border-t">
              <div className="w-16 h-5 bg-gray-200 rounded animate-pulse" />
              <div className="w-32 h-5 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Bouton paiement skeleton */}
          <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse mt-4" />
        </div>
      </div>
    </div>
  </div>
);

const EmptyCart = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-4xl mx-auto py-12 px-4"
  >
    <div className="text-center max-w-lg mx-auto">
      <svg 
        className="w-32 h-32 md:w-48 md:h-48 text-gray-300 mb-8 mx-auto"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
        />
      </svg>
      
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
        Votre panier est vide
      </h2>
      <p className="text-gray-500 mb-8 mx-auto max-w-md">
        Découvrez nos produits et commencez votre shopping !
      </p>
      <Link 
        href="/products"
        className="inline-block bg-[#048B9A] text-white px-8 py-3 rounded-lg hover:bg-[#037483] transition-colors"
      >
        Voir nos produits
      </Link>
    </div>
  </motion.div>
);

const Panier = () => {
  const router = useRouter();
  const { authFetch } = useAuth();

  // Regrouper tous les états au début du composant
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [position, setPosition] = useState(defaultCenter);
  const [showMap, setShowMap] = useState(false);
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quantities, setQuantities] = useState({
    1: 1,
  });
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      title: "Domicile",
      street: "123 Rue Example",
      city: "Conakry",
      country: "Guinée",
      phone: "+224 624 XX XX XX",
      isDefault: true,
      coordinates: { lat: 9.6412, lng: -13.5784 }
    },
    {
      id: 2,
      title: "Bureau",
      street: "456 Avenue Business",
      city: "Conakry",
      country: "Guinée",
      phone: "+224 624 XX XX XX",
      isDefault: false,
      coordinates: { lat: 9.6315, lng: -13.5784 }
    }
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState(
    savedAddresses.find(addr => addr.isDefault)?.id || null
  );
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Effet pour charger le panier
  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        return <LoginPrompt />;
      }

      const response = await fetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/carts/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors du chargement du panier');
      }

      const data = await response.json();
      console.log(data);
      
      setCartItems(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating(true);
    try {
      const token = localStorage.getItem('access_token');
      
      if (!itemId) {
        throw new Error('ID de l\'article non défini');
      }

      // Récupérer l'article actuel pour avoir la quantité exacte
      const currentItem = cartItems.find(item => item.product.id === itemId);
      if (!currentItem) return;

      // Calculer la différence de quantité
      const quantityDiff = newQuantity - currentItem.quantity;

      const response = await fetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/carts/update/${itemId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          quantity: quantityDiff > 0 ? 1 : -1, // Incrémenter ou décrémenter de 1
          product_id: itemId
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la quantité');
      }

      // Actualiser le panier après la mise à jour
      await fetchCart();

      toast.success('Quantité mise à jour');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (itemId) => {
    setDeletingItemId(itemId);
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/carts/remove/${itemId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      const removedItem = cartItems.find(item => item.product.id === itemId);
      if (removedItem) {
        toast.custom((t) => (
          <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-[300px] flex items-center gap-4">
              <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src={removedItem.product.image?.image || '/placeholder.png'}
                  alt={removedItem.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 font-medium text-sm text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Article supprimé
                </div>
                <p className="text-gray-600 text-sm mt-1 truncate">
                  {removedItem.product.name}
                </p>
              </div>
            </div>
          </div>
        ), {
          duration: 3000,
        });
      }

      await fetchCart();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeletingItemId(null);
    }
  };

  // Calculer le total
  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + (item.product.regular_price * item.quantity);
    }, 0);
    
    const shipping = 3000;
    return subtotal + shipping;
  };

  if (loading) {
    return <CartSkeleton />;
  }

  // Fonction pour formater les coordonnées
  const formatCoordinates = (lat, lng) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  // Fonction pour rechercher une adresse
  const searchByAddress = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchAddress)}&key=VOTRE_CLE_API`
      );
      const data = await response.json();
      if (data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location;
        setPosition({ lat, lng });
        setSelectedLocation({
          coordinates: formatCoordinates(lat, lng),
          address: data.results[0].formatted_address
        });
      }
    } catch (error) {
      console.error('Erreur de recherche:', error);
    }
  };

  // Gestionnaire de clic sur la carte
  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setPosition({ lat, lng });

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=VOTRE_CLE_API`
      );
      const data = await response.json();
      setSelectedLocation({
        coordinates: formatCoordinates(lat, lng),
        address: data.results[0]?.formatted_address || 'Adresse non trouvée'
      });
    } catch (error) {
      console.error('Erreur de géocodage:', error);
      setSelectedLocation({
        coordinates: formatCoordinates(lat, lng),
        address: 'Erreur lors de la récupération de l\'adresse'
      });
    }
  };

  // Fonction pour augmenter la quantité
  const incrementQuantity = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };

  // Fonction pour diminuer la quantité
  const decrementQuantity = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1)
    }));
  };

  const handleCheckout = async () => {
    router.push('/paiement');
  };

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-16 py-3 sm:py-6"
    >
      <Toaster />
      
      <motion.h1 
        className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
        variants={itemVariants}
      >
        Panier
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
        {/* Colonne principale - Liste des produits */}
        <div className="md:col-span-2 space-y-4 sm:space-y-6">
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <AnimatePresence mode="wait">
              {cartItems.map((item) => (
                <motion.div
                  key={item.product.id}
                  className="bg-white rounded-lg shadow-sm p-3 sm:p-4 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 w-full cursor-pointer hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  whileHover={{ scale: 1.01 }}
                  layout
                  onClick={() => router.push(`/boutique/${item.product.id}`)}
                >
                  {/* Image du produit */}
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
                    <Image
                      src={item.product.images[0].image || '/placeholder.png'}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {/* Détails du produit */}
                  <div className="flex-1 min-w-0 w-[calc(100%-5rem)] sm:w-auto">
                    <h3 className="font-medium text-sm sm:text-base truncate hover:text-[#048B9A] transition-colors">
                      {item.product.name}
                    </h3>
                    
                    {/* Couleurs et tailles */}
                    <div className="mt-2 space-y-1">
                      {/* Tailles */}
                      {item.product.sizes && item.product.sizes.length > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Taille:</span>
                          <div className="flex gap-1">
                            {item.product.sizes.map((size) => (
                              <div
                                key={size.id}
                                className={`px-2 py-0.5 text-xs rounded ${
                                  size.id === item.selected_size
                                    ? 'bg-[#048B9A] text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {size.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Taille:</span>
                          <span className="text-xs text-gray-400 italic">Taille unique</span>
                        </div>
                      )}

                      {/* Couleurs */}
                      {item.product.colors && item.product.colors.length > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Couleur:</span>
                          <div className="flex gap-1">
                            {item.product.colors.map((color) => (
                              <div
                                key={color.id}
                                className={`w-4 h-4 rounded-full border ${
                                  color.id === item.selected_color
                                    ? 'border-[#048B9A] ring-1 ring-[#048B9A] ring-offset-1'
                                    : 'border-gray-300'
                                }`}
                                style={{ backgroundColor: color.code }}
                                title={color.name}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Couleur:</span>
                          <span className="text-xs text-gray-400 italic">Couleur unique</span>
                        </div>
                      )}
                    </div>

                    <p className="text-[#048B9A] font-medium text-sm sm:text-base mt-2">
                      {item.product.regular_price.toLocaleString()} GNF
                    </p>
                  </div>
                  
                  {/* Contrôles de quantité et suppression - Empêcher la propagation du clic */}
                  <div className="mt-4 flex items-center justify-between" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={updating || item.quantity <= 1}
                          className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50 text-sm disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="w-8 sm:w-12 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={updating}
                          className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50 text-sm disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        disabled={deletingItemId === item.product.id}
                        className={`text-red-500 hover:text-red-600 disabled:opacity-50 w-6 h-6 flex items-center justify-center`}
                      >
                        {deletingItemId === item.product.id ? (
                          <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {/* Boutons d'action */}
          <motion.div variants={itemVariants} className="flex justify-between items-center">
            <Link href="/boutique">
              <motion.button
                className="px-4 sm:px-6 py-2 border-2 border-[#048B9A] text-[#048B9A] rounded-lg hover:bg-[#048B9A] hover:text-white transition-colors text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continuer les achats
              </motion.button>
            </Link>

            {cartItems.length > 0 && (
              <motion.button
                onClick={async () => {
                  try {
                    const response = await authFetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/carts/clear/`, {
                      method: 'DELETE'
                    });

                    if (!response.ok) throw new Error('Erreur lors de la suppression du panier');

                    await fetchCart();
                    toast.success('Panier vidé avec succès');
                  } catch (error) {
                    console.error('Erreur:', error);
                    toast.error('Erreur lors de la suppression du panier');
                  }
                }}
                className="px-4 sm:px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaTrash className="w-4 h-4" />
                Vider le panier
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Colonne résumé - Affichée uniquement si le panier n'est pas vide */}
        {cartItems.length > 0 && (
          <div className="space-y-6">
            {/* Expédition */}
            <div className="mt-8">
              <DeliveryTimeSelector 
                onSelect={(deliveryInfo) => {
                  console.log('Informations de livraison:', deliveryInfo);
                }} 
              />
            </div>

            {/* Résumé de la commande */}
            <motion.div 
              className="bg-white rounded-lg shadow-sm p-4 md:p-6"
              variants={itemVariants}
            >
              {/* Résumé de la commande */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Résumé de la commande</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span>{cartItems.reduce((acc, item) => acc + (item.product.regular_price * item.quantity), 0).toLocaleString()} GNF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expédition</span>
                    <span> 3000 GNF</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg pt-4 border-t">
                    <span>Total</span>
                    <span>{calculateTotal().toLocaleString()} GNF</span>
                  </div>
                </div>
              </div>

              {/* Bouton paiement */}
              <motion.button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-[#048B9A] text-white py-3 rounded-lg hover:bg-[#037483] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Création de la commande...</span>
                  </>
                ) : (
                  'Passer la commande'
                )}
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Panier; 