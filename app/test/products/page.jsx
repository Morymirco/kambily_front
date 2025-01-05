'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import Product from '@/app/Components/Common/Product';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TestProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.43.134:8000/products/index');
      if (!response.ok) throw new Error('Erreur lors du chargement des produits');
      const data = await response.json();
      console.log('Données des produits:', data);
      setProducts(data);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter(product => 
      selectedCategory === 'all' || product.category.name === selectedCategory
    )
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const categories = ['all', ...new Set(products.map(product => product.category.name))];
  
  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Fonction pour créer un slug à partir du nom
  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[éèê]/g, 'e')
      .replace(/[àâ]/g, 'a')
      .replace(/[ùû]/g, 'u')
      .replace(/[ôö]/g, 'o')
      .replace(/[ïî]/g, 'i')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleProductClick = (product) => {
    const slug = createSlug(product.name);
    router.push(`/test/products/${product.id}-${slug}`);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12">
      {/* En-tête et filtres */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Nos Produits</h1>
        
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[#048B9A] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Affichage des produits */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-[#048B9A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product)}>
              <Product
                image={product.images[0]?.image}
                gallery={product.images.map(img => img.image)}
                title={product.name}
                price={product.price}
                category={product.category.name}
                inStock={true}
                description={product.description}
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-lg ${
                currentPage === index + 1
                  ? 'bg-[#048B9A] text-white'
                  : 'border hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Message si aucun produit */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun produit ne correspond à votre recherche</p>
        </div>
      )}
    </div>
  );
} 