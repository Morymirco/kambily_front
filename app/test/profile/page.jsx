'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSignOutAlt } from 'react-icons/fa';

export default function TestProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: '',
    bio: '',
    image: null
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/test/login');
        return;
      }

      const response = await fetch('http://192.168.43.134:8000/accounts/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/test/login');
          return;
        }
        throw new Error('Erreur lors du chargement du profil');
      }

      const data = await response.json();
      console.log('Données du profil:', data);
      setUser(data);
      setEditForm({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number || '',
        address: data.address || '',
        bio: data.bio || '',
      });
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/test/login');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      Object.keys(editForm).forEach(key => {
        if (editForm[key] !== null) {
          formData.append(key, editForm[key]);
        }
      });

      const response = await fetch('http://192.168.43.134:8000/accounts/update-profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour du profil');

      const updatedData = await response.json();
      setUser(updatedData);
      setShowEditModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#048B9A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* En-tête du profil */}
        <div className="relative h-48 bg-gradient-to-r from-[#048B9A] to-[#037483]">
          <div className="absolute -bottom-16 left-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-white">
              <Image
                src={user?.image || '/default-avatar.png'}
                alt="Photo de profil"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Informations du profil */}
        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-gray-600">{user?.bio || 'Aucune bio'}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowEditModal(true)}
                className="px-4 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483] transition-colors flex items-center gap-2"
              >
                <FaEdit /> Modifier
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <FaSignOutAlt /> Déconnexion
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p>{user?.phone_number || 'Non renseigné'}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Adresse</p>
                  <p>{user?.address || 'Non renseignée'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaUser className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Statut</p>
                  <p>{user?.is_active ? 'Actif' : 'Inactif'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de modification */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-semibold mb-4">Modifier le profil</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={editForm.first_name}
                    onChange={(e) => setEditForm({...editForm, first_name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={editForm.last_name}
                    onChange={(e) => setEditForm({...editForm, last_name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={editForm.phone_number}
                  onChange={(e) => setEditForm({...editForm, phone_number: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo de profil
                </label>
                <input
                  type="file"
                  onChange={(e) => setEditForm({...editForm, image: e.target.files[0]})}
                  accept="image/*"
                  className="w-full"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Mise à jour...' : 'Enregistrer'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
} 