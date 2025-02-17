'use client'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Product from '../Common/Product';
import Skeleton from './../../Common/Skeleton';
import { HOST_IP, PORT, PROTOCOL_HTTP } from './../../constants';

const PubliésRécemment = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/categories/nested/`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des catégories');
        }
        const data = await response.json();
        console.log('les categories',data);
        
        const formattedCategories = data.map(category => ({
          id: category.id,
          image: category.image,
          title: category.name,
          count: category.products.length,
          products: category.products.map(product => ({
            id: product.id,
            image: product.images?.[0]?.image || '/placeholder.png',
            gallery: product.images?.slice(1)?.map(img => img.image) || [],
            title: product.name,
            price: parseFloat(product.regular_price),
            oldPrice: product.promo_price !== product.regular_price ? parseFloat(product.regular_price) : null,
            inStock: product.etat_stock === 'En Stock' || true,
            category: category.name,
            onAddToCart: () => console.log(`Add ${product.name} to cart`),
            isAddingToCart: false
          }))
        }));

        setCategories(formattedCategories);
        setProducts(data.flatMap(category => category.products)); // Récupérer tous les produits
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        toast.error(error.message || 'Une erreur est survenue lors de la récupération des catégories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

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
        <motion.button
          key="Tout"
          onClick={() => setSelectedCategory('Tout')}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            selectedCategory === 'Tout'
              ? 'bg-[#1B230A] text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Tout
        </motion.button>

        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.title)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category.title
                ? 'bg-[#1B230A] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.title} ({category.count})
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categories
          .filter(category => selectedCategory === 'Tout' || category.title === selectedCategory)
          .flatMap(category => category.products)
          .map((product) => (
            <Product
              key={product.id}
              {...product}
            />
          ))}
        
        {categories
          .filter(category => selectedCategory === 'Tout' || category.title === selectedCategory)
          .flatMap(category => category.products)
          .length === 0 && (
            <div className="col-span-2 text-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mx-auto mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m4 0h-1v4h-1m-1-4V8a4 4 0 00-8 0v8a4 4 0 008 0v-4z"
                />
              </svg>
              <p>Aucun produit trouvé dans cette catégorie.</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default PubliésRécemment; 