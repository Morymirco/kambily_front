'use client'
import Product from '@/app/Components/Common/Product';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaFilter, FaSearch, FaSortAmountDown } from 'react-icons/fa';

export default function TestAfficheProduct() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://35.85.136.46:8001/products/', {
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
        
        // Vérifier si data est un tableau, sinon utiliser data.results si disponible
        const productsArray = Array.isArray(data) ? data : data.results || [];
        
        const transformedProducts = productsArray.map(product => ({
          id: product.id,
          title: product.name,
          image: product.images?.[0]?.image || '/tshirt.png',
          gallery: product.images?.slice(1)?.map(img => img.image) || [],
          price: product.regular_price,
          oldPrice: product.promo_price !== product.regular_price ? product.regular_price : null,
          inStock: product.stock_status,
          category: product.categories?.[0]?.name || 'Non catégorisé',
          description: product.short_description,
          quantity: product.quantity
        }));

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

  // Filtrer les produits (s'assurer que products est toujours un tableau)
  const filteredProducts = Array.isArray(products) ? products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  }) : [];

  const handleProductClick = (productId) => {
    router.push(`/test/testafficheproduct/${productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 border-4 border-[#048B9A] border-t-transparent rounded-full animate-spin"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483] transition-colors"
          >
            Réessayer
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barre de recherche et filtres */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaFilter className="text-[#048B9A]" />
                <span>Filtres</span>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaSortAmountDown className="text-[#048B9A]" />
                <span>Trier</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grille de produits */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onClick={() => handleProductClick(product.id)}
              className="cursor-pointer"
            >
              <Product
                image={product.image}
                gallery={product.gallery}
                title={product.title}
                price={product.price}
                oldPrice={product.oldPrice}
                inStock={product.inStock}
                category={product.category}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              Aucun produit ne correspond à votre recherche
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
} 