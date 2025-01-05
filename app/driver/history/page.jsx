'use client'
import { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaSearch } from 'react-icons/fa';

const HistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Données de démonstration
  const deliveries = [
    {
      id: 1,
      orderId: 'CMD-001',
      date: '2024-03-15',
      customer: 'Aissatou Barry',
      address: 'Kipé, Ratoma',
      amount: 250000,
      status: 'delivered',
      rating: 5,
      completedAt: '2024-03-15T15:30:00'
    },
    {
      id: 2,
      orderId: 'CMD-002',
      date: '2024-03-14',
      customer: 'Mohamed Camara',
      address: 'Matam Centre',
      amount: 180000,
      status: 'cancelled',
      rating: null,
      completedAt: '2024-03-14T16:45:00'
    },
    // ... autres livraisons
  ];

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = 
      delivery.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = !dateFilter || delivery.date === dateFilter;
    const matchesStatus = !statusFilter || delivery.status === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Historique des Livraisons</h1>

      {/* Filtres */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Recherche */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une livraison..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Filtre par date */}
          <div className="relative">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
            />
            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Filtre par statut */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm"
          >
            <option value="">Tous les statuts</option>
            <option value="delivered">Livrées</option>
            <option value="cancelled">Annulées</option>
          </select>
        </div>
      </div>

      {/* Liste des livraisons */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">N° Commande</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Adresse</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium">{delivery.orderId}</td>
                  <td className="px-4 py-4 text-gray-500">
                    {new Date(delivery.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-4">{delivery.customer}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaMapMarkerAlt className="mr-2" size={12} />
                      {delivery.address}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center text-sm">
                      <FaMoneyBillWave className="mr-2 text-[#048B9A]" size={12} />
                      {delivery.amount.toLocaleString()} GNF
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      delivery.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {delivery.status === 'delivered' ? 'Livrée' : 'Annulée'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button 
                      onClick={() => window.location.href = `/driver/deliveries/${delivery.orderId}`}
                      className="text-sm text-[#048B9A] hover:text-[#037483]"
                    >
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Message si aucune livraison */}
        {filteredDeliveries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucune livraison trouvée
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage; 