'use client'

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Vous pouvez logger l'erreur vers un service d'analytics
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Quelque chose s'est mal passé !
          </h1>
          
          <p className="text-gray-600">
            Nous sommes désolés, une erreur inattendue s'est produite.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#048B9A] text-white hover:bg-[#037483] transition-colors duration-300"
          >
            Réessayer
          </button>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
          >
            Retour à l'accueil
          </Link>
        </div>

        {/* Contact support */}
        <p className="text-sm text-gray-500">
          Si le problème persiste, {' '}
          <Link 
            href="/contact" 
            className="text-[#048B9A] hover:underline"
          >
            contactez notre support
          </Link>
        </p>
      </div>
    </div>
  );
} 