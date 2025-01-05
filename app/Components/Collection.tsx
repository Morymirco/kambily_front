import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaEye, FaShoppingCart } from 'react-icons/fa';

// Définition des interfaces
interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  inStock: boolean;
}

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  inStock: boolean;
}

interface CollectionProps {
  products: Product[];
}

// Composant ProductCard avec typage
const ProductCard = ({ image, title, price, inStock }: ProductCardProps) => {
  const [showToast, setShowToast] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden relative">
      {/* Image Container */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Boutons flottants */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
            <FaEye className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4">
        <h3 className="text-sm text-gray-800 mb-2 line-clamp-2 group-hover:text-[#048B9A] transition-colors">
          {title}
        </h3>
        <p className="text-lg font-bold text-gray-900 mb-2">{price}GNF</p>
        
        {inStock && (
          <div className="flex items-center text-[#048B9A] mb-3">
            <svg 
              className="w-4 h-4 mr-1" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 8l-2-2H5L3 8h18z" />
              <path d="M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8" />
              <path d="M12 12v6" />
              <path d="M12 12l4-4" />
              <path d="M12 12l-4-4" />
            </svg>
            <span className="text-sm">In Stock</span>
          </div>
        )}

        {/* Bouton Ajouter au panier */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full bg-[#048B9A] text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {isAddingToCart ? (
            <>
              <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              <span className="ml-2">Ajout...</span>
            </>
          ) : (
            <>
              <FaShoppingCart className="w-3.5 h-3.5" />
              <span className="text-xs">Ajouter au panier</span>
            </>
          )}
        </button>
      </div>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
          <div className="bg-white border rounded-lg shadow-lg p-4 w-[300px] flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 text-green-600 font-medium text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ajouté au panier
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-1 truncate">{title}</p>
              <Link href="/panier">
                <button className="mt-2 text-[#048B9A] text-sm font-medium hover:text-[#037383] transition-colors">
                  Voir le panier
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant Collection avec typage
const Collection = ({ products }: CollectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
          inStock={product.inStock}
        />
      ))}
    </div>
  );
};

export default Collection;
