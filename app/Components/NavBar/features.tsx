import React from 'react';

const Features = () => {
  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-[1400px] mx-auto px-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Meilleure Qualité */}
        <div className="flex items-center gap-4">
          <svg 
            className="w-14 h-14 text-[#048B9A] flex-shrink-0" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
            <path d="M16 16l-1.5-1.5" />
            <path d="M8 16l1.5-1.5" />
            <path d="M12 18v-2" />
          </svg>
          <div>
            <h3 className="text-xl font-semibold mb-2">Meilleure Qualité</h3>
            <p className="text-gray-600">
              Nous offrons des produits de qualité supérieure pour une expérience d'achat en toute confiance.
            </p>
          </div>
        </div>

        {/* Meilleures Offres */}
        <div className="flex items-center gap-4">
          <svg 
            className="w-14 h-14 text-[#048B9A] flex-shrink-0" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
            <path d="M14 5l-4.5 4.5" />
            <path d="M18 9l-4.5 4.5" />
            <circle cx="7" cy="7" r="1" />
          </svg>
          <div>
            <h3 className="text-xl font-semibold mb-2">Meilleures Offres</h3>
            <p className="text-gray-600">
              Découvrez nos offres imbattables conçues pour offrir le meilleur rapport qualité-prix.
            </p>
          </div>
        </div>

        {/* Paiement Sécurisé */}
        <div className="flex items-center gap-4">
          <svg 
            className="w-14 h-14 text-[#048B9A] flex-shrink-0" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M2 10h20" />
            <path d="M6 14h4" />
            <path d="M14 14h4" />
            <path d="M12 14h.01" />
            <circle cx="12" cy="14" r="1" />
          </svg>
          <div>
            <h3 className="text-xl font-semibold mb-2">Paiement Sécurisé</h3>
            <p className="text-gray-600">
              Nous nous engageons à vous offrir une expérience d'achat en ligne sûre et fiable.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Features;
