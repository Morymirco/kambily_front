'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { cookieService } from '@/app/services/cookieService'

const AuthContext = createContext({})
const BASE_URL = 'http://35.85.136.46:8001'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fonction pour rafraîchir le token
  const refreshToken = async () => {
    try {
      const response = await fetch(`${BASE_URL}/accounts/token/refresh/`, {
        method: 'POST',
        credentials: 'include', // Important pour envoyer les cookies
        headers: {
          'Content-Type': 'application/json',
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

  // Fonction pour faire des requêtes authentifiées avec refresh automatique
  const authenticatedFetch = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
          ...options.headers,
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 401) {
        await refreshToken()
        return fetch(url, {
          ...options,
          credentials: 'include',
          headers: {
            ...options.headers,
            'Content-Type': 'application/json'
          }
        })
      }

      return response
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    checkAuth()
    
    // Rafraîchir le token périodiquement
    const refreshInterval = setInterval(() => {
      if (user) refreshToken()
    }, 14 * 60 * 1000) // 14 minutes

    return () => clearInterval(refreshInterval)
  }, [user])

  const checkAuth = async () => {
    try {
      const response = await authenticatedFetch(`${BASE_URL}/accounts/me`)
      const data = await response.json()
      setUser(data)
    } catch (error) {
      console.error('Erreur de vérification:', error)
      setUser(null)
      await cookieService.clearAuthCookies()
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/accounts/login`, {
        method: 'POST',
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

      // Stocker les tokens dans les cookies HTTP-only
      await cookieService.setAuthCookies({
        access: data.access,
        refresh: data.refresh
      })

      await checkAuth()
      return data
    } catch (error) {
      throw error
    }
  }

  const register = async (formData) => {
    try {
      const registerResponse = await fetch(`${BASE_URL}/accounts/register`, {
        method: 'POST',
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
      const loginResponse = await fetch(`${BASE_URL}/accounts/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password')
        })
      })

      const loginData = await loginResponse.json()

      if (!loginResponse.ok) {
        throw new Error('Erreur lors de la connexion automatique')
      }

      await cookieService.setAuthCookies({
        access: loginData.access,
        refresh: loginData.refresh
      })

      await checkAuth()
      return loginData
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    await cookieService.clearAuthCookies()
    setUser(null)
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