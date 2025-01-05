'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaLock, FaPhone } from 'react-icons/fa';

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simuler une requête d'authentification
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Vérifier les identifiants (à remplacer par votre logique d'authentification)
      if (formData.phone === '+224621000000' && formData.password === 'password') {
        toast.success('Connexion réussie');
        router.push('/driver');
      } else {
        toast.error('Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast.error('Erreur lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="text-center mb-8">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={150}
            height={60}
            className="mx-auto"
          />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Espace Livreur
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connectez-vous pour accéder à votre espace
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label 
                htmlFor="phone" 
                className="block text-sm font-medium text-gray-700"
              >
                Numéro de téléphone
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+224 621 00 00 00"
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A] sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A] sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#048B9A] focus:ring-[#048B9A] border-gray-300 rounded"
                />
                <label 
                  htmlFor="remember-me" 
                  className="ml-2 block text-sm text-gray-700"
                >
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <a 
                  href="#" 
                  className="font-medium text-[#048B9A] hover:text-[#037483]"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#048B9A] hover:bg-[#037483] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#048B9A] disabled:opacity-50"
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Besoin d'aide ?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a 
                href="tel:+224621000000"
                className="font-medium text-[#048B9A] hover:text-[#037483]"
              >
                Contactez le support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 