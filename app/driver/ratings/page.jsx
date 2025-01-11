'use client'
import { useState } from 'react';
import { FaCalendarAlt, FaComment, FaStar } from 'react-icons/fa';

const RatingsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const ratings = {
    average: 4.8,
    total: 145,
    distribution: {
      5: 85,
      4: 12,
      3: 2,
      2: 1,
      1: 0
    },
    recent: [
      {
        id: 1,
        orderId: 'CMD-001',
        customer: 'Aissatou Barry',
        date: '2024-03-15',
        rating: 5,
        comment: 'Excellent service, très ponctuel et professionnel'
      },
      {
        id: 2,
        orderId: 'CMD-002',
        customer: 'Mohamed Camara',
        date: '2024-03-14',
        rating: 4,
        comment: 'Bonne livraison, RAS'
      },
      // ... autres évaluations
    ]
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Mes Évaluations</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score global */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#048B9A] mb-2">
              {ratings.average}
            </div>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={star <= ratings.average 
                    ? "text-yellow-400" 
                    : "text-gray-200"
                  }
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">
              Sur {ratings.total} évaluations
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {Object.entries(ratings.distribution).reverse().map(([rating, percent]) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="flex items-center gap-1 w-8">
                  <span className="text-sm">{rating}</span>
                  <FaStar className="text-yellow-400" size={12} />
                </div>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-12">{percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Liste des évaluations récentes */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Évaluations récentes</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {ratings.recent.map((review) => (
              <div key={review.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{review.customer}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <FaCalendarAlt size={12} />
                      {new Date(review.date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{review.rating}</span>
                    <FaStar className="text-yellow-400" />
                  </div>
                </div>
                {review.comment && (
                  <div className="mt-2 text-sm text-gray-600 flex items-start gap-2">
                    <FaComment className="text-gray-400 mt-1" size={12} />
                    <p>{review.comment}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingsPage; 