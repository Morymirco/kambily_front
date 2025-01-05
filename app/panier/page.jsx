'use client'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaEdit, FaMapMarkerAlt, FaMapPin, FaSearchLocation, FaTrash } from 'react-icons/fa';

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

const Panier = () => {
  const [promoCode, setPromoCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard'); // standard ou express
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [position, setPosition] = useState(defaultCenter);
  const [showMap, setShowMap] = useState(false);
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quantities, setQuantities] = useState({
    1: 1, // id du produit: quantité
  });
  
  // Exemple de produits dans le panier
  const cartItems = [
    {
      id: 1,
      name: "Ensemble De Pyjama",
      price: 65000,
      quantity: 1,
      image: "/pyjama.png"
    },
    {
      id: 2,
      name: "T-shirt Houston",
      price: 85000,
      quantity: 1,
      image: "/houston_tshirt.png"
    }
  ];

  // Exemple d'adresse par défaut
  const defaultAddress = {
    name: "John Doe",
    address: "123 Rue Principale",
    city: "Conakry",
    phone: "+224 000 00 00"
  };

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const shippingCost = {
    standard: 0,
    express: 25000
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = shippingCost[shippingMethod];
    const discount = promoCode ? 15000 : 0;
    return subtotal + shipping - discount;
  };

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

  // Gestion de la sauvegarde
  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Succès
      toast.success('Adresse sauvegardée avec succès !', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#048B9A',
          color: '#fff',
        },
        icon: '✅',
      });

      setShowAddressForm(false);
    } catch (error) {
      // Erreur
      toast.error('Erreur lors de la sauvegarde', {
        duration: 3000,
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
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

  return (
    <motion.div 
      className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-16 py-3 sm:py-6 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Toaster />
      
      <motion.h1 
        className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
        variants={itemVariants}
      >
        Panier
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
        {/* Liste des produits */}
        <div className="md:col-span-2 space-y-4 sm:space-y-6 w-full">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg shadow-sm p-3 sm:p-4 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                whileHover={{ scale: 1.01 }}
                layout
              >
                {/* Image du produit */}
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Détails du produit */}
                <div className="flex-1 min-w-0 w-[calc(100%-5rem)] sm:w-auto">
                  <h3 className="font-medium text-sm sm:text-base truncate">{item.name}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm">Taille: M</p>
                  <p className="text-[#048B9A] font-medium text-sm sm:text-base">
                    {item.price.toLocaleString()} GNF
                  </p>
                </div>

                {/* Contrôles de quantité et suppression */}
                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50 text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 sm:w-12 text-center text-sm">
                      {quantities[item.id] || 1}
                    </span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50 text-sm"
                    >
                      +
                    </button>
                  </div>
                  <motion.button 
                    className="text-red-500 p-1 sm:p-2"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Bouton Continuer les achats */}
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
          </motion.div>
        </div>

        {/* Résumé de la commande */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-3 sm:p-6 space-y-4 sm:space-y-6 w-full"
          variants={itemVariants}
        >
          {/* Code promo */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="font-medium text-sm sm:text-base">Code promo</h3>
            <div className="flex gap-2 w-full">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Entrez votre code"
                className="flex-1 px-3 py-2 text-sm border rounded-lg min-w-0"
              />
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm whitespace-nowrap">
                Appliquer
              </button>
            </div>
          </div>

          {/* Adresse d'expédition */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Adresse de livraison</h3>
              <motion.button
                onClick={() => setShowAddressForm(!showAddressForm)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-[#048B9A] text-sm flex items-center gap-2"
              >
                <FaEdit />
                {showAddressForm ? 'Fermer' : 'Modifier'}
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {!showAddressForm ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex gap-3">
                    <div className="text-[#048B9A]">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{defaultAddress.name}</p>
                      <p className="text-sm text-gray-600">{defaultAddress.address}</p>
                      <p className="text-sm text-gray-600">{defaultAddress.city}</p>
                      <p className="text-sm text-gray-600">{defaultAddress.phone}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSaveAddress}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <motion.input
                      type="text"
                      placeholder="Prénom"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                      whileFocus={{ scale: 1.01 }}
                    />
                    <motion.input
                      type="text"
                      placeholder="Nom"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>

                  {/* Carte et recherche d'adresse */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-gray-700">
                        Sélectionnez votre adresse sur la carte
                      </label>
                      <motion.button
                        type="button"
                        onClick={() => setShowMap(!showMap)}
                        className="text-[#048B9A] text-sm flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaMapPin />
                        {showMap ? 'Masquer la carte' : 'Afficher la carte'}
                      </motion.button>
                    </div>

                    <AnimatePresence>
                      {showMap && (
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {/* Barre de recherche d'adresse */}
                          <div className="flex gap-2">
                            <motion.input
                              type="text"
                              value={searchAddress}
                              onChange={(e) => setSearchAddress(e.target.value)}
                              placeholder="Rechercher une adresse..."
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                              whileFocus={{ scale: 1.01 }}
                            />
                            <motion.button
                              onClick={searchByAddress}
                              className="px-4 py-2 bg-[#048B9A] text-white rounded-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FaSearchLocation />
                            </motion.button>
                          </div>

                          {/* Carte Google Maps */}
                          <motion.div
                            className="rounded-lg overflow-hidden"
                            style={{ height: 300 }}
                          >
                            <LoadScript googleMapsApiKey="AIzaSyAlAKK7ldE7CcZMmGADZPb3GYOPI8C4bXs">
                              <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={position}
                                zoom={15}
                                onClick={handleMapClick}
                              >
                                <Marker position={position} />
                              </GoogleMap>
                            </LoadScript>
                          </motion.div>

                          {/* Affichage des coordonnées et de l'adresse sélectionnées */}
                          {selectedLocation && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-gray-50 p-3 rounded-lg space-y-1"
                            >
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium">Coordonnées:</span>
                                <span className="text-gray-600">{selectedLocation.coordinates}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium">Adresse:</span>
                                <span className="text-gray-600">{selectedLocation.address}</span>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Adresse complète"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                    whileFocus={{ scale: 1.01 }}
                  />

                  <div className="flex gap-2">
                    <motion.button
                      type="submit"
                      className="flex-1 bg-[#048B9A] text-white py-2 rounded-lg hover:bg-[#037483] transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Sauvegarde en cours...</span>
                        </>
                      ) : (
                        'Sauvegarder l\'adresse'
                      )}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => setShowAddressForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isLoading}
                    >
                      Annuler
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Expédition */}
          <div className="space-y-3">
            <h3 className="font-medium">Mode d'expédition</h3>
            <div className="space-y-2">
              <motion.div 
                className={`p-3 border rounded-lg cursor-pointer ${
                  shippingMethod === 'standard' ? 'border-[#048B9A]' : 'border-gray-200'
                }`}
                whileHover={{ scale: 1.01 }}
                onClick={() => setShippingMethod('standard')}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    shippingMethod === 'standard' 
                      ? 'border-[#048B9A] bg-[#048B9A]' 
                      : 'border-gray-300'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium">Livraison standard</p>
                    <p className="text-sm text-gray-500">3-5 jours ouvrables</p>
                  </div>
                  <span className="font-medium text-green-600">Gratuit</span>
                </div>
              </motion.div>

              <motion.div 
                className={`p-3 border rounded-lg cursor-pointer ${
                  shippingMethod === 'express' ? 'border-[#048B9A]' : 'border-gray-200'
                }`}
                whileHover={{ scale: 1.01 }}
                onClick={() => setShippingMethod('express')}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    shippingMethod === 'express' 
                      ? 'border-[#048B9A] bg-[#048B9A]' 
                      : 'border-gray-300'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium">Livraison express</p>
                    <p className="text-sm text-gray-500">1-2 jours ouvrables</p>
                  </div>
                  <span className="font-medium">25,000 GNF</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Résumé */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Résumé de la commande</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span>{cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString()} GNF</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expédition</span>
                <span>{shippingMethod === 'express' ? '25,000' : 'Gratuit'}</span>
              </div>
              {promoCode && (
                <motion.div 
                  className="flex justify-between text-green-600"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span>Réduction</span>
                  <span>-15,000 GNF</span>
                </motion.div>
              )}
              <div className="flex justify-between font-medium text-lg pt-4 border-t">
                <span>Total</span>
                <span>{calculateTotal().toLocaleString()} GNF</span>
              </div>
            </div>
          </div>

          {/* Bouton paiement */}
          <Link href="/paiement" className="block">
            <motion.button
              className="w-full bg-[#048B9A] text-white py-3 rounded-lg hover:bg-[#037483] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Procéder au paiement
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Panier; 