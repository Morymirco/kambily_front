'use client'
import { useEffect } from 'react';
import useTestStore from '@/app/stores/testStore';
import { useRouter } from 'next/navigation';

export default function TestProvider({ children }) {
  const { setAuth, logout } = useTestStore();
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (accessToken && refreshToken) {
        try {
          const response = await fetch('https://kambily.ddns.net/accounts/get_user_with_token/', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });

          if (!response.ok) {
            throw new Error('Token invalide');
          }

          const userData = await response.json();
          setAuth(userData, { access: accessToken, refresh: refreshToken });
        } catch (error) {
          console.error('Erreur d\'authentification:', error);
          logout();
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          router.push('/test/login');
        }
      }
    };

    initAuth();
  }, []);

  return children;
} 