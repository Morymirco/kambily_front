'use client'
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaClock, FaMoneyBillWave, FaMotorcycle, FaStar } from 'react-icons/fa';
import DeliveryConfirmationModal from './components/DeliveryConfirmationModal';

const DriverDashboard = () => {
  const [pendingDeliveries, setPendingDeliveries] = useState([
    {
      id: 1,
      orderId: 'CMD-003',
      customer: 'Mariama Bah',
      address: 'Lambandji, Ratoma',
      amount: 180000,
      items: 2,
      assignedAt: new Date(),
      estimatedDistance: '3.2 km'
    },
    {
      id: 2,
      orderId: 'CMD-004',
      customer: 'Alpha Barry',
      address: 'Nongo, Ratoma',
      amount: 150000,
      items: 1,
      assignedAt: new Date(),
      estimatedDistance: '2.5 km'
    }
  ]);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleAcceptDelivery = (deliveryId) => {
    setPendingDeliveries(prev => prev.filter(d => d.id !== deliveryId));
    toast.success('Livraison acceptée');
  };

  const handleRejectDelivery = (deliveryId) => {
    setPendingDeliveries(prev => prev.filter(d => d.id !== deliveryId));
    toast.error('Livraison refusée');
  };

  const handleDeliveryConfirm = (orderId, proofs) => {
    toast.success('Livraison confirmée avec succès');
  };

  const stats = {
    deliveriesCount: 145,
    todayDeliveries: 5,
    rating: 4.8,
    earnings: 2900000,
    onTimeRate: 98
  };

  const currentDelivery = {
    orderId: 'CMD-001',
    customer: 'Aissatou Barry',
    address: 'Kipé, Ratoma',
    amount: 250000,
    items: 3,
    status: 'en_cours'
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Tableau de bord</h1>

      {/* Nouvelles assignations */}
      {pendingDeliveries.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-medium mb-4">Nouvelles assignations</h2>
          <div className="space-y-4">
            {pendingDeliveries.map((delivery) => (
              <div 
                key={delivery.id}
                className="border rounded-lg p-4 space-y-4"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">N° Commande</div>
                    <div className="font-medium">{delivery.orderId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Client</div>
                    <div className="font-medium">{delivery.customer}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Adresse</div>
                    <div className="font-medium">{delivery.address}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Montant</div>
                    <div className="font-medium">{delivery.amount.toLocaleString()} GNF</div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div>
                      <FaMotorcycle className="inline mr-1" />
                      {delivery.estimatedDistance}
                    </div>
                    <div>
                      <FaClock className="inline mr-1" />
                      {new Date(delivery.assignedAt).toLocaleTimeString('fr-FR')}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleRejectDelivery(delivery.id)}
                      className="px-4 py-2 text-sm border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
                    >
                      Refuser
                    </button>
                    <button
                      onClick={() => handleAcceptDelivery(delivery.id)}
                      className="px-4 py-2 text-sm bg-[#048B9A] text-white rounded-lg hover:bg-[#037483]"
                    >
                      Accepter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <FaMotorcycle className="text-[#048B9A]" />
            <span>Total livraisons</span>
          </div>
          <div className="text-2xl font-semibold">{stats.deliveriesCount}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <FaStar className="text-yellow-400" />
            <span>Note moyenne</span>
          </div>
          <div className="text-2xl font-semibold">{stats.rating}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <FaClock className="text-green-600" />
            <span>À l'heure</span>
          </div>
          <div className="text-2xl font-semibold text-green-600">{stats.onTimeRate}%</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <FaMoneyBillWave className="text-[#048B9A]" />
            <span>Gains totaux</span>
          </div>
          <div className="text-2xl font-semibold">{stats.earnings.toLocaleString()} GNF</div>
        </div>
      </div>

      {/* Livraison en cours */}
      {currentDelivery && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-medium mb-4">Livraison en cours</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500">N° Commande</div>
              <div className="font-medium">{currentDelivery.orderId}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Client</div>
              <div className="font-medium">{currentDelivery.customer}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Adresse</div>
              <div className="font-medium">{currentDelivery.address}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Montant</div>
              <div className="font-medium">{currentDelivery.amount.toLocaleString()} GNF</div>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <Link 
              href={`/driver/deliveries/${currentDelivery.orderId}`}
              className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
            >
              Voir les détails
            </Link>
            <button 
              onClick={() => setIsConfirmationModalOpen(true)}
              className="px-4 py-2 text-sm bg-[#048B9A] text-white rounded-lg hover:bg-[#037483]"
            >
              Marquer comme livrée
            </button>
          </div>
        </div>
      )}

      {/* Modal de confirmation */}
      <DeliveryConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        delivery={currentDelivery}
        onConfirm={handleDeliveryConfirm}
      />

      {/* Autres sections à ajouter selon les besoins */}
    </div>
  );
};

export default DriverDashboard; 