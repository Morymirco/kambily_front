'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md">
        {/* En-tête avec logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.webp"
              alt="Kambily Logo"
              width={150}
              height={50}
              className="mx-auto"
            />
          </Link>
        </div>

        {/* Carte principale */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Retour à la connexion */}
          <Link 
            href="/login" 
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6 group"
          >
            <FaArrowLeft className="mr-2 text-sm transition-transform group-hover:-translate-x-1" />
            Retour à la connexion
          </Link>

          {!isSubmitted ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Mot de passe oublié ?
              </h1>
              <p className="text-gray-600 mb-6">
                Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Message d'erreur */}
                {error && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    {error}
                  </div>
                )}

                {/* Champ email */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#048B9A] focus:border-transparent transition-colors"
                    placeholder="exemple@email.com"
                    required
                  />
                </div>

                {/* Bouton de soumission */}
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors
                    ${isLoading || !email 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#048B9A] hover:bg-[#037483]'
                    }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    'Envoyer le lien'
                  )}
                </button>
              </form>
            </>
          ) : (
            // Message de succès
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                E-mail envoyé !
              </h2>
              <p className="text-gray-600 mb-6">
                Si un compte existe avec l'adresse {email}, vous recevrez un e-mail avec les instructions pour réinitialiser votre mot de passe.
              </p>
              <Link 
                href="/auth/login"
                className="text-[#048B9A] hover:underline"
              >
                Retourner à la connexion
              </Link>
            </div>
          )}
        </div>

        {/* Aide et support */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Besoin d'aide ? {' '}
            <Link 
              href="/contact" 
              className="text-[#048B9A] hover:underline"
            >
              Contactez-nous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 