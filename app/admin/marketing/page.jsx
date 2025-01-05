'use client'
import { useState } from 'react';
import { FaBell, FaGift, FaAd, FaTrash } from 'react-icons/fa';

const MarketingPage = () => {
  // États pour les différentes sections
  const [activeTab, setActiveTab] = useState('promos');
  const [newPromo, setNewPromo] = useState({
    code: '',
    discount: '',
    startDate: '',
    endDate: '',
    type: 'percentage', // ou 'fixed'
    minPurchase: '',
    maxUses: ''
  });
  const [newAd, setNewAd] = useState({
    title: '',
    description: '',
    image: null,
    link: '',
    startDate: '',
    endDate: '',
    position: 'banner' // ou 'popup', 'sidebar'
  });

  // Exemple de données
  const promos = [
    { id: 1, code: 'SUMMER23', discount: '20%', status: 'active', uses: 45 },
    { id: 2, code: 'WELCOME', discount: '10€', status: 'expired', uses: 120 }
  ];

  const ads = [
    { id: 1, title: 'Soldes d\'été', status: 'active', views: 1200 },
    { id: 2, title: 'Black Friday', status: 'scheduled', views: 0 }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Marketing</h1>

      {/* Onglets */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('promos')}
          className={`pb-4 px-4 font-medium transition-colors relative ${
            activeTab === 'promos' 
              ? 'text-[#048B9A]' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FaGift />
            Codes Promo
          </div>
          {activeTab === 'promos' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#048B9A]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('ads')}
          className={`pb-4 px-4 font-medium transition-colors relative ${
            activeTab === 'ads' 
              ? 'text-[#048B9A]' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FaAd />
            Publicités
          </div>
          {activeTab === 'ads' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#048B9A]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`pb-4 px-4 font-medium transition-colors relative ${
            activeTab === 'notifications' 
              ? 'text-[#048B9A]' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FaBell />
            Notifications
          </div>
          {activeTab === 'notifications' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#048B9A]" />
          )}
        </button>
      </div>

      {/* Contenu des onglets */}
      <div className="mt-6">
        {/* Codes Promo */}
        {activeTab === 'promos' && (
          <div className="space-y-6">
            {/* Formulaire d'ajout */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Ajouter un code promo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                    placeholder="ex: SUMMER23"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Réduction
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                      placeholder="Montant"
                    />
                    <select className="px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]">
                      <option value="percentage">%</option>
                      <option value="fixed">€</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de début
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de fin
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  />
                </div>
              </div>
              <button className="mt-4 bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483]">
                Créer le code promo
              </button>
            </div>

            {/* Liste des codes promo */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Réduction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilisations
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {promos.map((promo) => (
                    <tr key={promo.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">{promo.code}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {promo.discount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          promo.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {promo.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {promo.uses}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-red-600 hover:text-red-900">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Publicités */}
        {activeTab === 'ads' && (
          <div className="space-y-6">
            {/* Formulaire d'ajout de publicité */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Ajouter une publicité</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]">
                    <option value="banner">Bannière</option>
                    <option value="popup">Popup</option>
                    <option value="sidebar">Sidebar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lien
                  </label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                    placeholder="https://"
                  />
                </div>
              </div>
              <button className="mt-4 bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483]">
                Créer la publicité
              </button>
            </div>

            {/* Liste des publicités */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Titre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vues
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ads.map((ad) => (
                    <tr key={ad.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">{ad.title}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ad.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {ad.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ad.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-red-600 hover:text-red-900">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {/* Configuration Firebase */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Configuration Firebase</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Messaging Sender ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  />
                </div>
              </div>
              <button className="mt-4 bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483]">
                Sauvegarder la configuration
              </button>
            </div>

            {/* Envoi de notification */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Envoyer une notification</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lien (optionnel)
                  </label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                    placeholder="https://"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cible
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]">
                    <option value="all">Tous les utilisateurs</option>
                    <option value="subscribers">Abonnés newsletter</option>
                    <option value="customers">Clients existants</option>
                  </select>
                </div>
              </div>
              <button className="mt-4 bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483]">
                Envoyer la notification
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingPage; 