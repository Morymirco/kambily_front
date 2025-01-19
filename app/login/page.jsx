'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaEnvelope, FaFacebook, FaGoogle, FaLock, FaSpinner } from 'react-icons/fa';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://api.kambily.store/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Erreur de connexion');
      }

      // Stocker le token
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      // Récupérer les informations de l'utilisateur
      const userResponse = await fetch('https://api.kambily.store/auth/user/', {
        headers: {
          'Authorization': `Bearer ${data.access}`,
        }
      });

      const userData = await userResponse.json();

      if (!userResponse.ok) {
        throw new Error('Erreur lors de la récupération des informations utilisateur');
      }

      // Stocker les informations utilisateur
      localStorage.setItem('user', JSON.stringify(userData));

      toast.success('Connexion réussie !');

      // Redirection selon le rôle
      if (userData.is_staff || userData.is_superuser) {
        router.push('/admin/dashboard');
      } else {
        router.push('/profile');
      }

    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={150}
            height={50}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Connectez-vous à votre compte
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{' '}
            <Link href="/register" className="font-medium text-[#048B9A] hover:text-[#037483]">
              créez un compte
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A]"
                  placeholder="exemple@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A]"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-[#048B9A] focus:ring-[#048B9A] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Se souvenir de moi
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="text-[#048B9A] hover:text-[#037483]">
                Mot de passe oublié ?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#048B9A] hover:bg-[#037483] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#048B9A] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <FaSpinner className="animate-spin mr-2" />
                Connexion en cours...
              </div>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FaGoogle className="mr-2" />
              Google
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FaFacebook className="mr-2" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 