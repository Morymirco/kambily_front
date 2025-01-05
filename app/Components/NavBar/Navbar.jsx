'use client'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { FaEnvelope, FaGlobe, FaMoon, FaPhone, FaSearch, FaShoppingCart, FaSun } from 'react-icons/fa';
import MobileNav from './MobileNav';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const cartPopupTimer = useRef(null);
  
  const languages = [
    { code: 'fr', name: 'Français', flag: '/flags/fr.png' },
    { code: 'en', name: 'English', flag: '/flags/en.png' },
    { code: 'ar', name: 'العربية', flag: '/flags/arabe.png' }
  ];

  const [currentLang, setCurrentLang] = useState(languages[0]);

  const categories = [
    {
      name: "Vêtements",
      subcategories: ["Hommes", "Femmes", "Enfants"]
    },
    {
      name: "Électronique",
      subcategories: ["Téléphones", "Ordinateurs", "Accessoires"]
    },
    {
      name: "Accessoires",
      subcategories: ["Sacs", "Bijoux", "Montres"]
    }
  ];

  const cartItems = [
    {
      id: 1,
      name: "Ensemble De Pyjama",
      price: 65000,
      quantity: 1,
      image: "/pyjama.png"
    }
  ];

  const pathname = usePathname();

  // Calculer le total du panier
  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  useEffect(() => {
    // Définition des couleurs
    const colors = [
      '#ed1c66', '#6a23d5', '#23a6d5', '#23d5ab', 
      '#f03e3e', '#e8890c', '#e73c7e'
    ];
    
    // Fonction pour obtenir des couleurs aléatoires
    const getRandomColors = () => {
      const shuffled = [...colors].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 4); // Prend 4 couleurs aléatoires
    };

    // Fonction pour mettre à jour le gradient
    const updateGradient = () => {
      const selectedColors = getRandomColors();
      const gradient = `linear-gradient(-45deg, ${selectedColors.join(', ')})`;
      const banner = document.getElementById('dynamic-banner');
      if (banner) {
        banner.style.backgroundImage = gradient;
      }
    };

    // Animation du gradient
    const startGradientAnimation = () => {
      updateGradient();
      setTimeout(startGradientAnimation, 3000); // Change toutes les 3 secondes
    };

    startGradientAnimation();
  }, []);

  // Ajoutez cette fonction pour gérer la suppression
  const removeFromCart = (itemId) => {
    // Remplacez ceci par votre logique de gestion d'état réelle
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    // Mettez à jour votre état ici
    console.log('Item removed:', itemId);
  };

  const handleCartMouseEnter = () => {
    if (cartPopupTimer.current) clearTimeout(cartPopupTimer.current);
    setShowCartPopup(true);
  };

  const handleCartMouseLeave = () => {
    cartPopupTimer.current = setTimeout(() => {
      setShowCartPopup(false);
    }, 300);
  };

  return (
    <nav className="w-full bg-white shadow-sm font-krub">
      {/* Barre supérieure avec promotion et timer - cachée sur mobile */}
      <div 
        id="dynamic-banner"
        className="hidden sm:block w-full text-white py-2.5 transition-all duration-1000 ease-in-out bg-gradient-to-r"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <p>Toutes les livraisons sont gratuites pendant 2 semaines. Profitez en !</p>
              <p className="text-gray-200">|</p>
              <p>Peh tu n'as pas aimé?</p>
            </div>
            <div className="flex items-center gap-1">
              <span>Fin du temps:</span>
              <span className="bg-white/10 px-2 py-1 rounded">00</span>
              <span>:</span>
              <span className="bg-white/10 px-2 py-1 rounded">00</span>
              <span>:</span>
              <span className="bg-white/10 px-2 py-1 rounded">00</span>
              <span>:</span>
              <span className="bg-white/10 px-2 py-1 rounded">00</span>

              {/* Sélecteur de langue */}
              <div className="relative ml-6">
                <button
                  onClick={() => setShowLanguages(!showLanguages)}
                  className="flex items-center gap-2  hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={currentLang.flag}
                    alt={currentLang.name}
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                  <FaGlobe className="w-4 h-4" />
                </button>

                {/* Dropdown des langues */}
                {showLanguages && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50 py-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang);
                          setShowLanguages(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                      >
                        <Image
                          src={lang.flag}
                          alt={lang.name}
                          width={20}
                          height={20}
                          className="rounded-sm"
                        />
                        <span className="text-gray-700">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Switch Mode Sombre/Clair */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="ml-4 text-white hover:opacity-80 transition-opacity"
                aria-label={isDarkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
              >
                {isDarkMode ? (
                  <FaSun className="w-5 h-5" />
                ) : (
                  <FaMoon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Barre de contact - cachée sur mobile */}
      <div className="hidden sm:block w-full bg-gray-100 py-3 text-sm text-gray-600">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <p className="text-right">
            Besoin d'aide? Appelez nous:{" "}
            <a href="tel:+224624228855" className="font-medium">(+224) 624 228 855</a>
            {" "}ou{" "}
            <a href="mailto:contact@kambily.com" className="hover:text-cyan-600 font-medium">
              contact@kambily.com
            </a>
          </p>
        </div>
      </div>

      {/* Drawer Mobile */}
      <div className={`fixed inset-y-0 left-0 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50`}>
        <div className="h-full flex flex-col">
          {/* Header avec logo et bouton fermer */}
          <div className="p-4 flex justify-between items-center border-b">
            <Image
              src="/logo.webp"
              alt="Kambily"
              width={120}
              height={40}
              priority
            />
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contenu du drawer */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Menu principal */}
            <div className="mb-8">
              <h3 className="text-gray-400 text-sm font-medium mb-4">MAIN MENU</h3>
              <nav className="space-y-4">
                <Link href="/" className="block text-gray-800 hover:text-[#048B9A]">
                  Accueil
                </Link>
                <div>
                  <button 
                    className="flex items-center justify-between w-full text-gray-800 hover:text-[#048B9A]"
                    onClick={() => setIsDrawerOpen(true)} // Ajoutez un state pour gérer l'ouverture/fermeture
                  >
                    <div className="flex items-center gap-2">
                      Nos catégories
                      <svg 
                        className="w-4 h-4 transition-transform duration-200" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                </div>
                <Link href="/boutique" className="block text-gray-800 hover:text-[#048B9A]">
                  Boutique
                </Link>
                <Link href="/contact" className="block text-gray-800 hover:text-[#048B9A]">
                  Contact
                </Link>
                <Link href="/a-propos" className="block text-gray-800 hover:text-[#048B9A]">
                  À propos de nous
                </Link>
              </nav>
            </div>

            {/* Menu catégories */}
            <div className="mb-8">
              <h3 className="text-gray-400 text-sm font-medium mb-4">CATEGORY MENU</h3>
              {/* Ajoutez ici vos catégories */}
            </div>

            {/* Coordonnées */}
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-4">COORDONNÉES</h3>
              <div className="space-y-4">
                <div>
                  <a href="tel:624-22-85-55" className="flex items-center text-gray-800 hover:text-[#048B9A] gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <FaPhone className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="block">624-22-85-55</span>
                  </a>
                  <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                    Vous pouvez appeler à tout moment de 8 h à 20 h.
                  </p>
                </div>
                <div>
                  <a href="mailto:contact@kambily.com" className="flex items-center text-gray-800 hover:text-[#048B9A] gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <FaEnvelope className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="block">contact@kambily.com</span>
                  </a>
                  <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                    L'e-mail que vous enverrez sera répondu dans les plus brefs délais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay pour le drawer */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Navigation principale */}
      <div className="w-full">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-2 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Bouton du drawer - visible sur mobile et desktop */}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="hover:text-cyan-600"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo - centré sur mobile */}
            <div className="absolute left-1/2 transform -translate-x-1/2 sm:static sm:transform-none sm:ml-8">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logo.webp"
                  alt="Kambily Logo"
                  width={120}
                  height={40}
                  priority
                  className="w-[100px] sm:w-[120px]"
                />
              </Link>
            </div>

            {/* Liens de navigation - cachés sur mobile */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-8">
              <div className="flex items-center space-x-12">
                <Link href="/" className="hover:text-cyan-600">Accueil</Link>
                <div className="relative group">
                  <Link href="/boutique" className="hover:text-cyan-600 flex items-center">
                  <div className="flex items-center gap-2">
  Nos catégories
  <svg 
    className="w-4 h-4 transition-transform duration-200" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 9l-7 7-7-7" />
  </svg>
</div>
                  </Link>
                  
                  {/* Dropdown menu */}
                  <div className="absolute left-0 mt-2 w-60 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    {categories.map((category, index) => (
                      <div key={index} className="relative group/sub">
                        <Link 
                          href={`/categories/${category.name.toLowerCase()}`}
                          className="block px-4 py-2 hover:bg-gray-50 hover:text-cyan-600"
                        >
                          <div className="flex items-center justify-between">
                            <span>{category.name}</span>
                            <svg 
    className="w-4 h-4 transition-transform duration-200" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 9l-7 7-7-7" />
  </svg>
                          </div>
                        </Link>
                        
                        {/* Sous-catégories */}
                        <div className="absolute left-full top-0 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300">
                          {category.subcategories.map((sub, subIndex) => (
                            <Link 
                              key={subIndex}
                              href={`/categories/${category.name.toLowerCase()}/${sub.toLowerCase()}`}
                              className="block px-4 py-2 hover:bg-gray-50 hover:text-cyan-600"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="/boutique" className="hover:text-cyan-600">Boutique</Link>
                <Link href="/contact" className="hover:text-cyan-600">Contact</Link>
                <Link href="/about" className="hover:text-cyan-600">À propos de nous</Link>
              </div>
            </div>

            {/* Icônes droites - adaptées pour mobile */}
            <div className="flex items-center justify-end space-x-4 sm:space-x-6">
              {/* Icône Recherche - cachée sur mobile */}
              <button className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-[#048B9A]">
                <FaSearch className="w-5 h-5" />
              </button>

              {/* Icône Panier avec popup */}
              <div 
                className="relative"
                onMouseEnter={handleCartMouseEnter}
                onMouseLeave={handleCartMouseLeave}
              >
                <button 
                  className="relative text-gray-600 hover:text-[#048B9A]"
                >
                  <FaShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#048B9A] text-white text-xs rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                </button>

                {/* Popup du panier */}
                <AnimatePresence>
                  {showCartPopup && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-4 w-80 bg-white rounded-lg shadow-lg z-50"
                      onMouseEnter={() => {
                        if (cartPopupTimer.current) clearTimeout(cartPopupTimer.current);
                      }}
                      onMouseLeave={handleCartMouseLeave}
                    >
                      {/* Barre de progression pour la livraison gratuite */}
                      <div className="p-4 bg-gray-50 border-b">
                        {cartTotal < 500000 ? (
                          <>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600">
                                Livraison gratuite à partir de 500 000 GNF
                              </span>
                              <span className="font-medium">
                                {((cartTotal / 500000) * 100).toFixed(0)}%
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(cartTotal / 500000) * 100}%` }}
                                className="h-full bg-[#048B9A] rounded-full"
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                            <p className="text-sm text-[#048B9A] mt-2">
                              Ajoutez {(500000 - cartTotal).toLocaleString()} GNF au panier pour bénéficier de la livraison gratuite !
                            </p>
                          </>
                        ) : (
                          <div className="flex items-center gap-2 text-green-600">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium">
                              Félicitations ! Vous bénéficiez de la livraison gratuite
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Reste du contenu du popup */}
                      {cartItems.length > 0 ? (
                        <>
                          <div className="p-4 max-h-80 overflow-y-auto">
                            {cartItems.map((item, index) => (
                              <div key={index} className="flex items-center gap-4 mb-4">
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-medium text-gray-900 truncate">
                                    {item.name}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    Quantité: {item.quantity}
                                  </p>
                                  <p className="text-sm font-medium text-[#048B9A]">
                                    {item.price.toLocaleString()} GNF
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="p-4 border-t">
                            {/* Total */}
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-gray-600">Total</span>
                              <span className="font-bold text-lg">
                                {cartTotal.toLocaleString()} GNF
                              </span>
                            </div>
                            {/* Boutons d'action */}
                            <div className="flex gap-2">
                              <Link 
                                href="/panier"
                                className="flex-1 block bg-[#048B9A] text-white text-center px-4 py-2 rounded-lg hover:bg-[#037483] transition-colors"
                              >
                                Voir le panier
                              </Link>
                              <Link 
                                href="/commander"
                                className="flex-1 block bg-green-600 text-white text-center px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                              >
                                Commander
                              </Link>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="p-4 text-center">
                          <p className="text-gray-500">Votre panier est vide</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Icône Utilisateur - Nouveau */}
              <Link 
                href="/profile" 
                className="text-gray-600 hover:text-[#048B9A] transition-colors"
              >
                {isLoggedIn ? (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-current flex items-center justify-center overflow-hidden">
                    <Image
                      src="/team/mory.jpg"
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-5 h-5 sm:w-6 sm:h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Intégration de MobileNav */}
      <div className="block md:hidden">
        <MobileNav />
      </div>
    </nav>
  );
}
