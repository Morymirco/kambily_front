'use client'
import { useState } from 'react';
import { FaMapMarkerAlt, FaMoneyBillWave, FaSearch } from 'react-icons/fa';

const DeliveriesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    date: ''
  });

  const deliveries = [
    {
      id: 1,
      orderId: 'CMD-001',
      date: '2024-03-15',
      customer: 'Aissatou Barry',
      address: 'Kipé, Ratoma',
      amount: 250000,
      status: 'delivered',
      rating: 5
    },
    {
      id: 2,
      orderId: 'CMD-002',
      date: '2024-03-15',
      customer: 'Mohamed Camara',
      address: 'Matam Centre',
      amount: 180000,
      status: 'en_cours',
      rating: null
    },
    // ... autres livraisons
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Mes Livraisons</h1>

      {/* Filtres et recherche */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Rechercher une livraison..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="border rounded-lg px-3 py-2 text-sm min-w-[150px]"
          >
            <option value="">Tous les statuts</option>
            <option value="en_cours">En cours</option>
            <option value="delivered">Livrée</option>
            <option value="cancelled">Annulée</option>
          </select>

          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({...filters, date: e.target.value})}
            className="border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Liste des livraisons */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
            {deliveries.map((delivery) => (
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
                      : delivery.status === 'en_cours'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {delivery.status === 'delivered' 
                      ? 'Livrée' 
                      : delivery.status === 'en_cours'
                      ? 'En cours'
                      : 'Annulée'}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <button className="text-sm text-[#048B9A] hover:text-[#037483]">
                    Voir détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveriesPage; 