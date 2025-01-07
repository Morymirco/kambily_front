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

  // Exemple de produits avec la structure adaptée au composant Product
  const products = [
    {
      id: 1,
      name: "Ensemble De Pyjama Short & Top À Fines Brides Imprimé Cœur",
      price: 65000,
      images: [{ image: "/products/pyjama1.jpg" }],
      category: { name: "Pyjamas" },
      description: "Ensemble pyjama confortable et élégant"
    },
    {
      id: 2, 
      name: "T-shirt graphique Floral et Slogan pour Femmes",
      price: 85000,
      images: [{ image: "/products/tshirt1.jpg" }],
      category: { name: "T-shirts" },
      description: "T-shirt tendance avec motif floral"
    },
    {
      id: 3,
      name: "Robe d'été Florale",
      price: 95000, 
      images: [{ image: "/products/robe1.jpg" }],
      category: { name: "Robes" },
      description: "Robe légère et élégante pour l'été"
    }
  ];

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
      <Carousel 
        images={carouselImages}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
      <QualityHeader timeLeft={timeLeft} />
      <ProductGrid products={products} fullWidthIndex={2} />
      <FreeDeliveryBanner />
      <JewelrySection />
      <ElectronicsSection />
      <ClothingSection />
      <AccessoriesSection />
    </div>
  );
} 