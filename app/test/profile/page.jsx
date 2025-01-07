'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        
        if (!accessToken) {
          router.push('/test/login');
          return;
        }

        const response = await fetch('https://kambily.ddns.net/accounts/get_user_with_token/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        // Récupérer d'abord le texte brut de la réponse
        const responseText = await response.text();
        
        let data;
        try {
          // Essayer de parser le texte en JSON
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Réponse brute:', responseText);
          throw new Error("Le serveur a renvoyé une réponse invalide");
        }

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('401');
          }
          throw new Error('Erreur lors de la récupération des données utilisateur');
        }

        setUserData(data);
        
      } catch (err) {
        console.error("Erreur:", err);
        setError(err.message);
        if (err.message === '401') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          router.push('/test/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!userData) return <div>Aucune donnée utilisateur</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Profil de {userData.first_name} {userData.last_name}
      </h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid gap-4">
          <div>
            <label className="font-medium">Email:</label>
            <div>{userData.email}</div>
          </div>
          {userData.phone_number && (
            <div>
              <label className="font-medium">Téléphone:</label>
              <div>{userData.phone_number}</div>
            </div>
          )}
          {userData.address && (
            <div>
              <label className="font-medium">Adresse:</label>
              <div>{userData.address}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 