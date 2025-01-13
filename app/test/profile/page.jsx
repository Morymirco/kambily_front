'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaSignOutAlt, FaUser } from 'react-icons/fa';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
          window.location.href = '/test/login';
          return;
        }

        const response = await fetch('https://api.kambily.store/accounts/get_user_with_token', {
          mode: 'cors',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Session expirée');
        }

        const data = await response.json();
        console.log('User data:', data);
        setUserData(data);
        setLoading(false);

      } catch (err) {
        console.error('Profile error:', err);
        localStorage.removeItem('access_token');
        window.location.href = '/test/login';
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/test/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#048B9A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            {userData.image_url ? (
              <Image
                src={userData.image_url}
                alt="Photo de profil"
                width={64}
                height={64}
                className="rounded-full"
              />
            ) : (
              <div className="w-16 h-16 bg-[#048B9A]/10 rounded-full flex items-center justify-center">
                <FaUser className="w-8 h-8 text-[#048B9A]" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">
                {userData.first_name} {userData.last_name}
              </h1>
              <p className="text-gray-600">
                {userData.role === 'customer' ? 'Client' : 'Administrateur'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#048B9A]" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p>{userData.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <FaPhone className="text-[#048B9A]" />
              <div>
                <p className="text-sm text-gray-600">Téléphone</p>
                <p>{userData.phone_number || 'Non renseigné'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#048B9A]" />
              <div>
                <p className="text-sm text-gray-600">Adresse</p>
                <p>{userData.address || 'Non renseignée'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Statut du compte</h2>
          <div className="space-y-2">
            <p>
              <span className="text-gray-600">Compte actif : </span>
              <span className={userData.is_active ? "text-green-500" : "text-red-500"}>
                {userData.is_active ? "Oui" : "Non"}
              </span>
            </p>
            <p>
              <span className="text-gray-600">Email confirmé : </span>
              <span className={userData.is_confirmed ? "text-green-500" : "text-red-500"}>
                {userData.is_confirmed ? "Oui" : "Non"}
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full p-4 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
        >
          <FaSignOutAlt />
          <span>Se déconnecter</span>
        </button>
      </div>
    </div>
  );
} 