'use client'
import AccessoriesSection from '@/app/Components/Home/AccessoriesSection';
import Carousel from '@/app/Components/Home/Carousel';
import ClothingSection from '@/app/Components/Home/ClothingSection';
import ElectronicsSection from '@/app/Components/Home/ElectronicsSection';
import FreeDeliveryBanner from '@/app/Components/Home/FreeDeliveryBanner';
import JewelrySection from '@/app/Components/Home/JewelrySection';
import ProductGrid from '@/app/Components/Home/ProductGrid';
import QualityHeader from '@/app/Components/Home/QualityHeader';
import { useEffect, useState } from 'react';

export default function MobileHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState('00:00:00:00');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://35.85.136.46:8001/products');
        const responseText = await response.text();
        console.log('Réponse brute du serveur:', responseText);

        let data;
        try {
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
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-[2000px] mx-auto">
        <Carousel 
          images={carouselImages}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QualityHeader timeLeft={timeLeft} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="w-12 h-12 border-4 border-[#048B9A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-8">
            {error}
          </div>
        ) : (
          <div className="py-8">
            <ProductGrid 
              products={products} 
              fullWidthIndex={2}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            />
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <FreeDeliveryBanner className="w-full" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <JewelrySection className="w-full" />
          <ElectronicsSection className="w-full" />
          <ClothingSection className="w-full" />
          <AccessoriesSection className="w-full" />
        </div>
      </div>
    </div>
  );
} 