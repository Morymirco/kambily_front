'use client'
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { FaAddressCard, FaCamera, FaCog, FaHeart, FaShoppingBag, FaSignOutAlt, FaUser } from 'react-icons/fa';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

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

  return (
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
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50">
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
  );
};

const ProfileContent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Mory',
    lastName: 'Camara',
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
              className="flex items-center gap-6"
              variants={inputVariants}
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src={profileData.avatar}
                    alt="Photo de profil"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
              </motion.div>
              <div>
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
                className="ml-auto bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Modifier le profil
              </motion.button>
            </motion.div>

            {/* Informations du profil */}
            <motion.div className="grid gap-6" variants={formVariants}>
              <motion.div 
                className="border rounded-lg p-6 space-y-4"
                variants={inputVariants}
              >
                <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Prénom</p>
                    <p className="font-medium">{profileData.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nom</p>
                    <p className="font-medium">{profileData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{profileData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="font-medium">{profileData.phone}</p>
                  </div>
                </div>
              </motion.div>

              {/* Statistiques */}
              <motion.div 
                className="grid grid-cols-3 gap-4"
                variants={formVariants}
              >
                {[
                  { value: 12, label: "Commandes" },
                  { value: 5, label: "En favoris" },
                  { value: 3, label: "Avis" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="border rounded-lg p-4 text-center"
                    variants={statsVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.p 
                      className="text-2xl font-bold text-[#048B9A]"
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
            className="space-y-8"
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

const OrdersContent = () => (
  <div>
    <h2 className="text-xl font-semibold mb-6">Mes Commandes</h2>
    <div className="space-y-4">
      {[1, 2, 3].map((order) => (
        <div key={order} className="border rounded-lg p-6 hover:border-[#048B9A] transition-colors">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-medium text-lg">Commande #{order}0234</h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Livrée
                </span>
              </div>
              <p className="text-gray-500">Passée le 12 Mars 2024</p>
            </div>
            <button className="text-[#048B9A] hover:underline">
              Voir les détails
            </button>
          </div>

          <div className="flex gap-4 mb-4">
            {[1, 2].map((item) => (
              <div key={item} className="relative w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={`/product-${item}.jpg`}
                  alt="Product"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
              +1
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Total:</span>
              <span className="font-medium text-lg">150,000 GNF</span>
            </div>
            <button className="px-4 py-2 border border-[#048B9A] text-[#048B9A] rounded-lg hover:bg-[#048B9A] hover:text-white transition-colors">
              Suivre la livraison
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const WishlistContent = () => (
  <div>
    <h2 className="text-xl font-semibold mb-6">Ma Liste de Souhaits</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="border rounded-lg p-4">
          <div className="relative h-40 mb-4">
            <img
              src={`/product-${item}.jpg`}
              alt="Product"
              className="w-full h-full object-cover rounded"
            />
          </div>
          <h3 className="font-medium mb-2">Nom du produit</h3>
          <p className="text-[#048B9A] font-medium">75,000 GNF</p>
        </div>
      ))}
    </div>
  </div>
);

const AddressesContent = () => (
  <div>
    <h2 className="text-xl font-semibold mb-6">Mes Adresses</h2>
    <div className="grid md:grid-cols-2 gap-4">
      {[1, 2].map((address) => (
        <div key={address} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium">Adresse {address}</h3>
            <div className="space-x-2">
              <button className="text-[#048B9A] hover:underline">Modifier</button>
              <button className="text-red-500 hover:underline">Supprimer</button>
            </div>
          </div>
          <p className="text-gray-600">123 Rue Example</p>
          <p className="text-gray-600">Conakry, Guinée</p>
          <p className="text-gray-600">+224 624 XX XX XX</p>
        </div>
      ))}
      <button className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center text-gray-500 hover:border-[#048B9A] hover:text-[#048B9A] transition-colors">
        + Ajouter une nouvelle adresse
      </button>
    </div>
  </div>
);

const SettingsContent = () => (
  <div className="space-y-8">
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
        <button className="text-[#048B9A] hover:underline">+ Ajouter</button>
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

    {/* Suppression du compte */}
    <div className="p-6 border border-red-200 rounded-lg bg-red-50">
      <h3 className="text-lg font-semibold text-red-600 mb-2">Supprimer le compte</h3>
      <p className="text-sm text-red-600 mb-4">
        Attention : La suppression de votre compte est irréversible. Toutes vos données seront définitivement effacées.
      </p>
      <button className="px-6 py-2.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
        Supprimer mon compte
      </button>
    </div>
  </div>
);

export default Profile; 