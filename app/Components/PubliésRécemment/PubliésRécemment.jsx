'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import Produit from '../Produit';
import ProductCard from '../Common/ProductCard';
import Product from '../Common/Product';

const categories = ['Tout', 'Alimentation', 'Mode & Accessoires', 'Voitures'];

const PubliésRécemment = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  
  const products = [
    {
      id: 1,
      image: "/categories/fashion.webp",
      title: "Toyota Venza année 2013",
      price: "8 200 000",
      category: "Voitures",
      vendeur: "Sirius",
      inStock: true
    },
    {
      id: 2,
      image: "/categories/smartphone.webp",
      title: "Farine infantile",
      subtitle: "Aliments pour bébés et enfants",
      price: "1 000",
      oldPrice: "2 000",
      category: "Alimentation",
      vendeur: "Saveur du sahel",
      inStock: true
    },
    {
      id: 3,
      image: "/categories/Redmi.webp",
      title: "Toyota Venza année 2013",
      price: "8 200 000",
      category: "Voitures",
      vendeur: "Sirius",
      inStock: true
    },
    {
      id: 4,
      image: "/categories/electronic.webp",
      title: "Toyota Venza année 2013",
      price: "8 200 000",
      category: "Voitures",
      vendeur: "Sirius",
      inStock: true
    }
  ];

  return (
    <div className="px-2 py-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 rounded-full bg-[#048B9A] flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-4 h-4 text-white"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
          </svg>
        </div>
        <h2 className="text-[#048B9A] text-xl font-medium">Publiés récemment..</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-[#048B9A] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <Product
            key={product.id}
            {...product}
            vendeur={product.vendeur}
            buttonText={product.category === "Alimentation" ? "Choix des options" : "Ajouter au panier"}
          />
        ))}
      </div>
    </div>
  );
};

export default PubliésRécemment; 