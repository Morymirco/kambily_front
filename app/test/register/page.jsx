'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    profile_image: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      window.location.href = '/test/profile';
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profile_image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Email et mot de passe sont requis");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('password', formData.password);
      formDataToSend.append('first_name', formData.first_name.trim());
      formDataToSend.append('last_name', formData.last_name.trim());
      
      if (formData.phone_number) {
        formDataToSend.append('phone_number', formData.phone_number.trim());
      }

      if (formData.profile_image) {
        formDataToSend.append('image', formData.profile_image);
      }

      console.log('Données à envoyer: FormData');

      // 1. Inscription
      const registerResponse = await fetch('https://api.kambily.store/accounts/register', {
        method: 'POST',
        body: formDataToSend
      });

      const registerData = await registerResponse.json();
      console.log('Réponse du serveur (inscription):', registerData);

      if (!registerResponse.ok) {
        let errorMessage = 'Une erreur est survenue lors de l\'inscription';
        
        if (registerData.detail) {
          errorMessage = registerData.detail;
        } else if (registerData.email) {
          errorMessage = `Email: ${registerData.email[0]}`;
        } else if (registerData.password) {
          errorMessage = `Mot de passe: ${registerData.password[0]}`;
        } else if (registerData.message) {
          errorMessage = registerData.message;
        }
        
        throw new Error(errorMessage);
      }

      // 2. Connexion automatique après inscription
      const loginResponse = await fetch('https://api.kambily.store/accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password
        })
      });

      const loginData = await loginResponse.json();
      console.log('Réponse du serveur (connexion):', loginData);

      if (!loginResponse.ok) {
        throw new Error('Erreur lors de la connexion automatique');
      }

      // 3. Stockage des tokens
      localStorage.setItem('access_token', loginData.access);
      localStorage.setItem('refresh_token', loginData.refresh);

      // 4. Redirection vers le profil
      window.location.href = '/test/profile';

    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créez votre compte
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A] sm:text-sm"
                placeholder="exemple@email.com"
              />
            </div>

            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                Prénom
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A] sm:text-sm"
                placeholder="John"
              />
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A] sm:text-sm"
                placeholder="Doe"
              />
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A] sm:text-sm"
                placeholder="+224 000000000"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A] sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </button>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A] sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="profile_image" className="block text-sm font-medium text-gray-700">
                Photo de profil
              </label>
              <div className="mt-1 flex items-center space-x-4">
                {formData.profile_image ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={URL.createObjectURL(formData.profile_image)}
                      alt="Aperçu"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <FaUser className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <label
                  htmlFor="profile_image_input"
                  className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#048B9A]"
                >
                  Changer
                  <input
                    id="profile_image_input"
                    name="profile_image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {formData.profile_image && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, profile_image: null })}
                    className="py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Supprimer
                  </button>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                JPG, PNG ou GIF. Taille maximale 2MB.
              </p>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-500 p-3 rounded-md text-sm"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#048B9A] hover:bg-[#037483] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#048B9A] disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'S\'inscrire'
            )}
          </button>

          <div className="text-sm text-center">
            <Link href="/test/login" className="font-medium text-[#048B9A] hover:text-[#037483]">
              Déjà inscrit ? Connectez-vous
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 