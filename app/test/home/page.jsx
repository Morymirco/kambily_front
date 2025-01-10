'use client'
import AccessoriesSection from '@/app/Components/Home/AccessoriesSection';
import Carousel from '@/app/Components/Home/Carousel';
import ClothingSection from '@/app/Components/Home/ClothingSection';
import ElectronicsSection from '@/app/Components/Home/ElectronicsSection';
import FreeDeliveryBanner from '@/app/Components/Home/FreeDeliveryBanner';
import JewelrySection from '@/app/Components/Home/JewelrySection';
import ProductGrid from '@/app/Components/Home/ProductGrid';
import QualityHeader from '@/app/Components/Home/QualityHeader';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function TestHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState('00:00:00:00');
  const [isMobile, setIsMobile] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Images du carrousel
  const carouselImages = [
    {
      id: 1,
      src: "/banne1.png",
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

  // Récupération des produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://35.85.136.46:8001/products');
        
        // Récupérer d'abord le texte brut de la réponse
        const responseText = await response.text();
        console.log('Réponse brute du serveur:', responseText);

        let data;
        try {
          // Essayer de parser le texte en JSON
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Erreur de parsing JSON:', parseError);
          throw new Error('Le serveur a renvoyé une réponse invalide');
        }

        if (!response.ok) {
          throw new Error(data.message || 'Erreur lors du chargement des produits');
        }

        console.log('Données des produits:', data);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
              src="/mobile-only.svg"
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
      <Carousel 
        images={carouselImages}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
      <QualityHeader timeLeft={timeLeft} />
      
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="w-12 h-12 border-4 border-[#048B9A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-8">
          {error}
        </div>
      ) : (
        <ProductGrid products={products} fullWidthIndex={2} />
      )}

      <FreeDeliveryBanner />
      <JewelrySection />
      <ElectronicsSection />
      <ClothingSection />
      <AccessoriesSection />
    </div>
  );
} 