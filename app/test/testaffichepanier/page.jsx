'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { FaArrowLeft, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

export default function TestAffichePanier() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  // Charger le panier au chargement de la page
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/test/login');
        return;
      }

      const response = await fetch('https://api.kambily.store/carts/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors du chargement du panier');
      }

      const data = await response.json();
      console.log(data);
      
      console.log(data);
      setCartItems(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating(true);
    try {
      const token = localStorage.getItem('access_token');
      
      // Vérifier si itemId est défini
      if (!itemId) {
        console.log('Item ID:', itemId);
        throw new Error('ID de l\'article non défini');
      }

      console.log('Mise à jour du panier:', { itemId, newQuantity });

      const response = await fetch(`https://api.kambily.store/carts/update/${itemId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          quantity: newQuantity,
          product_id: itemId // Ajouter l'ID du produit
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la quantité');
      }

      const data = await response.json();
      console.log('Réponse mise à jour:', data);

      // Mettre à jour l'état local avec les nouvelles données
      setCartItems(prev => prev.map(item => 
        item.product.id === itemId ? { ...item, quantity: newQuantity } : item
      ));

      toast.success('Quantité mise à jour');
    } catch (err) {
      console.error('Erreur de mise à jour:', err);
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (itemId) => {
    setDeletingItemId(itemId);
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`https://api.kambily.store/carts/remove/${itemId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      // Trouver l'article supprimé pour obtenir ses informations
      const removedItem = cartItems.find(item => item.product.id === itemId);
      if (removedItem) {
        toast.custom((t) => (
          <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-[300px] flex items-center gap-4">
              {/* Image du produit */}
              <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src={removedItem.product.images?.[0]?.image || '/placeholder.png'}
                  alt={removedItem.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Contenu */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 font-medium text-sm text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Article supprimé
                </div>
                <p className="text-gray-600 text-sm mt-1 truncate">
                  {removedItem.product.name}
                </p>
              </div>
            </div>
          </div>
        ), {
          duration: 3000,
        });
      }

      // Actualiser le panier complet après la suppression
      await fetchCart();

    } catch (err) {
      toast.error(err.message || 'Erreur lors de la suppression', {
        duration: 3000,
        position: 'bottom-right',
        style: {
          background: '#fff',
          color: '#ef4444',
          border: '1px solid #fecaca',
          padding: '16px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      });
    } finally {
      setDeletingItemId(null);
    }
  };

  // Calculer le total
  const total = cartItems.reduce((sum, item) => {
    return sum + (item.product.regular_price * item.quantity);
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#048B9A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Toaster position="bottom-right" />
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-[#048B9A]"
          >
            <FaArrowLeft />
            <span>Retour</span>
          </button>
          <h1 className="text-2xl font-bold">Mon Panier</h1>
        </div>

        {error ? (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 mb-6">Votre panier est vide</p>
            <Link 
              href="/test/testafficheproduct"
              className="inline-block px-6 py-3 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483]"
            >
              Continuer mes achats
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Liste des articles */}
            <div className="bg-white rounded-lg shadow-sm divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 flex gap-6">
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.product.images?.[0]?.image || '/placeholder.png'}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  {/* Informations */}
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.product.short_description}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      {/* Quantité */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={updating || item.quantity <= 1}
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={updating}
                          className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Prix et suppression */}
                      <div className="flex items-center gap-4">
                        <span className="font-medium">
                          {(item.product.regular_price * item.quantity).toLocaleString()} GNF
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          disabled={deletingItemId === item.product.id}
                          className={`text-red-500 hover:text-red-600 disabled:opacity-50 w-6 h-6 flex items-center justify-center`}
                        >
                          {deletingItemId === item.product.id ? (
                            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <FaTrash />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Résumé */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold">{total.toLocaleString()} GNF</span>
              </div>

              <button
                onClick={() => router.push('/test/checkout')}
                className="w-full bg-[#048B9A] text-white py-3 rounded-lg hover:bg-[#037483]"
              >
                Passer la commande
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 