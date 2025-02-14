'use client';
import { useCart } from '@/app/providers/CartProvider'; // Importer le hook useCart
import Image from 'next/image';
import Link from 'next/link';

const TestPanierProvider = () => {
  const { cartItems, cartLoading, clearCart } = useCart(); // Ajout de clearCart pour vider le panier

  if (cartLoading) {
    return <p className="text-center text-gray-600">Chargement des articles du panier...</p>;
  }

  if (!cartItems || cartItems.length === 0) {
    return <p className="text-center text-gray-600">Votre panier est vide.</p>;
  }

  // Calcul du prix total
  const totalPrice = cartItems.reduce((total, item) => total + item.product.regular_price * item.quantity, 0);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-16 py-3 sm:py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Test du Panier</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.product.id} className="bg-white rounded-lg shadow-sm p-3 sm:p-4 flex items-center gap-4">
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
              <Image
                src={item.product.images?.[0]?.image || '/placeholder.png'}
                alt={item.product.name || 'Image du produit'}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm sm:text-base truncate">{item.product.name}</h3>
              <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
              <p className="text-sm font-medium text-[#048B9A]">
                {item.product.regular_price.toLocaleString()} GNF
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total du panier */}
      <div className="mt-6 text-lg font-semibold">
        Total : <span className="text-[#048B9A]">{totalPrice.toLocaleString()} GNF</span>
      </div>

      {/* Boutons */}
      <div className="mt-4 flex gap-3">
        <Link href="/" className="bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483] transition-colors">
          Retour à l'accueil
        </Link>
        {clearCart && (
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Vider le panier
          </button>
        )}
      </div>
    </div>
  );
};

export default TestPanierProvider;
