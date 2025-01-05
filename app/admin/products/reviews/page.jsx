'use client'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck, FaSearch, FaStar, FaTrash } from 'react-icons/fa';

const ReviewsPage = () => {
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    rating: '',
    status: '',
    dateRange: '',
    startDate: '',
    endDate: ''
  });
  
  const reviews = [
    {
      id: 1,
      author: 'Marie Camara',
      product: {
        id: 1,
        name: 'Ensemble De Pyjama',
        image: '/pyjama.png'
      },
      rating: 5,
      content: 'Très satisfaite de mon achat, la qualité est au rendez-vous !',
      date: '2024-02-28',
      status: 'pending' // pending, approved, spam
    },
    // ... autres avis
  ];

  const handleApprove = (reviewId) => {
    toast.success('Avis approuvé');
  };

  const handleDelete = (reviewId) => {
    if (window.confirm('Supprimer cet avis ?')) {
      toast.success('Avis supprimé');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Avis clients</h1>
          {selectedReviews.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {selectedReviews.length} avis sélectionné(s)
            </p>
          )}
        </div>
        {selectedReviews.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.success(`${selectedReviews.length} avis approuvé(s)`);
                setSelectedReviews([]);
              }}
              className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 hover:bg-green-700"
            >
              <FaCheck size={12} />
              Approuver la sélection
            </button>
            <button
              onClick={handleBulkDelete}
              className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 hover:bg-red-700"
            >
              <FaTrash size={12} />
              Supprimer la sélection
            </button>
          </div>
        )}
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        {/* Première ligne : Recherche et filtres principaux */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Rechercher dans les avis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          <select
            value={filters.rating}
            onChange={(e) => setFilters({...filters, rating: e.target.value})}
            className="border rounded-lg px-3 py-2 text-sm min-w-[150px]"
          >
            <option value="">Toutes les notes</option>
            {[5, 4, 3, 2, 1].map(rating => (
              <option key={rating} value={rating}>{rating} étoiles</option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="border rounded-lg px-3 py-2 text-sm min-w-[150px]"
          >
            <option value="">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="approved">Approuvé</option>
            <option value="spam">Spam</option>
          </select>
        </div>

        {/* Deuxième ligne : Filtres de date */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({...filters, startDate: e.target.value})}
              className="border rounded-lg px-3 py-2 text-sm"
            />
            <span className="text-gray-500">à</span>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({...filters, endDate: e.target.value})}
              className="border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <button
            onClick={() => setFilters({
              rating: '',
              status: '',
              dateRange: '',
              startDate: '',
              endDate: ''
            })}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>

      {/* Table des avis */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auteur</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Note</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avis</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr key={review.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="font-medium">{review.author}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <img
                      src={review.product.image}
                      alt={review.product.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <span className="ml-2 text-sm">{review.product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? 'text-yellow-400' : 'text-gray-200'}
                        size={14}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{review.content}</p>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-right space-x-2">
                  {review.status === 'pending' && (
                    <button
                      onClick={() => handleApprove(review.id)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaCheck size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash size={14} />
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

export default ReviewsPage; 