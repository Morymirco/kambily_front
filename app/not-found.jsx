import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Image 404 */}
        <div className="relative w-full h-[300px] mb-8">
          <Image
            src="/404.svg"
            alt="Page non trouvée"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Texte et bouton */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Oops! Page non trouvée
          </h1>
          
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Désolé, la page que vous recherchez semble avoir disparu ou n'existe pas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#048B9A] text-white hover:bg-[#037483] transition-colors duration-300"
            >
              Retour à l'accueil
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
            >
              Page précédente
            </button>
          </div>

          {/* Contact support */}
          <p className="text-sm text-gray-500 mt-8">
            Besoin d'aide ? {' '}
            <Link 
              href="/contact" 
              className="text-[#048B9A] hover:underline"
            >
              Contactez notre support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 