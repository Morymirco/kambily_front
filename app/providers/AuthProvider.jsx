'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { cookieService } from '@/app/services/cookieService'

const AuthContext = createContext({})
// Utiliser HTTP au lieu de HTTPS
const BASE_URL = 'http://35.85.136.46:8001'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fonction pour rafraîchir le token
  const refreshToken = async () => {
    try {
      const response = await fetch(`${BASE_URL}/accounts/token/refresh/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      if (!response.ok) throw new Error('Échec du rafraîchissement du token')

      const data = await response.json()
      await cookieService.setAuthCookies({ access: data.access })
      return data.access
    } catch (error) {
      console.error('Erreur refresh token:', error)
      logout()
      throw error
    }
  }

  // Fonction pour faire des requêtes authentifiées avec refresh automatique et gestion des erreurs
  const authenticatedFetch = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).catch(error => {
        console.error('Erreur de connexion:', error)
        throw new Error('Erreur de connexion au serveur')
      })

      if (response.status === 401) {
        const newToken = await refreshToken()
        return fetch(url, {
          ...options,
          credentials: 'include',
          headers: {
            ...options.headers,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${newToken}`
          }
        })
      }

      return response
    } catch (error) {
      console.error('Erreur authenticatedFetch:', error)
      throw error
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkAuth()
      } catch (error) {
        console.error('Erreur d\'initialisation:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
    
    const refreshInterval = setInterval(() => {
      if (user) refreshToken().catch(console.error)
    }, 14 * 60 * 1000)

    return () => clearInterval(refreshInterval)
  }, [user])

  const checkAuth = async () => {
    try {
      const response = await authenticatedFetch(`${BASE_URL}/accounts/me`)
      if (!response.ok) throw new Error('Vérification échouée')
      
      const data = await response.json()
      setUser(data)
    } catch (error) {
      console.error('Erreur de vérification:', error)
      setUser(null)
      await cookieService.clearAuthCookies()
      throw error
    }
  }

  const login = async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/accounts/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Email ou mot de passe incorrect')
      }

      await cookieService.setAuthCookies({
        access: data.access,
        refresh: data.refresh
      })

      await checkAuth()
      return data
    } catch (error) {
      console.error('Erreur de connexion:', error)
      throw error
    }
  }

  const register = async (formData) => {
    try {
      const registerResponse = await fetch(`${BASE_URL}/accounts/register`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      })

      const registerData = await registerResponse.json()

      if (!registerResponse.ok) {
        let errorMessage = 'Une erreur est survenue lors de l\'inscription'
        if (registerData.detail) errorMessage = registerData.detail
        else if (registerData.email) errorMessage = `Email: ${registerData.email[0]}`
        else if (registerData.password) errorMessage = `Mot de passe: ${registerData.password[0]}`
        else if (registerData.message) errorMessage = registerData.message
        throw new Error(errorMessage)
      }

      // Connexion automatique après inscription
      return login({
        email: formData.get('email'),
        password: formData.get('password')
      })
    } catch (error) {
      console.error('Erreur d\'inscription:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await cookieService.clearAuthCookies()
      setUser(null)
    } catch (error) {
      console.error('Erreur de déconnexion:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      register,
      isAuthenticated: !!user,
      authenticatedFetch
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider')
  }
  return context
} 