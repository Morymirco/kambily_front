import Link from 'next/link';

export default function QualityHeader({ timeLeft }) {
  return (
    <div className="px-4 py-3 bg-white">
      <div className="flex items-center gap-3">
        <div className="text-[#048B9A]">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 8h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2"/>
            <path d="M5 16H4a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-medium">Meilleure Qualité</h2>
          <p className="text-xs text-gray-400 leading-tight">
            Nous offrons des produits de qualité supérieure pour une expérience d'achat en toute confiance.
          </p>
        </div>
      </div>

      <div className="mt-3">
        <div className="bg-[#E8F8F9] rounded-lg p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="font-mono text-[#048B9A] text-sm font-medium tracking-wider">
              {timeLeft}
            </div>
            <p className="text-xs text-gray-500">
              Achetez maintenant et profitez de l'offre!
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 border-t pt-3">
        <div className="font-medium text-sm">Livraison Gratuite</div>
        <Link href="#" className="text-xs text-[#048B9A] flex items-center gap-1">
          Voir Plus 
          <span className="text-xs">→</span>
        </Link>
      </div>
    </div>
  );
} 