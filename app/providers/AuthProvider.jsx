'use client'
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // Vérifier le token au chargement
  useEffect(() => {
    const initAuth = async () => {
      const access = localStorage.getItem('access_token');
      const refresh = localStorage.getItem('refresh_token');
      
      if (access) {
        try {
          // Vérifier si le token est expiré
          const decodedToken = jwtDecode(access);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            // Token expiré, essayer de le rafraîchir
            if (refresh) {
              await refreshAccessToken(refresh);
            } else {
              logout();
            }
          } else {
            // Token valide
            setAccessToken(access);
            setUser(JSON.parse(localStorage.getItem('user')));
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Erreur de décodage du token:', error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await fetch('https://api.kambily.store/accounts/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) throw new Error('Échec du rafraîchissement du token');

      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      setAccessToken(data.access);
      return data.access;
    } catch (error) {
      console.error('Erreur de rafraîchissement du token:', error);
      logout();
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('https://api.kambily.store/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Erreur de connexion');
      }

      // Sauvegarder les tokens
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      setUser(data.user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Fonction utilitaire pour les requêtes authentifiées
  const authFetch = async (url, options = {}) => {
    try {
      // Ajouter le token aux headers
      const headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
      };

      const response = await fetch(url, { ...options, headers });

      // Si le token est expiré
      if (response.status === 401) {
        const newToken = await refreshAccessToken(refreshToken);
        
        // Réessayer la requête avec le nouveau token
        headers.Authorization = `Bearer ${newToken}`;
        return fetch(url, { ...options, headers });
      }

      return response;
    } catch (error) {
      console.error('Erreur de requête:', error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    authFetch
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 