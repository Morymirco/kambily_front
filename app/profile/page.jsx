'use client'
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaAddressCard, FaCog, FaCreditCard, FaEdit, FaExclamationTriangle, FaGlobe, FaHeart, FaMapMarkerAlt, FaMoon, FaPlus, FaShoppingBag, FaSignOutAlt, FaTimes, FaTrash, FaUser } from 'react-icons/fa';

import ProductCard from '@/app/Components/Common/ProductCard';
import { useAuth } from '@/app/providers/AuthProvider';
import Link from 'next/link';

const WishlistSkeleton = () => (
  <div className="space-y-6">
    <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Image skeleton */}
          <div className="aspect-square relative bg-gray-200 animate-pulse" />
          
          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AddressSkeleton = () => (
  <div className="grid gap-4 sm:grid-cols-2">
    {[1, 2, 3, 4].map((item) => (
      <div 
        key={item} 
        className="p-4 border rounded-lg animate-pulse"
      >
        <div className="flex items-start gap-3">
          {/* Icône */}
          <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0 mt-1" />
          
          <div className="flex-1 min-w-0 space-y-3">
            {/* Adresse */}
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            {/* Ville */}
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            {/* Pays */}
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            {/* Téléphone */}
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>

        {/* Boutons */}
        <div className="mt-4 flex justify-end gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded" />
          <div className="w-8 h-8 bg-gray-200 rounded" />
        </div>
      </div>
    ))}

    {/* Bouton d'ajout skeleton */}
    <div className="h-[160px] border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center gap-3 animate-pulse">
      <div className="w-6 h-6 bg-gray-200 rounded-full" />
      <div className="h-4 bg-gray-200 rounded w-32" />
    </div>
  </div>
);

