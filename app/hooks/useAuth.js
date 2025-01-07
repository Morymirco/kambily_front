import { auth } from '@/app/lib/auth';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();

  const fetchWithAuth = async (url, options = {}) => {
    try {
      let accessToken = auth.getAccessToken();

      if (auth.needsRefresh(accessToken)) {
        const refreshToken = auth.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await fetch('https://kambily.ddns.net/accounts/token/refresh/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken })
        });

        if (!response.ok) {
          throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        auth.setTokens(data.access, refreshToken);
        accessToken = data.access;
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      return response.json();

    } catch (error) {
      auth.removeTokens();
      router.replace('/test/login');
      throw error;
    }
  };

  return { fetchWithAuth };
} 