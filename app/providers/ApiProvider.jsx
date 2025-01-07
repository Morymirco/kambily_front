'use client'
import { createContext, useContext, useState } from 'react';
import api from '../config/api';

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Gestion des produits
  const productService = {
    getProducts: async () => {
      setLoading(true);
      try {
        const data = await api.products.list();
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },

    getProduct: async (id) => {
      setLoading(true);
      try {
        const data = await api.products.get(id);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },

    createProduct: async (productData) => {
      setLoading(true);
      try {
        const data = await api.products.create(productData);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    }
  };

  // Gestion des catégories
  const categoryService = {
    getCategories: async () => {
      setLoading(true);
      try {
        const data = await api.categories.list();
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },

    createCategory: async (categoryData) => {
      setLoading(true);
      try {
        const data = await api.categories.create(categoryData);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    }
  };

  // Gestion de l'authentification
  const authService = {
    login: async (credentials) => {
      setLoading(true);
      try {
        const data = await api.auth.login(credentials);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },

    register: async (userData) => {
      setLoading(true);
      try {
        const data = await api.auth.register(userData);
        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    }
  };

  const value = {
    loading,
    error,
    products: productService,
    categories: categoryService,
    auth: authService,
    clearError: () => setError(null)
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
}; 