const Profile = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authFetch } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('https://api.kambily.store/accounts/getuser/', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Session expirée');
        }

        const data = await response.json();
        console.log(data);
        
        setUserData(data);
      } catch (error) {
        console.error('Erreur:', error);
        localStorage.removeItem('access_token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('access_token');
      
      // Appel à l'API pour déconnecter l'utilisateur
      await fetch('https://api.kambily.store/accounts/logout', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      // Dans tous les cas, on nettoie le localStorage et on redirige
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#048B9A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const tabs = [
    { id: 'profile', label: 'Mon Profil', icon: <FaUser /> },
    { id: 'orders', label: 'Mes Commandes', icon: <FaShoppingBag /> },
    { id: 'wishlist', label: 'Liste de Souhaits', icon: <FaHeart /> },
    { id: 'addresses', label: 'Mes Adresses', icon: <FaAddressCard /> },
    { id: 'settings', label: 'Paramètres', icon: <FaCog /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileContent />;
      case 'orders':
        return <OrdersContent />;
      case 'wishlist':
        return <WishlistContent />;
      case 'addresses':
        return <AddressesContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <ProfileContent />;
    }
  };

  // Animation variants pour le modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  const ProfileContent = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
      firstName: userData?.first_name || '',
      lastName: userData?.last_name || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      bio: userData?.bio || '',
      avatar: userData?.avatar || '/team/mory.jpg'
    });

    // Mettre à jour profileData quand userData change
    useEffect(() => {
      if (userData) {
        setProfileData({
          firstName: userData.first_name || '',
          lastName: userData.last_name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          bio: userData.bio || '',
          avatar: userData.image || '/team/mory.jpg'
        });
      }
    }, [userData]);

    // Variants pour les animations
    const formVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          staggerChildren: 0.1
        }
      }
    };

    const inputVariants = {
      hidden: { opacity: 0, x: -20 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          stiffness: 100
        }
      }
    };

    const statsVariants = {
      hidden: { scale: 0.8, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20
        }
      }
    };

    return (
      <div>
        <AnimatePresence mode="wait">
          {!isEditing ? (
            // Mode présentation
            <motion.div 
              className="space-y-8"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -20 }}
            >
              {/* En-tête du profil */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-6 p-4"
                variants={inputVariants}
              >
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-28 h-28 sm:w-24 sm:h-24 rounded-full overflow-hidden">
                    <Image
                      src={profileData.avatar}
                      alt="Photo de profil"
                      width={112}
                      height={112}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </motion.div>
                <div className="text-center sm:text-left flex-1">
                  <motion.h2 
                    className="text-2xl font-bold mb-2"
                    variants={inputVariants}
                  >
                    {profileData.firstName} {profileData.lastName}
                  </motion.h2>
                  <div className="space-y-4">
                    <h3 className="font-medium">Bio</h3>
                    <p className="text-gray-600 line-clamp-2">
                      {profileData.bio || "Aucune bio renseignée"}
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto mt-4 sm:mt-0 bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Modifier le profil
                </motion.button>
              </motion.div>

              {/* Informations du profil */}
              <motion.div className="grid gap-6 px-4" variants={formVariants}>
                <motion.div 
                  className="border rounded-lg p-6 space-y-6"
                  variants={inputVariants}
                >
                  <h3 className="text-lg font-semibold">Informations personnelles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Prénom</p>
                      <p className="font-medium">{profileData.firstName}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Nom</p>
                      <p className="font-medium">{profileData.lastName}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium break-all">{profileData.email}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="font-medium">{profileData.phone}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Statistiques */}
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  variants={formVariants}
                >
                  {[
                    { value: 12, label: "Commandes" },
                    { value: 5, label: "En favoris" },
                    { value: 3, label: "Avis" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="border rounded-lg p-6 text-center"
                      variants={statsVariants}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.p 
                        className="text-3xl font-bold text-[#048B9A] mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            // Mode édition
            <motion.form
              onSubmit={(e) => {
                e.preventDefault();
                setIsEditing(false);
              }}
              className="space-y-8 p-4"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: 20 }}
            >
              <motion.div 
                className="flex items-center gap-6 mb-8"
                variants={inputVariants}
              >
                <div className="relative">
                  <motion.div 
                    className="w-24 h-24 rounded-full overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={profileData.avatar}
                      alt="Photo de profil"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                  <motion.button
                    type="button"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-[#048B9A] rounded-full flex items-center justify-center text-white hover:bg-[#037483] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaCamera className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                    placeholder="Votre bio..."
                  />
                </div>
              </motion.div>

              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  />
                </div>
              </div>

              <motion.div 
                className="flex gap-4"
                variants={inputVariants}
              >
                <motion.button
                  type="submit"
                  className="bg-[#048B9A] text-white px-6 py-2 rounded-lg hover:bg-[#037483] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enregistrer
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Annuler
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const OrdersContent = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authFetch } = useAuth();
    const [showTrackingModal, setShowTrackingModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
      fetchOrders();
    }, []);

    const fetchOrders = async () => {
      try {
        const response = await authFetch('https://api.kambily.store/orders/');
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des commandes');
        }

        const data = await response.json();
        console.log(data);
        setOrders(data);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={fetchOrders}
            className="mt-4 text-[#048B9A] hover:underline"
          >
            Réessayer
          </button>
        </div>
      );
    }

    if (orders.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Vous n'avez pas encore de commandes</p>
          <Link 
            href="/boutique"
            className="text-[#048B9A] hover:underline"
          >
            Commencer vos achats
          </Link>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="border rounded-lg p-6 hover:border-[#048B9A] transition-colors"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-lg">Commande #{order.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status === 'completed' ? 'Livrée' :
                     order.status === 'pending' ? 'En cours' :
                     order.status}
                  </span>
                </div>
                <p className="text-gray-500">
                  Passée le {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <Link 
                href={`/commandes/${order.id}`}
                className="text-[#048B9A] hover:underline"
              >
                Voir les détails
              </Link>
            </div>

            <div className="flex gap-4 mb-4">
              {order.items && Array.isArray(order.items) && order.items.slice(0, 3).map((item) => (
                <div key={item.id} className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={item.product?.images?.[0]?.image || '/placeholder.png'}
                    alt={item.product?.name || 'Product image'}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {order.items && order.items.length > 3 && (
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                  +{order.items.length - 3}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Total:</span>
                <span className="font-medium text-lg">
                  {order.total_price?.toLocaleString() || 0} GNF
                </span>
              </div>
              {order.status !== 'completed' && (
                <button 
                  onClick={() => {
                    setSelectedOrderId(order.id);
                    setShowTrackingModal(true);
                  }}
                  className="px-4 py-2 border border-[#048B9A] text-[#048B9A] rounded-lg hover:bg-[#048B9A] hover:text-white transition-colors"
                >
                  Suivre la livraison
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const WishlistContent = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authFetch } = useAuth();

    useEffect(() => {
      fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
      try {
        const response = await authFetch('https://api.kambily.store/favorites/');
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des favoris');
        }

        const data = await response.json();
        console.log(data);
        setFavorites(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      return <WishlistSkeleton />;
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }

    if (favorites.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Vous n'avez pas encore de favoris</p>
          <Link 
            href="/boutique"
            className="text-[#048B9A] hover:underline"
          >
            Découvrir nos produits
          </Link>
        </div>
      );
    }

    return (
      <div>
        <h2 className="text-xl font-semibold mb-6">Ma Liste de Souhaits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <ProductCard
              key={favorite.id}
              id={favorite.product.id}
              image={favorite.product.images?.[0]?.image || '/3.png'}
              gallery={favorite.product.images?.slice(1).map(img => img.image) || []}
              title={favorite.product.name}
              price={favorite.product.regular_price}
              oldPrice={favorite.product.promo_price}
              inStock={favorite.product.stock_status === 'in_stock'}
              description={favorite.product.short_description}
              isFavorite={true}
            />
          ))}
        </div>
      </div>
    );
  };

  const containerStyle = {
    width: '100%',
    height: '300px'
  };

  // Position par défaut (Conakry)
  const defaultCenter = {
    lat: 9.6412,
    lng: -13.5784
  };

  const AddAddressModal = ({ 
    onSubmit, 
    onClose, 
    formData, 
    setFormData, 
    isSubmitting 
  }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
      >
        <h3 className="text-lg font-semibold mb-4">Ajouter une adresse</h3>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse
            </label>
            <input
              type="text"
              value={formData.addresse}
              onChange={(e) => setFormData({ ...formData, addresse: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ville
            </label>
            <input
              type="text"
              value={formData.ville}
              onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pays
            </label>
            <input
              type="text"
              value={formData.pays}
              onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
              required
            />
          </div>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.is_default}
              onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
              className="rounded text-[#048B9A] focus:ring-[#048B9A]"
            />
            <span className="text-sm text-gray-700">Définir comme adresse par défaut</span>
          </label>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Ajout en cours...</span>
                </>
              ) : (
                <span>Ajouter</span>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Annuler
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  const AddressesContent = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const { authFetch } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Mise à jour du state formData pour correspondre au format de l'API
    const [formData, setFormData] = useState({
      addresse: '',
      ville: '',
      pays: '',
      telephone: '',
      latitude: defaultCenter.lat,
      longitude: defaultCenter.lng,
      is_default: false
    });

    // Récupération des adresses
    useEffect(() => {
      fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
      try {
        const response = await authFetch('https://api.kambily.store/addresses/');
        if (!response.ok) throw new Error('Erreur lors de la récupération des adresses');
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Mise à jour de handleAddAddress
    const handleAddAddress = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        const response = await authFetch('https://api.kambily.store/addresses/create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error('Erreur lors de l\'ajout de l\'adresse');

        toast.success('Adresse ajoutée avec succès');
        setShowAddModal(false);
        setFormData({
          addresse: '',
          ville: '',
          pays: '',
          telephone: '',
          latitude: defaultCenter.lat,
          longitude: defaultCenter.lng,
          is_default: false
        });
        fetchAddresses();
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsSubmitting(false);
      }
    };

    if (loading) {
      return <AddressSkeleton />;
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <h2 className="text-xl font-semibold">Mes Adresses</h2>

        {showAddModal && (
          <AddAddressModal
            onSubmit={handleAddAddress}
            onClose={() => setShowAddModal(false)}
            formData={formData}
            setFormData={setFormData}
            isSubmitting={isSubmitting}
          />
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border rounded-lg hover:border-[#048B9A] transition-colors relative group"
            >
              {address.is_default && (
                <span className="absolute top-2 right-2 bg-[#048B9A]/10 text-[#048B9A] text-xs px-2 py-1 rounded-full">
                  Par défaut
                </span>
              )}

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-[#048B9A] flex-shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{address.addresse}</h3>
                  <p className="text-sm text-gray-600 mt-1">{address.ville}</p>
                  <p className="text-sm text-gray-600">{address.pays}</p>
                  <p className="text-sm text-gray-600 mt-1">{address.telephone}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-500 hover:text-[#048B9A] transition-colors"
                >
                  <FaEdit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <FaTrash className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
          
          <motion.button
            onClick={() => setShowAddModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-[160px] border-2 border-dashed border-[#048B9A] rounded-lg flex flex-col items-center justify-center gap-3 text-[#048B9A] hover:bg-[#048B9A]/5 transition-colors p-4"
          >
            <FaPlus className="w-6 h-6" />
            <span>Ajouter une adresse</span>
          </motion.button>
        </div>
      </motion.div>
    );
  };

  const SettingsContent = () => {
    const [language, setLanguage] = useState('fr');
    const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [paymentForm, setPaymentForm] = useState({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      phoneNumber: ''
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteStep, setDeleteStep] = useState(1);
    const [confirmEmail, setConfirmEmail] = useState('');
    const [deleteReason, setDeleteReason] = useState('');

    const modalVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25
        }
      },
      exit: { 
        opacity: 0, 
        scale: 0.8,
        transition: {
          duration: 0.2
        }
      }
    };

    const handleDeleteAccount = () => {
      // Logique de suppression du compte
      console.log('Compte supprimé');
      setShowDeleteModal(false);
      setDeleteStep(1);
    };

    return (
      <div className="space-y-8">
        {/* Apparence et Langue */}
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-6">Apparence et Langue</h3>
          <div className="space-y-4">
            {/* Mode sombre/clair */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FaMoon className="text-[#048B9A]" /> 
                <div>
                  <h4 className="font-medium mb-1">Mode</h4>
                  <p className="text-sm text-gray-500">
                    Changer l'apparence de l'application
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                 
                  onChange={()=>{}}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#048B9A]"></div>
              </label>
            </div>

            {/* Sélection de la langue */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FaGlobe className="text-[#048B9A]" />
                <div>
                  <h4 className="font-medium mb-1">Langue</h4>
                  <p className="text-sm text-gray-500">
                    Choisir la langue de l'application
                  </p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A] bg-white"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sécurité */}
        <div className="p-6 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-6">Sécurité</h3>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe actuel
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A] bg-white"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A] bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A] bg-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#048B9A] text-white px-6 py-2.5 rounded-lg hover:bg-[#037483] transition-colors"
            >
              Mettre à jour le mot de passe
            </button>
          </form>
        </div>

        {/* Notifications */}
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-6">Préférences de notification</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium mb-1">Notifications par email</h4>
                <p className="text-sm text-gray-500">Recevoir des mises à jour sur vos commandes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#048B9A]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium mb-1">Notifications SMS</h4>
                <p className="text-sm text-gray-500">Recevoir des alertes de livraison par SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#048B9A]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium mb-1">Offres promotionnelles</h4>
                <p className="text-sm text-gray-500">Recevoir des offres spéciales et réductions</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#048B9A]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Méthodes de paiement */}
        <div className="p-6 border rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Méthodes de paiement</h3>
            <button 
              onClick={() => setShowAddPaymentModal(true)}
              className="flex items-center gap-2 text-[#048B9A] hover:underline"
            >
              <FaPlus className="w-4 h-4" />
              Ajouter
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/payments/master.webp"
                  alt="Mastercard"
                  width={40}
                  height={40}
                  className="rounded"
                />
                <div>
                  <h4 className="font-medium">Mastercard terminant par 4242</h4>
                  <p className="text-sm text-gray-500">Expire le 12/25</p>
                </div>
              </div>
              <button className="text-red-500 hover:underline">Supprimer</button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/payments/om.webp"
                  alt="Orange Money"
                  width={40}
                  height={40}
                  className="rounded"
                />
                <div>
                  <h4 className="font-medium">Orange Money</h4>
                  <p className="text-sm text-gray-500">+224 621 XX XX XX</p>
                </div>
              </div>
              <button className="text-red-500 hover:underline">Supprimer</button>
            </div>
          </div>
        </div>

        {/* Modal d'ajout de moyen de paiement */}
        <AnimatePresence>
          {showAddPaymentModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">
                    Ajouter un moyen de paiement
                  </h3>
                  <button 
                    onClick={() => setShowAddPaymentModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                {/* Sélection du type de paiement */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                      paymentMethod === 'card' 
                        ? 'border-[#048B9A] bg-[#048B9A]/5' 
                        : 'hover:border-gray-300'
                    }`}
                  >
                    <FaCreditCard className={`w-6 h-6 ${
                      paymentMethod === 'card' ? 'text-[#048B9A]' : 'text-gray-500'
                    }`} />
                    <span className="text-sm">Carte</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('orange')}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                      paymentMethod === 'orange' 
                        ? 'border-[#048B9A] bg-[#048B9A]/5' 
                        : 'hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src="/paiements/om.png"
                      alt="Orange Money"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="text-sm">Orange Money</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('mtn')}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                      paymentMethod === 'mtn' 
                        ? 'border-[#048B9A] bg-[#048B9A]/5' 
                        : 'hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src="/paiements/momo.png"
                      alt="MTN Money"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="text-sm">MTN Money</span>
                  </button>
                </div>

                {/* Formulaire selon le type de paiement */}
                <form className="space-y-4">
                  {paymentMethod === 'card' ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Numéro de carte
                        </label>
                        <input
                          type="text"
                          value={paymentForm.cardNumber}
                          onChange={(e) => setPaymentForm({...paymentForm, cardNumber: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date d'expiration
                          </label>
                          <input
                            type="text"
                            value={paymentForm.expiryDate}
                            onChange={(e) => setPaymentForm({...paymentForm, expiryDate: e.target.value})}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                            placeholder="MM/AA"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={paymentForm.cvv}
                            onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value})}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Numéro de téléphone
                      </label>
                      <input
                        type="tel"
                        value={paymentForm.phoneNumber}
                        onChange={(e) => setPaymentForm({...paymentForm, phoneNumber: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                        placeholder="+224 6XX XX XX XX"
                      />
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483] transition-colors"
                    >
                      Ajouter
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddPaymentModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Section suppression du compte */}
        <div className="p-6 border border-red-200 rounded-lg bg-red-50">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Supprimer le compte</h3>
          <p className="text-sm text-red-600 mb-4">
            Attention : La suppression de votre compte est irréversible. Toutes vos données seront définitivement effacées.
          </p>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="px-6 py-2.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
          >
            Supprimer mon compte
          </button>
        </div>

        {/* Modal de suppression du compte */}
        <AnimatePresence>
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                    {deleteStep === 1 ? (
                      <FaExclamationTriangle className="w-8 h-8 text-red-500" />
                    ) : (
                      <FaTrash className="w-8 h-8 text-red-500" />
                    )}
                  </div>

                  {deleteStep === 1 ? (
                    <>
                      <h3 className="text-lg font-semibold mb-2">
                        Êtes-vous sûr de vouloir supprimer votre compte ?
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Cette action est irréversible. Toutes vos données, y compris votre historique de commandes et vos informations personnelles, seront définitivement supprimées.
                      </p>
                      <div className="space-y-4 mb-6">
                        <select
                          value={deleteReason}
                          onChange={(e) => setDeleteReason(e.target.value)}
                          className="w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Sélectionnez une raison</option>
                          <option value="privacy">Préoccupations de confidentialité</option>
                          <option value="unused">Je n'utilise plus le service</option>
                          <option value="experience">Mauvaise expérience</option>
                          <option value="other">Autre raison</option>
                        </select>
                        {deleteReason === 'other' && (
                          <textarea
                            placeholder="Précisez la raison..."
                            className="w-full p-2 border rounded-lg focus:ring-red-500 focus:border-red-500"
                            rows={3}
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold mb-2">
                        Confirmez la suppression
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Pour confirmer la suppression, veuillez saisir votre adresse email.
                      </p>
                      <input
                        type="email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        placeholder="Votre adresse email"
                        className="w-full p-2 mb-6 border rounded-lg focus:ring-red-500 focus:border-red-500"
                      />
                    </>
                  )}

                  <div className="flex gap-3 justify-center">
                    {deleteStep === 1 ? (
                      <>
                        <motion.button
                          onClick={() => setDeleteStep(2)}
                          className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                          disabled={!deleteReason}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Continuer
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            setShowDeleteModal(false);
                            setDeleteStep(1);
                            setDeleteReason('');
                          }}
                          className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Annuler
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.button
                          onClick={handleDeleteAccount}
                          className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                          disabled={!confirmEmail}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Supprimer définitivement
                        </motion.button>
                        <motion.button
                          onClick={() => setDeleteStep(1)}
                          className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Retour
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      <motion.div 
        className="max-w-[1400px] mx-auto px-4 md:px-16 py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-3xl font-bold mb-8"
          variants={itemVariants}
        >
          Mon Compte
        </motion.h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar avec animation */}
          <motion.div 
            className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4"
            variants={containerVariants}
          >
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#048B9A] text-white'
                      : 'hover:bg-gray-50'
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </motion.button>
              ))}
              <button 
                onClick={() => setShowLogoutModal(true)} 
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50"
              >
                <FaSignOutAlt />
                <span>Déconnexion</span>
              </button>
            </nav>
          </motion.div>

          {/* Contenu avec animation */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              className="flex-1 bg-white rounded-lg shadow-sm p-6"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Modal de confirmation de déconnexion */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <FaSignOutAlt className="w-8 h-8 text-red-500" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2">
                  Confirmer la déconnexion
                </h3>
                
                <p className="text-gray-600 mb-6">
                  Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à votre compte.
                </p>

                <div className="flex gap-3 justify-center">
                  <motion.button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Se déconnecter
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setShowLogoutModal(false)}
                    className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Profile; 