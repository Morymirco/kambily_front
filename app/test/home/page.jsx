'use client'
import Product from '@/app/Components/Common/Product';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaHome, FaList, FaPhone, FaShoppingBag, FaUser } from 'react-icons/fa';

export default function TestHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState('00:00:00:00');
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Vérifier la taille de l'écran au chargement
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Vérifier initialement
    checkIsMobile();

    // Ajouter un écouteur pour les changements de taille d'écran
    window.addEventListener('resize', checkIsMobile);

    // Nettoyer l'écouteur
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Images du carrousel
  const carouselImages = [
    {
      id: 1,
      src: "/slider/slide1.jpg",
      alt: "Nouvelle collection été",
      link: "/collections/ete"
    },
    {
      id: 2,
      src: "/slider/slide2.jpg",
      alt: "Promotions spéciales",
      link: "/promotions"
    },
    {
      id: 3,
      src: "/slider/slide3.jpg",
      alt: "Collection tendance",
      link: "/tendances"
    }
  ];

  // Exemple de produits avec la structure adaptée au composant Product
  const products = [
    {
      id: 1,
      name: "Ensemble De Pyjama Short & Top À Fines Brides Imprimé Cœur",
      price: 65000,
      images: [{ image: "/pyjama.png" }],
      category: { name: "Pyjamas" },
      description: "Ensemble pyjama confortable et élégant"
    },
    {
      id: 2, 
      name: "T-shirt graphique Floral et Slogan pour Femmes",
      price: 85000,
      images: [{ image: "/houston_tshirt.png" }],
      category: { name: "T-shirts" },
      description: "T-shirt tendance avec motif floral"
    }
  ];

  // Rotation automatique du carrousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  if (!isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Version Mobile Uniquement
          </h1>
          <p className="text-gray-600">
            Cette page est optimisée pour les appareils mobiles. <br />
            Veuillez y accéder depuis votre smartphone.
          </p>
          <div className="mt-6">
            <Image
              src="/mobile-only.svg" // Ajoutez une image appropriée
              alt="Mobile only"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:hidden min-h-screen bg-gray-50">
      {/* Carrousel */}
      <div className="relative w-full h-48 bg-gray-200">
        {carouselImages.map((image, index) => (
          <motion.div
            key={image.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 1 : 0
            }}
            transition={{ duration: 0.5 }}
          >
            <Link href={image.link}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </Link>
          </motion.div>
        ))}

        {/* Boutons de navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 hover:bg-black/50"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 hover:bg-black/50"
        >
          <FaChevronRight />
        </button>

        {/* Indicateurs */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index 
                  ? 'bg-white w-4' 
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* En-tête avec qualité */}
      <div className="px-4 py-3 bg-white">
        <div className="flex items-center gap-3">
          <div className="text-[#048B9A]">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 8h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2"/>
              <path d="M5 16H4a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-medium">Meilleure Qualité</h2>
            <p className="text-xs text-gray-400 leading-tight">
              Nous offrons des produits de qualité supérieure pour une expérience d'achat en toute confiance.
            </p>
          </div>
        </div>

        {/* Compte à rebours */}
        <div className="mt-3">
          <div className="bg-[#E8F8F9] rounded-lg p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="font-mono text-[#048B9A] text-sm font-medium tracking-wider">
                {timeLeft}
              </div>
              <p className="text-xs text-gray-500">
                Achetez maintenant et profitez de l'offre!
              </p>
            </div>
          </div>
        </div>

        {/* Livraison gratuite */}
        <div className="flex justify-between items-center mt-3 border-t pt-3">
          <div className="font-medium text-sm">Livraison Gratuite</div>
          <Link href="#" className="text-xs text-[#048B9A] flex items-center gap-1">
            Voir Plus 
            <span className="text-xs">→</span>
          </Link>
        </div>
      </div>

      {/* Grille de produits */}
      <div className="grid grid-cols-2 gap-0">
        {products.map((product) => (
          <Product
            key={product.id}
            image={product.images[0]?.image}
            gallery={product.images.map(img => img.image)}
            title={product.name}
            price={product.price}
            category={product.category.name}
            inStock={true}
            description={product.description}
          />
        ))}
      </div>

      {/* Navigation du bas */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2">
        <div className="flex justify-around items-center">
          <Link href="/test/home" className="flex flex-col items-center text-[#048B9A]">
            <FaHome className="text-xl" />
            <span className="text-xs mt-1">ACCUEIL</span>
          </Link>
          <Link href="/test/products" className="flex flex-col items-center text-gray-500">
            <FaShoppingBag className="text-xl" />
            <span className="text-xs mt-1">BOUTIQUE</span>
          </Link>
          <Link href="/test/categories" className="flex flex-col items-center text-gray-500">
            <FaList className="text-xl" />
            <span className="text-xs mt-1">CATÉGORIES</span>
          </Link>
          <Link href="/test/contact" className="flex flex-col items-center text-gray-500">
            <FaPhone className="text-xl" />
            <span className="text-xs mt-1">CONTACT</span>
          </Link>
          <Link href="/test/profile" className="flex flex-col items-center text-gray-500">
            <FaUser className="text-xl" />
            <span className="text-xs mt-1">COMPTE</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 