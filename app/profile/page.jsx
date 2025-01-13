'use client'
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { FaAddressCard, FaCog, FaCreditCard, FaExclamationTriangle, FaGlobe, FaHeart, FaMoon, FaPlus, FaShoppingBag, FaSignOutAlt, FaTimes, FaTrash, FaUser } from 'react-icons/fa';

import ProductCard from '@/app/Components/Common/ProductCard';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Link from 'next/link';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  const handleLogout = () => {
    // Logique de déconnexion ici
    console.log('Déconnexion...');
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
                    className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Se déconnecter
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setShowLogoutModal(false)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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

const ProfileContent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Mory',
    lastName: 'Koulibaly',
    email: 'mory@example.com',
    phone: '+224 621 00 00 00',
    bio: 'Passionné de mode et de technologie',
    avatar: '/team/mory.jpg'
  });

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
                <motion.p 
                  className="text-gray-600"
                  variants={inputVariants}
                >
                  {profileData.bio}
                </motion.p>
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
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Récupérer la clé API depuis les variables d'environnement
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Exemple de données de commande
  const orders = [
    {
      id: '10234',
      date: '12 Mars 2024',
      status: 'Livrée',
      total: '150,000 GNF',
      items: [
        { id: 1, image: '/products/product-1.jpg' },
        { id: 2, image: '/products/product-2.jpg' },
        { id: 3, image: '/products/product-3.jpg' }
      ],
      tracking: {
        currentLocation: { lat: 9.6412, lng: -13.5784 },
        deliveryLocation: { lat: 9.6315, lng: -13.5784 }
      }
    },
    // ... autres commandes
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Mes Commandes</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-6 hover:border-[#048B9A] transition-colors">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-lg">Commande #{order.id}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-500">Passée le {order.date}</p>
              </div>
              <Link 
                href={`/order/${order.id}`}
                className="text-[#048B9A] hover:underline"
              >
                Voir les détails
              </Link>
            </div>

            <div className="flex gap-4 mb-4">
              {order.items.slice(0, 2).map((item) => (
                <div key={item.id} className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt="Product"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {order.items.length > 2 && (
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                  +{order.items.length - 2}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Total:</span>
                <span className="font-medium text-lg">{order.total}</span>
              </div>
              <button 
                onClick={() => {
                  setSelectedOrderId(order.id);
                  setShowTrackingModal(true);
                }}
                className="px-4 py-2 border border-[#048B9A] text-[#048B9A] rounded-lg hover:bg-[#048B9A] hover:text-white transition-colors"
              >
                Suivre la livraison
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de suivi de livraison */}
      <AnimatePresence>
        {showTrackingModal && selectedOrderId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-semibold">
                  Suivi de la commande #{selectedOrderId}
                </h3>
                <button 
                  onClick={() => setShowTrackingModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Carte de suivi */}
              <div className="mb-6 rounded-lg overflow-hidden">
                <LoadScript googleMapsApiKey={googleMapsApiKey}>
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '400px' }}
                    center={orders.find(o => o.id === selectedOrderId)?.tracking.currentLocation}
                    zoom={13}
                  >
                    <Marker 
                      position={orders.find(o => o.id === selectedOrderId)?.tracking.currentLocation} 
                    />
                    <Marker 
                      position={orders.find(o => o.id === selectedOrderId)?.tracking.deliveryLocation}
                      icon={{
                        url: '/marker-destination.png',
                        scaledSize: { width: 40, height: 40 }
                      }}
                    />
                  </GoogleMap>
                </LoadScript>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WishlistContent = () => {
  // Exemple de données pour les produits favoris
  const wishlistProducts = [
    {
      id: 1,
      image: '/products/product-1.jpg',
      gallery: ['/products/product-1.jpg', '/products/product-2.jpg'],
      title: 'T-shirt Premium',
      price: '150,000',
      oldPrice: '200,000',
      inStock: true,
      description: 'T-shirt en coton premium avec design exclusif',
      isFavorite: true
    },
    {
      id: 2,
      image: '/products/product-2.jpg',
      gallery: ['/products/product-2.jpg', '/products/product-3.jpg'],
      title: 'Sneakers Classic',
      price: '350,000',
      oldPrice: '400,000',
      inStock: true,
      description: 'Sneakers confortables pour un style décontracté',
      isFavorite: true
    },
    {
      id: 3,
      image: '/products/product-3.jpg',
      gallery: ['/products/product-3.jpg', '/products/product-1.jpg'],
      title: 'Sac à main Designer',
      price: '450,000',
      inStock: true,
      description: 'Sac à main élégant en cuir véritable',
      isFavorite: true
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Ma Liste de Souhaits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            gallery={product.gallery}
            title={product.title}
            price={product.price}
            oldPrice={product.oldPrice}
            inStock={product.inStock}
            description={product.description}
            isFavorite={product.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};

const AddressesContent = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: 'Adresse 1',
      street: '123 Rue Example',
      city: 'Conakry',
      country: 'Guinée',
      phone: '+224 624 XX XX XX'
    },
    {
      id: 2,
      title: 'Adresse 2',
      street: '456 Avenue Example',
      city: 'Conakry',
      country: 'Guinée',
      phone: '+224 624 XX XX XX'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    title: '',
    street: '',
    city: '',
    country: 'Guinée',
    phone: ''
  });

  const handleAddAddress = (e) => {
    e.preventDefault();
    setAddresses([...addresses, { ...newAddress, id: addresses.length + 1 }]);
    setNewAddress({ title: '', street: '', city: '', country: 'Guinée', phone: '' });
    setShowAddModal(false);
  };

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setShowEditModal(true);
  };

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    setAddresses(addresses.map(addr => 
      addr.id === selectedAddress.id ? selectedAddress : addr
    ));
    setShowEditModal(false);
  };

  const handleDeleteAddress = (address) => {
    setSelectedAddress(address);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setAddresses(addresses.filter(addr => addr.id !== selectedAddress.id));
    setShowDeleteModal(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Mes Adresses</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div key={address.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium">{address.title}</h3>
              <div className="space-x-2">
                <button 
                  onClick={() => handleEditAddress(address)}
                  className="text-[#048B9A] hover:underline"
                >
                  Modifier
                </button>
                <button 
                  onClick={() => handleDeleteAddress(address)}
                  className="text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
            <p className="text-gray-600">{address.street}</p>
            <p className="text-gray-600">{address.city}, {address.country}</p>
            <p className="text-gray-600">{address.phone}</p>
          </div>
        ))}
        <button 
          onClick={() => setShowAddModal(true)}
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center text-gray-500 hover:border-[#048B9A] hover:text-[#048B9A] transition-colors"
        >
          + Ajouter une nouvelle adresse
        </button>
      </div>

      {/* Modal d'ajout */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold mb-4">Ajouter une adresse</h3>
              <form onSubmit={handleAddAddress} className="space-y-4">
                <input
                  type="text"
                  placeholder="Titre de l'adresse"
                  value={newAddress.title}
                  onChange={(e) => setNewAddress({...newAddress, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  required
                />
                <input
                  type="text"
                  placeholder="Rue"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  required
                />
                <input
                  type="text"
                  placeholder="Ville"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  required
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  required
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483]"
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de modification */}
      <AnimatePresence>
        {showEditModal && selectedAddress && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold mb-4">Modifier l'adresse</h3>
              <form onSubmit={handleUpdateAddress} className="space-y-4">
                <input
                  type="text"
                  placeholder="Titre de l'adresse"
                  value={selectedAddress.title}
                  onChange={(e) => setSelectedAddress({...selectedAddress, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  required
                />
                <input
                  type="text"
                  placeholder="Rue"
                  value={selectedAddress.street}
                  onChange={(e) => setSelectedAddress({...selectedAddress, street: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  required
                />
                <input
                  type="text"
                  placeholder="Ville"
                  value={selectedAddress.city}
                  onChange={(e) => setSelectedAddress({...selectedAddress, city: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  required
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={selectedAddress.phone}
                  onChange={(e) => setSelectedAddress({...selectedAddress, phone: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  required
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483]"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de suppression */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center"
            >
              <h3 className="text-lg font-semibold mb-4">Supprimer l'adresse</h3>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer cette adresse ?
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
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

export default Profile; 