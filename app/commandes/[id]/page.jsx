'use client'
import { useAuth } from '@/app/providers/AuthProvider';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaBox, FaCheck, FaClock, FaTruck } from 'react-icons/fa';

const OrderDetailSkeleton = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12 animate-pulse">
      {/* Fil d'Ariane skeleton */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
        <span className="text-gray-300">›</span>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>

      {/* En-tête skeleton */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* Contenu principal skeleton */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Informations commande */}
        <div className="md:col-span-2 space-y-6">
          <div className="border rounded-lg p-6">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                    <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Résumé commande */}
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authFetch } = useAuth();

  useEffect(() => {
    if (!id) {
      toast.error('ID de commande non trouvé');
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await authFetch(`https://api.kambily.store/orders/${id}/`);
        if (!response.ok) throw new Error('Erreur lors de la récupération de la commande');
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Erreur:', error);
        toast.error('Erreur lors de la récupération de la commande');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <OrderDetailSkeleton />;
  }

  if (!order) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Commande non trouvée</h1>
          <Link href="/profile" className="text-[#048B9A] hover:underline">
            Retourner à mon profil
          </Link>
        </div>
      </div>
    );
  }

  const getStatusStep = (status) => {
    switch (status) {
      case 'pending': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'completed': return 4;
      default: return 1;
    }
  };

  const currentStep = getStatusStep(order.status);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12">
      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#048B9A]">Accueil</Link>
        <span>›</span>
        <Link href="/profile" className="hover:text-[#048B9A]">Mon compte</Link>
        <span>›</span>
        <span className="text-gray-900">Commande #{order.id}</span>
      </div>

      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Détails de la commande #{order.id}</h1>
        <p className="text-gray-600">
          Commandé le {new Date(order.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Suivi de commande */}
      <div className="mb-8">
        <div className="relative">
          <div className="h-1 bg-gray-200 absolute top-1/2 left-0 right-0 -translate-y-1/2"></div>
          <div 
            className="h-1 bg-[#048B9A] absolute top-1/2 left-0 -translate-y-1/2 transition-all duration-500"
            style={{ width: `${(currentStep - 1) * 33.33}%` }}
          ></div>
          
          <div className="relative flex justify-between">
            {[
              { icon: FaClock, label: 'En attente' },
              { icon: FaBox, label: 'En préparation' },
              { icon: FaTruck, label: 'En livraison' },
              { icon: FaCheck, label: 'Livrée' }
            ].map((step, index) => {
              const Icon = step.icon;
              const isActive = index + 1 <= currentStep;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-[#048B9A] text-white' : 'bg-gray-200'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-sm mt-2 ${
                    isActive ? 'text-[#048B9A]' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Produits commandés */}
        <div className="md:col-span-2 space-y-6">
          <motion.div 
            className="border rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-semibold mb-6">Produits commandés</h2>
            <div className="space-y-6">
              {order.items?.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={item.product?.images?.[0]?.image || '/placeholder.png'}
                      alt={item.product?.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product?.name}</h3>
                    <p className="text-gray-500">Quantité: {item.quantity}</p>
                    <p className="text-[#048B9A] font-medium">
                      {item.price?.toLocaleString()} GNF
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Adresse de livraison */}
          <motion.div 
            className="border rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold mb-4">Adresse de livraison</h2>
            <div className="text-gray-600">
              <p>{order.shipping_address?.addresse}</p>
              <p>{order.shipping_address?.ville}</p>
              <p>{order.shipping_address?.pays}</p>
              <p className="mt-2">Tél: {order.shipping_address?.telephone}</p>
            </div>
          </motion.div>
        </div>

        {/* Résumé de la commande */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Résumé de la commande</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span>{order.subtotal?.toLocaleString()} GNF</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frais de livraison</span>
                <span>{order.shipping_cost?.toLocaleString()} GNF</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Réduction</span>
                  <span>-{order.discount?.toLocaleString()} GNF</span>
                </div>
              )}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-lg">{order.total_price?.toLocaleString()} GNF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Méthode de paiement */}
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Méthode de paiement</h2>
            <div className="flex items-center gap-3">
              <Image
                src={`/paiements/${order.payment_method}.png`}
                alt={order.payment_method}
                width={32}
                height={32}
                className="rounded"
              />
              <span className="capitalize">{order.payment_method}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 