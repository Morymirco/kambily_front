'use client'
import Cookies from 'js-cookie'

const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
}

export const cookieService = {
  // Pour les cookies non-http-only (côté client)
  setClientCookie: (name, value, options = {}) => {
    Cookies.set(name, value, { ...COOKIE_OPTIONS, ...options })
  },

  getClientCookie: (name) => {
    return Cookies.get(name)
  },

  removeClientCookie: (name) => {
    Cookies.remove(name)
  },

  // Pour les cookies http-only (via API)
  async setAuthCookies(tokens) {
    try {
      await fetch('/api/auth/cookies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokens),
        credentials: 'include' // Important pour les cookies
      })
    } catch (error) {
      console.error('Erreur lors de la définition des cookies:', error)
      throw error
    }
  },

  async clearAuthCookies() {
    try {
      await fetch('/api/auth/cookies', {
        method: 'DELETE',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Erreur lors de la suppression des cookies:', error)
      throw error
    }
  }
} 