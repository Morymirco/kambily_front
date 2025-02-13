'use client';
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Image from "next/image";
import { FaStar, FaUser } from "react-icons/fa";

export const ReviewsTab = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun avis pour le moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border-b border-gray-200 pb-6 last:border-b-0"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              {review.user?.image ? (
                <Image
                  src={review.user.image}
                  alt={`${review.user.first_name} ${review.user.last_name}`}
                  width={40}
                  height={40}
                  className="rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-400 w-5 h-5" />
                </div>
              )}
              <div>
                <h4 className="font-medium text-gray-900">
                  {`${review.user.first_name} ${review.user.last_name}`}
                </h4>
                <p className="text-sm text-gray-500">
                  {format(new Date(review.created_at), 'dd MMMM yyyy', { locale: fr })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(review.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'}`} />
              ))}
              <span className="text-sm text-gray-600 ml-1">
                {parseFloat(review.rating).toFixed(1)}
              </span>
            </div>
          </div>

          <p className="text-gray-600">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
};
