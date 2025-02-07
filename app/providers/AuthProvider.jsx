'use client'
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from 'react';
import { HOST_IP, PORT, PROTOCOL_HTTP } from './../constants';

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
      // Vérifier si on a un refresh token
      if (!refreshToken) {
        throw new Error('Pas de refresh token disponible');
      }

      const response = await fetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/accounts/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Gérer les différents cas d'erreur
        switch (response.status) {
          case 401:
            throw new Error('Refresh token invalide');
          case 400:
            throw new Error(data.detail || 'Requête invalide');
          default:
            throw new Error('Erreur lors du rafraîchissement du token');
        }
      }

      // Mettre à jour les tokens
      localStorage.setItem('access_token', data.access);
      setAccessToken(data.access);
      return data.access;
    } catch (error) {
      console.error('Erreur de rafraîchissement du token:', error);
      // Déconnexion en cas d'échec
      logout();
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${PROTOCOL_HTTP}://${HOST_IP}${PORT}/accounts/login/`, {
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
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
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
      let token = localStorage.getItem('access_token');
      
      if (!token) {
        const refresh = localStorage.getItem('refresh_token');
        if (refresh) {
          token = await refreshAccessToken(refresh_token);
        } else {
          throw new Error('Non authentifié');
        }
      }

      // Ajouter le token aux headers
      const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      };

      const response = await fetch(url, { ...options, headers });

      // Si le token est expiré
      if (response.status === 401) {
        const refresh = localStorage.getItem('refresh_token');
        if (refresh) {
          const newToken = await refreshAccessToken(refresh_token);
          headers.Authorization = `Bearer ${newToken}`;
          return fetch(url, { ...options, headers });
        } else {
          throw new Error('Session expirée');
        }
      }

      return response;
    } catch (error) {
      console.error('Erreur de requête:', error);
      logout();
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