'use client'
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Product from '@/app/Components/Common/Product';
import { FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import Image from 'next/image';

export default function TestProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
    searchQuery: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  // Définir les plages de prix
  const priceRanges = [
    { label: 'Tous les prix', value: 'all' },
    { label: 'Moins de 50,000 GNF', value: '0-50000' },
    { label: '50,000 - 100,000 GNF', value: '50000-100000' },
    { label: '100,000 - 200,000 GNF', value: '100000-200000' },
    { label: 'Plus de 200,000 GNF', value: '200000-plus' }
  ];

  // Options de tri
  const sortOptions = [
    { label: 'Nom', value: 'name' },
    { label: 'Prix', value: 'price' },
    { label: 'Catégorie', value: 'category' }
  ];

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

  // Fonction de filtrage des produits
  const filterProducts = (products) => {
    return products.filter(product => {
      // Filtre par catégorie
      if (filters.category !== 'all' && product.category.name !== filters.category) {
        return false;
      }

      // Filtre par plage de prix
      if (filters.priceRange !== 'all') {
        const price = parseFloat(product.price);
        const [min, max] = filters.priceRange.split('-');
        if (max === 'plus') {
          if (price < parseFloat(min)) return false;
        } else {
          if (price < parseFloat(min) || price > parseFloat(max)) return false;
        }
      }

      // Filtre par recherche
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.name.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  };

  // Fonction de tri des produits
  const sortProducts = (products) => {
    return [...products].sort((a, b) => {
      let compareValue = 0;
      
      switch (filters.sortBy) {
        case 'name':
          compareValue = a.name.localeCompare(b.name);
          break;
        case 'price':
          compareValue = parseFloat(a.price) - parseFloat(b.price);
          break;
        case 'category':
          compareValue = a.category.name.localeCompare(b.category.name);
          break;
        default:
          compareValue = 0;
      }

      return filters.sortOrder === 'asc' ? compareValue : -compareValue;
    });
  };

  const filteredProducts = sortProducts(filterProducts(products));
  const categories = ['all', ...new Set(products.map(product => product.category.name))];
  
  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Fonction debounce pour la recherche
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // Générer les suggestions
  const generateSuggestions = useCallback(
    debounce((query) => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      const queryLower = query.toLowerCase();
      const suggestionResults = products
        .filter(product => 
          product.name.toLowerCase().includes(queryLower) ||
          product.description.toLowerCase().includes(queryLower) ||
          product.category.name.toLowerCase().includes(queryLower)
        )
        .slice(0, 5); // Limiter à 5 suggestions

      setSuggestions(suggestionResults);
    }, 300),
    [products]
  );

  // Gérer le clic en dehors des suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12">
      {/* En-tête et filtres */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Nos Produits</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483]"
          >
            <FaFilter /> Filtres
          </button>
        </div>

        {/* Panneau de filtres */}
        <motion.div
          initial={false}
          animate={{ height: showFilters ? 'auto' : 0 }}
          className="overflow-hidden"
        >
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6 space-y-4">
            {/* Barre de recherche avec suggestions */}
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={filters.searchQuery}
                onChange={(e) => {
                  setFilters({ ...filters, searchQuery: e.target.value });
                  generateSuggestions(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />

              {/* Liste des suggestions */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-80 overflow-auto"
                  >
                    {suggestions.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setFilters({ ...filters, searchQuery: product.name });
                          setShowSuggestions(false);
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      >
                        {/* Miniature du produit */}
                        <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={product.images[0]?.image || '/placeholder.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Informations du produit */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="capitalize">{product.category.name}</span>
                            <span>•</span>
                            <span>
                              {parseFloat(product.price).toLocaleString('fr-FR', {
                                style: 'currency',
                                currency: 'GNF'
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Indicateur de correspondance */}
                        <div className="text-sm text-[#048B9A]">
                          {product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ? (
                            'Nom'
                          ) : product.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ? (
                            'Description'
                          ) : (
                            'Catégorie'
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Filtre par catégorie */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-[#048B9A] focus:border-[#048B9A]"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.filter(cat => cat !== 'all').map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtre par plage de prix */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plage de prix
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-[#048B9A] focus:border-[#048B9A]"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Options de tri */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trier par
                </label>
                <div className="flex gap-2">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-[#048B9A] focus:border-[#048B9A]"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setFilters({
                      ...filters,
                      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'
                    })}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {filters.sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tags de filtres actifs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.category !== 'all' && (
            <div className="flex items-center gap-2 px-3 py-1 bg-[#048B9A] text-white rounded-full text-sm">
              Catégorie: {filters.category}
              <button
                onClick={() => setFilters({ ...filters, category: 'all' })}
                className="hover:text-gray-200"
              >
                ×
              </button>
            </div>
          )}
          {filters.priceRange !== 'all' && (
            <div className="flex items-center gap-2 px-3 py-1 bg-[#048B9A] text-white rounded-full text-sm">
              Prix: {priceRanges.find(r => r.value === filters.priceRange)?.label}
              <button
                onClick={() => setFilters({ ...filters, priceRange: 'all' })}
                className="hover:text-gray-200"
              >
                ×
              </button>
            </div>
          )}
          {filters.searchQuery && (
            <div className="flex items-center gap-2 px-3 py-1 bg-[#048B9A] text-white rounded-full text-sm">
              Recherche: {filters.searchQuery}
              <button
                onClick={() => setFilters({ ...filters, searchQuery: '' })}
                className="hover:text-gray-200"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Résultats et pagination */}
      <div className="mb-4 text-gray-600">
        {filteredProducts.length} produit(s) trouvé(s)
      </div>

      {/* Liste des produits */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-[#048B9A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
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
        </>
      )}

      {/* Message si aucun produit */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun produit ne correspond à vos critères</p>
        </div>
      )}
    </div>
  );
} 