'use client'
import Product from '@/app/Components/Common/Product';
import Carousel from '@/app/Components/Home/Carousel';
import ElectronicsSection from '@/app/Components/Home/ElectronicsSection';
import FreeDeliveryBanner from '@/app/Components/Home/FreeDeliveryBanner';
import JewelrySection from '@/app/Components/Home/JewelrySection';
import QualityHeader from '@/app/Components/Home/QualityHeader';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

const ProductSkeleton = () => (
  <div className="border rounded-xl overflow-hidden bg-white animate-pulse">
    <div className="h-[220px] bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-8 bg-gray-200 rounded w-full" />
    </div>
  </div>
);

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/slide/Redmi.webp',
    '/slide/Ahlame-Bouquet.webp',
    '/slide/Sandal-Ships.webp'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative bg-[#048B9A] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold mb-2">PRODUIT EN VEDETTE</h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-2"
          >
            Bouquet de voiles
          </motion.h2>
          <p className="text-lg opacity-90">Disponible en : 3,5,6 et 8 voiles</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-xl font-semibold">+ 15 000</span>
            <span>Fcfa</span>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <Link href="/produit/bouquet-voiles">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#048B9A] px-6 py-2 rounded-full font-medium"
            >
              Voir l'article
            </motion.button>
          </Link>
        </div>

        <div className="relative w-full max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevImage}
              className="text-white text-3xl hover:text-opacity-70 transition-colors"
            >
              ‹
            </motion.button>
            
            <div className="relative w-full aspect-square max-w-md">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={images[currentImageIndex]}
                  alt="Bouquet de voiles"
                  fill
                  className="object-cover rounded-lg"
                />
              </motion.div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextImage}
              className="text-white text-3xl hover:text-opacity-70 transition-colors"
            >
              ›
            </motion.button>
          </div>
          
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  i === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentImageIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/vendor-logo.jpg"
              alt="Vendor"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <span className="font-medium">Ahlame Shop</span>
        </div>
      </div>
    </div>
  );
};

export default function MobileHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState('00:00:00:00');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carouselImages = [
    {
      id: 1,
      src: "/banne1.avif",
      alt: "Nouvelle collection été",
      link: "/collections/ete"
    },
    {
      id: 2,
      src: "/banne2.svg",
      alt: "Promotions spéciales",
      link: "/promotions"
    },
    {
      id: 3,
      src: "/banne3.svg",
      alt: "Collection tendance",
      link: "/tendances"
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.kambily.store/products/', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des produits');
        }

        const data = await response.json();
        console.log('Données brutes:', data);
        
        const productsArray = Array.isArray(data.products) ? data.products : data.results || [];
        
        const transformedProducts = productsArray
          .map(product => ({
            id: product.id,
            title: product.name,
            image: product.images?.[0]?.image || '/tshirt.png',
            gallery: product.images?.slice(1)?.map(img => img.image) || [],
            price: product.regular_price,
            oldPrice: product.promo_price !== product.regular_price ? product.regular_price : null,
            inStock: product.etat_stock === 'En stock',
            category: product.categories?.[0]?.name || 'Non catégorisé'
          }))
          .slice(0, 4);

        console.log('Produits transformés:', transformedProducts);
        setProducts(transformedProducts);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message);
        toast.error('Erreur lors du chargement des produits');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <HeroSection /> */}
      
      <div className="w-full max-w-[2000px] mx-auto">
        <Carousel 
          images={carouselImages}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
      </div>

      <div className="max-w-7xl mx-auto ">
        <QualityHeader timeLeft={timeLeft} />
      </div>
      
      <div className="max-w-7xl mx-auto ">
        {loading ? (
          <div className="py-8 grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-8">
            {error}
          </div>
        ) : (
          <div className="py-2 grid grid-cols-2 gap-4">
            {products.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                image={product.image}
                gallery={product.gallery}
                title={product.title}
                price={product.price}
                oldPrice={product.oldPrice}
                inStock={product.inStock}
                category={product.category}
              />
            ))}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto  space-y-8">
        <FreeDeliveryBanner className="w-full" />
        
        <div className="grid grid-cols-1 gap-8 mb-4 py-3">
          <JewelrySection className="w-full" />
          <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-4">
          <div className="text-[#048B9A]">
            <Image src="/icons/paiement.png" alt="Quality" width={60} height={60} />
          </div>
          <div>
            <h2 className="text-sm font-medium">Paiement Sécurisé</h2>
            <p className="text-xs text-gray-400 leading-tight">
              Nous nous engageons à vous offrir une expérience d'achat en ligne sûre et fiable.
            </p>
          </div>
        </div>
      </div>

          <ElectronicsSection className="w-full" />
          {/* <ClothingSection className="w-full" />
          <AccessoriesSection className="w-full" /> */}
        </div>
      </div>
    </div>
  );
} 