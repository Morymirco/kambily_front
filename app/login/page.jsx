'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEnvelope, FaFacebook, FaGoogle, FaLock } from 'react-icons/fa';
import { HOST_IP, PORT, PROTOCOL_HTTP } from "../constants";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      router.push('/profile');
    } else {
      setIsLoading(false);
    }
  }, [router]);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Réinitialiser l'erreur quand l'utilisateur commence à taper
    if (error) setError(null);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/accounts/login/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Email ou mot de passe incorrect');
      }
      
      // Stocker le token dans le localStorage
      localStorage.setItem('access_token', data.access_token);
      
      // Stocker les informations utilisateur si nécessaire
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      // Redirection vers la page profile
      router.push('/profile');
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError(err.message || 'Une erreur est survenue lors de la connexion');
      // Nettoyer le localStorage en cas d'erreur
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };
  
  // Gérer la connexion avec Google
  const handleGoogleLogin = async () => {
    setError(null);
    // Implémenter la connexion Google ici
    setError("La connexion avec Google n'est pas encore disponible");
  };
  
  // Gérer la connexion avec Facebook
  const handleFacebookLogin = async () => {
    setError(null);
    // Implémenter la connexion Facebook ici
    setError("La connexion avec Facebook n'est pas encore disponible");
  };
  
  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    
    // Récupérer l'URL de redirection
    const redirectUrl = localStorage.getItem('redirectAfterLogin');
    localStorage.removeItem('redirectAfterLogin'); // Nettoyer
    
    // Rediriger vers la page précédente ou la page d'accueil
    window.location.href = redirectUrl || '/';
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#048B9A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
      <div className=" flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            {/* Logo - Visible uniquement sur desktop */}
            <div className="hidden md:flex justify-center mb-6">
              <Image
                src="/logo6.svg"
                alt="Logo"
                width={150}
                height={150}
                className="w-[150px] h-[150px]"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
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
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 text-red-500 p-3 rounded-md text-sm"
                >
                  {error}
                </motion.div>
            )}
            
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
                      disabled={loading}
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
                      disabled={loading}
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
                    disabled={loading}
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
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
              <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaGoogle className="mr-2" />
                Google
              </button>
              <button
                  onClick={handleFacebookLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaFacebook className="mr-2" />
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
  );
} 