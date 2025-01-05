'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import Link from 'next/link';

export default function ChangePassword() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  useEffect(() => {
    // Vérifier l'authentification au chargement
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      router.push('/test/login');
    }
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mounted) return;

    // Vérification de la correspondance des mots de passe
    if (formData.new_password !== formData.confirm_password) {
      setError("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!storedUser || !token) {
        router.push('/test/login');
        return;
      }

      const user = JSON.parse(storedUser);

      const response = await fetch('http://192.168.43.134:8000/accounts/change_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: user.id,
          current_password: formData.current_password,
          new_password: formData.new_password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors du changement de mot de passe');
      }

      setSuccess(true);
      setFormData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });

      // Redirection après 2 secondes
      setTimeout(() => {
        router.push('/test/profile');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#048B9A]/10 flex items-center justify-center">
            <FaLock className="w-8 h-8 text-[#048B9A]" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Changer le mot de passe
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          <Link
            href="/test/profile"
            className="font-medium text-[#048B9A] hover:text-[#037483]"
          >
            Retour au profil
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mot de passe actuel */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe actuel
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={formData.current_password}
                  onChange={(e) => setFormData({...formData, current_password: e.target.value})}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Nouveau mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nouveau mot de passe
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.new_password}
                  onChange={(e) => setFormData({...formData, new_password: e.target.value})}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirmation du nouveau mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirmer le nouveau mot de passe
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirm_password}
                  onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#048B9A] focus:border-[#048B9A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                </button>
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

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 text-green-500 p-3 rounded-md text-sm"
              >
                Mot de passe modifié avec succès ! Redirection...
              </motion.div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#048B9A] hover:bg-[#037483] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#048B9A] disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Changer le mot de passe'
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#048B9A]"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 