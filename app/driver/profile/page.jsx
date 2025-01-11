'use client'
import { useState } from 'react';
import {
    FaCamera,
    FaEnvelope,
    FaIdCard,
    FaKey,
    FaMapMarkerAlt,
    FaMotorcycle,
    FaPhone
} from 'react-icons/fa';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'Mamadou Diallo',
    phone: '+224 621 00 00 00',
    email: 'mamadou.diallo@example.com',
    zone: 'Ratoma',
    photo: '/deliverers/photo.jpg',
    idCard: '/deliverers/id-card.jpg',
    joinDate: '2023-12-01'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Logique de changement de mot de passe
    setIsChangingPassword(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Mon Profil</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Photo de profil et infos principales */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
              <button className="absolute bottom-0 right-0 bg-[#048B9A] text-white p-2 rounded-full hover:bg-[#037483]">
                <FaCamera size={14} />
              </button>
            </div>
            <h2 className="mt-4 text-xl font-medium">{profile.name}</h2>
            <p className="text-sm text-gray-500">Livreur depuis {new Date(profile.joinDate).toLocaleDateString('fr-FR')}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <FaPhone className="text-gray-400" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <FaEnvelope className="text-gray-400" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>{profile.zone}</span>
            </div>
          </div>
        </div>

        {/* Formulaire d'édition */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Informations personnelles</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Nom complet</label>
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded-lg text-sm disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded-lg text-sm disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded-lg text-sm disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Zone</label>
                <input
                  type="text"
                  value={editedProfile.zone}
                  onChange={(e) => setEditedProfile({...editedProfile, zone: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded-lg text-sm disabled:bg-gray-50"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                type="button"
                onClick={() => setIsChangingPassword(true)}
                className="text-sm text-[#048B9A] hover:text-[#037483] flex items-center gap-2"
              >
                <FaKey size={14} />
                Changer le mot de passe
              </button>
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-[#048B9A] text-white rounded-lg text-sm hover:bg-[#037483]"
                >
                  Modifier
                </button>
              ) : (
                <div className="space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedProfile(profile);
                    }}
                    className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#048B9A] text-white rounded-lg text-sm hover:bg-[#037483]"
                  >
                    Enregistrer
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Documents */}
        <div className="md:col-span-3 bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Documents</h2>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FaIdCard className="text-gray-400" />
                  <span className="text-sm font-medium">Carte d'identité</span>
                </div>
                <button className="text-sm text-[#048B9A] hover:text-[#037483]">
                  Mettre à jour
                </button>
              </div>
              <img
                src={profile.idCard}
                alt="Carte d'identité"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FaMotorcycle className="text-gray-400" />
                  <span className="text-sm font-medium">Permis de conduire</span>
                </div>
                <button className="text-sm text-[#048B9A] hover:text-[#037483]">
                  Mettre à jour
                </button>
              </div>
              <img
                src={profile.idCard}
                alt="Permis de conduire"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal de changement de mot de passe */}
      {isChangingPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-medium">Changer le mot de passe</h2>
              <button 
                onClick={() => setIsChangingPassword(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handlePasswordChange} className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Ancien mot de passe</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Nouveau mot de passe</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Confirmer le mot de passe</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#048B9A] text-white rounded-lg text-sm hover:bg-[#037483]"
                >
                  Changer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage; 