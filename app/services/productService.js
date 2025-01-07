import api from './api';
import { API_ENDPOINTS } from './config';

export const productService = {
  getAllProducts: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.products.list, { params });
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(API_ENDPOINTS.products.detail(id));
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get(API_ENDPOINTS.products.categories);
    return response.data;
  },

  searchProducts: async (query) => {
    const response = await api.get(API_ENDPOINTS.products.list, {
      params: { search: query }
    });
    return response.data;
  }
}; 