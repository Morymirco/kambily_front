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
    },
    {
      id: 3,
      name: "Robe d'été Florale",
      price: 95000, 
      images: [{ image: "/robe.png" }],
      category: { name: "Robes" },
      description: "Robe légère et élégante pour l'été"
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
        {products.slice(0, 2).map((product) => (
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
      
      {/* Dernier produit en pleine largeur */}
      <div className="col-span-full w-full">
        <Product
          key={products[2].id}
          image={products[2].images[0]?.image}
          gallery={products[2].images.map(img => img.image)}
          title={products[2].name}
          price={products[2].price}
          category={products[2].category.name}
          inStock={true}
          description={products[2].description}
        />
      </div>

      {/* Section Livraison Gratuite */}
      <div className="bg-pink-50 m-4 p-4 rounded-lg">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-1">100%</h2>
          <h3 className="text-[#048B9A] font-medium mb-1">
            Livraison gratuite à 100% pour tout achats à partir de 350.000GNF !!!
          </h3>
          <p className="text-gray-500 text-sm">Plus vous achetez, plus vous économisez!</p>
          <div className="mt-2 text-gray-700 font-medium">Gratuit</div>
        </div>
      </div>

      {/* Section Vêtements */}
      <div className="bg-gray-100 m-4 p-4 rounded-lg">
        <div className="uppercase text-sm font-medium text-[#048B9A] mb-2">
          VETEMENTS
        </div>
        <h2 className="text-xl font-bold mb-2">
          Des Tendances qui Captivent
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Explorez notre gamme de vêtements inspirés des dernières tendances de la mode mondiale.
        </p>
        <button className="text-[#048B9A] text-sm font-medium">
          Explore →
        </button>
        <div className="mt-4">
          <Image
            src="/couple.jpg"
            alt="Tendances mode"
            width={400}
            height={300}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Deuxième liste de produits */}
      <div className="grid grid-cols-2 gap-0">
        {products.slice(0, 2).map((product) => (
          <Product
            key={`second-${product.id}`}
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
      
      {/* Dernier produit en pleine largeur (deuxième liste) */}
      <div className="col-span-full w-full">
        <Product
          key={`second-${products[2].id}`}
          image={products[2].images[0]?.image}
          gallery={products[2].images.map(img => img.image)}
          title={products[2].name}
          price={products[2].price}
          category={products[2].category.name}
          inStock={true}
          description={products[2].description}
        />
      </div>

      {/* Section Meilleures Offres */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-[#048B9A]">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-medium">Meilleures Offres</h2>
            <p className="text-xs text-gray-400 leading-tight">
              Découvrez nos offres imbattables conçues pour offrir le meilleur rapport qualité-prix.
            </p>
          </div>
        </div>

        {/* Grille de bijoux */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="relative aspect-square">
              <Image
                src="/bijoux/bagues.jpg"
                alt="Set de bagues"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium">21/23 Pièces/Set De Bagues À La Mode</h3>
              <div className="text-[#048B9A] font-medium mt-1">40,000 GNF</div>
              <div className="flex items-center gap-2 text-xs text-green-600 mt-1">
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                In Stock
              </div>
              <button className="w-full mt-2 bg-[#048B9A] text-white py-2 rounded-lg text-sm">
                Ajouter au panier
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="relative aspect-square">
              <Image
                src="/bijoux/collier.jpg"
                alt="Collier papillon"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium">2 pièces Collier à papillon</h3>
              <div className="text-[#048B9A] font-medium mt-1">18,000 GNF</div>
              <div className="flex items-center gap-2 text-xs text-green-600 mt-1">
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                In Stock
              </div>
              <button className="w-full mt-2 bg-[#048B9A] text-white py-2 rounded-lg text-sm">
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Bijouterie */}
      <div className="m-4 relative rounded-lg overflow-hidden">
        <Image
          src="/bijoux/collier-diamant.jpg"
          alt="Collection de bijoux"
          width={400}
          height={300}
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute inset-0 bg-black/30 p-4 flex flex-col justify-between">
          <div>
            <div className="inline-block bg-[#048B9A] text-white text-xs px-2 py-1 rounded">
              BIJOUTERIE
            </div>
            <h2 className="text-white text-xl font-bold mt-2">
              Éblouissez-vous avec notre collection de bijoux
            </h2>
            <p className="text-white/90 text-sm mt-1">
              Parcourez notre collection pour trouver des bijoux qui parlent de votre style unique.
            </p>
          </div>
          <button className="text-white text-sm font-medium">
            Explorer →
          </button>
        </div>
      </div>

      {/* Section Paiement Sécurisé */}
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="text-[#048B9A]">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-medium">Paiement Sécurisé</h2>
          <p className="text-xs text-gray-400 leading-tight">
            Nous nous engageons à vous offrir une expérience d'achat en ligne sûre et fiable.
          </p>
        </div>
      </div>

      {/* Section Électronique avec produits */}
      <div className="px-4 space-y-4">
        {/* Casque VR en grand format */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src="/electronique/vr-headset.jpg"
              alt="Casque VR"
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="p-4">
            <h3 className="text-sm font-medium">
              Réalité Virtuelle Casque, Portable 3D Virtuel Réalité Lunettes Pour Films Et Jeux
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-gray-400 line-through text-sm">210,000GNF</span>
              <span className="text-[#048B9A] font-medium">185,000GNF</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-600 mt-1">
              <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
              In Stock
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Profitez dès maintenant avant la fin de l'offre
            </p>
          </div>
        </div>

        {/* Liste des autres produits */}
        <div className="space-y-4">
          {/* Souris gaming */}
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-gray-50">
              <Image
                src="/electronique/mouse.jpg"
                alt="Souris gaming"
                fill
                className="object-contain p-2"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium">
                Souris sans fil silencieuse à lumière RVB, souris de jeu
              </h3>
              <div className="text-[#048B9A] font-medium mt-1">
                52,000GNF
              </div>
            </div>
          </div>
        </div>
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