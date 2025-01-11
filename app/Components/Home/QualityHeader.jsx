import Link from 'next/link';

export default function QualityHeader({ timeLeft }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6 lg:p-8 my-4 sm:my-6 lg:my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-8 h-8 text-[#048B9A]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 8h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2"/>
              <path d="M5 16H4a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Livraison rapide</h3>
            <p className="text-xs text-gray-500">Sous 24-48h en Guinée</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-8 h-8 text-[#048B9A]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 8h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2"/>
              <path d="M5 16H4a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Paiement sécurisé</h3>
            <p className="text-xs text-gray-500">Orange Money, MTN Money</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-8 h-8 text-[#048B9A]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 8h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2"/>
              <path d="M5 16H4a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Service client</h3>
            <p className="text-xs text-gray-500">Support 7j/7</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-8 h-8 text-[#048B9A]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 8h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2"/>
              <path d="M5 16H4a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Garantie qualité</h3>
            <p className="text-xs text-gray-500">14 jours satisfait ou remboursé</p>
          </div>
        </div>
      </div>
    </div>
  );
} 